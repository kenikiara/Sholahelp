import React, { useState, useMemo } from 'react';
import type { Sample } from '../types';

const SampleCard = ({ sample }: { sample: Sample }) => (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-200 flex flex-col">
        <h4 className="font-bold text-lg text-gray-800 flex-grow">{sample.title}</h4>
        <div className="mt-4 space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
                <span className="font-semibold text-gray-800">Subject:</span>
                <span>{sample.subject}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-semibold text-gray-800">Level:</span>
                <span>{sample.academicLevel}</span>
            </div>
             <div className="flex justify-between">
                <span className="font-semibold text-gray-800">Pages:</span>
                <span>{sample.pages}</span>
            </div>
        </div>
        <a href={sample.fileUrl} 
           onClick={(e) => e.preventDefault()} // In a real app, this would trigger a download
           className="mt-6 w-full text-center bg-blue-100 text-blue-700 px-4 py-2.5 rounded-lg font-semibold hover:bg-blue-200 transition-colors duration-300"
           aria-label={`Download sample: ${sample.title}`}
        >
           Download Sample
        </a>
    </div>
);

export const SampleShowcase = ({ samples }: { samples: Sample[] }) => {
    const [filterSubject, setFilterSubject] = useState<string>('All');
    const [filterLevel, setFilterLevel] = useState<string>('All');

    const featuredSamples = useMemo(() => samples.filter(s => s.isFeatured), [samples]);

    const uniqueSubjects = useMemo(() => ['All', ...Array.from(new Set(featuredSamples.map(s => s.subject)))], [featuredSamples]);
    const uniqueLevels = useMemo(() => ['All', ...Array.from(new Set(featuredSamples.map(s => s.academicLevel)))], [featuredSamples]);

    const filteredSamples = useMemo(() => {
        return featuredSamples.filter(sample => {
            const subjectMatch = filterSubject === 'All' || sample.subject === filterSubject;
            const levelMatch = filterLevel === 'All' || sample.academicLevel === filterLevel;
            return subjectMatch && levelMatch;
        });
    }, [featuredSamples, filterSubject, filterLevel]);

    return (
        <section className="bg-gray-50 py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Our Work Samples</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Explore a selection of papers written by our experts. Filter by subject and academic level to find a relevant example.
                    </p>
                </div>

                {/* Filter Controls */}
                <div className="mt-12 max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div>
                        <label htmlFor="filterSubject" className="block text-sm font-medium text-gray-700">Subject</label>
                        <select id="filterSubject" value={filterSubject} onChange={e => setFilterSubject(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                           {uniqueSubjects.map(subject => <option key={subject} value={subject}>{subject}</option>)}
                        </select>
                     </div>
                     <div>
                        <label htmlFor="filterLevel" className="block text-sm font-medium text-gray-700">Academic Level</label>
                        <select id="filterLevel" value={filterLevel} onChange={e => setFilterLevel(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                           {uniqueLevels.map(level => <option key={level} value={level}>{level}</option>)}
                        </select>
                     </div>
                </div>

                {/* Sample Grid */}
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredSamples.length > 0 ? (
                        filteredSamples.map(sample => <SampleCard key={sample.id} sample={sample} />)
                    ) : (
                        <p className="text-gray-600 col-span-full text-center">No samples match the selected criteria.</p>
                    )}
                </div>
            </div>
        </section>
    );
};