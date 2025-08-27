import React, { useState, useRef, useEffect } from 'react';
import { AdminChatMessage } from '../types';

interface AdminChatProps {
    messages: AdminChatMessage[];
    onSendMessage: (message: Omit<AdminChatMessage, 'id' | 'timestamp'>) => void;
    isTyping: boolean;
}

const TypingIndicator = () => (
    <div className="flex items-end gap-2 justify-start">
        <div className="px-4 py-3 rounded-2xl bg-white text-gray-800 rounded-bl-none shadow-sm">
            <div className="flex items-center space-x-1.5">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            </div>
        </div>
    </div>
);


const MessageBubble = ({ msg }: { msg: AdminChatMessage }) => {
    const isUser = msg.sender === 'user';
    
    return (
        <div className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] sm:max-w-[75%] px-4 py-3 rounded-2xl shadow-sm ${isUser ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
                {msg.attachment && (
                    <div className={`flex items-center gap-2 mb-1 p-2 rounded-lg ${isUser ? 'bg-white/20' : 'bg-gray-100 border border-gray-200'}`}>
                        <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                        <div className="text-xs">
                            <p className="font-semibold break-all">{msg.attachment.fileName}</p>
                            <p className="opacity-80">{msg.attachment.fileSize}</p>
                        </div>
                    </div>
                )}
                {msg.text && <p className="text-sm whitespace-pre-wrap">{msg.text}</p>}
                 <p className={`text-xs mt-1.5 opacity-70 ${isUser ? 'text-right' : 'text-left'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
            </div>
        </div>
    );
};

export const AdminChat = ({ messages, onSendMessage, isTyping }: AdminChatProps) => {
    const [text, setText] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    useEffect(() => {
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

        const message: Omit<AdminChatMessage, 'id' | 'timestamp'> = { sender: 'user' };
        if (text.trim()) message.text = text.trim();
        if (file) {
            message.attachment = {
                fileName: file.name,
                fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
                fileUrl: '#',
            };
        }

        onSendMessage(message);
        setText('');
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="bg-gray-100 rounded-xl shadow-inner border border-gray-200 h-[70vh] max-h-[600px] flex flex-col overflow-hidden" style={{ backgroundImage: "url('https://i.imgur.com/4gA52T7.png')" }}>
            {/* Header */}
            <header className="p-3 bg-gray-50/90 backdrop-blur-sm border-b border-gray-200 flex items-center space-x-3 flex-shrink-0">
                 <div className="relative">
                    <img className="w-11 h-11 rounded-full" src="https://i.pravatar.cc/150?u=admin" alt="Admin" />
                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900">Admin Support</h3>
                    <p className="text-xs text-gray-600">Typically replies within a few minutes</p>
                </div>
            </header>
            
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map(msg => <MessageBubble key={msg.id} msg={msg} />)}
                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <footer className="p-3 border-t border-gray-200 bg-gray-50/90 backdrop-blur-sm flex-shrink-0">
                {file && (
                    <div className="mb-2 p-2 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 truncate">
                            <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                            <span className="truncate">{file.name}</span>
                        </div>
                        <button onClick={() => setFile(null)} className="p-0.5 rounded-full hover:bg-gray-200 flex-shrink-0">
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                )}
                <form onSubmit={handleSend} className="flex items-end space-x-2">
                    <textarea
                        ref={textareaRef}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type a message..."
                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(e); } }}
                        className="flex-1 w-full p-3 bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 resize-none max-h-32 text-sm"
                        aria-label="Type your message"
                        rows={1}
                    />
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                    <button type="button" onClick={() => fileInputRef.current?.click()} aria-label="Attach file" className="p-3 text-gray-500 hover:text-blue-600 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                    </button>
                    <button type="submit" aria-label="Send message" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed flex-shrink-0" disabled={!text.trim() && !file}>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
                    </button>
                </form>
            </footer>
        </div>
    );
};