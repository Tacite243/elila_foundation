import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { ZodError } from 'zod';
import { createArticleSchema } from '@/schemas/article.schemas';

// --- METTRE À JOUR UN ARTICLE (PUT) ---
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> } // Next 15 : params est une Promise
) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
        return NextResponse.json({ message: "Accès non autorisé" }, { status: 401 });
    }

    try {
        // Dans Next.js 15, on doit faire un await sur params
        const { id } = await params;

        const body = await req.json();

        // On réutilise le même schéma Zod pour vérifier les données
        const data = createArticleSchema.parse(body);

        const updatedArticle = await prisma.article.update({
            where: { id: id },
            data: {
                title: data.title,
                slug: data.slug,
                excerpt: data.excerpt,
                content: data.content,
                image: data.image,
                readTime: data.readTime,
                published: data.published,
                categoryId: data.categoryId,
            },
            include: {
                category: true,
                author: { select: { name: true, id: true } },
            }
        });

        return NextResponse.json(updatedArticle, { status: 200 });

    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({ errors: error.flatten() }, { status: 400 });
        }
        console.error("API /articles/[id] PUT Error:", error);
        return NextResponse.json({ message: "Erreur lors de la mise à jour de l'article." }, { status: 500 });
    }
}

// --- SUPPRIMER UN ARTICLE (DELETE) ---
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Accès non autorisé" }, { status: 401 });
    }

    try {
        const { id } = await params;

        await prisma.article.delete({
            where: { id: id }
        });

        return NextResponse.json({ message: "Article supprimé avec succès." }, { status: 200 });

    } catch (error) {
        console.error("API /articles/[id] DELETE Error:", error);
        return NextResponse.json({ message: "Erreur lors de la suppression de l'article." }, { status: 500 });
    }
}