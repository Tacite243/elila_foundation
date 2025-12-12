import React, { Suspense } from 'react';
import JobOffersList from '@/components/JobOffersList';
import JobOffersTableSkeleton from '@/components/JobOffersTableSkeleton';
export const dynamic = "force-dynamic";



export default function AdminJobOffersPage() {
    return (
        <div>
            <Suspense fallback={<JobOffersTableSkeleton />}>
                <JobOffersList />
            </Suspense>
        </div>
    );
}