import React, { useState } from 'react';

interface AuthModalProps {
    onClose: () => void;
    onLogin: (email: string) => void;
}

export const AuthModal = ({ onClose, onLogin }: AuthModalProps) => {
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
    const [email, setEmail] = useState('demo@user.com');
    const [password, setPassword] = useState('password');

    const handleLoginClick = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would handle form validation and API calls here
        onLogin(email);
    };

    return (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
            aria-labelledby="auth-modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md m-4 transform transition-all duration-300 ease-in-out scale-100">
                <div className="p-8">
                    <div className="flex justify-between items-start">
                         <div>
                            <h2 id="auth-modal-title" className="text-2xl font-bold text-gray-900">
                                {activeTab === 'login' ? 'Welcome Back!' : 'Create Your Account'}
                            </h2>
                            <p className="text-gray-500 mt-1">
                                {activeTab === 'login' ? 'Log in to continue to your dashboard.' : 'Get started by creating a new account.'}
                            </p>
                        </div>
                        <button onClick={onClose} aria-label="Close modal" className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <div className="mt-6 border-b border-gray-200">
                        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                            <button onClick={() => setActiveTab('login')} className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'login' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                                Log In
                            </button>
                             <button onClick={() => setActiveTab('register')} className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'register' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                                Register
                            </button>
                        </nav>
                    </div>

                    <form className="mt-6 space-y-5" onSubmit={handleLoginClick}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                            <div className="mt-1">
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                                    placeholder="you@example.com" 
                                    required 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                 />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password"className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="mt-1">
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                                    placeholder="••••••••" 
                                    required 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                         <div className="text-center text-xs text-gray-500 bg-gray-50 p-2 rounded-md">
                            <p>For demo purposes, you can use the pre-filled client credentials or log in as an administrator with:</p>
                            <p className="font-semibold text-gray-700 mt-1">admin@user.com / password</p>
                        </div>
                        <div className="pt-2">
                             <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-md">
                                {activeTab === 'login' ? 'Log In' : 'Create Account'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};