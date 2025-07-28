// Mock data for Pavitra Byali's Portfolio

import { Download } from "lucide-react";

export const personalInfo = {
  name: "Pavitra D B",
  displayName: "Pavitra Byali",
  title: "AI/ML Engineering Student",
  tagline: "Code. Build. Inspire.",
  location: "Bengaluru, Karnataka, India",
  email: "pavitrabyali6@gmail.com",
  linkedin: "https://www.linkedin.com/in/pavitra-byali-763b57301",
  github: "https://github.com/pavitra-d-byali",
  bio: "I'm Pavitra Byali, a B.Tech CSE (AI & ML) student at Alliance University, Bengaluru. I'm passionate about artificial intelligence, data science, and building impactful tech solutions for real-world problems.",
  careerGoals: {
    targetRole: "AI/ML Engineer",
    interestAreas: ["Artificial Intelligence", "Data Science", "Full-Stack Development", "Cloud Computing"]
  },
    

};

export const technicalSkills = {
  languages: ["C", "C++", "Python", "SQL", "HTML", "CSS", "JavaScript", "TypeScript", "Java", "PHP", "Bash"],
  frontend: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Tailwind CSS", "React.js"],
  backend: ["Node.js", "Express.js", "Flask", "RESTful APIs"],
  frameworks: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn", "Express.js"],
  databases: ["MySQL", "MongoDB", "PostgreSQL"],
  cloudDevOps: ["AWS (EC2, S3)", "Docker", "GitHub Actions"],
  tools: ["Git", "GitHub", "VS Code", "Jupyter Notebook"],
  deployment: ["GitHub Pages", "Google Colab"],
  others: ["Responsive Web Design", "API Integration", "Data Visualization"]
};

export const certifications = [
  {
    id: 1,
    title: "C++ Specialization",
    provider: "Coursera",
    date: "October 2024",
    status: "Completed"
  },
  {
    id: 2,
    title: "Python for Data Science",
    provider: "Coursera",
    date: "2024",
    status: "Completed"
  }
];

export const projects = [
  {
    id: 1,
    title: "Advanced E-commerce Platform",
    description: "Full-stack e-commerce app with secure login, payment, admin dashboard, and product management.",
    technologies: ["React.js", "Vite", "Tailwind CSS", "Express.js", "Node.js", "MongoDB", "JWT", "Stripe API"],
    github: "https://github.com/pavitra-d-byali/advanced-ecommerce-platform",
    features: [
      "Secure user authentication with JWT",
      "Payment integration with Stripe API",
      "Admin dashboard for product management",
      "Responsive design with Tailwind CSS",
      "Real-time inventory tracking"
    ],
    status: "Completed"
  },
  {
    id: 2,
    title: "Real-time Collaborative Project Management Tool",
    description: "Web app for task and team management with live collaboration and notifications.",
    technologies: ["Next.js", "Express.js", "MongoDB", "Socket.IO", "Redis", "AWS", "Docker"],
    github: "https://github.com/pavitra-d-byali/project-management-tool",
    features: [
      "Drag-and-drop Kanban board",
      "Live chat and notifications",
      "Optimistic UI updates",
      "Role-based access control",
      "Real-time collaboration"
    ],
    status: "In Progress"
  }
];

export const navigation = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
  { name: "Contact", href: "#contact" }
];

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/pavitra-d-byali",
    icon: "github"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/pavitra-byali-763b57301",
    icon: "linkedin"
  },
  {
    name: "Email",
    url: "mailto:pavitrabyali6@gmail.com",
    icon: "mail"
  }
];