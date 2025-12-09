'use client';

import ImpactStatForm from '@/components/ImpactStatForm';

export default function NewImpactStatPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Ajouter une nouvelle statistique</h1>
            <ImpactStatForm isEditing={false} />
        </div>
    );
}