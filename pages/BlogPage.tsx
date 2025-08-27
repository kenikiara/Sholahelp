import React, { useMemo } from 'react';
import { Article } from '../types';

interface BlogPageProps {
    articles: Article[];
    onViewArticle: (articleId: number) => void;
}

const ArticleCard = ({ article, onViewArticle }: { article: Article, onViewArticle: (id: number) => void }) => {
    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <img className="h-48 w-full object-cover" src={article.imageUrl} alt={article.title} />
            <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm text-blue-600 font-semibold">{article.category}</p>
                <h3 className="mt-2 text-xl font-bold text-gray-900 flex-grow">{article.title}</h3>
                <p className="mt-3 text-gray-600 text-sm">{article.excerpt}</p>
                <div className="mt-6 flex items-center justify-between text-xs text-gray-500">
                    <span>By {article.author}</span>
                    <span>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <button 
                    onClick={() => onViewArticle(article.id)}
                    className="mt-6 w-full text-center bg-blue-100 text-blue-700 px-4 py-2.5 rounded-lg font-semibold hover:bg-blue-200 transition-colors duration-300"
                >
                    Read More
                </button>
            </div>
        </div>
    );
};

export const BlogPage = ({ articles, onViewArticle }: BlogPageProps) => {
    const publishedArticles = useMemo(() => articles.filter(a => a.isPublished), [articles]);

    return (
        <div className="bg-gray-50 py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">Our Blog</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Get expert advice, writing tips, and insights from our team of academic professionals.
                    </p>
                </div>
                <div className="mt-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {publishedArticles.map(article => (
                        <ArticleCard key={article.id} article={article} onViewArticle={onViewArticle} />
                    ))}
                    {publishedArticles.length === 0 && (
                        <p className="col-span-full text-center text-gray-600">No articles have been published yet. Check back soon!</p>
                    )}
                </div>
            </div>
        </div>
    );
};