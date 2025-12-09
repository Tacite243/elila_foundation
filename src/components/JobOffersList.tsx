import prisma from "@/lib/prisma";
import JobOfferManager from "./JobOfferManager";

export default async function JobOffersList() {
    const jobOffers = await prisma.jobOffer.findMany({
        orderBy: { createdAt: 'desc' },
        include: { applications: true },
    });
    return <JobOfferManager initialJobOffers={jobOffers} />;
}