import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type VendorProfileRequestBody = {
  profileDetails: string;
};

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = parseInt(params.userId, 10);
    if (isNaN(userId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid user ID' },
        { status: 400 }
      );
    }

    const body: VendorProfileRequestBody = await request.json();
    const { profileDetails } = body;

    if (!profileDetails) {
      return NextResponse.json(
        { success: false, message: 'Profile details are required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user || user.role !== 'vendor') {
      return NextResponse.json(
        { success: false, message: 'User not found or not a vendor' },
        { status: 404 }
      );
    }

    await prisma.vendorProfile.update({
      where: { userId: userId },
      data: {
        profileDetails,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Vendor profile updated successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating vendor profile:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}