import React, { Suspense } from 'react';
import JobOffersList from '@/components/JobOffersList';
import JobOffersTableSkeleton from '@/components/JobOffersTableSkeleton';



export default function AdminJobOffersPage() {
    return (
        <div>
            <Suspense fallback={<JobOffersTableSkeleton />}>
                <JobOffersList />
            </Suspense>
        </div>
    );
}