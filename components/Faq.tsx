
import React, { useState } from 'react';
import { FAQ_DATA } from '../constants';

const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 py-6">
            <dt>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex justify-between items-center text-left text-gray-800"
                >
                    <span className="text-lg font-medium">{question}</span>
                    <span className="ml-6 h-7 flex items-center">
                        <svg
                            className={`h-6 w-6 transform transition-transform duration-200 ${isOpen ? '-rotate-180' : 'rotate-0'}`}
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                </button>
            </dt>
            {isOpen && (
                <dd className="mt-4 pr-12">
                    <p className="text-base text-gray-600">{answer}</p>
                </dd>
            )}
        </div>
    );
};

export const Faq = () => {
    return (
        <section className="bg-gray-50 py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
                    </p>
                </div>
                <div className="mt-12">
                    <dl className="space-y-4">
                        {FAQ_DATA.map((item, index) => (
                            <FaqItem key={index} question={item.question} answer={item.answer} />
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
};
