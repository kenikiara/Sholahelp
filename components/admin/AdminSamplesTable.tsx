import React from 'react';
import { Sample } from '../../types';

interface AdminSamplesTableProps {
    samples: Sample[];
    onAddSample: () => void;
    onEditSample: (sample: Sample) => void;
    onToggleFeatured: (sampleId: number) => void;
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

export const AdminSamplesTable = ({ samples, onAddSample, onEditSample, onToggleFeatured }: AdminSamplesTableProps) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Manage Samples</h2>
                    <p className="text-sm text-gray-500 mt-1">Add, edit, and control visibility of work samples on the homepage.</p>
                </div>
                <button
                    onClick={onAddSample}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-sm"
                >
                    Add New Sample
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pages</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Edit</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {samples.map(sample => (
                            <tr key={sample.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 max-w-xs truncate">{sample.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sample.subject}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sample.academicLevel}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sample.pages}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <ToggleSwitch checked={sample.isFeatured} onChange={() => onToggleFeatured(sample.id)} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => onEditSample(sample)} className="text-blue-600 hover:text-blue-800">
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                         {samples.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-10 text-gray-500">
                                    No samples have been added yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};