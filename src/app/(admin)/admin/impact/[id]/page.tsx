'use client';

import { useParams } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import ImpactStatForm from '@/components/ImpactStatForm';
import ImpactStatFormSkeleton from '@/components/ImpactStatFormSkeleton';

export default function EditImpactStatPage() {
    const params = useParams();
    const id = params?.id as string;
    const stat = useAppSelector((state: RootState) =>
        state.impactStats.stats.find(s => s.id === id)
    );

    // Cette condition vérifie à la fois si l'ID est disponible ET si la stat a été trouvée.
    if (!id || !stat) {
        // Affiche le skeleton si les params ne sont pas encore chargés ou si les données Redux ne sont pas prêtes.
        return <ImpactStatFormSkeleton />;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Modifier la statistique</h1>
            <ImpactStatForm isEditing={true} initialData={stat} />
        </div>
    );
}