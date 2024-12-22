import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

type PasswordResetRequestBody = {
  email: string;
  otp: string;
  newPassword: string;
};

export async function POST(request: Request) {
  try {
    const body: PasswordResetRequestBody = await request.json();
    const { email, otp, newPassword } = body;

    const user = await prisma.user.findFirst({
      where: { email, otp },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or OTP' },
        { status: 400 }
      );
    }

    const currentDate = new Date();
    if (user.otpExpiry && user.otpExpiry < currentDate) {
      return NextResponse.json(
        { success: false, message: 'OTP has expired' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        otp: null,
        otpExpiry: null,
      },
    });

    return NextResponse.json(
      { success: true, message: 'Password reset successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error resetting password:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}