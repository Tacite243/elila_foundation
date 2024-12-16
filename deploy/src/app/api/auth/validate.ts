import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export async function GET(req: Request) {
    try {
        // Accéder aux cookies à partir de la requête
        const cookieHeader = req.headers.get('cookie');
        if (!cookieHeader) throw new Error('No cookies found');

        const cookies = Object.fromEntries(
            cookieHeader
                .split(';')
                .map(cookie => cookie.trim().split('='))
        );

        const token = cookies['token'];
        if (!token) throw new Error('No token provided');

        // Vérifier le token
        const payload = verifyToken(token);

        // Retourner la réponse si authentifié
        return NextResponse.json({ authenticated: true, user: payload });
    } catch (error) {
        const errorMessage =
            error instanceof Error
                ? error.message
                : 'Une erreur inconnue s’est produite';
        return NextResponse.json({ authenticated: false, error: errorMessage }, { status: 401 });
    }

}
