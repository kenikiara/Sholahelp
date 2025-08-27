import React, { useState } from 'react';
import { MOCK_USER_ORDERS, MOCK_ADMIN_CHAT_HISTORY } from '../constants';
import { OrderProgressCard } from '../components/OrderProgressCard';
import { OrderChatModal } from '../components/OrderChatModal';
import { AdminChat } from '../components/AdminChat';
import { UserOrder, OrderChatMessage, AdminChatMessage } from '../types';

interface DashboardProps {
    onNewOrderClick: () => void;
}

type DashboardTab = 'orders' | 'chat';

export const Dashboard = ({ onNewOrderClick }: DashboardProps) => {
    // State for My Orders
    const [orders, setOrders] = useState<UserOrder[]>(MOCK_USER_ORDERS);
    const [selectedOrder, setSelectedOrder] = useState<UserOrder | null>(null);

    // State for Admin Chat
    const [adminMessages, setAdminMessages] = useState<AdminChatMessage[]>(MOCK_ADMIN_CHAT_HISTORY);
    const [isAdminTyping, setIsAdminTyping] = useState(false);

    // General Dashboard State
    const [activeTab, setActiveTab] = useState<DashboardTab>('orders');
    
    const activeOrders = orders.filter(o => o.status !== 'Completed');
    const completedOrders = orders.filter(o => o.status === 'Completed');

    const handleOpenChat = (order: UserOrder) => {
        setSelectedOrder(order);
    };

    const handleCloseChat = () => {
        setSelectedOrder(null);
    };

    const handleSendOrderMessage = (orderId: string, message: Omit<OrderChatMessage, 'id' | 'timestamp'>) => {
        const newMessage: OrderChatMessage = {
            ...message,
            id: Date.now(),
            timestamp: new Date().toISOString(),
        };

        const updatedOrders = orders.map(order => {
            if (order.id === orderId) {
                const updatedChatHistory = [...order.chatHistory, newMessage];
                return { ...order, chatHistory: updatedChatHistory };
            }
            return order;
        });

        setOrders(updatedOrders);
        
        const updatedSelectedOrder = updatedOrders.find(o => o.id === orderId);
        if(updatedSelectedOrder) {
            setSelectedOrder(updatedSelectedOrder);
        }
    };
    
    const handleSendAdminMessage = (message: Omit<AdminChatMessage, 'id' | 'timestamp'>) => {
        const newMessage: AdminChatMessage = {
            ...message,
            id: Date.now(),
            timestamp: new Date().toISOString(),
        };
        setAdminMessages(prev => [...prev, newMessage]);
        
        // Simulate admin reply
        setIsAdminTyping(true);
        setTimeout(() => {
            const adminReply: AdminChatMessage = {
                id: Date.now() + 1,
                sender: 'admin',
                timestamp: new Date().toISOString(),
                text: "Thank you for your message. An admin will review your query and get back to you shortly."
            };
            setAdminMessages(prev => [...prev, adminReply]);
            setIsAdminTyping(false);
        }, 2000);
    };


    return (
        <>
            <div className="bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Your Dashboard</h1>
                        <button 
                            onClick={onNewOrderClick}
                            className="mt-4 sm:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            Place a New Order
                        </button>
                    </div>

                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200 mb-8">
                        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`py-3 px-1 border-b-2 font-semibold text-sm ${activeTab === 'orders' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-600 hover:text-gray-800'}`}
                            >
                                My Orders
                            </button>
                            <button
                                onClick={() => setActiveTab('chat')}
                                className={`py-3 px-1 border-b-2 font-semibold text-sm ${activeTab === 'chat' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-600 hover:text-gray-800'}`}
                            >
                                Admin Chat
                            </button>
                        </nav>
                    </div>
                    
                    {/* Conditional Content */}
                    {activeTab === 'orders' && (
                        <div>
                             {/* Active Orders */}
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Active Orders</h2>
                                {activeOrders.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {activeOrders.map(order => (
                                            <OrderProgressCard key={order.id} order={order} onOpenChat={handleOpenChat} />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-600 bg-gray-50 p-6 rounded-lg">You have no active orders at the moment.</p>
                                )}
                            </div>

                            <div className="my-12 border-t border-gray-200" />

                            {/* Completed Orders */}
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order History</h2>
                                {completedOrders.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {completedOrders.map(order => (
                                            <OrderProgressCard key={order.id} order={order} onOpenChat={handleOpenChat}/>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-600 bg-gray-50 p-6 rounded-lg">You have no completed orders yet.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'chat' && (
                        <AdminChat 
                            messages={adminMessages}
                            onSendMessage={handleSendAdminMessage}
                            isTyping={isAdminTyping}
                        />
                    )}

                </div>
            </div>
            {selectedOrder && (
                <OrderChatModal 
                    order={selectedOrder} 
                    onClose={handleCloseChat}
                    onSendMessage={handleSendOrderMessage}
                />
            )}
        </>
    );
};