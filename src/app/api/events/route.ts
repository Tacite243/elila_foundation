import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { ZodError } from 'zod';
import { eventSchema } from '@/schemas/event.schema';
import { authOptions } from '@/lib/auth';

// --- LISTER TOUS LES ÉVÉNEMENTS (GET) - Protégé ---
export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Accès non autorisé." }, { status: 401 });
    }

    try {
        const events = await prisma.upcomingEvent.findMany({
            orderBy: { date: 'asc' }
        });
        return NextResponse.json(events, { status: 200 });
    } catch (error) {
        console.error("API /events GET Error:", error);
        return NextResponse.json({ message: "Erreur serveur." }, { status: 500 });
    }
}

// --- CRÉER UN NOUVEL ÉVÉNEMENT (POST) - Protégé ---
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Accès non autorisé." }, { status: 401 });
    }

    try {
        const body = await req.json();
        const data = eventSchema.parse(body);

        const newEvent = await prisma.upcomingEvent.create({
            data: {
                ...data,
                // On ne met le champ 'date' que si data.date existe.
                // S'il n'existe pas, on le met à undefined pour que Prisma l'ignore.
                date: data.date ? new Date(data.date) : undefined,
            }
        });
        return NextResponse.json(newEvent, { status: 201 });
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({ errors: error.flatten() }, { status: 400 });
        }
        console.error("API /events POST Error:", error);
        return NextResponse.json({ message: "Erreur lors de la création de l'événement." }, { status: 500 });
    }
}