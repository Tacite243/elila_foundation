import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { createProjectSchema } from '@/schemas/project.schema';
import { ZodError } from 'zod';


// --- LIST ALL PROJECTS (GET) - Public Route ---
export async function GET(req: NextRequest) {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { createdAt: 'desc' },
            include: { images: true }, // Include associated images
        });
        return NextResponse.json(projects, { status: 200 });
    } catch (error) {
        console.error("API /projects GET Error:", error);
        return NextResponse.json({ message: "Server error." }, { status: 500 });
    }
}

// --- CREATE A PROJECT (POST) - Protected Route ---
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Unauthorized access." }, { status: 401 });
    }

    try {
        const body = await req.json();
        const data = createProjectSchema.parse(body);

        // "Nested write": creates the project AND its images in a single transactional operation
        const newProject = await prisma.project.create({
            data: {
                title: data.title,
                slug: data.slug,
                description: data.description,
                status: data.status,
                startDate: data.startDate ? new Date(data.startDate) : null,
                endDate: data.endDate ? new Date(data.endDate) : null,
                images: {
                    create: data.images.map(image => ({
                        url: image.url,
                        altText: image.altText,
                    })),
                },
            },
            include: { images: true },
        });

        return NextResponse.json(newProject, { status: 201 });

    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({ errors: error.flatten() }, { status: 400 });
        }
        console.error("API /projects POST Error:", error);
        return NextResponse.json({ message: "Error creating the project." }, { status: 500 });
    }
}