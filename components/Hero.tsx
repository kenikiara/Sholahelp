import React from 'react';
import { OrderForm } from './OrderForm';
import { TopicGenerator } from './TopicGenerator';
import { Service } from '../types';

const ValueProposition = ({ icon, text }: { icon: string; text: string }) => (
    <div className="flex items-center space-x-3">
        <div className="bg-blue-100 text-blue-600 rounded-full p-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
        </div>
        <span className="text-gray-600">{text}</span>
    </div>
);


export const Hero = ({ onOrderAttempt, services }: { onOrderAttempt: (price: number) => void; services: Service[] }) => {
    return (
        <section className="relative bg-white py-16 sm:py-24 lg:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 opacity-60"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                            Your Personal <span className="text-blue-600">Human-Written</span> Paper Service
                        </h1>
                        <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
                           Get high-quality, original academic papers crafted by expert writers. Calculate your price and get started in minutes.
                        </p>
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
                            <ValueProposition icon="✅" text="100% Plagiarism-Free" />
                            <ValueProposition icon="✅" text="Expert Human Writers" />
                            <ValueProposition icon="✅" text="Instant Price Calculation" />
                            <ValueProposition icon="✅" text="Full Confidentiality" />
                        </div>
                    </div>
                    <div className="w-full" id="order-form">
                        <OrderForm onOrderAttempt={onOrderAttempt} services={services} />
                    </div>
                </div>
                 <div className="mt-24" id="topic-generator">
                    <TopicGenerator />
                 </div>
            </div>
        </section>
    );
};