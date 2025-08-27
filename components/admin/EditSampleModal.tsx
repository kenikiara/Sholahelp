import React, { useState, useEffect } from 'react';
import { Sample } from '../../types';
import { SUBJECTS } from '../../constants';

interface EditSampleModalProps {
    sample: Sample | null;
    onClose: () => void;
    onSave: (sample: Sample) => void;
}

const ACADEMIC_LEVELS: Sample['academicLevel'][] = ['High School', 'Undergraduate', 'Master', 'PhD'];

export const EditSampleModal = ({ sample, onClose, onSave }: EditSampleModalProps) => {
    const [formData, setFormData] = useState({
        title: '',
        subject: SUBJECTS[0].name,
        academicLevel: ACADEMIC_LEVELS[0],
        pages: 1,
    });

    useEffect(() => {
        if (sample) {
            setFormData({
                title: sample.title,
                subject: sample.subject,
                academicLevel: sample.academicLevel,
                pages: sample.pages,
            });
        } else {
            setFormData({
                title: '',
                subject: SUBJECTS[0].name,
                academicLevel: ACADEMIC_LEVELS[0],
                pages: 1,
            });
        }
    }, [sample]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseInt(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            ...(sample || { id: 0, fileUrl: '#', isFeatured: true }), // Keep original ID if editing
            ...formData,
        });
    };

    const isEditing = sample !== null;

    return (
        <div 
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sample-modal-title"
        >
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg m-4">
                <form onSubmit={handleSubmit}>
                    <header className="p-4 border-b border-gray-200">
                        <h2 id="sample-modal-title" className="text-lg font-bold text-gray-900">
                            {isEditing ? 'Edit Sample' : 'Add New Sample'}
                        </h2>
                    </header>
                    <main className="p-6 space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text" id="title" name="title"
                                value={formData.title} onChange={handleChange}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                                <select
                                    id="subject" name="subject"
                                    value={formData.subject} onChange={handleChange}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    {SUBJECTS.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                                </select>
                            </div>
                            <div>
                               <label htmlFor="academicLevel" className="block text-sm font-medium text-gray-700">Academic Level</label>
                                <select
                                    id="academicLevel" name="academicLevel"
                                    value={formData.academicLevel} onChange={handleChange}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    {ACADEMIC_LEVELS.map(level => <option key={level} value={level}>{level}</option>)}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="pages" className="block text-sm font-medium text-gray-700">Pages</label>
                            <input
                                type="number" id="pages" name="pages"
                                value={formData.pages} onChange={handleChange}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                required min="1"
                            />
                        </div>
                    </main>
                    <footer className="px-6 py-3 bg-gray-50 flex justify-end space-x-3 rounded-b-2xl">
                        <button
                            type="button" onClick={onClose}
                            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700"
                        >
                            Save Sample
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
};