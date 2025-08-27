import React from 'react';
import { Service } from '../types';

const ServiceCard = ({ name, icon }: { name: string, icon: string }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex items-center space-x-4">
        <span className="text-3xl">{icon}</span>
        <h3 className="font-semibold text-gray-800">{name}</h3>
    </div>
);

export const Services = ({ services }: { services: Service[] }) => {
    return (
        <section className="bg-white py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Covering a Wide Range of Needs</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        From simple essays to complex dissertations, our expert writers can handle any academic challenge.
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map(service => (
                        <ServiceCard key={service.id} name={service.name} icon={service.icon} />
                    ))}
                </div>
            </div>
        </section>
    );
};