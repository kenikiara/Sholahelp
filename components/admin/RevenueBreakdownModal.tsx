import React, { useRef, useEffect, useMemo } from 'react';
import { UserOrder } from '../../types';

declare var Chart: any; // Using Chart.js from CDN

interface RevenueBreakdownModalProps {
    orders: UserOrder[];
    onClose: () => void;
}

const CHART_COLORS = [
    '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', 
    '#14B8A6', '#6366F1', '#D946EF', '#0EA5E9', '#F97316'
];

export const RevenueBreakdownModal = ({ orders, onClose }: RevenueBreakdownModalProps) => {
    const serviceChartRef = useRef<HTMLCanvasElement>(null);
    const subjectChartRef = useRef<HTMLCanvasElement>(null);

    const revenueByService = useMemo(() => {
        const data = orders.reduce((acc, order) => {
            acc[order.serviceName] = (acc[order.serviceName] || 0) + order.price;
            return acc;
        }, {} as { [key: string]: number });
        
        const sorted = Object.entries(data).sort(([, a], [, b]) => b - a);
        return {
            labels: sorted.map(([label]) => label),
            data: sorted.map(([, value]) => value),
        };
    }, [orders]);

    const revenueBySubject = useMemo(() => {
        const data = orders.reduce((acc, order) => {
            acc[order.subjectName] = (acc[order.subjectName] || 0) + order.price;
            return acc;
        }, {} as { [key: string]: number });

        const sorted = Object.entries(data).sort(([, a], [, b]) => b - a);
        return {
            labels: sorted.map(([label]) => label),
            data: sorted.map(([, value]) => value),
        };
    }, [orders]);

    // Effect for Service Chart (Doughnut)
    useEffect(() => {
        if (!serviceChartRef.current) return;
        const ctx = serviceChartRef.current.getContext('2d');
        if (!ctx) return;

        const chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: revenueByService.labels,
                datasets: [{
                    label: 'Revenue',
                    data: revenueByService.data,
                    backgroundColor: CHART_COLORS,
                    borderColor: '#ffffff',
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#4B5563' }
                    },
                    title: {
                        display: true,
                        text: 'Revenue by Service',
                        font: { size: 16 },
                        color: '#111827'
                    }
                }
            }
        });

        return () => chart.destroy();
    }, [revenueByService]);

    // Effect for Subject Chart (Bar)
    useEffect(() => {
        if (!subjectChartRef.current) return;
        const ctx = subjectChartRef.current.getContext('2d');
        if (!ctx) return;

        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: revenueBySubject.labels,
                datasets: [{
                    label: 'Revenue',
                    data: revenueBySubject.data,
                    backgroundColor: 'rgba(59, 130, 246, 0.5)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 1,
                    borderRadius: 4,
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: 'Revenue by Subject',
                        font: { size: 16 },
                        color: '#111827'
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: { color: '#E5E7EB' },
                        ticks: { color: '#4B5563' },
                        title: {
                            display: true,
                            text: 'Revenue ($)',
                            color: '#4B5563'
                        }
                    },
                    y: {
                         grid: { display: false },
                         ticks: { color: '#4B5563' },
                    }
                }
            }
        });

        return () => chart.destroy();
    }, [revenueBySubject]);

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="revenue-modal-title"
        >
            <div className="bg-gray-50 rounded-2xl shadow-xl w-full max-w-4xl m-4 h-[90vh] max-h-[700px] flex flex-col">
                <header className="p-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
                    <h2 id="revenue-modal-title" className="text-xl font-bold text-gray-900">
                        Revenue Breakdown
                    </h2>
                    <button onClick={onClose} aria-label="Close" className="p-1 rounded-full text-gray-400 hover:bg-gray-100">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </header>
                <main className="flex-1 p-6 overflow-y-auto bg-white">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="p-4 bg-white rounded-lg">
                             <canvas ref={serviceChartRef}></canvas>
                        </div>
                        <div className="p-4 bg-white rounded-lg">
                            <canvas ref={subjectChartRef}></canvas>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};