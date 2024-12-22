import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendEmail } from '@/lib/email-service';

type PasswordResetRequestBody = {
  email: string;
};

function generateRandomOTP(length: number): string {
  const characters = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return otp;
}

export async function POST(request: Request) {
  try {
    const body: PasswordResetRequestBody = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    const otp = generateRandomOTP(6);
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.user.update({
      where: { email },
      data: {
        otp,
        otpExpiry,
      },
    });

    await sendEmail({
      to: email,
      template: {
        subject: 'Password Reset OTP',
        html: `<p>Your OTP for password reset is: <strong>${otp}</strong></p>`,
        text: `Your OTP for password reset is: ${otp}`,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Password reset OTP sent to email',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error processing password reset request:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', data: error },
      { status: 500 }
    );
  }
}