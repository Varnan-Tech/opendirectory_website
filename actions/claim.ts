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
      return { error: parsedData.error.issues?.[0]?.message || "Invalid form data provided." };
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
        subject: 'Merch Claim Acknowledgment - Open Directory 🎉',
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
            <img src="https://www.opendirectory.dev/opendirectory_banner.webp" alt="Open Directory Banner" style="width: 100%; height: auto; display: block; border-bottom: 1px solid #e5e7eb;" />
            <div style="padding: 32px;">
              <h2 style="color: #111827; margin-top: 0; font-size: 24px;">Merch Claim Confirmed! 🎉</h2>
              <p style="color: #374151; font-size: 16px; line-height: 1.6;">Hi <strong>${validData.firstName}</strong>,</p>
              <p style="color: #374151; font-size: 16px; line-height: 1.6;">Thank you for your amazing contributions to Open Directory. We have successfully received your shipping details for your well-deserved merch.</p>
              
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 28px 0; border: 1px solid #e5e7eb;">
                <h3 style="margin-top: 0; margin-bottom: 12px; color: #111827; font-size: 16px;">Order Summary</h3>
                <p style="margin: 0; color: #4b5563; font-size: 15px; line-height: 1.5;"><strong>Shipping to:</strong><br/>
                ${validData.firstName} ${validData.lastName}<br/>
                ${validData.city}, ${validData.state}, ${validData.country}<br/>
                ${validData.pinCode}</p>
                <p style="margin: 16px 0 0 0; color: #4b5563; font-size: 15px;"><strong>Shirt Size:</strong> ${validData.shirtSize}</p>
              </div>

              <p style="color: #374151; font-size: 16px; line-height: 1.6;">In <strong>4 to 5 business days</strong>, we will send you an update and a tracking number for your t-shirt and merch package.</p>
              <p style="color: #374151; font-size: 16px; line-height: 1.6;">Keep building awesome things!</p>
              
              <br/>
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 4px;">Best regards,</p>
              <p style="color: #111827; font-size: 16px; font-weight: bold; margin-top: 0;">The Open Directory Team</p>
            </div>
            <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 13px; margin: 0;">© 2026 Open Directory. All rights reserved.<br/>
              <a href="https://www.opendirectory.dev" style="color: #2563eb; text-decoration: none;">www.opendirectory.dev</a></p>
            </div>
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
