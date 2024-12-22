import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type ExperienceRequestBody = {
  title: string;
  description: string;
  location: string;
  price: number;
  availability: any;
  images: any;
};

export async function PUT(
  request: Request,
  { params }: { params: { userId: string; experienceId: string } }
) {
  try {
    const userId = parseInt(params.userId, 10);
    const experienceId = parseInt(params.experienceId, 10);

    if (isNaN(userId) || isNaN(experienceId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid user ID or experience ID' },
        { status: 400 }
      );
    }

    const body: ExperienceRequestBody = await request.json();
    const { title, description, location, price, availability, images } = body;

    if (!title || !description || !location || !price || !availability || !images) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const vendorProfile = await prisma.vendorProfile.findUnique({
      where: { userId },
    });

    if (!vendorProfile) {
      return NextResponse.json(
        { success: false, message: 'Vendor profile not found' },
        { status: 404 }
      );
    }

    const updatedExperience = await prisma.experience.update({
      where: { id: experienceId, vendorProfileId: vendorProfile.id },
      data: {
        title,
        description,
        location,
        price,
        availability,
        images,
      },
    });

    if (!updatedExperience) {
      return NextResponse.json(
        { success: false, message: 'Experience not found or not updated' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Experience updated successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating experience:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}