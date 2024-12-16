import { NextResponse } from 'next/server';
import { authenticateUser } from '@/lib/auth';
import { signToken } from '@/lib/jwt';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        // Authentification de l'utilisateur
        const user = await authenticateUser(email, password);

        // Génération du token
        const token = signToken({ id: user.id, email: user.email });

        // Création de la réponse
        const response = NextResponse.json({ success: true });
        response.cookies.set('token', token, { httpOnly: true });

        return response;
    } catch (error) {
        // Gestion spécifique des erreurs
        const errorMessage =
            error instanceof Error
                ? error.message
                : 'Une erreur inconnue s’est produite';

        return NextResponse.json(
            { error: errorMessage },
            { status: 401 }
        );
    }
}
