import type { CaseStudy } from "@shared/schema";

// Import images using ES modules for proper Vite handling
import harronImage from "@/assests/harron1.jpeg";
import powereventImage from "@/assests/powerevent.jpg";
import parkitImage from "@/assests/parkit-page.png";
import loginAppImage from "@/assests/loginApp.png";
import depanneursImage from "@/assests/depanneurs.png";

export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "Harron",
    category: "Mobile Apps",
    description: "A Flutter mobile app providing Islamic educational content with a premium user experience. Designed with Figma, featuring smooth animations, optimized performance, and publication on App Store and Google Play.",
    technologies: ["Flutter", "Figma", "REST API"],
    metrics: "500K+ downloads",
    imageUrl: harronImage,
    featured: true,
    challenge: "The Islamic education space lacked a modern, user-friendly mobile application that could deliver content with a premium experience. Existing solutions had poor design, slow performance, and limited accessibility. There was a need for a beautifully designed, high-performance app that could engage users effectively across both iOS and Android platforms.",
    solution: "We created Harron, a Flutter-based mobile application designed with Figma for a stunning user interface. The app features smooth animations, optimized performance, and integrates with REST APIs for dynamic content delivery. Published on both App Store and Google Play, ensuring maximum reach and accessibility for users worldwide.",
    results: [
      "500K+ downloads across platforms",
      "Premium user experience with smooth animations",
      "High performance and optimized loading",
      "Successfully published on App Store and Google Play"
    ],
    testimonial: {
      quote: "Harron sets a new standard for Islamic educational apps. The design is beautiful, and the performance is exceptional. Our users are delighted.",
      author: "Sheikh Ibrahim Al-Mansouri",
      role: "Content Director",
      company: "Islamic Education Foundation"
    },
    timeline: "8 months",
    team: "7 engineers"
  },
  {
    id: "2",
    title: "Power Event",
    category: "Sports & Events",
    description: "Modernize powerlifting competitions with an Android app for referee voting and a TV app to display results, using MQTT for real-time communication.",
    technologies: ["Android Studio", "Python", "MQTT"],
    metrics: "Real-time voting",
    imageUrl: powereventImage,
    featured: false,
    challenge: "Powerlifting competitions required a modern solution for referee voting and real-time result display. Traditional paper-based systems were slow, error-prone, and didn't provide instant feedback to athletes and spectators. There was a need for a reliable, real-time communication system that could handle competition pressure.",
    solution: "We built Power Event, a dual-platform solution featuring an Android app for referee voting and a TV application for result display. The system uses MQTT protocol for reliable real-time communication between devices, ensuring instant vote registration and result broadcasting. Python backend handles data processing and synchronization.",
    results: [
      "Real-time referee voting and result display",
      "Eliminated paper-based errors",
      "Instant feedback for athletes and spectators",
      "Reliable MQTT-based communication"
    ],
    testimonial: {
      quote: "Power Event transformed our competitions. The real-time voting system is flawless, and spectators love seeing instant results on the big screen.",
      author: "Mohamed Trabelsi",
      role: "Competition Director",
      company: "National Powerlifting Federation"
    },
    timeline: "4 months",
    team: "4 engineers"
  },
  {
    id: "3",
    title: "ParkIt",
    category: "Smart City & IoT",
    description: "An intelligent parking management system integrating IoT, AI, and web technologies. Features include real-time license plate recognition, parking space detection using YOLOv6, and a MERN web app with payment via Flouci. CI/CD automated with Jenkins and Docker.",
    technologies: ["Flask", "MERN", "YOLOv6", "Docker", "Jenkins"],
    metrics: "Smart automation",
    imageUrl: parkitImage,
    featured: true,
    challenge: "Urban parking management faced significant challenges with manual processes, inefficient space utilization, and poor user experience. Cities needed an intelligent system that could automate parking detection, recognize vehicles, and provide seamless payment integration while being scalable and maintainable.",
    solution: "We developed ParkIt, an end-to-end intelligent parking solution. The system uses YOLOv6 for real-time parking space detection and license plate recognition, Flask for AI model deployment, and a MERN stack web application for user interface and management. Payment integration via Flouci enables seamless transactions. Jenkins and Docker ensure automated deployment and scalability.",
    results: [
      "Real-time parking space detection with YOLOv6",
      "Automated license plate recognition",
      "Seamless payment integration with Flouci",
      "Full CI/CD pipeline with Jenkins and Docker"
    ],
    testimonial: {
      quote: "ParkIt solved our parking chaos. The AI-powered detection is incredibly accurate, and users love how easy it is to find and pay for parking.",
      author: "Fatma Kharrat",
      role: "Smart City Manager",
      company: "City Council"
    },
    timeline: "10 months",
    team: "12 engineers"
  },
  {
    id: "4",
    title: "Academy Navigator",
    category: "Education",
    description: "Simplifies school administration and enhances collaboration between educators and students to enhance efficiency and transparency in educational institutions.",
    technologies: ["MySQL", "Spring Boot", "Angular"],
    metrics: "Enhanced efficiency",
    imageUrl: loginAppImage,
    featured: true,
    challenge: "Educational institutions faced challenges in managing administrative tasks efficiently and maintaining transparent communication between educators, students, and administrators. The traditional systems were fragmented, leading to reduced productivity and poor collaboration.",
    solution: "We developed Academy Navigator, a comprehensive school administration platform using Spring Boot for the backend, Angular for the frontend, and MySQL for data management. The system streamlines administrative processes, enables seamless collaboration, and provides real-time transparency across all educational activities.",
    results: [
      "Streamlined administrative workflows",
      "Enhanced collaboration between educators and students",
      "Improved transparency in educational processes",
      "Centralized data management system"
    ],
    testimonial: {
      quote: "Academy Navigator has revolutionized how we manage our school operations. The platform brings efficiency and transparency that we never had before.",
      author: "Dr. Ahmed Ben Salem",
      role: "Director",
      company: "Academic Institution"
    },
    timeline: "6 months",
    team: "6 engineers"
  },
  {
    id: "5",
    title: "Vitrine",
    category: "Web Development",
    description: "Developed multiple responsive showcase websites for clients using modern web technologies. Focused on performance, design, SEO optimization, and deployment across platforms like IONOS and OVH.",
    technologies: ["HTML", "CSS", "JavaScript", "Laravel"],
    metrics: "Multiple clients",
    imageUrl: depanneursImage,
    featured: false,
    challenge: "Small and medium businesses needed professional showcase websites that could effectively present their services online. They required responsive designs, excellent performance, strong SEO optimization, and reliable hosting solutions. Budget constraints meant the solution needed to be cost-effective while maintaining high quality.",
    solution: "We developed a series of custom showcase websites using modern web technologies including HTML, CSS, JavaScript, and Laravel. Each website was tailored to client needs with responsive design, optimized for search engines, and deployed on reliable platforms like IONOS and OVH. Focus on performance and user experience ensured high conversion rates.",
    results: [
      "Multiple successful client deployments",
      "Responsive design across all devices",
      "Optimized SEO performance",
      "Reliable hosting on IONOS and OVH"
    ],
    testimonial: {
      quote: "Our new website has transformed our online presence. The design is professional, loads fast, and we're getting more inquiries than ever before.",
      author: "Jean-Pierre Dubois",
      role: "Owner",
      company: "Dépanneurs Privés"
    },
    timeline: "Variable per client",
    team: "3-5 engineers"
  }
];

export function getCaseStudyById(id: string): CaseStudy | undefined {
  return caseStudies.find(cs => cs.id === id);
}
