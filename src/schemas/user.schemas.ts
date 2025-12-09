import z from "zod";

// Schéma de validation pour la création d'un utilisateur
export const createUserSchema = z.object({
    name: z.string().min(2, "Le nom est requis."),
    email: z.string().email("L'adresse email est invalide."),
    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères."),
});