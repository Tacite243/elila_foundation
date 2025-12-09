import { z } from 'zod';
import { EventType } from '@prisma/client';

export const eventSchema = z.object({
    title: z.string().min(3, "Le titre est requis."),
    location: z.string().min(3, "Le lieu est requis."),
    type: z.nativeEnum(EventType),
    // MODIFIER: Rendre la date optionnelle dans la validation
    date: z.string().datetime("Format de date invalide.").optional().or(z.literal('')),
});