'use server';

import { db } from '@/db';
import { mergedContributors, otpTokens, merchClaims } from '@/db/schema';
import { eq, and, gt } from 'drizzle-orm';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_123');

export async function requestOtp(email: string) {
  try {
    const contributor = await db.query.mergedContributors.findFirst({
      where: eq(mergedContributors.email, email),
    });

    if (!contributor) {
      return { error: "Email not authorized. Ensure your PR is merged." };
    }

    if (contributor.hasClaimed) {
      return { error: "You have already claimed your merch." };
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await db.insert(otpTokens).values({
      email,
      token: otp,
      expiresAt,
    });

    await resend.emails.send({
      from: 'merch@opendirectory.dev',
      to: email,
      subject: 'Your Open Directory Merch OTP',
      html: `<p>Code: <strong>${otp}</strong></p>`,
    });

    return { success: true };
  } catch (error) {
    console.error('Error requesting OTP:', error);
    return { error: "Failed to request OTP. Please try again later." };
  }
}

export async function verifyOtp(email: string, otp: string) {
  try {
    const now = new Date();
    
    const tokenRecord = await db.query.otpTokens.findFirst({
      where: and(
        eq(otpTokens.email, email),
        eq(otpTokens.token, otp),
        gt(otpTokens.expiresAt, now)
      ),
    });

    if (!tokenRecord) {
      return { error: "Invalid or expired OTP." };
    }

    await db.delete(otpTokens).where(eq(otpTokens.id, tokenRecord.id));

    const contributor = await db.query.mergedContributors.findFirst({
      where: eq(mergedContributors.email, email),
    });

    if (!contributor) {
      return { error: "Contributor not found." };
    }

    return { success: true, contributorId: contributor.id };
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return { error: "Failed to verify OTP. Please try again later." };
  }
}

export async function submitClaim(
  contributorId: string,
  data: {
    firstName: string;
    lastName: string;
    githubEmail: string;
    contactEmail: string;
    phone: string;
    altPhone?: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pinCode: string;
    shirtSize: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  }
) {
  try {
    await db.insert(merchClaims).values({
      contributorId,
      firstName: data.firstName,
      lastName: data.lastName,
      githubEmail: data.githubEmail,
      contactEmail: data.contactEmail,
      phone: data.phone,
      altPhone: data.altPhone,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      city: data.city,
      state: data.state,
      pinCode: data.pinCode,
      shirtSize: data.shirtSize,
    });

    await db.update(mergedContributors)
      .set({ hasClaimed: true })
      .where(eq(mergedContributors.id, contributorId));

    return { success: true };
  } catch (error) {
    console.error('Error submitting claim:', error);
    return { error: "Failed to submit claim. Please try again later." };
  }
}
