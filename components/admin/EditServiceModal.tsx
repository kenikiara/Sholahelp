import React, { useState, useEffect } from 'react';
import { Service } from '../../types';

interface EditServiceModalProps {
    service: Service | null;
    onClose: () => void;
    onSave: (service: Service) => void;
}

export const EditServiceModal = ({ service, onClose, onSave }: EditServiceModalProps) => {
    const [formData, setFormData] = useState({
        name: '',
        icon: '📝',
        multiplier: 1.0,
    });

    useEffect(() => {
        if (service) {
            setFormData({
                name: service.name,
                icon: service.icon,
                multiplier: service.multiplier,
            });
        } else {
            setFormData({ name: '', icon: '📝', multiplier: 1.0 });
        }
    }, [service]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            ...(service || { id: 0 }), // Keep original ID if editing
            ...formData,
        });
    };

    const isEditing = service !== null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
        >
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md m-4">
                <form onSubmit={handleSubmit}>
                    <header className="p-4 border-b border-gray-200">
                        <h2 id="service-modal-title" className="text-lg font-bold text-gray-900">
                            {isEditing ? 'Edit Service' : 'Add New Service'}
                        </h2>
                    </header>
                    <main className="p-6 space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Service Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                         <div>
                            <label htmlFor="icon" className="block text-sm font-medium text-gray-700">Icon (Emoji)</label>
                            <input
                                type="text"
                                id="icon"
                                name="icon"
                                value={formData.icon}
                                onChange={handleChange}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                                maxLength={2}
                            />
                        </div>
                         <div>
                            <label htmlFor="multiplier" className="block text-sm font-medium text-gray-700">Price Multiplier</label>
                            <input
                                type="number"
                                id="multiplier"
                                name="multiplier"
                                value={formData.multiplier}
                                onChange={handleChange}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                                step="0.01"
                                min="0"
                            />
                        </div>
                    </main>
                    <footer className="px-6 py-3 bg-gray-50 flex justify-end space-x-3 rounded-b-2xl">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700"
                        >
                            Save Service
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
};