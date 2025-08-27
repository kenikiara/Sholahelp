
import React from 'react';

const StepCard = ({ number, title, description, icon }: { number: string, title: string, description: string, icon: React.ReactNode }) => (
    <div className="text-center">
        <div className="relative inline-block">
            <div className="mx-auto w-20 h-20 flex items-center justify-center bg-blue-100 rounded-full text-blue-600">
                {icon}
            </div>
            <span className="absolute -top-2 -left-2 w-10 h-10 flex items-center justify-center bg-blue-600 text-white font-bold text-lg rounded-full border-4 border-gray-50">
                {number}
            </span>
        </div>
        <h3 className="mt-6 text-xl font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
    </div>
);

export const HowItWorks = () => {
    return (
        <section className="bg-gray-50 py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Get Started in 3 Easy Steps</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Planning your paper is simple, fast, and completely transparent.
                    </p>
                </div>
                <div className="mt-16 grid md:grid-cols-3 gap-12 md:gap-8 relative">
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 mt-[-3rem]">
                       <svg width="100%" height="2" className="text-gray-300" preserveAspectRatio="none" viewBox="0 0 100 2">
                            <line x1="0" y1="1" x2="100" y2="1" stroke="currentColor" strokeWidth="2" strokeDasharray="8, 8"/>
                       </svg>
                    </div>
                     <div className="relative">
                        <StepCard
                            number="1"
                            title="Fill Out the Form"
                            description="Select your academic level, paper type, page count, and deadline to instantly see the estimated cost."
                            icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>}
                        />
                     </div>
                     <div className="relative">
                        <StepCard
                            number="2"
                            title="Generate Ideas (Optional)"
                            description="If you're stuck, use our free AI tool to brainstorm topics and create a solid outline for your paper."
                            icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
                        />
                     </div>
                     <div className="relative">
                        <StepCard
                            number="3"
                            title="Proceed to Order"
                            description="Happy with the plan and price? Proceed to our secure checkout to finalize your order with a human expert."
                            icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H7a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>}
                        />
                     </div>
                </div>
            </div>
        </section>
    );
};
