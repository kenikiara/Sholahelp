import React from 'react';
import { Service } from '../../types';

interface AdminServicesTableProps {
    services: Service[];
    onAddService: () => void;
    onEditService: (service: Service) => void;
}

export const AdminServicesTable = ({ services, onAddService, onEditService }: AdminServicesTableProps) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Manage Services</h2>
                    <p className="text-sm text-gray-500 mt-1">Add, edit, and manage the services offered to customers.</p>
                </div>
                <button
                    onClick={onAddService}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-sm"
                >
                    Add New Service
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Icon</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Multiplier</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Edit</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {services.map(service => (
                            <tr key={service.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-center text-2xl">{service.icon}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.multiplier.toFixed(2)}x</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => onEditService(service)} className="text-blue-600 hover:text-blue-800">
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};