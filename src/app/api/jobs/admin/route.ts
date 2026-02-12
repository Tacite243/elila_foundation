import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { createJobOfferSchema } from '@/schemas/jobOffert.schema';
import { ZodError } from 'zod';



// --- LISTER TOUTES LES OFFRES (ADMIN) ---
export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Accès non autorisé." }, { status: 401 });

    try {
        const jobOffers = await prisma.jobOffer.findMany({
            orderBy: { createdAt: 'desc' },
            include: { _count: { select: { applications: true } } }, // Compter les candidatures
        });
        return NextResponse.json(jobOffers, { status: 200 });
    } catch (error) {
        console.error("API /admin/jobs GET Error:", error);
        return NextResponse.json({ message: "Erreur serveur." }, { status: 500 });
    }
}

// --- CRÉER UNE OFFRE (ADMIN) ---
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Accès non autorisé." }, { status: 401 });

    try {
        const body = await req.json();
        const data = createJobOfferSchema.parse(body);
        const newJobOffer = await prisma.jobOffer.create({
            data: {
                ...data,
                ...(data.closingDate && { closingDate: new Date(data.closingDate) }),
            }
        });
        return NextResponse.json(newJobOffer, { status: 201 });
    } catch (error) {
        if (error instanceof ZodError) return NextResponse.json({ errors: error.flatten() }, { status: 400 });
        console.error("API /admin/jobs POST Error:", error);
        return NextResponse.json({ message: "Erreur lors de la création de l'offre." }, { status: 500 });
    }
}