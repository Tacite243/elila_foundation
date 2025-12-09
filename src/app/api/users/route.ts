import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { hash } from 'bcrypt';
import { ZodError } from 'zod';
import { createUserSchema } from '@/schemas/user.schemas';



// --- GESTION DES REQUÊTES GET ---
export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Accès non autorisé" }, { status: 401 });
    }

    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            }
        });
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error("API /users GET Error:", error);
        return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
    }
}



// --- GESTION DES REQUÊTES POST ---
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Accès non autorisé" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const data = createUserSchema.parse(body);

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
        if (existingUser) {
            return NextResponse.json({ message: "Un utilisateur avec cet email existe déjà." }, { status: 409 });
        }

        const hashedPassword = await hash(data.password, 12);

        const newUser = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword
            },
            // Renvoyer l'utilisateur créé, sans le mot de passe
            select: { id: true, name: true, email: true, createdAt: true }
        });

        return NextResponse.json(newUser, { status: 201 });

    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({ errors: error.flatten() }, { status: 400 });
        }
        console.error("API /users POST Error:", error);
        return NextResponse.json({ message: "Erreur lors de la création de l'utilisateur." }, { status: 500 });
    }
}