import React, { useState, useMemo } from 'react';
import { Customer } from '../../types';

interface AdminCustomerTableProps {
    customers: Customer[];
}

const StatusBadge = ({ status }: { status: Customer['status'] }) => {
    const baseClasses = "flex items-center justify-center rounded-full h-8 px-4 text-sm font-medium leading-normal w-24";
    const statusClasses = status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    return <div className={`${baseClasses} ${statusClasses}`}><span className="truncate">{status}</span></div>;
};

export const AdminCustomerTable = ({ customers }: AdminCustomerTableProps) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCustomers = useMemo(() => {
        return customers.filter(customer =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [customers, searchTerm]);

    return (
        <div className="flex flex-col gap-4">
            <div>
                 <label className="sr-only" htmlFor="customer-search">Search Customers</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                         <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256" className="text-gray-400"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg>
                    </div>
                    <input
                        type="text"
                        id="customer-search"
                        placeholder="Search customers..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 bg-white text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Orders</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredCustomers.map(customer => (
                                <tr key={customer.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <img className="h-8 w-8 rounded-full" src={customer.avatar} alt={customer.name} />
                                            <div className="ml-3 text-gray-900 font-medium">{customer.name}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><StatusBadge status={customer.status} /></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{customer.totalOrders}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${customer.totalSpent.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(customer.lastLogin).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-800">Edit</button>
                                    </td>
                                </tr>
                            ))}
                            {filteredCustomers.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center py-10 text-gray-500">
                                        No customers found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};