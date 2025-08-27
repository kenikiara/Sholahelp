import React, { useState } from 'react';
import { generateTopicIdeas } from '../services/geminiService';
import type { GeneratedTopic } from '../types';

const LoadingSpinner = () => (
    <div className="flex justify-center items-center space-x-2">
        <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]"></div>
	    <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]"></div>
	    <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce"></div>
    </div>
);


const TopicCard = ({ topic }: { topic: GeneratedTopic }) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300">
        <h4 className="font-bold text-lg text-gray-800">{topic.recipeName}</h4>
        <ul className="mt-3 space-y-2 list-disc list-inside text-gray-600">
            {topic.ingredients.map((point, index) => (
                <li key={index}>{point}</li>
            ))}
        </ul>
    </div>
);


export const TopicGenerator = () => {
    const [subject, setSubject] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [ideas, setIdeas] = useState<GeneratedTopic[]>([]);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!subject) {
            setError('Please enter a subject.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setIdeas([]);
        try {
            const result = await generateTopicIdeas(subject);
            setIdeas(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl shadow-blue-500/10 border border-gray-100 p-8 text-center">
            <div className="max-w-2xl mx-auto">
                 <h2 className="text-3xl font-bold text-gray-900">
                    Free AI Topic Generator
                </h2>
                <p className="mt-3 text-lg text-gray-600">
                   Stuck on a topic? Use our free AI tool to brainstorm unique ideas and outlines. A great starting point for your paper.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g., 'The Industrial Revolution' or 'Climate Change'"
                        className="flex-grow w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-md disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center"
                        disabled={isLoading}
                    >
                         {isLoading ? <LoadingSpinner /> : 'Generate Ideas'}
                    </button>
                </form>

                <div className="mt-8 text-left">
                     {error && <p className="text-red-600 bg-red-100 p-4 rounded-lg text-center">{error}</p>}
                     {ideas.length > 0 && (
                         <div className="grid md:grid-cols-2 gap-6">
                             {ideas.map((idea, index) => (
                                 <TopicCard key={index} topic={idea} />
                             ))}
                         </div>
                     )}
                </div>

            </div>
        </div>
    );
};