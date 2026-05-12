import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { createProjectSchema } from '@/schemas/project.schema';
import { ZodError } from 'zod';

// --- UPDATE A PROJECT (PUT) - Protected Route ---
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> } // Next 15: params est une Promise
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Unauthorized access." }, { status: 401 });
    }

    try {
        const { id } = await params;
        const body = await req.json();
        const data = createProjectSchema.parse(body);

        // Mise à jour du projet et de ses images
        const updatedProject = await prisma.project.update({
            where: { id: id },
            data: {
                title: data.title,
                slug: data.slug,
                description: data.description,
                status: data.status,
                startDate: data.startDate ? new Date(data.startDate) : null,
                endDate: data.endDate ? new Date(data.endDate) : null,
                // Gestion des images : on supprime les anciennes et on recrée les nouvelles
                images: {
                    deleteMany: {}, // Vide l'ancienne galerie pour ce projet
                    create: data.images.map(image => ({
                        url: image.url,
                        altText: image.altText,
                    })),
                },
            },
            include: { images: true },
        });

        return NextResponse.json(updatedProject, { status: 200 });

    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({ errors: error.flatten() }, { status: 400 });
        }
        console.error("API /projects/[id] PUT Error:", error);
        return NextResponse.json({ message: "Error updating the project." }, { status: 500 });
    }
}

// --- DELETE A PROJECT (DELETE) - Protected Route ---
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Unauthorized access." }, { status: 401 });
    }

    try {
        const { id } = await params;

        // Prisma supprimera automatiquement les images associées si onDelete: Cascade 
        // est configuré dans schema.prisma. 
        // Si ce n'est pas le cas, on supprime manuellement les images d'abord :
        await prisma.projectImage.deleteMany({
            where: { projectId: id }
        });

        await prisma.project.delete({
            where: { id: id }
        });

        return NextResponse.json({ message: "Project deleted successfully." }, { status: 200 });

    } catch (error) {
        console.error("API /projects/[id] DELETE Error:", error);
        return NextResponse.json({ message: "Error deleting the project." }, { status: 500 });
    }
}
