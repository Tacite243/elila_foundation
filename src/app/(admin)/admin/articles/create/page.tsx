import ArticleForm from "../ArticleForm";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function CreateArticlePage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/articles"
            className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Nouvel Article
            </h1>
            <p className="text-slate-500 text-sm">
              Rédigez et publiez une actualité
            </p>
          </div>
        </div>

        <ArticleForm categories={categories} />
      </div>
    </div>
  );
}
