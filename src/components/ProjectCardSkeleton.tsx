import Skeleton from "@/components/Skeleton";

export default function ProjectCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
            <Skeleton className="w-full h-48" /> {/* Image */}
            <div className="p-6">
                <Skeleton className="h-4 w-1/3" /> {/* Date & Statut */}
                <Skeleton className="h-6 w-3/4 mt-3" /> {/* Titre */}
                <Skeleton className="h-4 w-full mt-4" /> {/* Description ligne 1 */}
                <Skeleton className="h-4 w-full mt-2" /> {/* Description ligne 2 */}
                <Skeleton className="h-4 w-5/6 mt-2" /> {/* Description ligne 3 */}
            </div>
        </div>
    );
}