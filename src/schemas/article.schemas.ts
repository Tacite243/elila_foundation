import { z } from 'zod';

// Ce schéma est utilisé pour la CRÉATION. Tous les champs du formulaire sont requis.
export const createArticleSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères."),
  slug: z.string()
    .min(3, "Le slug est requis.")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Le slug ne peut contenir que des lettres minuscules, des chiffres et des tirets."),
  excerpt: z.string().min(10, "L'extrait est requis et doit être informatif."),
  content: z.string().min(20, "Le contenu de l'article est requis."),
  image: z.string().url("Vous devez fournir une URL d'image valide."),
  readTime: z.string().min(1, "Le temps de lecture est requis (ex: '5 min')."),
  published: z.boolean().default(false),
  categoryId: z.string().cuid("Vous devez sélectionner une catégorie valide."),
});

export type createArticleSchema = z.infer<typeof createArticleSchema>;

export const updateArticleSchema = createArticleSchema.partial(); // Tous les champs sont optionnels pour la mise à jour

export const updateUserSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères.").optional(),
  email: z.string().email("L'email n'est pas valide.").optional(),
  // Le mot de passe est optionnel, mais s'il est fourni, il doit être valide.
  password: z.string().min(8, "Le mot de passe doit faire au moins 8 caractères.").optional(),
}).strip(); // .strip() supprime les champs non définis dans le schéma