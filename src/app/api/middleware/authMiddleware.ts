import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export function middleware(req: Request) {
  // Ajout d'un type d'extension pour Request afin d'inclure 'cookies'
  interface ExtendedRequest extends Request {
    cookies: {
      get: (name: string) => { value: string } | undefined;
    };
  }

  const token = (req as ExtendedRequest).cookies.get('token')?.value;

  // Si le token n'est pas valide, redirige vers la page d'accueil
  if (!token || !verifyToken(token)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Autorise la requête si le token est valide
  return NextResponse.next();
}

// Applique le middleware uniquement pour les routes sous `/admin`
export const config = {
  matcher: '/admin/:path*',
};
