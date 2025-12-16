
// Squelette pour un seul article dans la grille
export const ArticleCardSkeleton = () => (
    <div className="animate-pulse bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-300 h-48 w-full"></div>
        <div className="p-6 space-y-4">
            <div className="bg-gray-300 h-4 w-1/3 rounded"></div>
            <div className="bg-gray-300 h-6 w-full rounded"></div>
            <div className="space-y-2">
                <div className="bg-gray-300 h-4 w-full rounded"></div>
                <div className="bg-gray-300 h-4 w-5/6 rounded"></div>
            </div>
            <div className="bg-gray-300 h-10 w-1/2 rounded-lg"></div>
        </div>
    </div>
);

// Squelette pour la section "Article à la Une"
export const FeaturedArticleSkeleton = () => (
    <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="bg-gray-300 h-80 w-full rounded-2xl"></div>
        <div className="space-y-6">
            <div className="bg-gray-300 h-6 w-1/4 rounded-full"></div>
            <div className="space-y-3">
                <div className="bg-gray-300 h-8 w-full rounded"></div>
                <div className="bg-gray-300 h-8 w-4/5 rounded"></div>
            </div>
            <div className="space-y-2">
                <div className="bg-gray-300 h-5 w-full rounded"></div>
                <div className="bg-gray-300 h-5 w-full rounded"></div>
                <div className="bg-gray-300 h-5 w-2/3 rounded"></div>
            </div>
            <div className="bg-gray-300 h-12 w-1/3 rounded-lg"></div>
        </div>
    </div>
);