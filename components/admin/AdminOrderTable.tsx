import React, { useState, useMemo } from 'react';
import { UserOrder } from '../../types';

interface AdminOrderTableProps {
    orders: UserOrder[];
    onViewOrder: (order: UserOrder) => void;
    isCompact?: boolean; // For dashboard view
}

const StatusBadge = ({ status }: { status: UserOrder['status'] }) => {
    const baseClasses = "px-2.5 py-0.5 text-xs font-semibold rounded-full inline-block";
    const statusClasses = {
        'In Progress': 'bg-blue-100 text-blue-800',
        'Completed': 'bg-green-100 text-green-800',
        'Awaiting Writer': 'bg-yellow-100 text-yellow-800',
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

export const AdminOrderTable = ({ orders, onViewOrder, isCompact = false }: AdminOrderTableProps) => {
    const [filterStatus, setFilterStatus] = useState<string>('All');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredOrders = useMemo(() => {
        return orders
            .filter(order => isCompact || filterStatus === 'All' || order.status === filterStatus)
            .filter(order => isCompact || order.id.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [orders, filterStatus, searchTerm, isCompact]);
    
    const displayOrders = isCompact ? filteredOrders.slice(0, 5) : filteredOrders;

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
           {!isCompact && (
             <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-grow">
                        <label htmlFor="search" className="sr-only">Search by Order ID</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256" className="text-gray-400"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg>
                            </div>
                            <input
                                type="text"
                                id="search"
                                placeholder="Search by Order ID..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 bg-white text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                     <div>
                        <label htmlFor="statusFilter" className="sr-only">Filter by status</label>
                        <select
                            id="statusFilter"
                            value={filterStatus}
                            onChange={e => setFilterStatus(e.target.value)}
                            className="w-full sm:w-auto px-4 py-2 border border-gray-300 bg-white text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="All">All Statuses</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Awaiting Writer">Awaiting Writer</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                </div>
            </div>
           )}
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">View</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {displayOrders.map(order => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button onClick={() => onViewOrder(order)} className="flex items-center text-left hover:opacity-80 transition-opacity">
                                        <img className="h-8 w-8 rounded-full" src={order.userAvatar} alt={order.userName} />
                                        <div className="ml-3 text-gray-900">{order.userName}</div>
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.serviceName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><StatusBadge status={order.status} /></td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.deadline).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${order.price.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => onViewOrder(order)} className="text-blue-600 hover:text-blue-800">View</button>
                                </td>
                            </tr>
                        ))}
                         {displayOrders.length === 0 && (
                            <tr>
                                <td colSpan={7} className="text-center py-10 text-gray-500">
                                    No orders match the current filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};