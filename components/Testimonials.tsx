
import React from 'react';

const testimonials = [
    {
        quote: "The AI topic generator is a lifesaver! I was completely stuck, and it gave me three solid ideas with outlines in less than a minute. It helped me structure my entire research paper.",
        author: "Sarah J.",
        school: "UCLA, Sociology",
        avatar: "https://picsum.photos/seed/sarah/100/100",
    },
    {
        quote: "I love the transparent pricing. With the calculator, I knew exactly what the cost would be upfront. No hidden fees, no surprises. Made budgeting for my dissertation much easier.",
        author: "Michael B.",
        school: "MIT, Engineering",
        avatar: "https://picsum.photos/seed/michael/100/100",
    },
    {
        quote: "As a PhD student, my requirements are very specific. The ability to choose the academic level ensures the pricing and planning are tailored to my needs. Excellent service!",
        author: "Dr. Emily R.",
        school: "Stanford, Literature",
        avatar: "https://picsum.photos/seed/emily/100/100",
    },
];

const TestimonialCard = ({ quote, author, school, avatar }: typeof testimonials[0]) => (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 h-full flex flex-col">
        <div className="flex-grow">
            <p className="text-gray-600 italic">"{quote}"</p>
        </div>
        <div className="mt-6 flex items-center">
            <img className="w-14 h-14 rounded-full" src={avatar} alt={author} />
            <div className="ml-4">
                <p className="font-bold text-gray-900">{author}</p>
                <p className="text-sm text-gray-500">{school}</p>
            </div>
        </div>
    </div>
);

export const Testimonials = () => {
    return (
        <section className="bg-white py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Loved by Students and Academics</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Don't just take our word for it. Here's what our users are saying about our platform.
                    </p>
                </div>
                <div className="mt-12 grid lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} {...testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
};
