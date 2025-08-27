import React, { useState } from 'react';

type Page = 'home' | 'dashboard' | 'blog' | 'article';

interface HeaderProps {
    userRole: 'client' | 'admin' | null;
    onLoginClick: () => void;
    onLogoutClick: () => void;
    onNavigate: (page: Page, hash?: string) => void;
}

const Logo = ({ onNavigate }: { onNavigate: (page: 'home') => void }) => (
    <button onClick={() => onNavigate('home')} className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1">
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
        </svg>
        <span className="text-2xl font-bold text-gray-900">Scholar paperhelp</span>
    </button>
);

export const Header = ({ userRole, onLoginClick, onLogoutClick, onNavigate }: HeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isLoggedIn = userRole !== null;

    const navLinks = [
        { name: "Services", hash: "#services" },
        { name: "How It Works", hash: "#how-it-works" },
        { name: "Samples", hash: "#samples" },
        { name: "Testimonials", hash: "#testimonials" },
        { name: "FAQ", hash: "#faq" }
    ];

    const handleNavClick = (hash: string, closeMenu = false) => {
        onNavigate('home', hash);
        if (closeMenu) setIsMenuOpen(false);
    }

    const handlePageClick = (page: 'blog' | 'dashboard', closeMenu = false) => {
        onNavigate(page);
        if (closeMenu) setIsMenuOpen(false);
    }

    return (
        <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Logo onNavigate={() => onNavigate('home')}/>
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map(link => (
                            <button key={link.name} onClick={() => handleNavClick(link.hash)} className="text-gray-600 hover:text-blue-600 transition-colors duration-200">{link.name}</button>
                        ))}
                        <button onClick={() => handlePageClick('blog')} className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Blog</button>
                    </nav>
                    <div className="flex items-center">
                         {isLoggedIn ? (
                            <>
                                <button onClick={() => handlePageClick('dashboard')} className="hidden sm:inline-block text-gray-600 mr-4 hover:text-blue-600 transition-colors duration-200">
                                    {userRole === 'admin' ? 'Admin Panel' : 'Dashboard'}
                                </button>
                                <button onClick={onLogoutClick} className="hidden sm:inline-block text-gray-600 mr-6 hover:text-blue-600 transition-colors duration-200">Log Out</button>
                            </>
                        ) : (
                             <button onClick={onLoginClick} className="hidden sm:inline-block text-gray-600 mr-6 hover:text-blue-600 transition-colors duration-200">Log In</button>
                        )}
                        <button onClick={() => handleNavClick('#order-form')} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-md">
                            Order Now
                        </button>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden ml-4 p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-4 6h4"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="px-4 pt-2 pb-4 space-y-2">
                        {navLinks.map(link => (
                            <button key={link.name} onClick={() => handleNavClick(link.hash, true)} className="w-full text-left block py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200">{link.name}</button>
                        ))}
                         <button onClick={() => handlePageClick('blog', true)} className="w-full text-left block py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200">Blog</button>
                         {isLoggedIn ? (
                            <>
                                <button onClick={() => handlePageClick('dashboard', true)} className="w-full text-left block py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200">
                                    {userRole === 'admin' ? 'Admin Panel' : 'Dashboard'}
                                </button>
                                <button onClick={() => { onLogoutClick(); setIsMenuOpen(false); }} className="w-full text-left block py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200">Log Out</button>
                            </>
                        ) : (
                            <button onClick={() => { onLoginClick(); setIsMenuOpen(false); }} className="w-full text-left block py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200">Log In</button>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};