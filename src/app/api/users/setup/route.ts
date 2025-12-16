import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hash } from 'bcrypt';



export async function POST(req: Request) {
    try {
        // 1. Sécurité : Vérifier s'il existe déjà un utilisateur.
        const userCount = await prisma.user.count();
        if (userCount > 0) {
            return NextResponse.json(
                { message: "Le setup a déjà été effectué. Un utilisateur existe déjà." },
                { status: 409 } // 409 Conflict : la ressource existe déjà
            );
        }

        // 2. Récupérer les données du premier admin depuis les variables d'environnement.
        const adminEmail = process.env.SUPER_ADMIN_EMAIL;
        const adminPassword = process.env.SUPER_ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
            console.error("Variables d'environnement pour le super admin manquantes.");
            return NextResponse.json(
                { message: "Configuration du serveur incomplète." },
                { status: 500 }
            );
        }

        // 3. Hacher le mot de passe.
        const hashedPassword = await hash(adminPassword, 12);

        // 4. Créer l'utilisateur.
        const newUser = await prisma.user.create({
            data: {
                email: adminEmail,
                password: hashedPassword,
                name: 'Super Admin',
            },
        });

        // 5. Renvoyer une réponse de succès (sans le mot de passe, même haché).
        const { password, ...userWithoutPassword } = newUser;

        return NextResponse.json(userWithoutPassword, { status: 201 }); // 201 Created

    } catch (error) {
        console.error("Erreur lors du setup de l'utilisateur :", error);
        return NextResponse.json(
            { message: "Erreur interne du serveur." },
            { status: 500 }
        );
    }
}