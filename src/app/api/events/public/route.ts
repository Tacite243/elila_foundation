import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';



export async function GET() {
    try {
        const events = await prisma.upcomingEvent.findMany({
            where: {
                // On ne récupère que les événements dont la date n'est pas passée
                date: {
                    gte: new Date(),
                },
            },
            orderBy: { date: 'asc' },
        });
        return NextResponse.json(events);
    } catch (error) {
        return NextResponse.json({ message: `Erreur serveur ${error}` }, { status: 500 });
    }
}