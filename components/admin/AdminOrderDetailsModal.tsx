import React, { useState, useRef, useEffect, useMemo } from 'react';
import { UserOrder, OrderChatMessage } from '../../types';

interface AdminOrderDetailsModalProps {
    order: UserOrder;
    allOrders: UserOrder[]; // All orders to calculate customer stats
    onClose: () => void;
    onSendMessage: (orderId: string, message: Omit<OrderChatMessage, 'id' | 'timestamp' | 'sender'>) => void;
}

const ChatMessageBubble = ({ msg, order }: { msg: OrderChatMessage, order: UserOrder }) => {
    const isUser = msg.sender === 'user';
    const isWriter = msg.sender === 'writer';
    const isAdmin = msg.sender === 'admin';

    const senderName = isUser ? order.userName : isWriter ? 'Writer' : 'Admin Support';
    const avatarUrl = isUser 
        ? order.userAvatar 
        : isWriter 
        ? `https://i.pravatar.cc/150?u=writer${order.id}` 
        : `https://i.pravatar.cc/150?u=admin`;

    const bubbleClasses = isUser 
        ? 'bg-blue-600 text-white rounded-br-lg' 
        : isAdmin
        ? 'bg-teal-600 text-white rounded-bl-lg'
        : 'bg-gray-200 text-gray-800 rounded-bl-lg';
    
    const attachmentClasses = isUser ? 'bg-white/20' : 'bg-white/60';

    return (
        <div className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && (
                <img src={avatarUrl} alt={senderName} className="w-8 h-8 rounded-full flex-shrink-0" />
            )}
             <div className={`max-w-[80%] p-3 rounded-2xl ${bubbleClasses}`}>
                 <p className={`text-xs font-bold mb-1 ${isUser ? 'text-blue-200' : isAdmin ? 'text-teal-200' : 'text-gray-500'}`}>{senderName}</p>
                {msg.text && <p className="text-sm whitespace-pre-wrap">{msg.text}</p>}
                {msg.attachment && (
                    <div className={`flex items-center gap-2 mt-1 p-2 rounded-lg ${attachmentClasses}`}>
                        <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        <div className="text-xs">
                            <p className="font-semibold break-all">{msg.attachment.fileName}</p>
                            <p className="opacity-80">{msg.attachment.fileSize}</p>
                        </div>
                    </div>
                )}
                 <p className={`text-xs mt-1 opacity-70 ${isUser ? 'text-right' : 'text-left'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
            </div>
             {isUser && (
                 <img src={avatarUrl} alt={senderName} className="w-8 h-8 rounded-full flex-shrink-0" />
            )}
        </div>
    );
};


export const AdminOrderDetailsModal = ({ order, allOrders, onClose, onSendMessage }: AdminOrderDetailsModalProps) => {
    const [text, setText] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" }); // use auto for initial load
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [order.chatHistory]);
    
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [text]);

    const customerStats = useMemo(() => {
        const customerOrders = allOrders.filter(o => o.userName === order.userName);
        const totalValue = customerOrders.reduce((acc, curr) => acc + curr.price, 0);
        return {
            totalOrders: customerOrders.length,
            totalValue,
        };
    }, [allOrders, order.userName]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim() && !file) return;

        const message: Omit<OrderChatMessage, 'id' | 'timestamp' | 'sender'> = {};

        if (text.trim()) message.text = text.trim();
        if (file) {
            message.attachment = {
                fileName: file.name,
                fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
                fileUrl: '#',
            };
        }

        onSendMessage(order.id, message);

        setText('');
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-modal-title"
        >
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl m-4 h-[90vh] max-h-[800px] flex flex-col text-gray-800">
                <header className="p-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
                    <div>
                        <h2 id="chat-modal-title" className="text-lg font-bold">
                            {order.serviceName}
                        </h2>
                        <p className="text-sm text-gray-500">Order ID: {order.id} | Customer: {order.userName}</p>
                    </div>
                    <button onClick={onClose} aria-label="Close" className="p-1 rounded-full text-gray-400 hover:bg-gray-100">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </header>
                
                <div className="flex-1 flex overflow-hidden">
                    <aside className="w-1/3 border-r border-gray-200 p-4 overflow-y-auto bg-gray-50">
                        <h3 className="font-semibold text-gray-900">Order Details</h3>
                        <div className="mt-4 space-y-3 text-sm">
                             <div className="flex justify-between">
                                <span className="text-gray-500">Status:</span>
                                <span className="font-medium">{order.status}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Subject:</span>
                                <span className="font-medium text-right">{order.subjectName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Pages:</span>
                                <span className="font-medium">{order.pages}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Deadline:</span>
                                <span className="font-medium">{new Date(order.deadline).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">Price:</span>
                                <span className="font-bold text-lg text-green-600">${order.price.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <h4 className="font-semibold text-sm text-gray-900">Customer Snapshot</h4>
                             <div className="mt-3 space-y-2 text-sm p-3 bg-white border border-gray-200 rounded-lg">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Total Orders:</span>
                                    <span className="font-medium text-gray-800">{customerStats.totalOrders}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Lifetime Value:</span>
                                    <span className="font-medium text-gray-800">${customerStats.totalValue.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                         <div className="mt-6">
                            <h4 className="font-semibold text-sm text-gray-900">Project Requirements</h4>
                            <div className="mt-2 p-3 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 max-h-60 overflow-y-auto">
                                <p className="whitespace-pre-wrap">{order.projectDetails}</p>
                            </div>
                        </div>
                    </aside>

                    <main className="flex-1 flex flex-col bg-white">
                        <div className="p-4 border-b border-gray-200">
                             <h3 className="font-semibold text-gray-900">Order Conversation</h3>
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto bg-gray-100 space-y-4" style={{ backgroundImage: "url('https://i.imgur.com/4gA52T7.png')" }}>
                            {order.chatHistory.map(msg => <ChatMessageBubble key={msg.id} msg={msg} order={order} />)}
                            <div ref={messagesEndRef} />
                        </div>
                         <footer className="p-3 bg-gray-50 border-t border-gray-200">
                           {file && (
                                <div className="mb-2 p-2 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 truncate">
                                    <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                                    <span className="truncate">{file.name}</span>
                                </div>
                                <button onClick={() => setFile(null)} className="p-0.5 rounded-full hover:bg-gray-200 flex-shrink-0">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                                </div>
                            )}
                            <form onSubmit={handleSend} className="flex items-end space-x-2">
                                <textarea
                                    ref={textareaRef}
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Send a message as Admin..."
                                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(e); } }}
                                    className="flex-1 w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none max-h-32 text-sm placeholder:text-gray-500"
                                    aria-label="Type your message"
                                    rows={1}
                                />
                                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                                <button type="button" onClick={() => fileInputRef.current?.click()} aria-label="Attach file" className="p-3 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                                </button>
                                <button type="submit" aria-label="Send message" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed flex-shrink-0" disabled={!text.trim() && !file}>
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
                                </button>
                            </form>
                        </footer>
                    </main>
                </div>
            </div>
        </div>
    );
};