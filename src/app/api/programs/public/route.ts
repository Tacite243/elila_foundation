import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';



export async function GET() {
    try {
        const programs = await prisma.program.findMany({
            where: { isPublished: true },
            orderBy: { order: 'asc' },
        });
        return NextResponse.json(programs);
    } catch (error) {
        return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
    }
}