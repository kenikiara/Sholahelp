import React, { useState, useEffect, useMemo } from 'react';
import { UserOrder } from '../types';

interface OrderProgressCardProps {
    order: UserOrder;
    onOpenChat: (order: UserOrder) => void;
}

const formatTimeLeft = (milliseconds: number) => {
    if (milliseconds <= 0) {
        return "Deadline Passed";
    }

    const totalSeconds = Math.floor(milliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const days = Math.floor(totalHours / 24);

    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

const StatusBadge = ({ status }: { status: UserOrder['status'] }) => {
    const baseClasses = "px-2.5 py-0.5 text-xs font-semibold rounded-full";
    const statusClasses = {
        'In Progress': 'bg-blue-100 text-blue-800',
        'Completed': 'bg-green-100 text-green-800',
        'Awaiting Writer': 'bg-yellow-100 text-yellow-800',
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

export const OrderProgressCard = ({ order, onOpenChat }: OrderProgressCardProps) => {
    const deadlineDate = useMemo(() => new Date(order.deadline), [order.deadline]);
    const [timeLeft, setTimeLeft] = useState(deadlineDate.getTime() - Date.now());

    useEffect(() => {
        if (order.status !== 'Completed') {
            const timer = setInterval(() => {
                const newTimeLeft = deadlineDate.getTime() - Date.now();
                if (newTimeLeft <= 0) {
                    clearInterval(timer);
                    setTimeLeft(0);
                } else {
                    setTimeLeft(newTimeLeft);
                }
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [deadlineDate, order.status]);

    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 transition-all hover:shadow-lg hover:border-blue-300 flex flex-col h-full">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-gray-100 pb-4 mb-4">
                <div>
                    <h3 className="font-bold text-lg text-gray-800">{order.serviceName}</h3>
                    <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                </div>
                <div className="mt-2 sm:mt-0">
                    <StatusBadge status={order.status} />
                </div>
            </div>
            
            <div className="space-y-3 text-sm flex-grow">
                 <div className="flex justify-between">
                    <span className="text-gray-500">Subject:</span>
                    <span className="font-medium text-gray-800 text-right">{order.subjectName}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">Pages:</span>
                    <span className="font-medium text-gray-800">{order.pages}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="text-gray-500">Deadline:</span>
                    <span className="font-medium text-gray-800">{deadlineDate.toLocaleString()}</span>
                </div>
            </div>
            
            {order.status !== 'Completed' && (
                <div className="mt-5 pt-5 border-t border-gray-100">
                    <p className="text-center text-sm text-gray-500 mb-1">Time Remaining:</p>
                    <p className="text-center text-2xl font-bold text-blue-600 tracking-tight">
                        {formatTimeLeft(timeLeft)}
                    </p>
                </div>
            )}
            
            <div className="mt-6">
                 <button 
                    onClick={() => onOpenChat(order)}
                    className="w-full bg-blue-100 text-blue-700 px-4 py-2.5 rounded-lg font-semibold hover:bg-blue-200 transition-colors duration-300 text-sm"
                 >
                    View Details & Chat
                </button>
            </div>
        </div>
    );
};