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

export async function POST(
  request: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const userId = parseInt(params.userId, 10);
    if (isNaN(userId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid user ID' },
        { status: 400 },
      );
    }

    const body: ExperienceRequestBody = await request.json();
    const { title, description, location, price, availability, images } = body;

    if (!title || !description || !location || !price || !availability || !images) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 },
      );
    }

    const vendorProfile = await prisma.vendorProfile.findUnique({
      where: { userId },
    });

    if (!vendorProfile) {
      return NextResponse.json(
        { success: false, message: 'Vendor profile not found' },
        { status: 404 },
      );
    }

    const experience = await prisma.experience.create({
      data: {
        title,
        description,
        location,
        price,
        availability,
        images,
        vendorProfileId: vendorProfile.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Experience added successfully',
        data: {
          id: experience.id,
          title: experience.title,
          description: experience.description,
          location: experience.location,
          price: experience.price,
          availability: experience.availability,
          images: experience.images,
        },
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error('Error adding experience:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  }
}