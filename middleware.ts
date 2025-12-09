


export { default } from "next-auth/middleware";

// Le `matcher` spécifie sur quelles routes ce middleware doit s'appliquer.
// Ici, il protège toutes les routes qui commencent par /admin.
export const config = {
  matcher: ["/admin/:path*"],
};