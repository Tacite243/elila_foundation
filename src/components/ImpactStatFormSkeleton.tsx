import React from 'react';

// Un sous-composant pour éviter la répétition
const FormFieldSkeleton = () => (
    <div className="space-y-2">
        <div className="h-4 w-1/4 bg-gray-200 rounded-md"></div> {/* Skeleton du label */}
        <div className="h-10 w-full bg-gray-200 rounded-md"></div> {/* Skeleton de l'input */}
    </div>
);

export default function ImpactStatFormSkeleton() {
    return (
        // L'animation pulse est appliquée sur le conteneur principal
        <div className="animate-pulse">
            {/* Skeleton du titre H1 */}
            <div className="h-8 w-3/4 bg-gray-200 rounded-md mb-6"></div>

            <div className="space-y-6 bg-white p-8 rounded-lg shadow-md">
                <FormFieldSkeleton />
                <FormFieldSkeleton />
                <FormFieldSkeleton />
                <FormFieldSkeleton />

                {/* Skeleton des boutons */}
                <div className="flex justify-end space-x-3 pt-4">
                    <div className="h-10 w-24 bg-gray-200 rounded-md"></div>
                    <div className="h-10 w-24 bg-gray-200 rounded-md"></div>
                </div>
            </div>
        </div>
    );
}