"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { createArticle, updateArticle, resetMutationStatus } from '@/redux/slices/articlesSlice';
import type { Category, Article } from '@prisma/client';
import type { createArticleSchema } from '@/schemas/article.schemas';
import { CldUploadWidget } from 'next-cloudinary';
import { CloudinaryUploadWidgetResults } from 'next-cloudinary';
import Image from 'next/image';



// Fonction utilitaire pour créer un slug
const slugify = (text: string) =>
    text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')       // Remplace les espaces par -
        .replace(/[^\w\-]+/g, '')   // Supprime les caractères non-valides
        .replace(/\-\-+/g, '-');    // Remplace plusieurs - par un seul

interface ArticleFormProps {
    initialData?: Article;
    categories: Category[];
}

type FormDataType = createArticleSchema;

type FormErrors = {
    [key: string]: string[] | undefined;
};

export default function ArticleForm({ initialData, categories }: ArticleFormProps) {
    const [formData, setFormData] = useState<FormDataType>({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        excerpt: initialData?.excerpt || '',
        content: initialData?.content || '',
        image: initialData?.image || '', // Cette URL viendra de Cloudinary
        readTime: initialData?.readTime || '',
        published: initialData?.published || false,
        categoryId: initialData?.categoryId || '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(!!initialData);
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { mutationStatus, mutationError } = useSelector((state: RootState) => state.articles);

    useEffect(() => {
        if (mutationStatus === 'succeeded') {
            alert(initialData ? 'Article mis à jour avec succès !' : 'Article créé avec succès !');
            dispatch(resetMutationStatus());
            router.push('/admin/articles');
            router.refresh();
        }
        if (mutationStatus === 'failed' && mutationError && 'errors' in mutationError) {
            setErrors(mutationError.errors.fieldErrors);
        } else {
            setErrors({});
        }
    }, [mutationStatus, mutationError, dispatch, router, initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const isCheckbox = type === 'checkbox';
        const finalValue = isCheckbox ? (e.target as HTMLInputElement).checked : value;

        setFormData(prev => ({ ...prev, [name]: finalValue }));

        if (name === 'title' && !isSlugManuallyEdited) {
            setFormData(prev => ({ ...prev, slug: slugify(value) }));
        }

        if (name === 'slug') {
            setIsSlugManuallyEdited(true);
        }
    };

    // Fonction pour gérer la réussite de l'upload Cloudinary
    const handleImageUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
        setIsUploadingImage(false);
        if (result.event === 'success' && result.info && typeof result.info !== 'string') {
            const imageUrl = result.info.secure_url;
            if (imageUrl) {
                setFormData(prev => ({ ...prev, image: imageUrl }));
                alert('Image téléchargée avec succès !');
            }
        }
    };
    // Nouvelle fonction pour gérer le début de l'upload Cloudinary
    const handleImageUploadStart = () => {
        setIsUploadingImage(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        if (initialData) {
            dispatch(updateArticle({ id: initialData.id, data: formData }));
        } else {
            dispatch(createArticle(formData));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">

            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre</label>
                <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title[0]}</p>}
            </div>

            <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Slug (URL)</label>
                <input type="text" name="slug" id="slug" value={formData.slug} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50" />
                {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug[0]}</p>}
            </div>

            {/* Intégration du CldUploadWidget de Cloudinary */}
            <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image de couverture</label>
                <div className="mt-1 flex items-center space-x-4">
                    <CldUploadWidget
                        uploadPreset="welead_articles_preset"
                        onSuccess={handleImageUploadSuccess}
                        onUploadAdded={handleImageUploadStart}
                        options={{
                            cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, // Assurez-vous que votre Cloud Name est bien défini
                            sources: ['local', 'url', 'camera'],
                            multiple: false,
                            maxImageFileSize: 5000000,
                            cropping: true,
                            folder: "articles_images"
                        }}
                    >
                        {({ open }) => {
                            function handleOnClick(e: React.MouseEvent<HTMLButtonElement>) {
                                e.preventDefault(); // Empêche la soumission du formulaire
                                open();
                            }
                            return (
                                <button
                                    onClick={handleOnClick}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    disabled={isUploadingImage}
                                >
                                    {isUploadingImage ? 'Téléchargement...' : 'Télécharger une image'}
                                </button>
                            );
                        }}
                    </CldUploadWidget>

                    {formData.image && (
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500 truncate">{formData.image.split('/').pop()}</span>
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                                className="text-red-600 hover:text-red-900 text-sm font-medium"
                                title="Supprimer l'image"
                            >
                                X
                            </button>
                            <div className="h-10 w-10 relative">
                                <Image
                                    src={formData.image}
                                    alt="Prévisualisation"
                                    fill
                                    className="object-cover rounded-md"
                                    sizes="40px"
                                />
                            </div>
                        </div>
                    )}
                </div>
                {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image[0]}</p>}
            </div>

            <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">Extrait (résumé court)</label>
                <textarea name="excerpt" id="excerpt" rows={3} value={formData.excerpt} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
                {errors.excerpt && <p className="mt-1 text-sm text-red-600">{errors.excerpt[0]}</p>}
            </div>

            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">Contenu de l&apos;article</label>
                <textarea name="content" id="content" rows={10} value={formData.content} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
                {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content[0]}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Catégorie</label>
                    <select name="categoryId" id="categoryId" value={formData.categoryId} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                        <option value="">Sélectionner une catégorie</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    {errors.categoryId && <p className="mt-1 text-sm text-red-600">{errors.categoryId[0]}</p>}
                </div>

                <div>
                    <label htmlFor="readTime" className="block text-sm font-medium text-gray-700">Temps de lecture</label>
                    <input type="text" name="readTime" id="readTime" value={formData.readTime} onChange={handleChange} placeholder="ex: 7 min" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    {errors.readTime && <p className="mt-1 text-sm text-red-600">{errors.readTime[0]}</p>}
                </div>
            </div>

            <div className="flex items-start">
                <div className="flex h-5 items-center">
                    <input type="checkbox" name="published" id="published" checked={formData.published} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                </div>
                <div className="ml-3 text-sm">
                    <label htmlFor="published" className="font-medium text-gray-700">Publier l&apos;article</label>
                    <p className="text-gray-500">Si coché, l&apos;article sera visible publiquement.</p>
                </div>
            </div>

            <div className="flex justify-end">
                <button type="submit" disabled={mutationStatus === 'loading' || isUploadingImage} className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400">
                    {mutationStatus === 'loading' ? 'Enregistrement...' : (initialData ? "Mettre à jour l'article" : "Créer l'article")}
                </button>
            </div>

            {mutationStatus === 'failed' &&
                mutationError &&
                'message' in mutationError &&
                !('errors' in mutationError) &&
                (
                    <p className="text-red-500 text-center">{mutationError.message}</p>
                )}
        </form>
    );
}