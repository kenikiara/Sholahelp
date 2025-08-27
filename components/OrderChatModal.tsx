import React, { useState, useRef, useEffect } from 'react';
import { UserOrder, OrderChatMessage } from '../types';

interface OrderChatModalProps {
    order: UserOrder;
    onClose: () => void;
    onSendMessage: (orderId: string, message: Omit<OrderChatMessage, 'id' | 'timestamp'>) => void;
}

const ChatMessageBubble = ({ msg }: { msg: OrderChatMessage }) => {
    const isUser = msg.sender === 'user';
    
    return (
        <div className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl ${isUser ? 'bg-blue-600 text-white rounded-br-lg' : 'bg-gray-200 text-gray-800 rounded-bl-lg'}`}>
                {msg.text && <p className="text-sm whitespace-pre-wrap">{msg.text}</p>}
                {msg.attachment && (
                    <div className="flex items-center gap-2 mt-1 p-2 bg-white/20 rounded-lg">
                        <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
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
        </div>
    );
};


export const OrderChatModal = ({ order, onClose, onSendMessage }: OrderChatModalProps) => {
    const [text, setText] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [order.chatHistory]);
    
    useEffect(() => {
        // Auto-resize textarea
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [text]);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim() && !file) return;

        const message: Omit<OrderChatMessage, 'id' | 'timestamp'> = { sender: 'user' };

        if (text.trim()) {
            message.text = text.trim();
        }
        if (file) {
            message.attachment = {
                fileName: file.name,
                fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
                fileUrl: '#', // In a real app, this would be an uploaded URL
            };
        }

        onSendMessage(order.id, message);

        setText('');
        setFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-modal-title"
        >
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg m-4 h-[90vh] max-h-[700px] flex flex-col transform transition-all duration-300 ease-in-out scale-100">
                {/* Header */}
                <header className="p-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
                    <div>
                        <h2 id="chat-modal-title" className="text-lg font-bold text-gray-900">
                            {order.serviceName}
                        </h2>
                        <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                    </div>
                    <button onClick={onClose} aria-label="Close chat" className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </header>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
                    {order.chatHistory.map(msg => <ChatMessageBubble key={msg.id} msg={msg} />)}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <footer className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
                     {file && (
                        <div className="mb-2 p-2 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between text-sm">
                           <div className="flex items-center gap-2">
                             <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                             <span>{file.name}</span>
                           </div>
                            <button onClick={() => setFile(null)} className="p-0.5 rounded-full hover:bg-gray-200">
                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                    )}
                    <form onSubmit={handleSend} className="flex items-end space-x-3">
                        <textarea
                            ref={textareaRef}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Type a message... (Shift+Enter for new line)"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend(e);
                                }
                            }}
                            className="flex-1 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none max-h-32"
                            aria-label="Type your message"
                            rows={1}
                        />
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                        <button type="button" onClick={() => fileInputRef.current?.click()} aria-label="Attach file" className="p-3 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors">
                           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                        </button>
                        <button type="submit" aria-label="Send message" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed flex-shrink-0" disabled={!text.trim() && !file}>
                            <svg className="h-6 w-6 transform rotate-90" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                        </button>
                    </form>
                </footer>
            </div>
        </div>
    );
};
