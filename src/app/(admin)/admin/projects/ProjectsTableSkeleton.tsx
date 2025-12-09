import Skeleton from "@/components/Skeleton";



export default function ProjectsTableSkeleton() {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="w-full">
                {/* Header du tableau */}
                <div className="flex border-b pb-2">
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-6 w-1/4 ml-2" />
                    <Skeleton className="h-6 w-1/4 ml-2" />
                    <Skeleton className="h-6 w-1/4 ml-2" />
                </div>
                {/* Lignes du tableau */}
                <div className="mt-2 space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex border-b py-2">
                            <Skeleton className="h-5 w-1/4" />
                            <Skeleton className="h-5 w-1/4 ml-2" />
                            <Skeleton className="h-5 w-1/4 ml-2" />
                            <Skeleton className="h-5 w-1/4 ml-2" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}