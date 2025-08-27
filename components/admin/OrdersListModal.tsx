import React from 'react';
import { UserOrder } from '../../types';

interface OrdersListModalProps {
    title: string;
    orders: UserOrder[];
    onClose: () => void;
    onViewOrder: (order: UserOrder) => void;
}

export const OrdersListModal = ({ title, orders, onClose, onViewOrder }: OrdersListModalProps) => {
    return (
        <div 
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="orders-list-modal-title"
        >
            <div className="bg-white text-gray-800 rounded-2xl shadow-xl w-full max-w-2xl m-4 h-[90vh] max-h-[600px] flex flex-col">
                <header className="p-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
                    <h2 id="orders-list-modal-title" className="text-xl font-bold">
                        {title} ({orders.length})
                    </h2>
                    <button onClick={onClose} aria-label="Close" className="p-1 rounded-full text-gray-400 hover:bg-gray-100">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </header>
                <main className="flex-1 p-2 sm:p-4 overflow-y-auto bg-gray-50">
                    <div className="divide-y divide-gray-200">
                        {orders.length > 0 ? orders.map(order => (
                            <div key={order.id} className="p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:bg-white rounded-lg">
                                <div className="flex items-center gap-3">
                                    <img src={order.userAvatar} alt={order.userName} className="w-10 h-10 rounded-full" />
                                    <div>
                                        <p className="font-semibold text-gray-900">{order.id}</p>
                                        <p className="text-sm text-gray-500">{order.userName} - {order.serviceName}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 mt-3 sm:mt-0 w-full sm:w-auto">
                                     <p className="font-semibold text-sm w-full sm:w-auto text-right sm:text-left text-gray-800">${order.price.toFixed(2)}</p>
                                    <button 
                                        onClick={() => onViewOrder(order)}
                                        className="bg-blue-600 text-white px-4 py-1.5 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 text-sm flex-shrink-0"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        )) : (
                            <p className="text-center text-gray-500 py-10">No orders to display.</p>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};