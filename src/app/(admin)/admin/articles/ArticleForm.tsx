"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  createArticle,
  updateArticle,
  resetMutationStatus,
} from "@/redux/slices/articlesSlice";
import type { Category, Article } from "@prisma/client";
import type { createArticleSchema } from "@/schemas/article.schemas";
// CORRECTION ICI : Import groupé et ajout de CloudinaryUploadWidgetInfo
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
  CloudinaryUploadWidgetInfo
} from "next-cloudinary";
import Image from "next/image";
import { Save, Upload, X, ArrowLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

// Fonction utilitaire pour créer un slug (inchangée)
const slugify = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");

interface ArticleFormProps {
  initialData?: Article;
  categories: Category[];
}

export default function ArticleForm({
  initialData,
  categories,
}: ArticleFormProps) {
  const [formData, setFormData] = useState<createArticleSchema>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    image: initialData?.image || "",
    readTime: initialData?.readTime || "",
    published: initialData?.published || false,
    categoryId: initialData?.categoryId || "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string[] | undefined }>(
    {}
  );
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(
    !!initialData
  );
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { mutationStatus, mutationError } = useSelector(
    (state: RootState) => state.articles
  );

  // Vérification de la configuration Cloudinary
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!cloudName) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
        Erreur de configuration : La variable d'environnement <strong>NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME</strong> est manquante.
      </div>
    );
  }

  useEffect(() => {
    if (mutationStatus === "succeeded") {
      dispatch(resetMutationStatus());
      router.push("/admin/articles");
      router.refresh();
    }
    if (
      mutationStatus === "failed" &&
      mutationError &&
      "errors" in mutationError
    ) {
      setErrors(mutationError.errors.fieldErrors);
    } else {
      setErrors({});
    }
  }, [mutationStatus, mutationError, dispatch, router, initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const finalValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({ ...prev, [name]: finalValue }));

    if (name === "title" && !isSlugManuallyEdited) {
      setFormData((prev) => ({ ...prev, slug: slugify(value) }));
    }
    if (name === "slug") setIsSlugManuallyEdited(true);
  };

  // CORRECTION ICI : Typage explicite de 'info'
  const handleImageUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
    setIsUploadingImage(false);
    if (
      result.event === "success" &&
      result.info &&
      typeof result.info !== "string"
    ) {
      // On force TypeScript à comprendre que result.info est de type CloudinaryUploadWidgetInfo
      const info = result.info as CloudinaryUploadWidgetInfo;
      setFormData((prev) => ({ ...prev, image: info.secure_url }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (initialData)
      dispatch(updateArticle({ id: initialData.id, data: formData }));
    else dispatch(createArticle(formData));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
    >
      <div className="p-6 md:p-8 space-y-8">
        {/* Section Principale */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Titre de l'article
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ex: Lancement du nouveau programme..."
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-800 placeholder:text-slate-400"
            />
            {errors.title && (
              <p className="mt-1.5 text-sm text-red-500">{errors.title[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Slug (URL)
            </label>
            <div className="flex rounded-lg shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm">
                /news/
              </span>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="flex-1 min-w-0 block w-full px-4 py-2.5 rounded-none rounded-r-lg border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-800 bg-white"
              />
            </div>
            {errors.slug && (
              <p className="mt-1.5 text-sm text-red-500">{errors.slug[0]}</p>
            )}
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Section Média & Catégorie */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Image de couverture
              </label>

              {!formData.image ? (
                <CldUploadWidget
                  uploadPreset="welead_articles_preset"
                  onSuccess={handleImageUploadSuccess}
                  onUploadAdded={() => setIsUploadingImage(true)}
                  options={{
                    cloudName: cloudName,
                    maxImageFileSize: 5000000,
                    cropping: true,
                    folder: "articles_images",
                  }}
                >
                  {({ open }) => (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        open();
                      }}
                      disabled={isUploadingImage}
                      className="w-full h-48 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-500 hover:border-blue-500 hover:bg-blue-50/50 hover:text-blue-600 transition-all group"
                    >
                      <div className="p-3 bg-slate-100 rounded-full mb-3 group-hover:bg-blue-100 transition-colors">
                        {isUploadingImage ? (
                          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Upload size={24} />
                        )}
                      </div>
                      <span className="font-medium text-sm">
                        {isUploadingImage
                          ? "Téléchargement..."
                          : "Cliquez pour ajouter une image"}
                      </span>
                    </button>
                  )}
                </CldUploadWidget>
              ) : (
                <div className="relative h-48 w-full rounded-xl overflow-hidden group border border-slate-200">
                  <Image
                    src={formData.image}
                    alt="Cover"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, image: "" }))
                      }
                      className="bg-white text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              )}
              {errors.image && (
                <p className="mt-1.5 text-sm text-red-500">{errors.image[0]}</p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Catégorie
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-white text-slate-800"
              >
                <option value="">Sélectionner une catégorie...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors.categoryId[0]}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Temps de lecture
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleChange}
                  placeholder="Ex: 5 min"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-800"
                />
              </div>
              {errors.readTime && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors.readTime[0]}
                </p>
              )}
            </div>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Contenu */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Extrait (Résumé)
            </label>
            <textarea
              name="excerpt"
              rows={3}
              value={formData.excerpt}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-800 placeholder:text-slate-400"
            />
            {errors.excerpt && (
              <p className="mt-1.5 text-sm text-red-500">{errors.excerpt[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Contenu complet
            </label>
            <textarea
              name="content"
              rows={12}
              value={formData.content}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-800 placeholder:text-slate-400 font-mono text-sm"
            />
            {errors.content && (
              <p className="mt-1.5 text-sm text-red-500">{errors.content[0]}</p>
            )}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="bg-slate-50 px-6 md:px-8 py-4 border-t border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="published"
            name="published"
            checked={formData.published}
            onChange={handleChange}
            className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
          />
          <label
            htmlFor="published"
            className="text-sm font-medium text-slate-700 cursor-pointer select-none"
          >
            Publier immédiatement
          </label>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/articles"
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Annuler
          </Link>
          <button
            type="submit"
            disabled={mutationStatus === "loading" || isUploadingImage}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {mutationStatus === "loading" ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {initialData ? "Mettre à jour" : "Enregistrer"}
          </button>
        </div>
      </div>

      {mutationStatus === "failed" &&
        mutationError &&
        "message" in mutationError && (
          <div className="bg-red-50 text-red-600 p-4 text-center text-sm border-t border-red-100">
            {mutationError.message}
          </div>
        )}
    </form>
  );
}