"use client";

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchPublicArticleBySlug } from '@/redux/slices/articlesSlice';
import { RootState } from '@/redux/store';



// Squelette pour la page de détail
const ArticleDetailSkeleton = () => (
    <div className="animate-pulse max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-300 h-10 w-3/4 mb-4 rounded"></div>
        <div className="bg-gray-300 h-6 w-1/2 mb-8 rounded"></div>
        <div className="bg-gray-300 h-96 w-full mb-8 rounded-lg"></div>
        <div className="space-y-4">
            <div className="bg-gray-300 h-5 w-full rounded"></div>
            <div className="bg-gray-300 h-5 w-full rounded"></div>
            <div className="bg-gray-300 h-5 w-5/6 rounded"></div>
            <div className="bg-gray-300 h-5 w-full mt-6 rounded"></div>
            <div className="bg-gray-300 h-5 w-full rounded"></div>
            <div className="bg-gray-300 h-5 w-4/6 rounded"></div>
        </div>
    </div>
);


const ArticleDetailPage = () => {
    const params = useParams();
    const slug = params?.slug as string | undefined;
    const dispatch = useAppDispatch();

    const { currentPublicArticle: article, publicStatus: status } = useAppSelector(
        (state: RootState) => state.articles
    );

    // const [article, setArticle] = useState<FullArticle | null>(null);
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);

        useEffect(() => {
        // On lance le fetch si le slug est disponible
        if (slug) {
            dispatch(fetchPublicArticleBySlug(slug));
        }
    }, [slug, dispatch]);

    const isLoading = status === 'loading' || status === 'idle';
    const hasError = status === 'failed';

    if (isLoading) {
        return <ArticleDetailSkeleton />;
    }

    if (hasError) {
        return <div className="text-center py-20 text-red-500">Erreur lors du chargement de l&apos;article.</div>;
    }

    if (!article) {
        return <div className="text-center py-20">Article non trouvé.</div>;
    }

    return (
        <article className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{article.title}</h1>
            <div className="text-gray-500 mb-8">
                <span>Par {article.author.name}</span> |
                <span> Publié le {new Date(article.createdAt).toLocaleDateString('fr-FR')}</span> |
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{article.category.name}</span>
            </div>
            <div className="relative w-full h-96 mb-8">
                <Image src={article.image} alt={article.title} layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
            {/* Attention : Utiliser `dangerouslySetInnerHTML` est risqué.
                Assurez-vous que le HTML provient d'une source de confiance (votre propre éditeur riche)
                et qu'il est "sanitized" côté serveur avant d'être enregistré en base de données.
            */}
            <div className="prose lg:prose-xl max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
        </article>
    );
};

export default ArticleDetailPage;