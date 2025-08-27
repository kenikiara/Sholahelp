import React from 'react';
import { Article } from '../types';

interface ArticlePageProps {
    article?: Article;
    onBack: () => void;
}

export const ArticlePage = ({ article, onBack }: ArticlePageProps) => {
    if (!article) {
        return (
            <div className="py-16 text-center">
                <h1 className="text-2xl font-bold">Article not found</h1>
                <p className="mt-4 text-gray-600">The article you are looking for does not exist.</p>
                <button onClick={onBack} className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all">
                    &larr; Back to Blog
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <button onClick={onBack} className="mb-8 text-blue-600 font-semibold hover:underline">
                        &larr; Back to Blog
                    </button>
                    <div className="prose lg:prose-lg max-w-none">
                        <span className="text-base font-semibold text-blue-600">{article.category}</span>
                        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">{article.title}</h1>
                        <div className="mt-6 flex items-center space-x-4 text-sm text-gray-500">
                            <span>By {article.author}</span>
                            <span>&bull;</span>
                            <span>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <img className="mt-8 rounded-xl shadow-lg w-full aspect-video object-cover" src={article.imageUrl} alt={article.title} />
                        <p className="mt-8 text-xl leading-8">{article.excerpt}</p>
                        <div className="mt-8 whitespace-pre-wrap">{article.content}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};