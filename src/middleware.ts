// On exporte le middleware par défaut de NextAuth.
// Il vérifie automatiquement si un token de session est présent.
export { default } from "next-auth/middleware";

// Configuration du middleware
export const config = {
  // Le matcher définit sur quelles routes le middleware doit s'activer.
  // Ici, toutes les routes qui commencent par "/admin" seront protégées.
  matcher: ["/admin/:path*"],
};
