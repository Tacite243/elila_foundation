import Skeleton from "@/components/Skeleton";



export default function JobOffersTableSkeleton() {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="w-full">
                {/* En-tête du tableau */}
                <div className="flex border-b pb-2 px-2">
                    <div className="w-2/5"><Skeleton className="h-5 w-24" /></div>
                    <div className="w-1/5"><Skeleton className="h-5 w-20" /></div>
                    <div className="w-1/5"><Skeleton className="h-5 w-20" /></div>
                    <div className="w-1/5"><Skeleton className="h-5 w-24" /></div>
                    <div className="w-1/5"><Skeleton className="h-5 w-16" /></div>
                </div>

                {/* Lignes du tableau (on en affiche 5 pour simuler une liste) */}
                <div className="mt-2 space-y-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center border-b py-3 px-2">
                            <div className="w-2/5 pr-2"><Skeleton className="h-4 w-full" /></div>
                            <div className="w-1/5 pr-2"><Skeleton className="h-4 w-4/5" /></div>
                            <div className="w-1/5 pr-2"><Skeleton className="h-4 w-4/5" /></div>
                            <div className="w-1/5 pr-2"><Skeleton className="h-4 w-4/5" /></div>
                            <div className="w-1/5 flex space-x-2">
                                <Skeleton className="h-5 w-5" />
                                <Skeleton className="h-5 w-5" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}