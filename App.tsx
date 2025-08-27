import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';
import { AuthModal } from './components/AuthModal';
import { HomePage } from './pages/HomePage';
import { Dashboard } from './pages/Dashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { BlogPage } from './pages/BlogPage';
import { ArticlePage } from './pages/ArticlePage';
import { Service, Sample, Article } from './types';
import { SERVICES as initialServices, SAMPLES_DATA as initialSamples, MOCK_ARTICLES as initialArticles } from './constants';

// Declare PaystackPop for TypeScript
declare const PaystackPop: any;

type Page = 'home' | 'dashboard' | 'blog' | 'article';
type UserRole = 'client' | 'admin';

function App() {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [targetHash, setTargetHash] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [samples, setSamples] = useState<Sample[]>(initialSamples);
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);

  useEffect(() => {
    const elementId = targetHash?.substring(1);
    if (elementId) {
        // A short delay can help ensure the element is rendered, especially after a page change.
        setTimeout(() => {
            const element = document.getElementById(elementId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            setTargetHash(null); // Clear after attempting to scroll
        }, 100);
    } else {
        window.scrollTo(0, 0);
    }
  }, [currentPage, targetHash]);


  const navigateTo = (page: Page, hash?: string) => {
    if (page === 'dashboard' && !userRole) {
      setIsAuthModalOpen(true);
      return;
    }
    
    // If we're already on the page, just scroll.
    if (currentPage === page && hash) {
        const element = document.getElementById(hash.substring(1));
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } else {
        // Otherwise, change page and set hash for the effect to handle.
        setCurrentPage(page);
        if(hash) {
            setTargetHash(hash);
        }
    }
  };

  const handleLogin = (email: string) => {
    setCurrentUserEmail(email);
    if (email.toLowerCase() === 'admin@user.com') {
      setUserRole('admin');
      navigateTo('dashboard');
    } else {
      setUserRole('client');
      navigateTo('dashboard');
    }
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentUserEmail(null);
    navigateTo('home');
  };

  const handleViewArticle = (articleId: number) => {
    setSelectedArticleId(articleId);
    navigateTo('article');
  };
  
  const handleOrderAttempt = (price: number) => {
    if (!userRole || !currentUserEmail) {
      setIsAuthModalOpen(true);
      return;
    }
    
    const paystackHandler = PaystackPop.setup({
        key: 'pk_test_83a9e13c2261448188c16a9f39ad17097713760c', // Test Public Key
        email: currentUserEmail,
        amount: Math.round(price * 100), // Amount in kobo/cents
        currency: 'NGN', // Or 'USD', etc.
        ref: '' + Math.floor((Math.random() * 1000000000) + 1), // Generate a random reference
        callback: function(response: any) {
            // This function is called after payment is successful
            alert(`Payment successful! Transaction reference: ${response.reference}`);
            // Here you would typically save the order to your database
            // and then redirect the user.
            navigateTo('dashboard');
        },
        onClose: function() {
            // This function is called when the user closes the popup
            alert('Payment window closed.');
        }
    });

    paystackHandler.openIframe();
  };

  const renderContent = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage onOrderAttempt={handleOrderAttempt} services={services} samples={samples} />;
      case 'dashboard':
        if (userRole === 'client') return <Dashboard onNewOrderClick={() => navigateTo('home', '#order-form')} />;
        if (userRole === 'admin') return <AdminDashboard 
                                            services={services} onServicesUpdate={setServices} 
                                            samples={samples} onSamplesUpdate={setSamples}
                                            articles={articles} onArticlesUpdate={setArticles}
                                          />;
        return null;
      case 'blog':
        return <BlogPage articles={articles} onViewArticle={handleViewArticle} />;
      case 'article':
        const article = articles.find(a => a.id === selectedArticleId);
        return <ArticlePage article={article} onBack={() => navigateTo('blog')} />;
      default:
        return <HomePage onOrderAttempt={handleOrderAttempt} services={services} samples={samples} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 flex flex-col">
      <Header 
        userRole={userRole}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogoutClick={handleLogout}
        onNavigate={navigateTo}
      />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer 
        userRole={userRole}
        onAdminLoginClick={() => setIsAuthModalOpen(true)}
        onNavigate={navigateTo}
      />
      <ChatWidget />
      {isAuthModalOpen && (
        <AuthModal 
          onClose={() => setIsAuthModalOpen(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}

export default App;