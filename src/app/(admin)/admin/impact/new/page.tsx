import ImpactStatForm from '@/components/ImpactStatForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewImpactStatPage() {
    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/impact" className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Nouvelle Statistique</h1>
                        <p className="text-slate-500 text-sm">Ajouter un indicateur d&apos;impact</p>
                    </div>
                </div>
                <ImpactStatForm isEditing={false} />
            </div>
        </div>
    );
}