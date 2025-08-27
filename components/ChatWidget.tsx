import React, { useState, useEffect, useRef } from 'react';
import type { Chat } from '@google/genai';
import { createChatSession, sendMessageToChat } from '../services/geminiService';
import type { ChatMessage } from '../types';


const TypingIndicator = () => (
    <div className="flex items-center space-x-1 p-2">
        <span className="text-gray-500">Assistant is typing</span>
        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
    </div>
);

export const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'assistant', text: "Hello! How can I help you with our services today?" }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chat, setChat] = useState<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const toggleButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        // Initialize the chat session when component mounts
        try {
            const session = createChatSession();
            setChat(session);
        } catch (error) {
            console.error("Failed to initialize chat session:", error);
            setMessages(prev => [...prev, { role: 'assistant', text: "Sorry, the chat service is currently unavailable." }]);
        }
    }, []);

    useEffect(() => {
        // Scroll to the bottom of the message list whenever messages change
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    // Keyboard focus management
    useEffect(() => {
        if (isOpen) {
            // Focus the input field when the chat window opens
            setTimeout(() => inputRef.current?.focus(), 100); // Timeout helps ensure element is visible
        } else {
            // Return focus to the toggle button when the chat window closes
            toggleButtonRef.current?.focus();
        }
    }, [isOpen]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedInput = inputValue.trim();
        if (!trimmedInput || isLoading || !chat) return;

        const newMessages: ChatMessage[] = [...messages, { role: 'user', text: trimmedInput }];
        setMessages(newMessages);
        setInputValue('');
        setIsLoading(true);

        try {
            const responseText = await sendMessageToChat(chat, trimmedInput);
            setMessages([...newMessages, { role: 'assistant', text: responseText }]);
        } catch (error) {
             const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
             setMessages([...newMessages, { role: 'assistant', text: `Error: ${errorMessage}` }]);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="fixed bottom-8 right-8 z-50">
             {/* Chat Window */}
            <div 
                id="chat-window"
                role="dialog"
                aria-modal="true"
                aria-labelledby="chat-header"
                className={`transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                 <div className="w-80 h-[28rem] sm:w-96 sm:h-[32rem] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200">
                    <header className="bg-blue-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
                        <div>
                            <h3 id="chat-header" className="font-bold text-lg">AI Assistant</h3>
                            <p className="text-sm opacity-90">Typically replies instantly</p>
                        </div>
                         <button onClick={() => setIsOpen(false)} aria-label="Close chat" className="p-1 rounded-full hover:bg-white/20 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </header>
                    
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50" aria-live="polite">
                        <div className="space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-blue-500 text-white rounded-br-lg' : 'bg-gray-200 text-gray-800 rounded-bl-lg'}`}>
                                        <p className="text-sm">{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                             {isLoading && <TypingIndicator />}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                    
                    <footer className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
                        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Type your message..."
                                aria-label="Type your message"
                                className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                disabled={isLoading || !chat}
                            />
                            <button type="submit" aria-label="Send message" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed" disabled={isLoading || !inputValue.trim() || !chat}>
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                            </button>
                        </form>
                    </footer>
                </div>
            </div>
            
             {/* Floating Action Button */}
            <button
                ref={toggleButtonRef}
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close chat" : "Open chat"}
                aria-expanded={isOpen}
                aria-controls="chat-window"
                className={`transition-all duration-300 ease-in-out bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-blue-700 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            </button>
        </div>
    );
};