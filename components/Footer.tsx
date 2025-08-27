import React from 'react';

type Page = 'home' | 'dashboard' | 'blog' | 'article';

interface FooterProps {
    userRole: 'client' | 'admin' | null;
    onAdminLoginClick: () => void;
    onNavigate: (page: Page, hash?: string) => void;
}

const FooterLink = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void; }) => {
    const effectiveOnClick = onClick || (() => alert('This page is not yet implemented.'));
    
    return (
        <li>
            <button onClick={effectiveOnClick} className="text-gray-500 hover:text-blue-600 transition-colors duration-200 text-left w-full">
                {children}
            </button>
        </li>
    );
};


export const Footer = ({ userRole, onAdminLoginClick, onNavigate }: FooterProps) => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    <div className="col-span-2 lg:col-span-1">
                        <div className="flex items-center space-x-2">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 20h9"></path>
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                            </svg>
                            <span className="text-2xl font-bold text-gray-900">Scholar paperhelp</span>
                        </div>
                        <p className="mt-4 text-gray-500">High-quality papers from expert human writers.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 tracking-wider uppercase">Company</h3>
                        <ul className="mt-4 space-y-3">
                            <FooterLink>About Us</FooterLink>
                            <FooterLink>Contact</FooterLink>
                            <FooterLink onClick={() => onNavigate('blog')}>Blog</FooterLink>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 tracking-wider uppercase">Services</h3>
                        <ul className="mt-4 space-y-3">
                            <FooterLink onClick={() => onNavigate('home', '#services')}>All Services</FooterLink>
                            <FooterLink onClick={() => onNavigate('home', '#samples')}>Samples</FooterLink>
                            <FooterLink onClick={() => onNavigate('home', '#order-form')}>Price Calculator</FooterLink>
                            <FooterLink onClick={() => onNavigate('home', '#topic-generator')}>Topic Generator</FooterLink>
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-semibold text-gray-900 tracking-wider uppercase">Legal</h3>
                        <ul className="mt-4 space-y-3">
                            <FooterLink>Privacy Policy</FooterLink>
                            <FooterLink>Terms of Service</FooterLink>
                            <FooterLink>Cookie Policy</FooterLink>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                     {userRole !== 'admin' && (
                        <div className="mb-4">
                            <button onClick={onAdminLoginClick} className="text-sm text-gray-500 hover:text-blue-600 hover:underline transition-colors duration-200 cursor-pointer">
                                Admin Log In
                            </button>
                        </div>
                     )}
                    <p className="text-gray-500 text-sm">&copy; {currentYear} Scholar paperhelp. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};