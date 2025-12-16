import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';



export async function GET() {
    try {
        const articles = await prisma.article.findMany({
            where: { published: true },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                title: true,
                slug: true,
                excerpt: true,
                image: true,
                readTime: true,
                createdAt: true,
                category: {
                    select: { name: true }
                },
                author: {
                    select: { name: true }
                }
            }
        });
        return NextResponse.json(articles, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Erreur lors de la récupération des articles." + error }, { status: 500 });
    }
}