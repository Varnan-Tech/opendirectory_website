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
  githubEmail: z.string().optional(),
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
    if (!session || !session.user || !(session.user as any).login) {
      return { error: "Unauthorized. Please sign in with GitHub." };
    }

    const parsedData = claimSchema.safeParse(data);
    if (!parsedData.success) {
      return { error: parsedData.error.issues?.[0]?.message || "Invalid form data provided." };
    }
    const validData = parsedData.data;

    const githubUsername = (session.user as any).login;

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
      githubEmail: validData.githubEmail ?? "",
      contactEmail: validData.contactEmail,
      phone: `+91${validData.phone}`,
      altPhone: validData.altPhone ? `+91${validData.altPhone}` : "",
      addressLine1: validData.addressLine1,
      addressLine2: validData.addressLine2 ?? "",
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
        from: 'Paras from OpenDirectory <merch@opendirectory.dev>',
        replyTo: 'paras@varnan.tech',
        to: validData.contactEmail,
        subject: 'Your Open Directory Merch is on the way! 🚀',
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 40px auto; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);">
            <img src="https://www.opendirectory.dev/opendirectory_banner.webp" alt="Open Directory Banner" style="width: 100%; height: auto; display: block;" />
            <div style="padding: 40px 32px;">
              <h2 style="color: #111827; margin-top: 0; font-size: 22px; font-weight: 600; letter-spacing: -0.5px;">You're getting merch! 🎉</h2>
              <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">Hi ${validData.firstName},</p>
              <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin-bottom: 32px;">Thanks for your amazing contribution! As a token of appreciation from our side, we are thrilled to send you some exclusive Open Directory merch.</p>
              
              <div style="border-top: 1px solid #eaeaea; border-bottom: 1px solid #eaeaea; padding: 24px 0; margin-bottom: 32px;">
                <h3 style="margin-top: 0; margin-bottom: 16px; color: #111827; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Delivery Details</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 4px 0; color: #6b7280; font-size: 14px; width: 100px;">Name</td>
                    <td style="padding: 4px 0; color: #111827; font-size: 14px; font-weight: 500;">${validData.firstName} ${validData.lastName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #6b7280; font-size: 14px; align-items: top;">Address</td>
                    <td style="padding: 4px 0; color: #111827; font-size: 14px; font-weight: 500;">
                      ${validData.addressLine1}<br/>
                      ${validData.addressLine2 ? validData.addressLine2 + '<br/>' : ''}
                      ${validData.city}, ${validData.state}<br/>
                      ${validData.country} - ${validData.pinCode}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #6b7280; font-size: 14px;">Shirt Size</td>
                    <td style="padding: 4px 0; color: #111827; font-size: 14px; font-weight: 500;">${validData.shirtSize}</td>
                  </tr>
                </table>
              </div>

              <p style="color: #4b5563; font-size: 15px; line-height: 1.6;">We'll process your shipment shortly. Expect a tracking update in your inbox within <strong>4 to 5 business days</strong>.</p>
              <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin-bottom: 32px;">Keep building awesome things!</p>
              
              <p style="color: #111827; font-size: 15px; font-weight: 600; margin: 0;">Paras</p>
              <p style="color: #6b7280; font-size: 14px; margin-top: 4px;">Open Directory Team</p>
            </div>
            <div style="background-color: #fafafa; padding: 24px 32px; border-top: 1px solid #eaeaea; text-align: center;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">© 2026 Open Directory. All rights reserved.<br/>
              <a href="https://www.opendirectory.dev" style="color: #6b7280; text-decoration: underline;">opendirectory.dev</a></p>
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
