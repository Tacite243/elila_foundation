import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { ZodError } from 'zod';
import { createArticleSchema } from '@/schemas/article.schemas';

// --- RÉCUPÉRER TOUS LES ARTICLES (GET) - Protégé ---
export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Accès non autorisé" }, { status: 401 });
    }

    try {
        const articles = await prisma.article.findMany({
            include: {
                category: true,
                author: { select: { name: true, id: true } },
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        // La sérialisation des dates n'est plus nécessaire avec l'App Router.
        return NextResponse.json(articles, { status: 200 });
    } catch (error) {
        console.error("API /articles GET Error:", error);
        return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
    }
}

// --- CRÉER UN NOUVEL ARTICLE (POST) - Protégé ---
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
        return NextResponse.json({ message: "Accès non autorisé. Vous devez être connecté." }, { status: 401 });
    }

    try {
        const body = await req.json();
        const data = createArticleSchema.parse(body);

        const newArticle = await prisma.article.create({
            data: {
                ...data,
                authorId: session.user.id, // Lier l'article à l'utilisateur de la session
            },
            include: {
                category: true,
                author: { select: { name: true, id: true } },
            }
        });

        return NextResponse.json(newArticle, { status: 201 });
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({ errors: error.flatten() }, { status: 400 });
        }
        console.error("API /articles POST Error:", error);
        return NextResponse.json({ message: "Erreur lors de la création de l'article." }, { status: 500 });
    }
}