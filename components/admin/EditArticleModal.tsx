import React, { useState, useEffect } from 'react';
import { Article } from '../../types';

interface EditArticleModalProps {
    article: Article | null;
    onClose: () => void;
    onSave: (article: Article) => void;
}

export const EditArticleModal = ({ article, onClose, onSave }: EditArticleModalProps) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        category: '',
        excerpt: '',
        content: '',
        imageUrl: '',
    });

    useEffect(() => {
        if (article) {
            setFormData({
                title: article.title,
                author: article.author,
                category: article.category,
                excerpt: article.excerpt,
                content: article.content,
                imageUrl: article.imageUrl,
            });
        } else {
            setFormData({
                title: '',
                author: '',
                category: '',
                excerpt: '',
                content: '',
                imageUrl: `https://picsum.photos/seed/${Date.now()}/800/600`,
            });
        }
    }, [article]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            ...(article || { id: 0, date: new Date().toISOString(), isPublished: false }),
            ...formData,
        });
    };

    const isEditing = article !== null;

    return (
        <div 
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            role="dialog" aria-modal="true" aria-labelledby="article-modal-title"
        >
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl m-4 max-h-[90vh] flex flex-col">
                <form onSubmit={handleSubmit} className="flex flex-col h-full">
                    <header className="p-4 border-b border-gray-200 flex-shrink-0">
                        <h2 id="article-modal-title" className="text-lg font-bold text-gray-900">
                            {isEditing ? 'Edit Article' : 'Add New Article'}
                        </h2>
                    </header>
                    <main className="p-6 space-y-4 overflow-y-auto">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
                                <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
                            </div>
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                                <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">Excerpt</label>
                            <textarea id="excerpt" name="excerpt" value={formData.excerpt} onChange={handleChange} rows={3} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
                        </div>
                         <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Full Content</label>
                            <textarea id="content" name="content" value={formData.content} onChange={handleChange} rows={8} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
                        </div>
                    </main>
                    <footer className="px-6 py-3 bg-gray-50 flex justify-end space-x-3 rounded-b-2xl flex-shrink-0">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">
                            Save Article
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
};