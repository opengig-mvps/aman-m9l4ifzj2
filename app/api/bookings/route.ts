import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendEmail } from '@/lib/email-service';

type BookingRequestBody = {
  userId: number;
  propertyId?: number;
  experienceId?: number;
  bookingDate: string;
};

export async function POST(request: Request) {
  try {
    const body: BookingRequestBody = await request.json();
    const { userId, propertyId, experienceId, bookingDate } = body;

    if (!userId || (!propertyId && !experienceId) || !bookingDate) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    let availabilityCheck = false;
    if (propertyId) {
      const property = await prisma.property.findUnique({
        where: { id: propertyId },
      });
      if (Array.isArray(property?.availability) && property?.availability.includes(bookingDate)) {
        availabilityCheck = true;
      }
    } else if (experienceId) {
      const experience = await prisma.experience.findUnique({
        where: { id: experienceId },
      });
      if (Array.isArray(experience?.availability) && experience?.availability.includes(bookingDate)) {
        availabilityCheck = true;
      }
    }

    if (!availabilityCheck) {
      return NextResponse.json(
        { success: false, message: 'Selected date is not available' },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        userId,
        propertyId,
        experienceId,
        bookingDate: new Date(bookingDate),
        status: 'confirmed',
      },
    });

    await sendEmail({
      to: user?.email,
      template: {
        subject: 'Booking Confirmation',
        html: '<h1>Your booking is confirmed</h1>',
        text: 'Your booking is confirmed',
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Booking confirmed successfully',
        data: { bookingId: booking?.id, status: booking?.status },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Internal server error', data: error },
      { status: 500 }
    );
  }
}