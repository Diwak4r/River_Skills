
export interface ExtendedCourse {
  id: number;
  title: string;
  instructor: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  students: number;
  rating: number;
  price: number;
  image: string;
  description: string;
  skills: string[];
  language: 'English' | 'Hindi' | 'Nepali';
  platform: string;
  isFeatured?: boolean;
  isNew?: boolean;
}

export const expandedCourses: ExtendedCourse[] = [
  // Web Development Courses
  {
    id: 1,
    title: "Complete React Development Bootcamp",
    instructor: "Sarah Johnson",
    category: "Web Development",
    level: "Beginner",
    duration: "12 weeks",
    students: 45000,
    rating: 4.8,
    price: 0,
    image: "/placeholder.svg",
    description: "Master React from basics to advanced concepts. Build real-world projects and learn modern React patterns.",
    skills: ["React", "JavaScript", "HTML", "CSS", "Redux"],
    language: "English",
    platform: "YouTube",
    isFeatured: true
  },
  {
    id: 2,
    title: "Full Stack JavaScript Development",
    instructor: "Mike Chen",
    category: "Web Development",
    level: "Intermediate",
    duration: "16 weeks",
    students: 38000,
    rating: 4.9,
    price: 0,
    image: "/placeholder.svg",
    description: "Complete full-stack development using Node.js, Express, React, and MongoDB.",
    skills: ["Node.js", "Express", "React", "MongoDB", "JWT"],
    language: "English",
    platform: "FreeCodeCamp",
    isNew: true
  },
  {
    id: 3,
    title: "Vue.js Complete Course",
    instructor: "Emma Davis",
    category: "Web Development",
    level: "Beginner",
    duration: "8 weeks",
    students: 28000,
    rating: 4.7,
    price: 0,
    image: "/placeholder.svg",
    description: "Learn Vue.js 3 from scratch. Build dynamic web applications with the progressive framework.",
    skills: ["Vue.js", "JavaScript", "Vuex", "Vue Router"],
    language: "English",
    platform: "Vue Mastery"
  },
  {
    id: 4,
    title: "Angular Complete Guide",
    instructor: "Robert Wilson",
    category: "Web Development",
    level: "Intermediate",
    duration: "14 weeks",
    students: 32000,
    rating: 4.6,
    price: 0,
    image: "/placeholder.svg",
    description: "Master Angular framework with TypeScript. Build enterprise-level applications.",
    skills: ["Angular", "TypeScript", "RxJS", "NgRx"],
    language: "English",
    platform: "Angular University"
  },
  
  // Data Science Courses
  {
    id: 5,
    title: "Python for Data Science",
    instructor: "Dr. Lisa Park",
    category: "Data Science",
    level: "Beginner",
    duration: "10 weeks",
    students: 52000,
    rating: 4.9,
    price: 0,
    image: "/placeholder.svg",
    description: "Complete Python programming for data analysis, visualization, and machine learning.",
    skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    language: "English",
    platform: "Kaggle Learn",
    isFeatured: true
  },
  {
    id: 6,
    title: "Machine Learning Fundamentals",
    instructor: "Prof. James Lee",
    category: "Data Science",
    level: "Intermediate",
    duration: "12 weeks",
    students: 41000,
    rating: 4.8,
    price: 0,
    image: "/placeholder.svg",
    description: "Learn machine learning algorithms, implementation, and real-world applications.",
    skills: ["Machine Learning", "Scikit-learn", "Python", "Statistics"],
    language: "English",
    platform: "Coursera"
  },
  {
    id: 7,
    title: "Data Visualization with Python",
    instructor: "Anna Rodriguez",
    category: "Data Science",
    level: "Beginner",
    duration: "6 weeks",
    students: 35000,
    rating: 4.7,
    price: 0,
    image: "/placeholder.svg",
    description: "Create stunning visualizations using Python libraries like Matplotlib, Seaborn, and Plotly.",
    skills: ["Python", "Matplotlib", "Seaborn", "Plotly", "Data Analysis"],
    language: "English",
    platform: "DataCamp"
  },
  {
    id: 8,
    title: "R Programming for Statistics",
    instructor: "Dr. Michael Brown",
    category: "Data Science",
    level: "Beginner",
    duration: "8 weeks",
    students: 29000,
    rating: 4.6,
    price: 0,
    image: "/placeholder.svg",
    description: "Master R programming for statistical analysis and data visualization.",
    skills: ["R Programming", "Statistics", "ggplot2", "dplyr"],
    language: "English",
    platform: "R for Data Science"
  },

  // Mobile Development Courses
  {
    id: 9,
    title: "Flutter Mobile App Development",
    instructor: "David Kim",
    category: "Mobile Development",
    level: "Beginner",
    duration: "10 weeks",
    students: 37000,
    rating: 4.8,
    price: 0,
    image: "/placeholder.svg",
    description: "Build beautiful cross-platform mobile apps with Flutter and Dart.",
    skills: ["Flutter", "Dart", "Mobile Development", "Firebase"],
    language: "English",
    platform: "Flutter.dev",
    isNew: true
  },
  {
    id: 10,
    title: "React Native Complete Course",
    instructor: "Jennifer Liu",
    category: "Mobile Development",
    level: "Intermediate",
    duration: "12 weeks",
    students: 43000,
    rating: 4.7,
    price: 0,
    image: "/placeholder.svg",
    description: "Create native mobile apps using React Native and JavaScript.",
    skills: ["React Native", "JavaScript", "Redux", "Navigation"],
    language: "English",
    platform: "React Native"
  },
  {
    id: 11,
    title: "iOS Development with Swift",
    instructor: "Alex Thompson",
    category: "Mobile Development",
    level: "Beginner",
    duration: "14 weeks",
    students: 31000,
    rating: 4.6,
    price: 0,
    image: "/placeholder.svg",
    description: "Learn iOS app development using Swift and Xcode.",
    skills: ["Swift", "iOS", "Xcode", "UIKit", "SwiftUI"],
    language: "English",
    platform: "Apple Developer"
  },
  {
    id: 12,
    title: "Android Development with Kotlin",
    instructor: "Maria Garcia",
    category: "Mobile Development",
    level: "Intermediate",
    duration: "12 weeks",
    students: 34000,
    rating: 4.8,
    price: 0,
    image: "/placeholder.svg",
    description: "Build Android apps using Kotlin and Android Studio.",
    skills: ["Kotlin", "Android", "Android Studio", "Room Database"],
    language: "English",
    platform: "Android Developers"
  },

  // AI/ML Courses
  {
    id: 13,
    title: "Deep Learning with TensorFlow",
    instructor: "Dr. Kevin Wang",
    category: "AI/ML",
    level: "Advanced",
    duration: "16 weeks",
    students: 39000,
    rating: 4.9,
    price: 0,
    image: "/placeholder.svg",
    description: "Master deep learning concepts and implement neural networks with TensorFlow.",
    skills: ["TensorFlow", "Deep Learning", "Neural Networks", "Python"],
    language: "English",
    platform: "TensorFlow.org",
    isFeatured: true
  },
  {
    id: 14,
    title: "PyTorch for Deep Learning",
    instructor: "Dr. Rachel Green",
    category: "AI/ML",
    level: "Intermediate",
    duration: "12 weeks",
    students: 35000,
    rating: 4.8,
    price: 0,
    image: "/placeholder.svg",
    description: "Learn PyTorch framework for building and training deep learning models.",
    skills: ["PyTorch", "Deep Learning", "Computer Vision", "NLP"],
    language: "English",
    platform: "PyTorch.org"
  },
  {
    id: 15,
    title: "Natural Language Processing",
    instructor: "Prof. Ahmed Ali",
    category: "AI/ML",
    level: "Advanced",
    duration: "14 weeks",
    students: 28000,
    rating: 4.7,
    price: 0,
    image: "/placeholder.svg",
    description: "Explore NLP techniques, sentiment analysis, and language models.",
    skills: ["NLP", "NLTK", "spaCy", "Transformers", "Python"],
    language: "English",
    platform: "Hugging Face"
  },
  {
    id: 16,
    title: "Computer Vision Fundamentals",
    instructor: "Dr. Yuki Tanaka",
    category: "AI/ML",
    level: "Intermediate",
    duration: "10 weeks",
    students: 32000,
    rating: 4.6,
    price: 0,
    image: "/placeholder.svg",
    description: "Learn image processing, object detection, and computer vision algorithms.",
    skills: ["Computer Vision", "OpenCV", "Image Processing", "Object Detection"],
    language: "English",
    platform: "OpenCV"
  },

  // Cloud Computing Courses
  {
    id: 17,
    title: "AWS Cloud Practitioner",
    instructor: "John Anderson",
    category: "Cloud Computing",
    level: "Beginner",
    duration: "8 weeks",
    students: 48000,
    rating: 4.8,
    price: 0,
    image: "/placeholder.svg",
    description: "Get started with Amazon Web Services and cloud computing fundamentals.",
    skills: ["AWS", "Cloud Computing", "EC2", "S3", "IAM"],
    language: "English",
    platform: "AWS Training"
  },
  {
    id: 18,
    title: "Google Cloud Platform Essentials",
    instructor: "Sophie Martin",
    category: "Cloud Computing",
    level: "Beginner",
    duration: "6 weeks",
    students: 36000,
    rating: 4.7,
    price: 0,
    image: "/placeholder.svg",
    description: "Learn Google Cloud Platform services and deployment strategies.",
    skills: ["Google Cloud", "Compute Engine", "Cloud Storage", "Kubernetes"],
    language: "English",
    platform: "Google Cloud"
  },
  {
    id: 19,
    title: "Microsoft Azure Fundamentals",
    instructor: "Thomas Mueller",
    category: "Cloud Computing",
    level: "Beginner",
    duration: "7 weeks",
    students: 41000,
    rating: 4.6,
    price: 0,
    image: "/placeholder.svg",
    description: "Master Microsoft Azure cloud services and solutions.",
    skills: ["Azure", "Virtual Machines", "App Service", "SQL Database"],
    language: "English",
    platform: "Microsoft Learn"
  },
  {
    id: 20,
    title: "DevOps with Docker and Kubernetes",
    instructor: "Carlos Silva",
    category: "Cloud Computing",
    level: "Advanced",
    duration: "12 weeks",
    students: 33000,
    rating: 4.9,
    price: 0,
    image: "/placeholder.svg",
    description: "Learn containerization and orchestration with Docker and Kubernetes.",
    skills: ["Docker", "Kubernetes", "DevOps", "CI/CD", "Microservices"],
    language: "English",
    platform: "Docker"
  },

  // Hindi Language Courses
  {
    id: 21,
    title: "वेब डेवलपमेंट - HTML, CSS, JavaScript",
    instructor: "राज कुमार",
    category: "Web Development",
    level: "Beginner",
    duration: "10 सप्ताह",
    students: 25000,
    rating: 4.7,
    price: 0,
    image: "/placeholder.svg",
    description: "वेब डेवलपमेंट की बुनियादी बातें सीखें। HTML, CSS और JavaScript में महारत हासिल करें।",
    skills: ["HTML", "CSS", "JavaScript", "वेब डिज़ाइन"],
    language: "Hindi",
    platform: "CodeWithHarry"
  },
  {
    id: 22,
    title: "पायथन प्रोग्रामिंग कोर्स",
    instructor: "प्रिया शर्मा",
    category: "Programming",
    level: "Beginner",
    duration: "8 सप्ताह",
    students: 32000,
    rating: 4.8,
    price: 0,
    image: "/placeholder.svg",
    description: "शुरुआत से पायथन प्रोग्रामिंग सीखें। डेटा साइंस और वेब डेवलपमेंट के लिए तैयार हों।",
    skills: ["Python", "प्रोग्रामिंग", "डेटा स्ट्रक्चर"],
    language: "Hindi",
    platform: "Hindi Programming"
  },

  // Nepali Language Courses
  {
    id: 23,
    title: "वेब डेभलपमेन्ट - नेपालीमा",
    instructor: "रमेश गुरुङ",
    category: "Web Development",
    level: "Beginner",
    duration: "१२ हप्ता",
    students: 18000,
    rating: 4.6,
    price: 0,
    image: "/placeholder.svg",
    description: "वेब डेभलपमेन्टका आधारभूत कुराहरू सिक्नुहोस्। HTML, CSS र JavaScript मा दक्षता प्राप्त गर्नुहोस्।",
    skills: ["HTML", "CSS", "JavaScript", "वेब डिजाइन"],
    language: "Nepali",
    platform: "Nepali Coding"
  },
  {
    id: 24,
    title: "मोबाइल एप डेभलपमेन्ट",
    instructor: "सुनिता राई",
    category: "Mobile Development",
    level: "Intermediate",
    duration: "१० हप्ता",
    students: 15000,
    rating: 4.7,
    price: 0,
    image: "/placeholder.svg",
    description: "Flutter प्रयोग गरेर मोबाइल एप्लिकेसन बनाउन सिक्नुहोस्।",
    skills: ["Flutter", "Dart", "मोबाइल डेभलपमेन्ट"],
    language: "Nepali",
    platform: "Nepali Tech"
  }
];
