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

export async function PUT(
  request: Request,
  { params }: { params: { userId: string; propertyId: string } },
) {
  try {
    const userId = Number(params?.userId);
    const propertyId = Number(params?.propertyId);

    if (isNaN(userId) || isNaN(propertyId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid user ID or property ID' },
        { status: 400 },
      );
    }

    const body: PropertyRequestBody = await request.json();
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
        { success: false, message: 'Vendor not found' },
        { status: 404 },
      );
    }

    const updatedProperty = await prisma.property.update({
      where: {
        id: propertyId,
        vendorProfileId: vendorProfile?.id,
      },
      data: {
        title,
        description,
        location,
        price,
        availability,
        images,
      },
    });

    return NextResponse.json(
      { success: true, message: 'Property updated successfully', property: updatedProperty },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Error updating property:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  }
}