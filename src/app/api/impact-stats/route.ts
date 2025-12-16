import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { createImpactStatSchema } from '@/schemas/impactStat.schema';
import { ZodError } from 'zod';

// GET : Récupérer TOUTES les statistiques (Public)
export async function GET(req: NextRequest) { // <-- Pas de `context` ici !
    try {
        const stats = await prisma.impactStat.findMany({
            orderBy: { order: 'asc' },
        });
        return NextResponse.json(stats);
    } catch (error) {
        console.error("Erreur GET /api/impact-stats:", error);
        return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 });
    }
}

// POST : Créer une statistique (Protégé)
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: 'Non autorisé' }, { status: 401 });
    }
    try {
        const body = await req.json();
        const data = createImpactStatSchema.parse(body);
        const newStat = await prisma.impactStat.create({ data });
        return NextResponse.json(newStat, { status: 201 });
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({ errors: error.flatten() }, { status: 400 });
        }
        console.error("Erreur POST /api/impact-stats:", error);
        return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 });
    }
}