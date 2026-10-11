export interface ExperienceProject {
  name: string;
  description: string;
  responsibilities?: string;
  tech: string[];
}

export interface ExperienceEntry {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  projects: ExperienceProject[];
}

export interface PersonalProject {
  title: string;
  year: number;
  description: string;
  tech: string[];
}

export interface SkillCategory {
  label: string;
  skills: string[];
}

export const profile = {
  name: "Ahmed Alaa",
  assistantName: "Medo",
  tagline:
    "Senior Software Engineer building backend systems, APIs, and AI-powered features across fintech, telecom, and e-commerce.",
  location: "Egypt (Remote)",
  email: "ahmed.alaa.eldin.hamdy@gmail.com",
  phone: "+201021194536",
  linkedin: "linkedin.com/in/ahmedalaa100",
  linkedinUrl: "https://linkedin.com/in/ahmedalaa100",
  gitlab: "gitlab.com/AhmedMedo",
  gitlabUrl: "https://gitlab.com/AhmedMedo",
  github: "github.com/AhmedMedo",
  githubUrl: "https://github.com/AhmedMedo",
  bioParagraphs: [
    "Ahmed is a Senior Software Engineer with 9+ years of software development experience across backend engineering, web applications, APIs, cloud infrastructure, telecom platforms, fintech, e-commerce, and distributed systems.",
    "His hands-on expertise spans PHP, Laravel, Symfony, Node.js, Python, React, Vue.js, AWS, Docker, Kubernetes, and CI/CD. Today he builds backend services and AI-powered features for the Baltic Exchange's market data platform.",
    "He has a proven track record of owning complex features end-to-end, improving system performance and reliability, integrating third-party platforms, and collaborating with distributed engineering teams across international environments.",
  ],
};

export const education = {
  degree: "Bachelor of Computer and System Engineering",
  institution: "Ain Shams University",
  location: "Cairo, Egypt",
  startDate: "Aug 2012",
  endDate: "May 2016",
};

export const stats: { value: string; label: string }[] = [
  { value: "9+", label: "Years experience" },
  { value: "5", label: "Companies" },
  { value: "15", label: "Projects" },
  { value: "30+", label: "Technologies" },
];

export const skillCategories: SkillCategory[] = [
  {
    label: "Languages",
    skills: [
      "PHP",
      "Node.js",
      "Python",
      "Go",
      "SQL (Postgres, MySQL, NoSQL)",
      "JavaScript",
      "TypeScript",
      "HTML/CSS",
      "C/C++",
    ],
  },
  {
    label: "Frameworks",
    skills: ["Laravel", "Symfony", "Phalcon", "CodeIgniter", "Django", "Vue.js", "React", "Next.js"],
  },
  {
    label: "DevOps",
    skills: ["Git", "Docker", "Kubernetes", "AWS", "Jenkins", "Terraform", "CI/CD"],
  },
  {
    label: "CMS",
    skills: ["WordPress", "Shopify", "Magento"],
  },
  {
    label: "AI & Generative AI",
    skills: [
      "Large Language Models (LLMs)",
      "Generative AI Applications",
      "Prompt Engineering",
      "OpenAI API",
      "AI-powered Application Development",
      "Retrieval-Augmented Generation (RAG)",
      "Vector Databases",
      "LangChain",
      "AI Agents",
    ],
  },
  {
    label: "Others",
    skills: ["ELK", "Grafana", "RabbitMQ", "Redis", "New Relic"],
  },
];

export const experience: ExperienceEntry[] = [
  {
    title: "Senior Software Engineer",
    company: "Baltic Exchange (via SAQAYA)",
    location: "Remote",
    startDate: "Nov 2023",
    endDate: "Present",
    projects: [
      {
        name: "Baltic Data Platform (BDP) V1 & V2",
        description:
          "Developed and enhanced Baltic Data Platform, a market data platform supporting benchmark submission workflows and maritime data operations.",
        responsibilities:
          "Developed backend services, REST APIs, AI-powered features, scalable application components, and contributed to frontend development.",
        tech: ["Python", "FastAPI", "React", "AI/LLM Technologies", "REST APIs", "Docker", "Cloud Services"],
      },
    ],
  },
  {
    title: "Senior Software Engineer",
    company: "XM",
    location: "Cyprus, Remote",
    startDate: "Dec 2021",
    endDate: "Oct 2023",
    projects: [
      {
        name: "Promotions Engine",
        description: "Symfony-based API and React dashboard for marketing campaigns.",
        responsibilities: "Upgraded Symfony 5.4 → 6, collaborated with DevOps.",
        tech: [
          "Symfony 6/5.4",
          "React",
          "Node.js",
          "TypeScript",
          "Terraform",
          "New Relic",
          "AWS (S3, Lambda, EC2, CloudFront)",
          "Kubernetes",
          "Docker",
        ],
      },
    ],
  },
  {
    title: "Senior Software Engineer",
    company: "Sulfah",
    location: "Saudi Arabia",
    startDate: "Dec 2019",
    endDate: "Nov 2021",
    projects: [
      {
        name: "Microfinance Portal",
        description: "Vue.js dashboard + Laravel API for loan management.",
        responsibilities: "Developed ACL for role-based access, redesigned auth flow.",
        tech: ["Laravel", "Vue.js", "OAuth2", "Node.js"],
      },
    ],
  },
  {
    title: "Senior Software Engineer",
    company: "Pentavalue",
    location: "Egypt",
    startDate: "Jan 2018",
    endDate: "Nov 2019",
    projects: [
      {
        name: "MEDawi (Pharmacy App)",
        description: "Mobile app for medication reminders and tracking.",
        responsibilities: "Developed backend APIs, implemented push notifications.",
        tech: ["Symfony", "Firebase"],
      },
      {
        name: "ServU (Technician Booking)",
        description: "On-demand service booking platform.",
        responsibilities: "Built booking engine, integrated payment gateway.",
        tech: ["React Native", "Symfony"],
      },
    ],
  },
  {
    title: "Web Developer",
    company: "Fekra Computers",
    location: "Egypt",
    startDate: "Jul 2016",
    endDate: "Dec 2017",
    projects: [
      {
        name: "Khabar News Platform & Business Applications",
        description:
          "Developed and maintained web-based applications including content management systems and internal business solutions.",
        responsibilities:
          "Designed backend features, developed database-driven modules, implemented APIs, optimized application performance, and supported production systems.",
        tech: ["PHP", "Laravel", "Symfony", "MySQL", "JavaScript", "HTML/CSS", "REST APIs"],
      },
    ],
  },
];

export const projects: PersonalProject[] = [
  {
    title: "TAS (Accounting/ERP)",
    year: 2024,
    description:
      "Developed a multi-tenant accounting and ERP platform supporting customer accounts, business workflows, and financial operations. Implemented e-invoice integration features and supported API-based financial transactions.",
    tech: ["Laravel", "Node.js", "HTML", "MySQL", "AWS EC2", "Vue.js"],
  },
  {
    title: "Giftit",
    year: 2023,
    description:
      "Led development activities, designed features, and delivered required application functionality. Integrated application components, improved workflows, and enhanced system usability.",
    tech: ["Laravel", "Node.js", "HTML", "MySQL", "AWS EC2", "Vue.js"],
  },
  {
    title: "Ewysh (Zone1 Side Project)",
    year: 2023,
    description:
      "Led development activities, designed features, and delivered required application functionality. Integrated application components, improved workflows, and enhanced system usability.",
    tech: ["Laravel", "Node.js", "React", "MySQL", "AWS"],
  },
  {
    title: "Zone1",
    year: 2021,
    description:
      "Led a team to develop a multi-tenant e-card system. Built an e-card sending engine that sends over 10,000 emails to recipients, and met with clients to present the application.",
    tech: ["Laravel", "HTML", "MySQL", "AWS EC2", "AWS RDS", "JavaScript"],
  },
  {
    title: "Telgani - Car Rental Platform",
    year: 2021,
    description:
      "Developed backend services and APIs for a scalable vehicle booking and rental platform. Optimized database queries and improved application performance.",
    tech: ["Laravel", "React"],
  },
  {
    title: "Brimore - Go-To-Market Platform",
    year: 2021,
    description:
      "Developed backend services supporting supplier, customer, and transaction workflows. Implemented business logic and API integrations for platform operations.",
    tech: ["Laravel", "React"],
  },
  {
    title: "Sabq Newspaper",
    year: 2020,
    description:
      "Migrated MongoDB data structures into JSON format and prepared content integration for the new CMS.",
    tech: ["Laravel", "Symfony", "MongoDB"],
  },
  {
    title: "Trustsec",
    year: 2019,
    description:
      "Developed and customized a WordPress-based e-commerce website for security product sales.",
    tech: ["PHP", "WordPress"],
  },
];
