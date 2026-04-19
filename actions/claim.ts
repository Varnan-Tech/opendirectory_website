'use server';

import { db } from '@/db';
import { mergedContributors, merchClaims } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/auth';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const claimSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100, "First name too long"),
  lastName: z.string().min(1, "Last name is required").max(100, "Last name too long"),
  githubEmail: z.string().email(),
  contactEmail: z.string().email("Invalid email format"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Mobile number must be 10 digits, start with 6-9, and be a valid Indian number."),
  altPhone: z.string().optional().or(z.literal('')),
  addressLine1: z.string().min(5, "Address must be at least 5 characters"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pinCode: z.string().min(5, "Valid PIN/ZIP code required"),
  country: z.string().min(2, "Country is required"),
  shirtSize: z.enum(['S', 'M', 'L', 'XL', 'XXL']),
});

export async function submitClaim(data: any) {
  try {
    const session = await auth();
    if (!session?.user?.name) {
      return { error: "Unauthorized. Please sign in with GitHub." };
    }

    const parsedData = claimSchema.safeParse(data);
    if (!parsedData.success) {
      return { error: parsedData.error.errors[0].message };
    }
    const validData = parsedData.data;

    const githubUsername = session.user.name;

    const contributor = await db.query.mergedContributors.findFirst({
      where: eq(mergedContributors.githubUsername, githubUsername),
    });

    if (!contributor) {
      return { error: "You are not eligible. Ensure your PR is merged to the main repository." };
    }

    if (contributor.hasClaimed) {
      return { error: "You have already claimed your merch." };
    }

    await db.insert(merchClaims).values({
      contributorId: contributor.id,
      firstName: validData.firstName,
      lastName: validData.lastName,
      githubEmail: validData.githubEmail,
      contactEmail: validData.contactEmail,
      phone: `+91${validData.phone}`,
      altPhone: validData.altPhone ? `+91${validData.altPhone}` : undefined,
      addressLine1: validData.addressLine1,
      addressLine2: validData.addressLine2 || null,
      city: validData.city,
      state: validData.state,
      pinCode: validData.pinCode,
      country: validData.country,
      shirtSize: validData.shirtSize,
    });

    await db.update(mergedContributors)
      .set({ hasClaimed: true })
      .where(eq(mergedContributors.id, contributor.id));

    try {
      await resend.emails.send({
        from: 'Open Directory <noreply@opendirectory.dev>',
        to: validData.contactEmail,
        subject: 'Merch Claim Acknowledgment - Open Directory',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Thank You for Your Contribution!</h2>
            <p>Hi ${validData.firstName},</p>
            <p>We have successfully received your merch claim. Thank you for your amazing contributions to Open Directory!</p>
            <p>In <strong>4 to 5 business days</strong>, we will send you an update and a tracking number for your t-shirt and merch.</p>
            <p>Keep building awesome things!</p>
            <br/>
            <p>Best regards,</p>
            <p><strong>The Open Directory Team</strong></p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send acknowledgment email:', emailError);
    }

    return { success: true };
  } catch (error) {
    console.error('Error submitting claim:', error);
    return { error: "Failed to submit claim. Please try again later." };
  }
}
