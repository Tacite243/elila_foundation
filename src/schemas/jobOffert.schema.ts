import { z } from 'zod';
import { JobType, WorkArrangement, ExperienceLevel } from '@prisma/client';

export const createJobOfferSchema = z.object({
    title: z.string().min(3, "Le titre est requis."),
    slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "Le slug est invalide."),
    organization: z.string().optional(),
    location: z.string().min(2, "Le lieu est requis."),
    employmentType: z.nativeEnum(JobType),
    workArrangement: z.nativeEnum(WorkArrangement),
    experienceLevel: z.nativeEnum(ExperienceLevel),
    description: z.string().min(20, "La description est trop courte."),
    // Validation pour les tableaux de chaînes
    responsibilities: z.array(z.string()).min(1, "Au moins une responsabilité est requise."),
    qualifications: z.array(z.string()).min(1, "Au moins une qualification est requise."),
    benefits: z.array(z.string()).optional(),
    salary: z.string().optional(),
    howToApply: z.string().min(10, "Les instructions pour postuler sont requises."),
    closingDate: z.string().datetime().optional().nullable(),
    isPublished: z.boolean().optional(),
});

export const updateJobOfferSchema = createJobOfferSchema.partial();