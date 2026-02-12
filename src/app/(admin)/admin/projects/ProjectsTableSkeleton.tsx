export default function ProjectsTableSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-pulse">
      {/* Header du tableau */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex gap-4">
        <div className="h-4 bg-slate-200 rounded w-16" />
        <div className="h-4 bg-slate-200 rounded w-1/3" />
        <div className="h-4 bg-slate-200 rounded w-1/4" />
        <div className="h-4 bg-slate-200 rounded w-20 ml-auto" />
      </div>

      {/* Lignes du tableau */}
      <div className="divide-y divide-slate-100">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="px-6 py-4 flex items-center gap-6">
            {/* Image */}
            <div className="w-12 h-12 bg-slate-200 rounded-lg shrink-0" />

            {/* Info */}
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-200 rounded w-3/4" />
              <div className="h-3 bg-slate-100 rounded w-1/2" />
            </div>

            {/* Date */}
            <div className="w-32 space-y-2 hidden sm:block">
              <div className="h-3 bg-slate-100 rounded w-full" />
              <div className="h-3 bg-slate-100 rounded w-3/4" />
            </div>

            {/* Actions */}
            <div className="flex gap-2 ml-auto">
              <div className="w-8 h-8 bg-slate-100 rounded-lg" />
              <div className="w-8 h-8 bg-slate-100 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
