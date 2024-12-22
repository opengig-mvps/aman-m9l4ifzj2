import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface SearchFilters {
  [key: string]: any;
}

export async function POST(request: Request) {
  try {
    const { page = 1, limit = 10, search = '', filters = {} }: { page: number; limit: number; search: string; filters: SearchFilters } = await request.json();

    const skip = (page - 1) * limit;

    const [properties, experiences] = await Promise.all([
      prisma.property.findMany({
        where: {
          title: { contains: search },
          ...filters,
        },
        skip,
        take: limit,
      }),
      prisma.experience.findMany({
        where: {
          title: { contains: search },
          ...filters,
        },
        skip,
        take: limit,
      }),
    ]);

    const combinedResults = [...properties, ...experiences];

    const totalResults = combinedResults.length;
    const totalPages = Math.ceil(totalResults / limit);

    const results = combinedResults.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      location: item.location,
      price: item.price,
      availability: item.availability,
      images: item.images,
    }));

    return NextResponse.json(
      {
        success: true,
        message: 'Search results fetched successfully',
        data: {
          results,
          pagination: {
            currentPage: page,
            totalPages,
          },
        },
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Error fetching search results:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  }
}