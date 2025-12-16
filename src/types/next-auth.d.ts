import type {
  DefaultSession,
  // User 
} from "next-auth";
// import type { JWT } from "next-auth/jwt";

// Étendre le type de l'objet User par défaut
declare module "next-auth" {
  interface User {
    id: string;
  }

  // Étendre le type de l'objet Session
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"]; // Conserve les propriétés par défaut : name, email, image
  }
}

// Étendre le type du JWT
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}