import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
    SUBJECTS, 
    ACADEMIC_LEVELS, 
    DEADLINES, 
    ADDON_SERVICES, 
    BASE_PRICE_PER_PAGE 
} from '../constants';
import { OrderDetails, Addons, AddonKey, Service } from '../types';

interface OrderFormProps {
    onOrderAttempt: (price: number) => void;
    services: Service[];
}


const PageSlider = ({ value, onChange }: { value: number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    const words = value * 275;
    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <label htmlFor="pages" className="font-semibold text-gray-700">Pages</label>
                <div className="px-3 py-1 bg-blue-100 text-blue-700 font-bold rounded-full text-sm">
                    {value} <span className="font-normal">({words} words)</span>
                </div>
            </div>
            <input
                id="pages"
                name="pages"
                type="range"
                min="1"
                max="100"
                value={value}
                onChange={onChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
        </div>
    );
};

export const OrderForm = ({ onOrderAttempt, services }: OrderFormProps) => {
    const [orderDetails, setOrderDetails] = useState<OrderDetails>({
        academicLevel: 'undergrad',
        serviceId: services[0]?.id || 1,
        subjectId: SUBJECTS[0].id,
        pages: 1,
        deadline: DEADLINES.find(d => d.type === 'standard' && d.hours === 168)!.hours,
        addons: {
            powerpoint: false,
            turnitinAI: false,
            turnitinPlagiarism: false,
            copyLeaks: false,
            gptZero: false,
            originalityAI: false,
        },
    });
    const [price, setPrice] = useState(0);

    const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setOrderDetails(prev => ({
            ...prev,
            [name]: ['pages', 'deadline', 'serviceId', 'subjectId'].includes(name) ? parseInt(value) : value,
        }));
    };
    
    const handleLevelChange = (levelId: OrderDetails['academicLevel']) => {
        setOrderDetails(prev => ({ ...prev, academicLevel: levelId }));
    };

    const handleAddonToggle = (addonKey: AddonKey) => {
        setOrderDetails(prev => ({
            ...prev,
            addons: {
                ...prev.addons,
                [addonKey]: !prev.addons[addonKey],
            },
        }));
    };

    const selectedData = useMemo(() => {
        return {
            level: ACADEMIC_LEVELS.find(l => l.id === orderDetails.academicLevel),
            deadline: DEADLINES.find(d => d.hours === orderDetails.deadline),
            subject: SUBJECTS.find(s => s.id === orderDetails.subjectId),
            service: services.find(s => s.id === orderDetails.serviceId),
        }
    }, [orderDetails, services]);

    const calculatePrice = useCallback(() => {
        if (!selectedData.level || !selectedData.deadline || !selectedData.subject || !selectedData.service) {
            setPrice(0);
            return;
        }

        // 1. Calculate base paper price
        let paperPrice = BASE_PRICE_PER_PAGE * orderDetails.pages;
        
        // 2. Apply all multipliers
        paperPrice *= selectedData.level.multiplier;
        paperPrice *= selectedData.deadline.multiplier;
        paperPrice *= selectedData.subject.multiplier;
        paperPrice *= selectedData.service.multiplier;

        // 3. Calculate addon prices
        let addonsPrice = 0;
        for (const addon of ADDON_SERVICES) {
            if (orderDetails.addons[addon.id as AddonKey]) {
                if (addon.unit === 'per slide' || addon.unit === 'per page') {
                    // Assuming powerpoint slides are 1 per page for simplicity
                    addonsPrice += addon.price * orderDetails.pages;
                } else {
                    addonsPrice += addon.price;
                }
            }
        }
        
        setPrice(paperPrice + addonsPrice);

    }, [orderDetails, selectedData]);

    useEffect(() => {
        calculatePrice();
    }, [calculatePrice]);
    
    const handleOrderClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onOrderAttempt(price);
    };


    return (
        <div className="bg-white p-8 rounded-2xl shadow-2xl shadow-blue-500/10 border border-gray-100">
            <form>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="serviceId" className="block text-sm font-semibold text-gray-700 mb-2">Service</label>
                            <select id="serviceId" name="serviceId" value={orderDetails.serviceId} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                         <div>
                            <label htmlFor="subjectId" className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                            <select id="subjectId" name="subjectId" value={orderDetails.subjectId} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                {SUBJECTS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div>
                         <label className="block text-sm font-semibold text-gray-700 mb-2">Academic Level</label>
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                             {ACADEMIC_LEVELS.map(level => (
                                 <button key={level.id} type="button" onClick={() => handleLevelChange(level.id)} className={`px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${orderDetails.academicLevel === level.id ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                                     {level.name}
                                 </button>
                             ))}
                         </div>
                    </div>

                    <PageSlider value={orderDetails.pages} onChange={handleInputChange} />

                    <div>
                        <label htmlFor="deadline" className="block text-sm font-semibold text-gray-700 mb-2">Deadline</label>
                        <select id="deadline" name="deadline" value={orderDetails.deadline} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                           {DEADLINES.map(d => (
                                <option key={d.hours} value={d.hours} className={d.type === 'urgent' ? 'font-bold text-red-600' : ''}>
                                    {d.label} {d.type === 'urgent' && '(Urgent)'}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Services</label>
                        <div className="space-y-2">
                           {ADDON_SERVICES.map(addon => (
                                <label key={addon.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg has-[:checked]:bg-blue-50 has-[:checked]:ring-2 has-[:checked]:ring-blue-300 transition-all">
                                    <div className="flex items-center">
                                         <input type="checkbox" name={addon.id} checked={orderDetails.addons[addon.id as AddonKey]} onChange={() => handleAddonToggle(addon.id as AddonKey)} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
                                         <span className="ml-3 text-sm text-gray-700">{addon.name}</span>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-800">
                                       +${addon.price.toFixed(2)} <span className="text-gray-500 font-normal">{addon.unit}</span>
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg">
                        <span className="text-gray-600 font-semibold">Approx. price:</span>
                        <span className="text-3xl font-bold text-gray-900">${price.toFixed(2)}</span>
                    </div>

                    <button type="submit" onClick={handleOrderClick} className="w-full bg-orange-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-xl hover:-translate-y-0.5">
                        Proceed to Order
                    </button>
                </div>
            </form>
        </div>
    );
};