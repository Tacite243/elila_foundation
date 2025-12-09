import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';


// --- LISTER LES OFFRES PUBLIÉES (GET) - Public ---
export async function GET(req: NextRequest) {
    try {
        const jobOffers = await prisma.jobOffer.findMany({
            where: { isPublished: true },
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(jobOffers, { status: 200 });
    } catch (error) {
        console.error("API /jobs GET Error:", error);
        return NextResponse.json({ message: "Erreur serveur." }, { status: 500 });
    }
}