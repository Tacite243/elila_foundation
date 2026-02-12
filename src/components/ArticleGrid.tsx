'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';


// 1. On définit l'interface ici (ou on la déplace dans un fichier types.ts partagé)
export interface PubliArticle {
    id: string;
    title: string;
    slug: string;
    image: string;
    category: {
        id: string;
        name: string;
    };
}

interface ArticleGridProps {
    articles: PubliArticle[];
    categories: string[];
}

export default function ArticleGrid({ articles, categories }: ArticleGridProps) {
    const [activeCategory, setActiveCategory] = useState('Tous');

    // La logique de filtrage doit comparer le nom de la catégorie
    const filteredArticles = activeCategory === 'Tous'
        ? articles
        : articles.filter(article => article.category.name === activeCategory);

    return (
        <>
            {/* Filtre des catégories */}
            <section className="py-12 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((categoryName, index) => (
                            <motion.button
                                key={index}
                                onClick={() => setActiveCategory(categoryName)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeCategory === categoryName
                                    ? "bg-green-500 text-white shadow-lg"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {categoryName}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Grille des articles */}
            <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Derniers Articles</h2>
                        <p className="text-gray-600">Découvrez nos dernières publications et actualités</p>
                    </div>
                    {filteredArticles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredArticles.map((article, index) => (
                                <motion.article
                                    key={article.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.05 }}
                                    layout
                                >
                                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl ... h-full flex flex-col">
                                        <div className="relative h-48 w-full">
                                            <Image src={article.image} alt={article.title} fill style={{ objectFit: 'cover' }} />
                                        </div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            {/* La catégorie est maintenant un objet */}
                                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold mb-3 self-start">
                                                {article.category.name}
                                            </span>
                                            <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight flex-grow">{article.title}</h3>
                                            <Link href={`/news/${article.slug}`} className="mt-auto text-green-600 hover:text-green-700 font-semibold ...">
                                                <span>Lire Plus</span>
                                                <ArrowRight size={16} />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 py-10">Aucun article trouvé pour cette catégorie.</p>
                    )}
                </div>
            </section>
        </>
    );
}