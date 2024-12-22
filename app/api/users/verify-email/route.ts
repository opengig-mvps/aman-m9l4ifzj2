import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type VerifyEmailRequestBody = {
  verificationToken: string;
};

export async function POST(request: Request) {
  try {
    const body: VerifyEmailRequestBody = await request.json();
    const { verificationToken } = body;

    if (!verificationToken) {
      return NextResponse.json(
        { success: false, message: 'Verification token is required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { verificationToken: verificationToken },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid verification token' },
        { status: 404 }
      );
    }

    await prisma.user.update({
      where: { id: user?.id },
      data: {
        isVerified: true,
        verificationToken: null,
      },
    });

    return NextResponse.json(
      { success: true, message: 'Email verified successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error verifying email:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}