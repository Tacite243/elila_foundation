import { z } from 'zod';

export const createJobApplicationSchema = z.object({
    applicantName: z.string().min(2, "Le nom est requis."),
    applicantEmail: z.string().email("L'adresse email est invalide."),
    applicantPhone: z.string().optional(),
    cvUrl: z.string().url("L'URL du CV est invalide."),
    coverLetter: z.string().optional(),
});