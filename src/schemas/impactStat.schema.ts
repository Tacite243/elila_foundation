import { z } from 'zod';


// Schéma pour la création
export const createImpactStatSchema = z.object({
    icon: z.string().min(1, "L'icône est requise."),
    number: z.string().min(1, "Le chiffre est requis."),
    label: z.string().min(3, "Le label est requis."),
    order: z.number().optional().default(0),
});

// Schéma pour la mise à jour (tous les champs sont optionnels)
export const updateImpactStatSchema = createImpactStatSchema.partial();