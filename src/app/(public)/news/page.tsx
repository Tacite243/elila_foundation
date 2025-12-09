"use client"

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ArticleGrid from '@/components/ArticleGrid';
import NewsletterForm from '@/components/NewsletterForm';
import React, { useEffect } from "react";
import { FeaturedArticleSkeleton } from '@/components/ArticleSkeleton';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { fetchPublicArticles } from '@/redux/slices/articlesSlice';


export type PubliArticle = {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    image: string;
    readTime: string;
    createdAt: string;
    category: { name: string };
    author: { name: string | null };
};

const NewsPage = () => {
    // const [articles, setArticles] = useState<PubliArticle[]>([]);
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);

    const dispatch = useAppDispatch();
    const { publicItems: articles, publicStatus: status } = useAppSelector((state: RootState) => state.articles);

    useEffect(() => {
        // On ne fetch que si les données n'ont pas encore été chargées
        if (status === 'idle') {
            dispatch(fetchPublicArticles());
        }
    }, [status, dispatch]);

    const isLoading = status === 'loading' || status === 'idle';
    const hasError = status === 'failed';

    // Définir l'article à la une UNIQUEMENT si les données sont chargées
    const featuredArticle = !isLoading && articles.length > 0 ? articles[0] : null;

    // Extraire la liste des catégories à partir des articles chargés
    const availableCategories = ['Tous', ...new Set(articles.map(a => a.category.name))];

    return (
        <main className="min-h-screen pt-20">
            {/* Hero Section */}
            <section className="py-24 bg-gradient-to-br from-blue-50 to-green-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div>
                        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
                            Nos{" "}
                            <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
                                Actualités
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                            Suivez l&apos;actualité de elila foundation, nos événements, nos succès et l&apos;impact
                            de nos actions dans la communauté étudiante et locale
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Article */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Article à la Une</h2>
                    {isLoading ? (
                        <FeaturedArticleSkeleton />
                    ) : hasError ? (
                        <p className="text-red-500 text-center">Une erreur est survenue lors du chargement des articles.</p>
                    ) : featuredArticle ? (
                        <article className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="relative h-80 w-full">
                                <Image
                                    src={featuredArticle.image}
                                    alt={featuredArticle.title}
                                    fill style={{ objectFit: 'cover' }}
                                    className="rounded-2xl shadow-xl"
                                    priority
                                />
                            </div>
                            <div>
                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                                    {featuredArticle.category.name}
                                </span>
                                <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">{featuredArticle.title}</h3>
                                <p className="text-lg text-gray-600 mb-6 leading-relaxed">{featuredArticle.excerpt}</p>
                                <Link href={`/news/${featuredArticle.slug}`} className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center ...">
                                    <span>Lire l&apos;Article</span>
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </article>
                    ) : (
                        <p className="text-center text-gray-500">Aucun article à la une disponible.</p>
                    )}
                </div>
            </section>

            {/* Articles Grid */}
            {/* On ne rend la grille que si le chargement est terminé et sans erreur */}
            {!isLoading && !hasError && (
                <ArticleGrid articles={articles} categories={availableCategories} />
            )}

            {/* Newsletter Section */}
            <section className="py-24 bg-gradient-to-r from-green-600 to-blue-600 relative">
                <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Restez Informé</h2>
                    <p className="text-xl text-white/90 mb-8 leading-relaxed">Abonnez-vous à notre newsletter...</p>
                    <NewsletterForm />
                </div>
            </section>
        </main>
    );
};

export default NewsPage;