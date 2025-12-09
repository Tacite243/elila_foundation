import { z } from 'zod';
import { ProjectStatus } from '@prisma/client';


// Schéma pour valider les données d'une image lors de la création d'un projet
const projectImageSchema = z.object({
    url: z.string().url("L'URL de l'image est invalide."),
    altText: z.string().optional(),
});

// Schéma pour la création d'un projet
export const createProjectSchema = z.object({
    title: z.string().min(3, "Le titre est requis."),
    slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "Le slug ne peut contenir que des minuscules, chiffres et tirets."),
    description: z.string().min(10, "La description est trop courte."),
    startDate: z.string().datetime().optional().nullable(),
    endDate: z.string().datetime().optional().nullable(),
    status: z.nativeEnum(ProjectStatus),
    // On attend un tableau d'images
    images: z.array(projectImageSchema).min(1, "Au moins une image est requise."),
});

// Schéma pour la mise à jour (tous les champs optionnels)
// Note: la mise à jour des images est un cas plus complexe (ajout/suppression),
// nous ne la gérons pas dans ce schéma simple pour l'instant.
export const updateProjectSchema = createProjectSchema.omit({ images: true }).partial();