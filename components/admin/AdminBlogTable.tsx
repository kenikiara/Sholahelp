import React from 'react';
import { Article } from '../../types';

interface AdminBlogTableProps {
    articles: Article[];
    onAddArticle: () => void;
    onEditArticle: (article: Article) => void;
    onTogglePublished: (articleId: number) => void;
}

const ToggleSwitch = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => (
    <button
        type="button"
        className={`${checked ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        role="switch"
        aria-checked={checked}
        onClick={onChange}
    >
        <span
            aria-hidden="true"
            className={`${checked ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        />
    </button>
);

export const AdminBlogTable = ({ articles, onAddArticle, onEditArticle, onTogglePublished }: AdminBlogTableProps) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Manage Blog Articles</h2>
                    <p className="text-sm text-gray-500 mt-1">Create, edit, and publish articles for the customer-facing blog.</p>
                </div>
                <button
                    onClick={onAddArticle}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-sm"
                >
                    Add New Article
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Edit</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {articles.map(article => (
                            <tr key={article.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 max-w-sm truncate">{article.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{article.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{article.author}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(article.date).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex items-center space-x-2">
                                        <ToggleSwitch checked={article.isPublished} onChange={() => onTogglePublished(article.id)} />
                                        <span>{article.isPublished ? 'Published' : 'Draft'}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => onEditArticle(article)} className="text-blue-600 hover:text-blue-800">
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                         {articles.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-10 text-gray-500">
                                    No articles have been added yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};