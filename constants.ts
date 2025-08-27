import { UserOrder, AdminChatMessage, Customer, Service, Sample, Article } from './types';

// --- CORE PRICING CONFIGURATION ---
// Base price per page (275 words). All multipliers are applied to this price.
export const BASE_PRICE_PER_PAGE = 12.00;

// --- DYNAMIC CONTENT & PRICING MULTIPLIERS ---
// In a real application, this data would be fetched from a database via an admin panel.
// To update your offerings, you can edit the objects below.

export const ACADEMIC_LEVELS = [
    { id: 'high_school', name: 'High School', multiplier: 1.0 },
    { id: 'undergrad', name: 'Undergraduate', multiplier: 1.15 },
    { id: 'master', name: 'Master', multiplier: 1.30 },
    { id: 'phd', name: 'PhD', multiplier: 1.50 },
] as const;

export const DEADLINES = [
    // Urgent Deadlines (3 to 19 hours)
    { hours: 3, label: '3 hours', multiplier: 2.5, type: 'urgent' },
    { hours: 6, label: '6 hours', multiplier: 2.2, type: 'urgent' },
    { hours: 12, label: '12 hours', multiplier: 1.9, type: 'urgent' },
    
    // Standard Deadlines (24 hours onwards)
    { hours: 24, label: '24 hours', multiplier: 1.5, type: 'standard' },
    { hours: 48, label: '2 days', multiplier: 1.25, type: 'standard' },
    { hours: 72, label: '3 days', multiplier: 1.1, type: 'standard' },
    { hours: 168, label: '7 days', multiplier: 1.0, type: 'standard' },
    { hours: 336, label: '14 days', multiplier: 0.9, type: 'standard' },
];

export const SUBJECTS = [
    { id: 1, name: 'General', multiplier: 1.0 },
    { id: 2, name: 'English & Literature', multiplier: 1.0 },
    { id: 3, name: 'History', multiplier: 1.0 },
    { id: 4, name: 'Psychology', multiplier: 1.05 },
    { id: 5, name: 'Business & Management', multiplier: 1.05 },
    { id: 6, name: 'Sociology', multiplier: 1.0 },
    { id: 7, name: 'Law', multiplier: 1.1 },
    { id: 8, name: 'STEM (Science, Tech, Engineering, Math)', multiplier: 1.2 },
    { id: 9, name: 'Medical & Healthcare', multiplier: 1.15 },
];

export const SERVICES: Service[] = [
  { id: 1, name: 'Essay Writing', icon: '📝', multiplier: 1.0 },
  { id: 2, name: 'Research Paper', icon: '🔬', multiplier: 1.1 },
  { id: 3, name: 'Dissertation', icon: '🎓', multiplier: 1.2 },
  { id: 4, name: 'Editing & Proofreading', icon: '✍️', multiplier: 0.7 },
  { id: 5, name: 'Coursework Help', icon: '📚', multiplier: 1.0 },
  { id: 6, name: 'Case Study Analysis', icon: '📊', multiplier: 1.05 },
  { id: 7, name: 'Thesis Writing', icon: '🏛️', multiplier: 1.15 },
  { id: 8, name: 'Admission Essay', icon: '📨', multiplier: 1.0 },
];

export const ADDON_SERVICES = [
    { id: 'powerpoint', name: 'PowerPoint Slides', price: 5.00, unit: 'per slide' },
    { id: 'turnitinAI', name: 'Turnitin AI Report', price: 7.99, unit: 'flat fee' },
    { id: 'turnitinPlagiarism', name: 'Turnitin Plagiarism Report', price: 9.99, unit: 'flat fee' },
    { id: 'copyLeaks', name: 'CopyLeaks Report', price: 6.99, unit: 'flat fee' },
    { id: 'gptZero', name: 'GPTZero Report', price: 6.99, unit: 'flat fee' },
    { id: 'originalityAI', name: 'Originality.ai Report', price: 6.99, unit: 'flat fee' },
];

// --- SAMPLE MANAGEMENT ---
// Add up to 100 samples here. `fileUrl` would point to the actual file in a real backend.
export const SAMPLES_DATA: Sample[] = [
    { id: 1, title: 'The Impact of Social Media on Modern Politics', subject: 'Sociology', academicLevel: 'Undergraduate', pages: 10, fileUrl: '#', isFeatured: true },
    { id: 2, title: 'An Analysis of Shakespeare\'s Othello', subject: 'English & Literature', academicLevel: 'High School', pages: 5, fileUrl: '#', isFeatured: true },
    { id: 3, title: 'Machine Learning Algorithms in Healthcare', subject: 'STEM (Science, Tech, Engineering, Math)', academicLevel: 'Master', pages: 25, fileUrl: '#', isFeatured: true },
    { id: 4, title: 'The Role of Ethics in Corporate Law', subject: 'Law', academicLevel: 'PhD', pages: 50, fileUrl: '#', isFeatured: true },
    { id: 5, title: 'A Case Study on Apple Inc.\'s Marketing Strategy', subject: 'Business & Management', academicLevel: 'Undergraduate', pages: 12, fileUrl: '#', isFeatured: true },
    { id: 6, title: 'Cognitive Behavioral Therapy for Anxiety Disorders', subject: 'Psychology', academicLevel: 'Master', pages: 18, fileUrl: '#', isFeatured: false },
    { id: 7, title: 'The Causes and Effects of the American Civil War', subject: 'History', academicLevel: 'High School', pages: 8, fileUrl: '#', isFeatured: false },
    { id: 8, title: 'Patient Privacy in the Digital Age of Medicine', subject: 'Medical & Healthcare', academicLevel: 'Master', pages: 20, fileUrl: '#', isFeatured: true },
];

// --- BLOG MANAGEMENT ---
export const MOCK_ARTICLES: Article[] = [
    {
        id: 1,
        title: "Mastering the Thesis Statement: A Step-by-Step Guide",
        author: "Dr. Jane Foster",
        category: "Writing Tips",
        date: "2024-07-15T10:00:00Z",
        excerpt: "The thesis statement is the backbone of any academic paper. This guide breaks down how to craft a strong, arguable, and concise thesis that will guide your writing and impress your professor.",
        content: "A strong thesis statement is the cornerstone of a successful academic paper. It's not just a topic; it's an argument, a claim that you will spend the rest of your paper proving. Let's explore the key components of an effective thesis statement.\n\nFirst, a thesis must be arguable. This means it must take a stand on an issue. A statement like 'World War II was a major conflict' is a fact, not a thesis. A better, arguable thesis would be, 'The economic policies of the Allied powers were the single most significant factor in the outcome of World War II.' This is a claim that can be debated and supported with evidence.\n\nSecond, it needs to be specific. Avoid vague language. Instead of 'Social media is bad for society,' try 'The rise of algorithm-driven content on social media platforms has led to increased political polarization by creating echo chambers.' This gives your paper a clear focus.\n\nFinally, a good thesis acts as a roadmap for your paper. It should hint at the structure of your argument. For the social media example, the reader can expect the paper to define echo chambers, explain how algorithms create them, and then provide evidence of increased political polarization.",
        imageUrl: `https://picsum.photos/seed/blog1/800/600`,
        isPublished: true,
    },
    {
        id: 2,
        title: "5 Common Plagiarism Traps and How to Avoid Them",
        author: "John Carter",
        category: "Academic Integrity",
        date: "2024-07-10T14:30:00Z",
        excerpt: "Plagiarism can have serious consequences, but sometimes it's unintentional. Learn about the most common traps students fall into and how to ensure your work is always original.",
        content: "Academic integrity is paramount, and avoiding plagiarism is a key part of it. Here are five common traps to watch out for:\n\n1. **Patchwriting:** This is when you take a source's text and only change a few words. Even if you cite it, it's too close to the original and is considered plagiarism. The solution? Read the source, understand the idea, and then write it in your own words without looking at the original text.\n\n2. **Improper Citation:** Forgetting to cite a source, or using the wrong citation format, can be flagged as plagiarism. Always double-check your citations and use a reliable style guide (like APA, MLA, or Chicago).\n\n3. **Self-Plagiarism:** Reusing your own work from a previous course without permission from both instructors can be considered academic dishonesty. Always ask first.\n\n4. **Forgetting Quotation Marks:** Any text taken verbatim from a source must be enclosed in quotation marks. It's a simple rule, but easy to forget.\n\n5. **Paraphrasing without Citation:** Even when you put an idea in your own words, you must still credit the original source. Paraphrasing requires a citation, just like a direct quote.",
        imageUrl: `https://picsum.photos/seed/blog2/800/600`,
        isPublished: true,
    },
    {
        id: 3,
        title: "Choosing the Right Research Methodology",
        author: "Dr. Evelyn Reed",
        category: "Research",
        date: "2024-07-05T09:00:00Z",
        excerpt: "Qualitative, quantitative, or mixed-methods? The choice of research methodology can make or break your research paper or dissertation. We explore the differences to help you decide.",
        content: "Choosing the right research methodology is a critical decision. Your choice will shape your entire research project.\n\n**Quantitative Research** focuses on numbers and statistical analysis. It's used to test hypotheses, identify correlations, and make predictions. Common methods include surveys, experiments, and statistical analysis of existing datasets. Use this when you want to get objective, generalizable data.\n\n**Qualitative Research** focuses on understanding concepts, thoughts, or experiences. It's about depth and meaning. Common methods include interviews, focus groups, case studies, and ethnographic research. Use this when you want to explore a topic in-depth and understand the 'why' behind a phenomenon.\n\n**Mixed-Methods Research** combines both quantitative and qualitative approaches. This can provide a more comprehensive understanding of a research problem than either approach alone. For example, you might use a survey (quantitative) to identify trends and then conduct interviews (qualitative) to explore those trends in more detail. This approach is powerful but can be more complex and time-consuming.",
        imageUrl: `https://picsum.photos/seed/blog3/800/600`,
        isPublished: false,
    },
];


// --- MOCK DATA FOR CLIENT DASHBOARD ---
const now = new Date();
export const MOCK_USER_ORDERS: UserOrder[] = [
    {
        id: 'SPH-84391',
        userName: 'Demo User',
        userAvatar: 'https://i.pravatar.cc/150?u=demo',
        serviceName: 'Research Paper',
        subjectName: 'STEM (Science, Tech, Engineering, Math)',
        status: 'In Progress',
        deadline: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
        pages: 15,
        price: 489.38,
        projectDetails: "This research paper needs to explore the potential of CRISPR-Cas9 technology in treating genetic disorders. I need a comprehensive literature review, a discussion of the methodology, potential ethical concerns, and future prospects. Please use at least 20 peer-reviewed sources published within the last 5 years. The paper should be formatted in APA 7th edition.",
        chatHistory: [
            { id: 1, sender: 'writer', timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(), text: "Hello! I've started working on your research paper. I've attached the initial outline for your review. Please let me know if you have any feedback." },
            { id: 2, sender: 'writer', timestamp: new Date(now.getTime() - 1.9 * 60 * 60 * 1000).toISOString(), attachment: { fileName: 'Outline_SPH-84391.docx', fileSize: '15 KB', fileUrl: '#' } },
            { id: 3, sender: 'user', timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(), text: "Thanks! The outline looks great. Could you please make sure to include a section on the ethical implications of AI in genetic engineering? I've attached a key article to reference." },
            { id: 4, sender: 'user', timestamp: new Date(now.getTime() - 0.9 * 60 * 60 * 1000).toISOString(), attachment: { fileName: 'Ethical_Considerations_AI.pdf', fileSize: '1.2 MB', fileUrl: '#' } },
            { id: 5, sender: 'writer', timestamp: new Date(now.getTime() - 0.5 * 60 * 60 * 1000).toISOString(), text: "Excellent point. I'll integrate that section and the reference article. Thank you for the clear feedback!" }
        ]
    },
    {
        id: 'SPH-84112',
        userName: 'Demo User',
        userAvatar: 'https://i.pravatar.cc/150?u=demo',
        serviceName: 'Essay Writing',
        subjectName: 'History',
        status: 'In Progress',
        deadline: new Date(now.getTime() + 18 * 60 * 60 * 1000).toISOString(), // 18 hours from now
        pages: 5,
        price: 103.50,
        projectDetails: "The essay topic is 'The role of propaganda in World War II'. I need a strong thesis statement and arguments supported by historical evidence. Focus on both Allied and Axis propaganda techniques. MLA citation style.",
        chatHistory: [
            { id: 1, sender: 'user', timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(), text: "Hi, just checking in. How is the essay coming along?" },
            { id: 2, sender: 'writer', timestamp: new Date(now.getTime() - 0.8 * 60 * 60 * 1000).toISOString(), text: "It's progressing well! I'm currently on page 3 and expect to have the first draft ready for you in about 6 hours. Well ahead of the deadline." }
        ]
    },
    {
        id: 'SPH-83954',
        userName: 'Demo User',
        userAvatar: 'https://i.pravatar.cc/150?u=demo',
        serviceName: 'Editing & Proofreading',
        subjectName: 'English & Literature',
        status: 'Awaiting Writer',
        deadline: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
        pages: 30,
        price: 264.60,
        projectDetails: "Please proofread my manuscript for grammar, spelling, punctuation, and consistency errors. It's a fantasy novel, so please pay attention to the consistency of character names and world-building terms. I've attached a style guide.",
        chatHistory: [
             { id: 1, sender: 'user', timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(), text: "I've uploaded my manuscript for proofreading. Please let me know if you need anything else from my side." },
             { id: 2, sender: 'user', timestamp: new Date(now.getTime() - 23.9 * 60 * 60 * 1000).toISOString(), attachment: { fileName: 'Manuscript_Final.docx', fileSize: '350 KB', fileUrl: '#' } }
        ]
    },
    {
        id: 'SPH-82045',
        userName: 'Demo User',
        userAvatar: 'https://i.pravatar.cc/150?u=demo',
        serviceName: 'Case Study Analysis',
        subjectName: 'Business & Management',
        status: 'Completed',
        deadline: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
        pages: 8,
        price: 110.88,
        projectDetails: "Analyze the attached case study on Netflix's business model. I need an analysis using SWOT and Porter's Five Forces frameworks. The final paper should provide strategic recommendations for the company's future growth.",
        chatHistory: [
            { id: 1, sender: 'writer', timestamp: new Date(now.getTime() - 9 * 24 * 60 * 60 * 1000).toISOString(), text: "Hi there! Here is the completed case study analysis. I hope it meets all your requirements." },
            { id: 2, sender: 'writer', timestamp: new Date(now.getTime() - 8.9 * 24 * 60 * 60 * 1000).toISOString(), attachment: { fileName: 'CaseStudy_SPH-82045_FINAL.pdf', fileSize: '830 KB', fileUrl: '#' } },
            { id: 3, sender: 'user', timestamp: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString(), text: "This is perfect, thank you so much for the great work!" }
        ]
    },
];

export const MOCK_ADMIN_CHAT_HISTORY: AdminChatMessage[] = [
    {
        id: 1,
        sender: 'admin',
        timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
        text: "Welcome to our support chat! How can I help you today?",
    },
    {
        id: 2,
        sender: 'user',
        timestamp: new Date(now.getTime() - 4.9 * 60 * 60 * 1000).toISOString(),
        text: "Hi, I have a general question about your revision policy.",
    },
    {
        id: 3,
        sender: 'admin',
        timestamp: new Date(now.getTime() - 4.8 * 60 * 60 * 1000).toISOString(),
        text: "Of course! We offer free revisions within 14 days of order completion, as long as the revision instructions do not contradict your initial requirements. You can find more details in our Terms of Service.",
    },
];


// --- MOCK DATA FOR ADMIN DASHBOARD ---
export const MOCK_ADMIN_ORDERS: UserOrder[] = [
    ...MOCK_USER_ORDERS,
    {
        id: 'SPH-84392',
        userName: 'Jane Doe',
        userAvatar: 'https://i.pravatar.cc/150?u=jane',
        serviceName: 'Dissertation',
        subjectName: 'Psychology',
        status: 'In Progress',
        deadline: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        pages: 50,
        price: 900.90,
        projectDetails: "This is a PhD-level dissertation on the topic of 'The Impact of Social Media on Adolescent Mental Health.' The methodology must be a mixed-methods approach, including surveys and semi-structured interviews. I have attached the approved proposal and literature review. The writer must follow the university's specific formatting guidelines (attached).",
        chatHistory: [
            { id: 1, sender: 'user', timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(), text: "Hi, I've just placed an order for my dissertation. It's a big project, so I'd appreciate regular updates." },
            { id: 2, sender: 'writer', timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(), text: "Hello Jane, absolutely. I'm the writer assigned to your dissertation. I'm currently reviewing the requirements and will send you a detailed project plan by tomorrow." }
        ]
    },
    {
        id: 'SPH-84393',
        userName: 'Sam Wilson',
        userAvatar: 'https://i.pravatar.cc/150?u=sam',
        serviceName: 'Coursework Help',
        subjectName: 'Law',
        status: 'Awaiting Writer',
        deadline: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString(),
        pages: 10,
        price: 184.40,
        projectDetails: "I need assistance with a series of problem questions related to contract law. The topics include offer and acceptance, consideration, and intention to create legal relations. I need clear, well-structured answers that cite relevant case law. OSCOLA referencing is required.",
        chatHistory: [
             { id: 1, sender: 'user', timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(), text: "I need help with my law coursework, specifically on contract law. All instructions are attached." },
             { id: 2, sender: 'user', timestamp: new Date(now.getTime() - 0.9 * 60 * 60 * 1000).toISOString(), attachment: { fileName: 'ContractLaw_Brief.pdf', fileSize: '450 KB', fileUrl: '#' } }
        ]
    },
     {
        id: 'SPH-84394',
        userName: 'Maria Garcia',
        userAvatar: 'https://i.pravatar.cc/150?u=maria',
        serviceName: 'Admission Essay',
        subjectName: 'General',
        status: 'Completed',
        deadline: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        pages: 2,
        price: 27.60,
        projectDetails: "This is a personal statement for my application to a Master's program in Public Health. I want it to be compelling and highlight my volunteer experience at the local clinic. The essay should be around 500 words and reflect my passion for community health.",
        chatHistory: [
             { id: 1, sender: 'writer', timestamp: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString(), text: "Hi Maria, I've completed your admission essay. I focused on making your personal story shine through. I hope you like it!" },
             { id: 2, sender: 'writer', timestamp: new Date(now.getTime() - 5.9 * 24 * 60 * 60 * 1000).toISOString(), attachment: { fileName: 'AdmissionEssay_MariaG_Final.docx', fileSize: '22 KB', fileUrl: '#' } },
             { id: 3, sender: 'user', timestamp: new Date(now.getTime() - 5.5 * 24 * 60 * 60 * 1000).toISOString(), text: "It's wonderful! You captured my voice perfectly. Thank you so much!" }
        ]
    },
     {
        id: 'SPH-84395',
        userName: 'Chris Lee',
        userAvatar: 'https://i.pravatar.cc/150?u=chris',
        serviceName: 'Research Paper',
        subjectName: 'Medical & Healthcare',
        status: 'In Progress',
        deadline: new Date(now.getTime() + 12 * 24 * 60 * 60 * 1000).toISOString(),
        pages: 22,
        price: 367.29,
        projectDetails: "The paper should analyze the attached clinical trial data. The focus is on the efficacy of a new diabetes drug. A full statistical analysis using SPSS is required. The paper must include an abstract, introduction, methods, results, discussion, and conclusion. Vancouver citation style.",
        chatHistory: [
             { id: 1, sender: 'user', timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(), text: "Please find the dataset for my research paper attached. The focus should be on the statistical analysis part." },
             { id: 2, sender: 'user', timestamp: new Date(now.getTime() - 0.9 * 24 * 60 * 60 * 1000).toISOString(), attachment: { fileName: 'ClinicalTrial_Data.xlsx', fileSize: '4.5 MB', fileUrl: '#' } },
             { id: 3, sender: 'writer', timestamp: new Date(now.getTime() - 0.5 * 24 * 60 * 60 * 1000).toISOString(), text: "Got it, Chris. I'll start the analysis right away. This looks like a fascinating study." }
        ]
    },
];

const customerData = MOCK_ADMIN_ORDERS.reduce((acc, order) => {
    if (!acc[order.userName]) {
        acc[order.userName] = {
            id: order.userName.replace(/\s+/g, '-').toLowerCase(),
            name: order.userName,
            avatar: order.userAvatar,
            role: 'Client',
            status: 'Active',
            lastLogin: new Date(now.getTime() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString(),
            totalOrders: 0,
            totalSpent: 0,
        };
    }
    acc[order.userName].totalOrders += 1;
    acc[order.userName].totalSpent += order.price;
    return acc;
}, {} as { [key: string]: Customer });

export const MOCK_CUSTOMERS: Customer[] = Object.values(customerData);



// --- STATIC DATA (Less likely to change) ---
export const FAQ_DATA = [
    {
        question: "Is using Scholar paperhelp confidential?",
        answer: "Absolutely. We prioritize your privacy. All personal information and order details are encrypted and stored securely. We never share your data with third parties."
    },
    {
        question: "Are the papers written by AI?",
        answer: "No. All our papers are written from scratch by qualified human writers. We offer a free AI-powered Topic Generator as an optional tool to help you brainstorm ideas, but the writing itself is 100% human."
    },
    {
        question: "How do you ensure the papers are plagiarism-free?",
        answer: "Every paper is written from the ground up by our experts and is checked for originality using advanced plagiarism detection software. We guarantee that you will receive a 100% unique and authentic piece of work. You can also order an official plagiarism report as an add-on."
    },
    {
        question: "Can I communicate with my writer?",
        answer: "Yes, once your order is placed, you can communicate directly with your assigned writer through our secure messaging system to provide additional instructions, ask questions, and track progress."
    }
];