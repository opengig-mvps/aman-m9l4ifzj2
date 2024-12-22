import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type PropertyRequestBody = {
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

    const body: PropertyRequestBody = await request.json();

    const { title, description, location, price, availability, images } = body;
    if (!title || !location || !price || !availability || !images) {
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

    const property = await prisma.property.create({
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
        message: 'Property added successfully',
        data: {
          id: property.id,
          title: property.title,
          description: property.description,
          location: property.location,
          price: property.price,
          availability: property.availability,
          images: property.images,
        },
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error('Error adding property:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  }
}