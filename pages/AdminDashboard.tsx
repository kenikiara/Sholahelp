import React, { useState, useMemo, useRef, useEffect } from 'react';
import { MOCK_ADMIN_ORDERS, MOCK_CUSTOMERS } from '../constants';
import { UserOrder, OrderChatMessage, Customer, Service, Sample, Article } from '../types';
import { AdminOrderDetailsModal } from '../components/admin/AdminOrderDetailsModal';
import { RevenueBreakdownModal } from '../components/admin/RevenueBreakdownModal';
import { OrdersListModal } from '../components/admin/OrdersListModal';
import { AdminOrderTable } from '../components/admin/AdminOrderTable';
import { AdminCustomerTable } from '../components/admin/AdminCustomerTable';
import { AdminServicesTable } from '../components/admin/AdminServicesTable';
import { EditServiceModal } from '../components/admin/EditServiceModal';
import { AdminSamplesTable } from '../components/admin/AdminSamplesTable';
import { EditSampleModal } from '../components/admin/EditSampleModal';
import { AdminBlogTable } from '../components/admin/AdminBlogTable';
import { EditArticleModal } from '../components/admin/EditArticleModal';


declare var Chart: any;

type AdminPage = 'dashboard' | 'orders' | 'customers' | 'services' | 'samples' | 'blog';

interface AdminDashboardProps {
    services: Service[];
    onServicesUpdate: React.Dispatch<React.SetStateAction<Service[]>>;
    samples: Sample[];
    onSamplesUpdate: React.Dispatch<React.SetStateAction<Sample[]>>;
    articles: Article[];
    onArticlesUpdate: React.Dispatch<React.SetStateAction<Article[]>>;
}

const StatCard = ({ title, value, onClick, isClickable = false }: { title: string; value: string | number; onClick?: () => void; isClickable?: boolean }) => (
    <div 
        className={`flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-white border border-gray-200 ${isClickable ? 'cursor-pointer hover:shadow-md hover:border-blue-300' : ''}`}
        onClick={onClick}
    >
        <p className="text-gray-600 text-base font-medium leading-normal">{title}</p>
        <p className="text-gray-900 tracking-light text-3xl font-bold leading-tight">{value}</p>
    </div>
);

const ChartContainer = ({ title, value, trend, trendColor, children }: { title: string, value: string, trend: string, trendColor: string, children: React.ReactNode }) => (
     <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-gray-200 p-6 bg-white">
        <p className="text-gray-800 text-base font-medium">{title}</p>
        <p className="text-gray-900 tracking-light text-[32px] font-bold truncate">{value}</p>
        <div className="flex gap-1">
            <p className="text-gray-500 text-base">vs. last period</p>
            <p className={`text-base font-medium ${trendColor}`}>{trend}</p>
        </div>
        <div className="h-48 mt-4">{children}</div>
    </div>
);


const RevenueChart = () => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (!chartRef.current) return;
        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;
        
        const gradient = ctx.createLinearGradient(0, 0, 0, 150);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Revenue',
                    data: [12000, 19000, 15000, 22000, 18000, 25000, 23000, 28000, 26000, 32000, 30000, 40000],
                    borderColor: '#3B82F6',
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.4,
                    fill: true,
                    backgroundColor: gradient,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { display: false },
                    y: { display: false }
                }
            }
        });
        return () => chart.destroy();
    }, []);
    return <canvas ref={chartRef}></canvas>;
}

const CompletionChart = () => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (!chartRef.current) return;
        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Completion Rate',
                    data: [82, 90, 91, 85, 88, 80],
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderColor: 'rgba(59, 130, 246, 0.5)',
                    borderWidth: 1,
                    borderRadius: 4,
                }]
            },
             options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                     x: { display: false },
                     y: { display: false }
                }
            }
        });
        return () => chart.destroy();
    }, []);
    return <canvas ref={chartRef}></canvas>;
}


const DashboardTabView = ({ orders, onViewOrder, onStatCardClick }: any) => {
    const totalRevenue = orders.reduce((acc, order) => acc + order.price, 0);
    const activeOrders = orders.filter(o => o.status !== 'Completed');
    const completedOrders = orders.filter(o => o.status === 'Completed');
    const totalOrders = orders.length;

    return (
        <div className="flex flex-col gap-8">
            <h2 className="text-2xl font-bold text-gray-800">Key Metrics</h2>
            <div className="flex flex-wrap gap-4">
              <StatCard title="Total Revenue" value={`$${totalRevenue.toLocaleString('en-US', {minimumFractionDigits: 2})}`} onClick={() => onStatCardClick('revenue')} isClickable />
              <StatCard title="Active Orders" value={activeOrders.length} onClick={() => onStatCardClick('active')} isClickable />
              <StatCard title="Completed Orders" value={completedOrders.length} onClick={() => onStatCardClick('completed')} isClickable />
              <StatCard title="Total Orders" value={totalOrders} />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 pt-5">Order Trends</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartContainer title="Revenue Over Time" value={`$${totalRevenue.toLocaleString()}`} trend="+15%" trendColor="text-green-600">
                    <RevenueChart/>
                </ChartContainer>
                <ChartContainer title="Order Completion Rate" value="80%" trend="-5%" trendColor="text-red-600">
                    <CompletionChart/>
                </ChartContainer>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 pt-5">Recent Orders</h2>
            <AdminOrderTable orders={orders} onViewOrder={onViewOrder} isCompact={true} />
        </div>
    );
};

export const AdminDashboard = ({ services, onServicesUpdate, samples, onSamplesUpdate, articles, onArticlesUpdate }: AdminDashboardProps) => {
    const [activeTab, setActiveTab] = useState<AdminPage>('dashboard');
    const [orders, setOrders] = useState<UserOrder[]>(MOCK_ADMIN_ORDERS);
    const [customers] = useState<Customer[]>(MOCK_CUSTOMERS);
    const [selectedOrder, setSelectedOrder] = useState<UserOrder | null>(null);
    const [isRevenueModalOpen, setIsRevenueModalOpen] = useState(false);
    const [isOrdersListModalOpen, setIsOrdersListModalOpen] = useState(false);
    const [modalOrders, setModalOrders] = useState<UserOrder[]>([]);
    const [modalTitle, setModalTitle] = useState('');

    const [isEditServiceModalOpen, setIsEditServiceModalOpen] = useState(false);
    const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null);

    const [isEditSampleModalOpen, setIsEditSampleModalOpen] = useState(false);
    const [sampleToEdit, setSampleToEdit] = useState<Sample | null>(null);

    const [isEditArticleModalOpen, setIsEditArticleModalOpen] = useState(false);
    const [articleToEdit, setArticleToEdit] = useState<Article | null>(null);


    const handleViewOrder = (order: UserOrder) => {
        setSelectedOrder(order);
        setIsOrdersListModalOpen(false);
    };

    const handleCloseModal = () => setSelectedOrder(null);

    const handleAdminSendMessage = (orderId: string, message: Omit<OrderChatMessage, 'id' | 'timestamp' | 'sender'>) => {
        const newMessage: OrderChatMessage = { ...message, id: Date.now(), timestamp: new Date().toISOString(), sender: 'admin' };
        const updatedOrders = orders.map(order => 
            order.id === orderId ? { ...order, chatHistory: [...order.chatHistory, newMessage] } : order
        );
        setOrders(updatedOrders);
        const updatedSelectedOrder = updatedOrders.find(o => o.id === orderId);
        if (updatedSelectedOrder) setSelectedOrder(updatedSelectedOrder);
    };
    
     const handleStatCardClick = (type: 'revenue' | 'active' | 'completed') => {
        if (type === 'revenue') {
            setIsRevenueModalOpen(true);
        } else if (type === 'active') {
            setModalTitle('Active Orders');
            setModalOrders(orders.filter(o => o.status !== 'Completed'));
            setIsOrdersListModalOpen(true);
        } else if (type === 'completed') {
            setModalTitle('Completed Orders');
            setModalOrders(orders.filter(o => o.status === 'Completed'));
            setIsOrdersListModalOpen(true);
        }
    };

    const handleAddNewService = () => {
        setServiceToEdit(null);
        setIsEditServiceModalOpen(true);
    };

    const handleEditService = (service: Service) => {
        setServiceToEdit(service);
        setIsEditServiceModalOpen(true);
    };
    
    const handleSaveService = (serviceToSave: Service) => {
        if (serviceToEdit) { // Editing existing
            onServicesUpdate(prev => prev.map(s => s.id === serviceToSave.id ? serviceToSave : s));
        } else { // Adding new
            const newService = { ...serviceToSave, id: Date.now() }; // Use timestamp for unique ID in this demo
            onServicesUpdate(prev => [...prev, newService]);
        }
        setIsEditServiceModalOpen(false);
        setServiceToEdit(null);
    };

    const handleAddNewSample = () => {
        setSampleToEdit(null);
        setIsEditSampleModalOpen(true);
    };

    const handleEditSample = (sample: Sample) => {
        setSampleToEdit(sample);
        setIsEditSampleModalOpen(true);
    };

    const handleSaveSample = (sampleToSave: Sample) => {
        if (sampleToEdit) { // Editing
            onSamplesUpdate(prev => prev.map(s => s.id === sampleToSave.id ? sampleToSave : s));
        } else { // Adding
            const newSample = { ...sampleToSave, id: Date.now(), isFeatured: true }; // New samples are featured by default
            onSamplesUpdate(prev => [...prev, newSample]);
        }
        setIsEditSampleModalOpen(false);
        setSampleToEdit(null);
    };
    
    const handleToggleFeaturedSample = (sampleId: number) => {
        onSamplesUpdate(prev => prev.map(s => s.id === sampleId ? { ...s, isFeatured: !s.isFeatured } : s));
    };

    const handleAddNewArticle = () => {
        setArticleToEdit(null);
        setIsEditArticleModalOpen(true);
    };

    const handleEditArticle = (article: Article) => {
        setArticleToEdit(article);
        setIsEditArticleModalOpen(true);
    };

    const handleSaveArticle = (articleToSave: Article) => {
        if (articleToEdit) { // Editing
            onArticlesUpdate(prev => prev.map(a => a.id === articleToSave.id ? articleToSave : a));
        } else { // Adding
            const newArticle = { ...articleToSave, id: Date.now() };
            onArticlesUpdate(prev => [...prev, newArticle]);
        }
        setIsEditArticleModalOpen(false);
        setArticleToEdit(null);
    };

    const handleTogglePublishedArticle = (articleId: number) => {
        onArticlesUpdate(prev => prev.map(a => a.id === articleId ? { ...a, isPublished: !a.isPublished } : a));
    };


    const renderPage = () => {
        switch(activeTab) {
            case 'dashboard':
                return <DashboardTabView orders={orders} onViewOrder={handleViewOrder} onStatCardClick={handleStatCardClick} />;
            case 'orders':
                return <AdminOrderTable orders={orders} onViewOrder={handleViewOrder} />;
            case 'customers':
                return <AdminCustomerTable customers={customers} />;
            case 'services':
                return <AdminServicesTable services={services} onAddService={handleAddNewService} onEditService={handleEditService} />;
            case 'samples':
                return <AdminSamplesTable samples={samples} onAddSample={handleAddNewSample} onEditSample={handleEditSample} onToggleFeatured={handleToggleFeaturedSample} />;
            case 'blog':
                return <AdminBlogTable articles={articles} onAddArticle={handleAddNewArticle} onEditArticle={handleEditArticle} onTogglePublished={handleTogglePublishedArticle} />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Panel</h1>

                <div className="border-b border-gray-200 mb-8 overflow-x-auto">
                    <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                        {(['dashboard', 'orders', 'customers', 'services', 'samples', 'blog'] as AdminPage[]).map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`capitalize whitespace-nowrap py-3 px-1 border-b-2 font-semibold text-sm ${activeTab === tab ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-600 hover:text-gray-800'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>
                
                <div>
                    {renderPage()}
                </div>
            </div>
            
            {selectedOrder && (
                <AdminOrderDetailsModal order={selectedOrder} allOrders={orders} onClose={handleCloseModal} onSendMessage={handleAdminSendMessage} />
            )}
            {isRevenueModalOpen && (
                <RevenueBreakdownModal orders={orders} onClose={() => setIsRevenueModalOpen(false)} />
            )}
            {isOrdersListModalOpen && (
                <OrdersListModal title={modalTitle} orders={modalOrders} onClose={() => setIsOrdersListModalOpen(false)} onViewOrder={handleViewOrder} />
            )}
            {isEditServiceModalOpen && (
                <EditServiceModal
                    service={serviceToEdit}
                    onClose={() => setIsEditServiceModalOpen(false)}
                    onSave={handleSaveService}
                />
            )}
            {isEditSampleModalOpen && (
                <EditSampleModal
                    sample={sampleToEdit}
                    onClose={() => setIsEditSampleModalOpen(false)}
                    onSave={handleSaveSample}
                />
            )}
            {isEditArticleModalOpen && (
                <EditArticleModal
                    article={articleToEdit}
                    onClose={() => setIsEditArticleModalOpen(false)}
                    onSave={handleSaveArticle}
                />
            )}
        </div>
    );
};