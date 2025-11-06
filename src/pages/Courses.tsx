import { useState } from 'react';
import { Search, MapPin, DollarSign, TrendingUp, BookOpen, Users, ChevronRight, Star, Building, Globe, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ModernHeader from '@/components/layout/ModernHeader';
import CourseCard from '@/components/CourseCard';
import FeaturedCoursesSection from '@/components/FeaturedCoursesSection';
import FreeAffordableSection from '@/components/FreeAffordableSection';

const categories = [
  'All Categories',
  'Web Development',
  'Data Science',
  'Mobile Development',
  'DevOps',
  'UI/UX Design',
  'Machine Learning',
  'Cybersecurity',
  'Cloud Computing'
];

const skillLevels = [
  'All Levels',
  'Beginner',
  'Intermediate',
  'Advanced'
];

const priceRanges = [
  'All Prices',
  'Free',
  'Under $50',
  'Under $100',
  '$100+'
];

const courses = [
  {
    id: 1,
    title: 'Complete React Development Course',
    instructor: 'Maximilian Schwarzmüller',
    category: 'Web Development',
    level: 'Intermediate',
    duration: '40 hours',
    students: 170000,
    rating: 4.6,
    price: 89.99,
    image: '/placeholder.svg',
    description: 'Master React with hooks, context, and modern development practices',
    link: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/'
  },
  {
    id: 2,
    title: 'Python for Data Science and Machine Learning',
    instructor: 'Jose Portilla',
    category: 'Data Science',
    level: 'Beginner',
    duration: '25 hours',
    students: 450000,
    rating: 4.5,
    price: 79.99,
    image: '/placeholder.svg',
    description: 'Learn Python programming and data analysis from scratch',
    link: 'https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/'
  },
  {
    id: 3,
    title: 'Machine Learning A-Z™: Python & R',
    instructor: 'Kirill Eremenko, Hadelin de Ponteves',
    category: 'Machine Learning',
    level: 'Advanced',
    duration: '44 hours',
    students: 1200000,
    rating: 4.5,
    price: 129.99,
    image: '/placeholder.svg',
    description: 'Deep dive into ML algorithms and neural networks',
    link: 'https://www.udemy.com/course/machinelearning/'
  },
  {
    id: 4,
    title: 'UI/UX Design Complete Course',
    instructor: 'Daniel Schifano',
    category: 'UI/UX Design',
    level: 'Intermediate',
    duration: '20 hours',
    students: 89000,
    rating: 4.7,
    price: 94.99,
    image: '/placeholder.svg',
    description: 'Create beautiful and user-friendly digital experiences',
    link: 'https://www.udemy.com/course/ui-ux-web-design-using-adobe-xd/'
  },
  {
    id: 5,
    title: 'Flutter & Dart Development Course',
    instructor: 'Maximilian Schwarzmüller',
    category: 'Mobile Development',
    level: 'Beginner',
    duration: '31 hours',
    students: 190000,
    rating: 4.6,
    price: 99.99,
    image: '/placeholder.svg',
    description: 'Build cross-platform mobile apps with Flutter and Dart',
    link: 'https://www.udemy.com/course/learn-flutter-dart-to-build-ios-android-apps/'
  },
  {
    id: 6,
    title: 'AWS Certified Solutions Architect',
    instructor: 'Stephane Maarek',
    category: 'Cloud Computing',
    level: 'Intermediate',
    duration: '27 hours',
    students: 720000,
    rating: 4.7,
    price: 109.99,
    image: '/placeholder.svg',
    description: 'Master AWS services and cloud architecture patterns',
    link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/'
  },
  {
    id: 7,
    title: 'HTML, CSS, and Javascript for Web Developers',
    instructor: 'Yaakov Chaikin',
    category: 'Web Development',
    level: 'Beginner',
    duration: '40 hours',
    students: 520000,
    rating: 4.6,
    price: 0,
    image: '/placeholder.svg',
    description: 'Learn the basics of web development with HTML and CSS',
    link: 'https://www.coursera.org/learn/html-css-javascript-for-web-developers'
  },
  {
    id: 8,
    title: 'JavaScript: The Complete Guide',
    instructor: 'Maximilian Schwarzmüller',
    category: 'Web Development',
    level: 'Beginner',
    duration: '52 hours',
    students: 180000,
    rating: 4.6,
    price: 89.99,
    image: '/placeholder.svg',
    description: 'Master JavaScript fundamentals and DOM manipulation',
    link: 'https://www.udemy.com/course/javascript-the-complete-guide-2020-beginner-advanced/'
  },
  {
    id: 9,
    title: 'Git & GitHub Complete Course',
    instructor: 'Bogdan Stashchuk',
    category: 'DevOps',
    level: 'Beginner',
    duration: '12 hours',
    students: 95000,
    rating: 4.7,
    price: 49.99,
    image: '/placeholder.svg',
    description: 'Learn version control with Git and GitHub',
    link: 'https://www.udemy.com/course/git-and-github-complete-course/'
  },
  {
    id: 10,
    title: 'Data Analysis with Python - Full Course',
    instructor: 'Santiago Basulto',
    category: 'Data Science',
    level: 'Beginner',
    duration: '10 hours',
    students: 45000,
    rating: 4.5,
    price: 0,
    image: '/placeholder.svg',
    description: 'Get started with data analysis using Python and pandas',
    link: 'https://www.youtube.com/watch?v=r-uOLxNrNk8'
  },
  {
    id: 11,
    title: 'CS50: Introduction to Computer Science',
    instructor: 'David J. Malan',
    category: 'Computer Science',
    level: 'Beginner',
    duration: '24 hours',
    students: 3500000,
    rating: 4.9,
    price: 0,
    image: '/placeholder.svg',
    description: 'Harvard\'s introduction to computer science and programming',
    link: 'https://www.edx.org/course/introduction-computer-science-harvardx-cs50x'
  },
  {
    id: 12,
    title: 'Google Digital Marketing Course',
    instructor: 'Google',
    category: 'Digital Marketing',
    level: 'Beginner',
    duration: '40 hours',
    students: 850000,
    rating: 4.6,
    price: 0,
    image: '/placeholder.svg',
    description: 'Learn digital marketing fundamentals from Google',
    link: 'https://learndigital.withgoogle.com/digitalgarage/course/digital-marketing'
  }
];

const careerCategories = [
  'All Categories',
  'AI Development & Engineering',
  'Data Science & Analytics',
  'Digital Marketing & Content',
  'Healthcare Technology',
  'Finance & Fintech',
  'Education Technology',
  'Agriculture & Environmental Tech',
  'E-commerce & Retail',
  'Government & Public Services',
  'Creative Industries'
];

// Comprehensive career dataset - consolidated and expanded
const careers = [
  // AI Development & Engineering
  {
    id: 1,
    title: 'AI/ML Engineer',
    alternativeNames: ['Machine Learning Engineer', 'AI Developer', 'ML Developer'],
    category: 'AI Development & Engineering',
    description: 'Design and develop machine learning models and AI systems to solve real-world problems. Work with large datasets to create intelligent applications.',
    responsibilities: [
      'Develop and deploy machine learning models',
      'Process and analyze large datasets',
      'Optimize AI algorithms for performance',
      'Collaborate with cross-functional teams',
      'Maintain and update AI systems'
    ],
    technicalSkills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'SQL', 'Docker', 'Cloud platforms (AWS/GCP)'],
    softSkills: ['Problem-solving', 'Analytical thinking', 'Communication', 'Team collaboration', 'Continuous learning'],
    education: 'Bachelor\'s in Computer Science, Engineering, or related field. Certifications in AI/ML preferred.',
    salaryRange: 'NPR 60,000 - 150,000 per month',
    growthPotential: 'Junior → Senior → Lead → AI Architect → CTO',
    localOpportunities: ['CloudFactory', 'Leapfrog Technology', 'Fusemachines', 'eSewa', 'Khalti'],
    gettingStarted: [
      'Learn Python programming fundamentals',
      'Complete online ML courses (Coursera, edX)',
      'Practice with Kaggle competitions',
      'Build portfolio projects',
      'Get AWS/Google Cloud certifications'
    ]
  },
  {
    id: 2,
    title: 'Prompt Engineer',
    alternativeNames: ['AI Prompt Designer', 'Conversational AI Specialist', 'LLM Engineer'],
    category: 'AI Development & Engineering',
    description: 'Design and optimize prompts for AI language models to generate desired outputs. Bridge the gap between human intent and AI understanding.',
    responsibilities: [
      'Design effective prompts for various AI models',
      'Test and optimize prompt performance',
      'Develop prompt templates and guidelines',
      'Train teams on prompt engineering best practices',
      'Monitor and improve AI system outputs'
    ],
    technicalSkills: ['GPT/Claude APIs', 'Python', 'Natural Language Processing', 'API integration', 'Testing frameworks'],
    softSkills: ['Creativity', 'Language skills', 'Patience', 'Systematic thinking', 'User empathy'],
    education: 'Bachelor\'s in Computer Science, Linguistics, or English. AI/NLP courses recommended.',
    salaryRange: 'NPR 40,000 - 100,000 per month',
    growthPotential: 'Junior → Senior → Lead → AI Product Manager',
    localOpportunities: ['Tech startups', 'Digital agencies', 'International remote work', 'Freelance platforms'],
    gettingStarted: [
      'Learn about LLMs and their capabilities',
      'Practice with ChatGPT, Claude, and other models',
      'Study prompt engineering techniques',
      'Build a portfolio of effective prompts',
      'Join AI communities and forums'
    ]
  },
  {
    id: 3,
    title: 'Computer Vision Specialist',
    alternativeNames: ['CV Engineer', 'Image Processing Engineer', 'Vision AI Developer'],
    category: 'AI Development & Engineering',
    description: 'Develop AI systems that can interpret and understand visual information from images and videos.',
    responsibilities: [
      'Build image recognition and classification systems',
      'Develop object detection algorithms',
      'Implement facial recognition systems',
      'Create automated quality inspection tools',
      'Optimize computer vision models for deployment'
    ],
    technicalSkills: ['OpenCV', 'TensorFlow', 'YOLO', 'CNN architectures', 'Image processing', 'Python'],
    softSkills: ['Attention to detail', 'Visual thinking', 'Problem-solving', 'Research skills'],
    education: 'Bachelor\'s in Computer Science, Electronics, or related field. Computer Vision specialization preferred.',
    salaryRange: 'NPR 70,000 - 160,000 per month',
    growthPotential: 'Junior → Senior → Lead → Research Scientist',
    localOpportunities: ['CloudFactory', 'Fusemachines', 'Tech startups', 'Manufacturing companies'],
    gettingStarted: [
      'Learn OpenCV and image processing basics',
      'Complete computer vision online courses',
      'Build image classification projects',
      'Practice with datasets like COCO, ImageNet',
      'Create a portfolio on GitHub'
    ]
  },
  {
    id: 4,
    title: 'NLP Developer',
    alternativeNames: ['Natural Language Processing Engineer', 'Text Analytics Developer', 'Conversational AI Developer'],
    category: 'AI Development & Engineering',
    description: 'Build systems that can understand, interpret, and generate human language for various applications.',
    responsibilities: [
      'Develop chatbots and virtual assistants',
      'Build text classification and sentiment analysis systems',
      'Create language translation tools',
      'Implement named entity recognition',
      'Design conversational interfaces'
    ],
    technicalSkills: ['NLTK', 'spaCy', 'Transformers', 'BERT', 'GPT models', 'Python', 'Regex'],
    softSkills: ['Language understanding', 'Logical thinking', 'Communication', 'Cultural awareness'],
    education: 'Bachelor\'s in Computer Science, Linguistics, or related field. NLP/AI coursework preferred.',
    salaryRange: 'NPR 65,000 - 140,000 per month',
    growthPotential: 'Junior → Senior → Lead → NLP Research Scientist',
    localOpportunities: ['Tech companies', 'Startups', 'Customer service platforms', 'Educational tech'],
    gettingStarted: [
      'Learn NLP fundamentals and linguistics basics',
      'Practice with NLTK and spaCy libraries',
      'Build chatbot projects',
      'Work with text datasets',
      'Understand transformer architectures'
    ]
  },
  {
    id: 5,
    title: 'AI Product Manager',
    alternativeNames: ['ML Product Manager', 'AI Strategy Manager', 'Technical Product Manager'],
    category: 'AI Development & Engineering',
    description: 'Bridge the gap between technical AI capabilities and business requirements to deliver AI-powered products.',
    responsibilities: [
      'Define AI product roadmaps and strategy',
      'Coordinate between technical and business teams',
      'Analyze market trends and user needs',
      'Manage AI product development lifecycle',
      'Ensure ethical AI implementation'
    ],
    technicalSkills: ['Basic ML understanding', 'Product management tools', 'Analytics platforms', 'A/B testing'],
    softSkills: ['Strategic thinking', 'Communication', 'Leadership', 'Business acumen', 'Project management'],
    education: 'Bachelor\'s in Engineering, Business, or related field. MBA or AI certification preferred.',
    salaryRange: 'NPR 80,000 - 200,000 per month',
    growthPotential: 'Associate → Senior → Director → VP of Product',
    localOpportunities: ['Tech companies', 'Startups', 'Digital agencies', 'Consulting firms'],
    gettingStarted: [
      'Learn product management fundamentals',
      'Understand AI/ML basics',
      'Practice with product analytics tools',
      'Build a portfolio of product case studies',
      'Network with product management communities'
    ]
  },
  
  // Data Science & Analytics
  {
    id: 6,
    title: 'Data Scientist',
    alternativeNames: ['Data Analyst', 'Business Intelligence Analyst', 'Data Researcher'],
    category: 'Data Science & Analytics',
    description: 'Extract insights from data to drive business decisions. Use statistical methods and machine learning to analyze trends and patterns.',
    responsibilities: [
      'Analyze complex datasets for business insights',
      'Create predictive models and forecasts',
      'Design and maintain data pipelines',
      'Present findings to stakeholders',
      'Collaborate with business teams'
    ],
    technicalSkills: ['Python/R', 'SQL', 'Tableau/Power BI', 'Statistics', 'Excel', 'Jupyter Notebooks', 'Git'],
    softSkills: ['Critical thinking', 'Communication', 'Business acumen', 'Curiosity', 'Attention to detail'],
    education: 'Bachelor\'s in Mathematics, Statistics, Computer Science, or Economics. Advanced degree preferred.',
    salaryRange: 'NPR 50,000 - 120,000 per month',
    growthPotential: 'Junior → Senior → Lead → Chief Data Officer',
    localOpportunities: ['Sastodeal', 'Daraz', 'IME Group', 'NIC Asia Bank', 'CloudFactory', 'Leapfrog Technology'],
    gettingStarted: [
      'Complete IBM Data Science Professional Certificate on Coursera',
      'Learn Python with "Python for Data Science" course on edX',
      'Practice with Kaggle competitions and datasets',
      'Build portfolio projects on GitHub',
      'Take Google Data Analytics Certificate'
    ]
  },
  {
    id: 7,
    title: 'Business Intelligence Analyst',
    alternativeNames: ['BI Analyst', 'Data Analyst', 'Reporting Analyst'],
    category: 'Data Science & Analytics',
    description: 'Transform raw data into actionable business insights through reporting, dashboards, and analysis.',
    responsibilities: [
      'Create and maintain business dashboards',
      'Generate regular business reports',
      'Analyze KPIs and business metrics',
      'Support decision-making with data insights',
      'Collaborate with various departments'
    ],
    technicalSkills: ['SQL', 'Power BI', 'Tableau', 'Excel', 'Data warehousing', 'ETL processes'],
    softSkills: ['Business understanding', 'Communication', 'Attention to detail', 'Problem-solving'],
    education: 'Bachelor\'s in Business, Economics, or related field. BI certifications preferred.',
    salaryRange: 'NPR 45,000 - 100,000 per month',
    growthPotential: 'Junior → Senior → BI Manager → Analytics Director',
    localOpportunities: ['Banks', 'Telecom companies', 'Retail chains', 'Government organizations'],
    gettingStarted: [
      'Learn SQL and database fundamentals',
      'Master Power BI or Tableau',
      'Understand business metrics',
      'Practice with sample datasets',
      'Create a portfolio of dashboards'
    ]
  },
  {
    id: 8,
    title: 'Data Engineer',
    alternativeNames: ['Big Data Engineer', 'ETL Developer', 'Data Pipeline Engineer'],
    category: 'Data Science & Analytics',
    description: 'Build and maintain the infrastructure and pipelines that enable data collection, storage, and processing.',
    responsibilities: [
      'Design and build data pipelines',
      'Maintain data warehouses and databases',
      'Ensure data quality and reliability',
      'Optimize data processing performance',
      'Support data scientists and analysts'
    ],
    technicalSkills: ['Python', 'SQL', 'Apache Spark', 'Kafka', 'Docker', 'Cloud platforms', 'ETL tools'],
    softSkills: ['System thinking', 'Problem-solving', 'Attention to detail', 'Collaboration'],
    education: 'Bachelor\'s in Computer Science, Engineering, or related field.',
    salaryRange: 'NPR 60,000 - 140,000 per month',
    growthPotential: 'Junior → Senior → Lead → Data Architecture Manager',
    localOpportunities: ['Tech companies', 'Banks', 'E-commerce platforms', 'Consulting firms'],
    gettingStarted: [
      'Learn Python and SQL programming',
      'Understand database systems',
      'Practice with cloud platforms',
      'Build ETL pipeline projects',
      'Learn about big data technologies'
    ]
  },
  {
    id: 9,
    title: 'Market Research Analyst',
    alternativeNames: ['Consumer Insights Analyst', 'Market Intelligence Analyst', 'Research Analyst'],
    category: 'Data Science & Analytics',
    description: 'Study market conditions to examine potential sales of products or services using data-driven approaches.',
    responsibilities: [
      'Conduct market research and surveys',
      'Analyze consumer behavior and preferences',
      'Track industry trends and competitors',
      'Prepare market research reports',
      'Present findings to stakeholders'
    ],
    technicalSkills: ['SPSS', 'Survey tools', 'Excel', 'Statistical analysis', 'Data visualization'],
    softSkills: ['Research skills', 'Analytical thinking', 'Communication', 'Presentation skills'],
    education: 'Bachelor\'s in Marketing, Business, Economics, or related field.',
    salaryRange: 'NPR 40,000 - 90,000 per month',
    growthPotential: 'Junior → Senior → Research Manager → Director of Insights',
    localOpportunities: ['Market research firms', 'FMCG companies', 'Advertising agencies', 'Consulting firms'],
    gettingStarted: [
      'Learn market research methodologies',
      'Practice with survey design tools',
      'Understand statistical analysis',
      'Build research project portfolio',
      'Network with marketing professionals'
    ]
  },

  // Digital Marketing & Content
  {
    id: 10,
    title: 'Digital Marketing Analyst',
    alternativeNames: ['Marketing Data Analyst', 'Growth Analyst', 'Performance Marketing Specialist'],
    category: 'Digital Marketing & Content',
    description: 'Analyze digital marketing campaigns and consumer behavior to optimize marketing strategies and ROI.',
    responsibilities: [
      'Analyze marketing campaign performance',
      'Track customer acquisition and retention metrics',
      'Create reports and dashboards',
      'Optimize marketing spend and targeting',
      'Conduct A/B tests and experiments'
    ],
    technicalSkills: ['Google Analytics', 'Facebook Ads Manager', 'SQL', 'Excel/Sheets', 'Tableau', 'Python (basic)'],
    softSkills: ['Analytical thinking', 'Communication', 'Creativity', 'Business acumen', 'Attention to detail'],
    education: 'Bachelor\'s in Marketing, Business, or related field. Digital marketing certifications preferred.',
    salaryRange: 'NPR 35,000 - 85,000 per month',
    growthPotential: 'Junior → Senior → Lead → Marketing Manager → CMO',
    localOpportunities: ['Digital agencies', 'E-commerce companies', 'Startups', 'Traditional businesses going digital'],
    gettingStarted: [
      'Get Google Analytics certification',
      'Learn Facebook/Instagram advertising',
      'Practice with Google Ads',
      'Create personal marketing projects',
      'Join digital marketing communities'
    ]
  },
  {
    id: 11,
    title: 'Content Creator with AI Tools',
    alternativeNames: ['AI Content Specialist', 'Digital Content Creator', 'Content Marketing Specialist'],
    category: 'Digital Marketing & Content',
    description: 'Create engaging content using AI-powered tools to enhance productivity and creativity in content production.',
    responsibilities: [
      'Create content using AI writing tools',
      'Design graphics with AI-powered software',
      'Optimize content for different platforms',
      'Manage content calendars and strategies',
      'Analyze content performance metrics'
    ],
    technicalSkills: ['ChatGPT', 'Canva', 'Adobe Creative Suite', 'Content management systems', 'SEO tools'],
    softSkills: ['Creativity', 'Writing skills', 'Visual design sense', 'Time management', 'Adaptability'],
    education: 'Bachelor\'s in Communications, Marketing, Journalism, or related field.',
    salaryRange: 'NPR 30,000 - 80,000 per month',
    growthPotential: 'Junior → Senior → Content Manager → Creative Director',
    localOpportunities: ['Digital agencies', 'Startups', 'Media companies', 'Freelance work'],
    gettingStarted: [
      'Learn AI content creation tools',
      'Build a diverse content portfolio',
      'Understand different content formats',
      'Practice social media management',
      'Develop personal brand online'
    ]
  },
  {
    id: 12,
    title: 'Social Media Manager (AI-powered)',
    alternativeNames: ['Social Media Specialist', 'Community Manager', 'Digital Engagement Manager'],
    category: 'Digital Marketing & Content',
    description: 'Manage social media presence using AI tools for content creation, scheduling, and engagement optimization.',
    responsibilities: [
      'Develop social media strategies',
      'Create and schedule content using AI tools',
      'Engage with online communities',
      'Monitor brand mentions and sentiment',
      'Analyze social media performance'
    ],
    technicalSkills: ['Social media platforms', 'Hootsuite/Buffer', 'AI content tools', 'Analytics tools', 'Graphic design software'],
    softSkills: ['Communication', 'Creativity', 'Customer service', 'Trend awareness', 'Crisis management'],
    education: 'Bachelor\'s in Marketing, Communications, or related field. Social media certifications preferred.',
    salaryRange: 'NPR 35,000 - 75,000 per month',
    growthPotential: 'Junior → Senior → Social Media Manager → Digital Marketing Manager',
    localOpportunities: ['Brands', 'Agencies', 'Startups', 'E-commerce companies'],
    gettingStarted: [
      'Master major social media platforms',
      'Learn social media management tools',
      'Build personal social media presence',
      'Create content strategy case studies',
      'Get platform-specific certifications'
    ]
  },
  {
    id: 13,
    title: 'SEO Specialist',
    alternativeNames: ['Search Engine Optimization Analyst', 'Digital Marketing SEO Expert', 'Content SEO Manager'],
    category: 'Digital Marketing & Content',
    description: 'Optimize websites and content to improve search engine rankings and drive organic traffic using AI-powered SEO tools.',
    responsibilities: [
      'Conduct keyword research and analysis',
      'Optimize website content and structure',
      'Monitor search engine rankings',
      'Implement technical SEO improvements',
      'Create SEO strategies and reports'
    ],
    technicalSkills: ['Google Analytics', 'Search Console', 'SEO tools (SEMrush, Ahrefs)', 'HTML/CSS basics', 'Content management systems'],
    softSkills: ['Analytical thinking', 'Attention to detail', 'Strategic planning', 'Communication'],
    education: 'Bachelor\'s in Marketing, Communications, or related field. SEO certifications preferred.',
    salaryRange: 'NPR 40,000 - 90,000 per month',
    growthPotential: 'Junior → Senior → SEO Manager → Digital Marketing Director',
    localOpportunities: ['Digital agencies', 'E-commerce companies', 'Content companies', 'Freelance work'],
    gettingStarted: [
      'Learn SEO fundamentals',
      'Practice with SEO tools',
      'Build and optimize personal website',
      'Get Google certifications',
      'Stay updated with algorithm changes'
    ]
  },

  // Healthcare Technology
  {
    id: 14,
    title: 'Health Data Analyst',
    alternativeNames: ['Medical Data Analyst', 'Healthcare Analytics Specialist', 'Clinical Data Analyst'],
    category: 'Healthcare Technology',
    description: 'Analyze healthcare data to improve patient outcomes, reduce costs, and support evidence-based medical decisions.',
    responsibilities: [
      'Analyze patient data and health trends',
      'Create healthcare dashboards and reports',
      'Support clinical research initiatives',
      'Ensure data privacy and compliance',
      'Collaborate with medical professionals'
    ],
    technicalSkills: ['SQL', 'R/Python', 'Healthcare databases', 'Statistical analysis', 'HIPAA compliance', 'Tableau/Power BI'],
    softSkills: ['Attention to detail', 'Ethical reasoning', 'Communication', 'Domain knowledge', 'Problem-solving'],
    education: 'Bachelor\'s in Health Information Management, Statistics, or related field. Healthcare background preferred.',
    salaryRange: 'NPR 45,000 - 100,000 per month',
    growthPotential: 'Junior → Senior → Lead → Healthcare Analytics Manager',
    localOpportunities: ['Hospitals', 'Medical colleges', 'NGOs', 'Government health departments', 'Telemedicine companies'],
    gettingStarted: [
      'Learn healthcare data standards',
      'Understand medical terminology',
      'Practice with healthcare datasets',
      'Get HIPAA training',
      'Network with healthcare professionals'
    ]
  },
  {
    id: 15,
    title: 'Telemedicine Coordinator',
    alternativeNames: ['Telehealth Specialist', 'Remote Patient Care Coordinator', 'Digital Health Coordinator'],
    category: 'Healthcare Technology',
    description: 'Coordinate and manage telemedicine services, ensuring smooth delivery of remote healthcare services.',
    responsibilities: [
      'Schedule and coordinate virtual consultations',
      'Provide technical support to patients and doctors',
      'Manage telemedicine platforms and systems',
      'Ensure compliance with healthcare regulations',
      'Train staff on telemedicine procedures'
    ],
    technicalSkills: ['Telemedicine platforms', 'EMR systems', 'Video conferencing tools', 'Healthcare software'],
    softSkills: ['Communication', 'Empathy', 'Problem-solving', 'Organization', 'Patience'],
    education: 'Bachelor\'s in Healthcare Administration, Nursing, or related field. Telemedicine certification preferred.',
    salaryRange: 'NPR 35,000 - 75,000 per month',
    growthPotential: 'Coordinator → Senior → Manager → Director of Telehealth',
    localOpportunities: ['Hospitals', 'Clinics', 'Telemedicine startups', 'NGOs'],
    gettingStarted: [
      'Learn about telemedicine technologies',
      'Understand healthcare regulations',
      'Get certified in healthcare administration',
      'Practice with telehealth platforms',
      'Build healthcare network'
    ]
  },
  {
    id: 16,
    title: 'Medical AI Trainer',
    alternativeNames: ['Healthcare AI Annotator', 'Medical Data Labeler', 'Clinical AI Specialist'],
    category: 'Healthcare Technology',
    description: 'Train AI models for medical applications by labeling data and ensuring accuracy of medical AI systems.',
    responsibilities: [
      'Label medical images and data for AI training',
      'Validate AI model outputs for accuracy',
      'Collaborate with medical professionals',
      'Ensure data quality and consistency',
      'Document training processes and results'
    ],
    technicalSkills: ['Medical terminology', 'Data labeling tools', 'Basic AI understanding', 'Medical imaging software'],
    softSkills: ['Attention to detail', 'Medical knowledge', 'Patience', 'Critical thinking'],
    education: 'Bachelor\'s in Medicine, Nursing, Medical Technology, or related healthcare field.',
    salaryRange: 'NPR 40,000 - 85,000 per month',
    growthPotential: 'Trainer → Senior → Lead → Medical AI Manager',
    localOpportunities: ['AI companies', 'Medical device companies', 'Research institutions', 'Hospitals'],
    gettingStarted: [
      'Build strong medical knowledge foundation',
      'Learn about AI and machine learning basics',
      'Practice with medical data labeling',
      'Network with medical AI professionals',
      'Stay updated with medical AI trends'
    ]
  }
];

const localResources = [
  {
    name: 'Kathmandu University',
    type: 'University',
    programs: ['Computer Science', 'AI/ML courses', 'Data Science'],
    location: 'Dhulikhel',
    website: 'https://ku.edu.np/',
    description: 'Leading technical university offering comprehensive CS programs'
  },
  {
    name: 'Tribhuvan University - IOE',
    type: 'University',
    programs: ['Computer Engineering', 'Electronics Engineering', 'Software Engineering'],
    location: 'Pulchowk',
    website: 'https://ioe.edu.np/',
    description: 'Nepal\'s premier engineering institute'
  },
  {
    name: 'Fusemachines',
    type: 'Training Center',
    programs: ['AI Fellowship', 'Machine Learning Bootcamp', 'Data Science Program'],
    location: 'Pulchowk',
    website: 'https://fusemachines.com/',
    description: 'Leading AI education and development company in Nepal'
  },
  {
    name: 'Leapfrog Technology',
    type: 'Training Center',
    programs: ['Internship Programs', 'Tech Talks', 'Developer Bootcamps'],
    location: 'Dillibazar',
    website: 'https://www.lftechnology.com/',
    description: 'Software development company offering training programs'
  },
  {
    name: 'Code for Nepal',
    type: 'Non-Profit',
    programs: ['Civic Tech Training', 'Open Source Projects', 'Digital Literacy'],
    location: 'Online/Kathmandu',
    website: 'https://codefornepal.org/',
    description: 'Community working on technology for social good'
  },
  {
    name: 'Women in STEM Nepal',
    type: 'Community',
    programs: ['Workshops', 'Mentorship', 'Networking Events'],
    location: 'Kathmandu',
    website: 'https://www.womenintech.org.np/',
    description: 'Supporting women in technology and STEM fields'
  },
  {
    name: 'Nepal Blockchain Society',
    type: 'Community',
    programs: ['Blockchain Education', 'Workshops', 'Meetups'],
    location: 'Kathmandu',
    website: 'https://nepalblockchain.org/',
    description: 'Promoting blockchain technology and education'
  },
  {
    name: 'IT Park Nepal',
    type: 'Incubator',
    programs: ['Startup Support', 'Training Programs', 'Networking'],
    location: 'Thapathali',
    website: 'https://itparknepal.com/',
    description: 'Government initiative supporting IT entrepreneurship'
  }
];

// Free Learning Resources
const freeResources = [
  {
    category: 'Programming Basics',
    resources: [
      {
        name: 'freeCodeCamp',
        type: 'Interactive Courses',
        description: 'Complete programming curriculum with certificates',
        link: 'https://www.freecodecamp.org/',
        topics: ['HTML/CSS', 'JavaScript', 'Python', 'Data Analysis']
      },
      {
        name: 'Codecademy Free',
        type: 'Interactive Courses',
        description: 'Learn to code with hands-on practice',
        link: 'https://www.codecademy.com/catalog/subject/programming',
        topics: ['Python', 'JavaScript', 'HTML/CSS', 'SQL']
      },
      {
        name: 'Harvard CS50',
        type: 'University Course',
        description: 'Introduction to Computer Science',
        link: 'https://cs50.harvard.edu/',
        topics: ['Computer Science Fundamentals', 'Programming', 'Algorithms']
      }
    ]
  },
  {
    category: 'AI & Machine Learning',
    resources: [
      {
        name: 'Fast.ai',
        type: 'Practical Courses',
        description: 'Practical deep learning for coders',
        link: 'https://www.fast.ai/',
        topics: ['Deep Learning', 'Natural Language Processing', 'Computer Vision']
      },
      {
        name: 'Andrew Ng\'s ML Course',
        type: 'University Course',
        description: 'Stanford\'s machine learning course',
        link: 'https://www.coursera.org/learn/machine-learning',
        topics: ['Machine Learning', 'Neural Networks', 'Supervised Learning']
      },
      {
        name: 'Google AI Education',
        type: 'Documentation & Courses',
        description: 'Free AI and ML resources from Google',
        link: 'https://ai.google/education/',
        topics: ['TensorFlow', 'Machine Learning', 'AI Ethics']
      }
    ]
  },
  {
    category: 'Data Science',
    resources: [
      {
        name: 'Kaggle Learn',
        type: 'Micro-courses',
        description: 'Free micro-courses on data science topics',
        link: 'https://www.kaggle.com/learn',
        topics: ['Python', 'Data Visualization', 'Machine Learning', 'SQL']
      },
      {
        name: 'IBM Data Science',
        type: 'Professional Certificate',
        description: 'Comprehensive data science program',
        link: 'https://www.coursera.org/professional-certificates/ibm-data-science',
        topics: ['Data Analysis', 'Python', 'Machine Learning', 'Data Visualization']
      }
    ]
  }
];

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All Prices');
  const [selectedCareerCategory, setSelectedCareerCategory] = useState('All Categories');
  const [selectedCareer, setSelectedCareer] = useState<typeof careers[0] | null>(null);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All Levels' || course.level === selectedLevel;
    
    let matchesPrice = true;
    if (selectedPriceRange === 'Free') {
      matchesPrice = course.price === 0;
    } else if (selectedPriceRange === 'Under $50') {
      matchesPrice = course.price < 50;
    } else if (selectedPriceRange === 'Under $100') {
      matchesPrice = course.price < 100;
    } else if (selectedPriceRange === '$100+') {
      matchesPrice = course.price >= 100;
    }
    
    return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
  });

  const filteredCareers = careers.filter(career => {
    const matchesSearch = career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         career.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         career.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCareerCategory === 'All Categories' || career.category === selectedCareerCategory;
    return matchesSearch && matchesCategory;
  });

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedLevel('All Levels');
    setSelectedPriceRange('All Prices');
    setSelectedCareerCategory('All Categories');
  };

  return (
    <div className="min-h-screen bg-background">
      <ModernHeader />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 px-6 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-5xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4 pb-2">
              Learn Skills, Build Career
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover courses and career paths in Nepal's growing AI and tech ecosystem
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for courses, careers, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500 shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Main Content Tabs */}
        <section className="py-8 px-6">
          <div className="container mx-auto max-w-6xl">
            <Tabs defaultValue="courses" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="courses" className="text-lg py-3">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Courses & Learning
                </TabsTrigger>
                <TabsTrigger value="careers" className="text-lg py-3">
                  <Users className="w-5 h-5 mr-2" />
                  Career Guide
                </TabsTrigger>
              </TabsList>

              {/* Courses Tab */}
              <TabsContent value="courses">
                {/* Free Resources Section */}
                <div className="py-16 px-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg mb-8">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                      Free Learning Resources
                    </h2>
                    <div className="space-y-8">
                      {freeResources.map((category, index) => (
                        <div key={index}>
                          <h3 className="text-xl font-semibold mb-4 text-blue-700">{category.category}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {category.resources.map((resource, resourceIndex) => (
                              <Card key={resourceIndex} className="hover:shadow-lg transition-shadow">
                                <CardHeader className="pb-3">
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <CardTitle className="text-lg">{resource.name}</CardTitle>
                                      <CardDescription className="text-sm">{resource.type}</CardDescription>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-gray-400" />
                                  </div>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                                  <div className="flex flex-wrap gap-1 mb-3">
                                    {resource.topics.slice(0, 3).map((topic, topicIndex) => (
                                      <Badge key={topicIndex} variant="secondary" className="text-xs">
                                        {topic}
                                      </Badge>
                                    ))}
                                    {resource.topics.length > 3 && (
                                      <Badge variant="outline" className="text-xs">
                                        +{resource.topics.length - 3} more
                                      </Badge>
                                    )}
                                  </div>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="w-full"
                                    onClick={() => window.open(resource.link, '_blank')}
                                  >
                                    Start Learning
                                  </Button>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Filters Section */}
                <div className="py-8 px-6 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg mb-8">
                  <div className="flex flex-wrap items-center gap-4 justify-between">
                    <div className="flex flex-wrap items-center gap-4">
                      <h3 className="text-lg font-semibold text-gray-800">Filter by:</h3>
                      
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Skill Level" />
                        </SelectTrigger>
                        <SelectContent>
                          {skillLevels.map(level => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Price Range" />
                        </SelectTrigger>
                        <SelectContent>
                          {priceRanges.map(range => (
                            <SelectItem key={range} value={range}>
                              {range}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-gray-600">
                        {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
                      </span>
                      <Button 
                        variant="outline" 
                        onClick={handleClearFilters}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Featured Courses Section */}
                <FeaturedCoursesSection />

                {/* All Courses Grid */}
                <div className="py-16">
                  <h2 className="text-3xl font-bold text-gray-800 mb-8">
                    {searchQuery || selectedCategory !== 'All Categories' || selectedLevel !== 'All Levels' || selectedPriceRange !== 'All Prices'
                      ? 'Search Results' 
                      : 'Popular Courses'}
                  </h2>
                  
                  {filteredCourses.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="text-gray-400 text-6xl mb-4">🔍</div>
                      <h3 className="text-2xl font-semibold text-gray-600 mb-2">No courses found</h3>
                      <p className="text-gray-500 mb-4">Try adjusting your search terms or filters</p>
                      <Button onClick={handleClearFilters} variant="outline">
                        Clear All Filters
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredCourses.map(course => (
                        <Card key={course.id} className="group cursor-pointer transition-all hover:shadow-lg">
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                                {course.title}
                              </CardTitle>
                              <ExternalLink className="w-4 h-4 text-gray-400" />
                            </div>
                            <CardDescription>by {course.instructor}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                            
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium">{course.rating}</span>
                              </div>
                              <Badge variant="secondary">{course.level}</Badge>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                              <span className="text-sm text-gray-500">
                                {course.students.toLocaleString()} students
                              </span>
                              <span className="text-sm text-gray-500">{course.duration}</span>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold text-green-600">
                                {course.price === 0 ? 'Free' : `$${course.price}`}
                              </span>
                              <Button 
                                size="sm"
                                onClick={() => window.open(course.link, '_blank')}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                View Course
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Career Guide Tab */}
              <TabsContent value="careers">
                {/* Career Guide Hero */}
                <div className="py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg mb-8">
                  <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-4">AI Career Guide for Nepal</h2>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                      Navigate the AI revolution in Nepal's job market. Discover opportunities in Kathmandu's growing tech ecosystem.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                        <Building className="w-8 h-8 mb-4 mx-auto" />
                        <h3 className="text-lg font-semibold mb-2">50+ Local Companies</h3>
                        <p className="text-blue-100">Hiring for AI and tech roles in Kathmandu</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                        <TrendingUp className="w-8 h-8 mb-4 mx-auto" />
                        <h3 className="text-lg font-semibold mb-2">Growing Market</h3>
                        <p className="text-blue-100">Nepal's tech sector growing 25% annually</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                        <Globe className="w-8 h-8 mb-4 mx-auto" />
                        <h3 className="text-lg font-semibold mb-2">Remote Opportunities</h3>
                        <p className="text-blue-100">Work with international companies from Kathmandu</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Career Search and Filter */}
                <div className="py-8 px-6 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg mb-8">
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        type="text"
                        placeholder="Search careers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={selectedCareerCategory} onValueChange={setSelectedCareerCategory}>
                      <SelectTrigger className="w-64">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {careerCategories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="text-gray-600">
                      {filteredCareers.length} career{filteredCareers.length !== 1 ? 's' : ''} found
                    </div>
                  </div>
                </div>

                {/* Career Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Career List */}
                  <div className="lg:col-span-2">
                    <div className="grid gap-6">
                      {filteredCareers.map(career => (
                        <Card 
                          key={career.id} 
                          className={`cursor-pointer transition-all hover:shadow-lg ${
                            selectedCareer?.id === career.id ? 'ring-2 ring-blue-500' : ''
                          }`}
                          onClick={() => setSelectedCareer(career)}
                        >
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-xl text-blue-700">{career.title}</CardTitle>
                                <CardDescription className="text-sm text-gray-500 mt-1">
                                  {career.alternativeNames.join(' • ')}
                                </CardDescription>
                              </div>
                              <Badge variant="secondary">{career.category}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700 mb-4">{career.description}</p>
                            <div className="flex flex-wrap gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4 text-green-600" />
                                <span>{career.salaryRange}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4 text-blue-600" />
                                <span>{career.localOpportunities.length} local companies</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                                <span>View Details</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Career Details Sidebar */}
                  <div className="lg:col-span-1">
                    <div className="sticky top-24">
                      {selectedCareer ? (
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-blue-700">{selectedCareer.title}</CardTitle>
                            <CardDescription>{selectedCareer.category}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Tabs defaultValue="overview" className="w-full">
                              <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="skills">Skills</TabsTrigger>
                                <TabsTrigger value="start">Get Started</TabsTrigger>
                              </TabsList>
                              
                              <TabsContent value="overview" className="space-y-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Key Responsibilities</h4>
                                  <ul className="space-y-1 text-sm">
                                    {selectedCareer.responsibilities.map((resp, index) => (
                                      <li key={index} className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                                        {resp}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                
                                <div>
                                  <h4 className="font-semibold mb-2">Salary Range</h4>
                                  <p className="text-sm text-green-600 font-medium">{selectedCareer.salaryRange}</p>
                                </div>
                                
                                <div>
                                  <h4 className="font-semibold mb-2">Career Growth</h4>
                                  <p className="text-sm">{selectedCareer.growthPotential}</p>
                                </div>
                                
                                <div>
                                  <h4 className="font-semibold mb-2">Local Opportunities</h4>
                                  <div className="flex flex-wrap gap-1">
                                    {selectedCareer.localOpportunities.map((company, index) => (
                                      <Badge key={index} variant="outline" className="text-xs">
                                        {company}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </TabsContent>
                              
                              <TabsContent value="skills" className="space-y-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Technical Skills</h4>
                                  <div className="flex flex-wrap gap-1">
                                    {selectedCareer.technicalSkills.map((skill, index) => (
                                      <Badge key={index} variant="secondary" className="text-xs">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="font-semibold mb-2">Soft Skills</h4>
                                  <div className="flex flex-wrap gap-1">
                                    {selectedCareer.softSkills.map((skill, index) => (
                                      <Badge key={index} variant="outline" className="text-xs">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="font-semibold mb-2">Education</h4>
                                  <p className="text-sm">{selectedCareer.education}</p>
                                </div>
                              </TabsContent>
                              
                              <TabsContent value="start" className="space-y-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Getting Started</h4>
                                  <ul className="space-y-2 text-sm">
                                    {selectedCareer.gettingStarted.map((step, index) => (
                                      <li key={index} className="flex items-start gap-2">
                                        <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center mt-0.5 flex-shrink-0">
                                          {index + 1}
                                        </span>
                                        {step}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </TabsContent>
                            </Tabs>
                          </CardContent>
                        </Card>
                      ) : (
                        <Card>
                          <CardContent className="pt-6 text-center">
                            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-600 mb-2">Select a Career</h3>
                            <p className="text-sm text-gray-500">Click on any career to view detailed information</p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                </div>

                {/* Enhanced Local Resources Section */}
                <div className="py-16 mt-16 px-6 bg-gray-50 rounded-lg">
                  <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Learning Resources in Nepal</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {localResources.map((resource, index) => (
                      <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{resource.name}</CardTitle>
                              <CardDescription>{resource.type}</CardDescription>
                            </div>
                            <ExternalLink className="w-4 h-4 text-gray-400" />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="w-4 h-4 text-gray-500" />
                              <span>{resource.location}</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {resource.programs.map((program, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {program}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => window.open(resource.website, '_blank')}
                          >
                            Visit Website
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-primary to-accent text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-heading font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Join the growing community of professionals shaping Nepal's digital future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300">
                Browse AI Tools
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary transition-all duration-300">
                Join Community
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
