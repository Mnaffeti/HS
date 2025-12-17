import type { CaseStudy } from "@shared/schema";

export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "FinTech Trading Platform",
    category: "Financial Services",
    description: "High-frequency trading platform handling millions of transactions daily with real-time analytics.",
    technologies: ["React", "Node.js", "PostgreSQL", "Redis", "WebSocket", "Docker"],
    metrics: "99.99% uptime",
    imageUrl: "",
    featured: true,
    challenge: "A leading investment firm needed to modernize their aging trading infrastructure. The existing system struggled with latency issues during peak trading hours and couldn't scale to meet growing transaction volumes. They needed a solution that could handle millions of transactions per day while maintaining sub-millisecond response times.",
    solution: "We architected a distributed microservices platform using event-driven design patterns. The system leverages Redis for in-memory caching and real-time data streaming, with PostgreSQL for persistent storage. WebSocket connections provide instant updates to traders, while horizontal scaling through Kubernetes ensures capacity during market volatility.",
    results: [
      "Reduced average latency from 200ms to 8ms",
      "Achieved 99.99% uptime over 18 months",
      "Processing 3.2M transactions daily at peak",
      "40% reduction in infrastructure costs"
    ],
    testimonial: {
      quote: "Hemma transformed our trading infrastructure. The new platform handles our peak volumes effortlessly and has become a competitive advantage for our firm.",
      author: "Michael Chen",
      role: "CTO",
      company: "Meridian Capital"
    },
    timeline: "8 months",
    team: "12 engineers"
  },
  {
    id: "2",
    title: "Healthcare Patient Portal",
    category: "Healthcare",
    description: "HIPAA-compliant patient management system with telemedicine integration.",
    technologies: ["Next.js", "Python", "AWS", "FHIR", "PostgreSQL", "Twilio"],
    metrics: "500K+ users",
    imageUrl: "",
    featured: true,
    challenge: "A regional healthcare network with 15 hospitals needed a unified patient portal to replace fragmented legacy systems. The solution had to be fully HIPAA-compliant, integrate with existing EHR systems, and support telemedicine capabilities for remote consultations.",
    solution: "We developed a comprehensive patient portal using Next.js for the frontend and Python microservices on AWS. The platform integrates with FHIR-compliant EHR systems and includes secure video consultations via Twilio. End-to-end encryption and detailed audit logging ensure regulatory compliance.",
    results: [
      "Onboarded 500K+ patients within first year",
      "60% reduction in appointment no-shows",
      "85% patient satisfaction rating",
      "Passed all HIPAA compliance audits"
    ],
    testimonial: {
      quote: "The patient portal has fundamentally changed how we deliver care. Our patients love the convenience, and our staff appreciate the streamlined workflows.",
      author: "Dr. Sarah Williams",
      role: "Chief Medical Officer",
      company: "Coastal Health System"
    },
    timeline: "12 months",
    team: "18 engineers"
  },
  {
    id: "3",
    title: "E-Commerce Platform",
    category: "Retail",
    description: "Scalable multi-tenant e-commerce solution processing $50M+ annually.",
    technologies: ["Vue.js", "Go", "Kubernetes", "MongoDB", "Elasticsearch", "Stripe"],
    metrics: "$50M+ processed",
    imageUrl: "",
    featured: false,
    challenge: "A growing retail conglomerate needed a unified e-commerce platform to support multiple brands under one infrastructure. Each brand required independent storefronts while sharing inventory, payments, and fulfillment systems.",
    solution: "We built a multi-tenant architecture using Go microservices with Vue.js storefronts. Kubernetes orchestration enables independent scaling per tenant, while shared services for payments (Stripe) and search (Elasticsearch) reduce operational overhead. MongoDB provides flexible product catalogs for diverse brand needs.",
    results: [
      "Processing $50M+ in annual transactions",
      "Supporting 8 brand storefronts",
      "99.9% checkout success rate",
      "2.5x increase in mobile conversions"
    ],
    testimonial: {
      quote: "Moving to the unified platform cut our operational costs significantly while giving each brand the flexibility they need. It's been a game-changer for our digital strategy.",
      author: "James Morrison",
      role: "VP of Digital",
      company: "Vertex Retail Group"
    },
    timeline: "10 months",
    team: "14 engineers"
  },
  {
    id: "4",
    title: "IoT Fleet Management",
    category: "Logistics",
    description: "Real-time tracking and optimization for 10,000+ vehicles across North America.",
    technologies: ["React Native", "Rust", "TimescaleDB", "MQTT", "MapBox", "AWS IoT"],
    metrics: "10K+ vehicles",
    imageUrl: "",
    featured: false,
    challenge: "A logistics company with a fleet of 10,000+ vehicles needed real-time visibility into their operations. They required accurate GPS tracking, predictive maintenance alerts, route optimization, and driver safety monitoring across North America.",
    solution: "We developed an IoT platform using Rust for high-performance data ingestion from vehicle sensors via MQTT. TimescaleDB handles time-series data for analytics, while React Native provides mobile apps for drivers and dispatchers. Machine learning models predict maintenance needs and optimize routes.",
    results: [
      "Tracking 10,000+ vehicles in real-time",
      "18% reduction in fuel costs",
      "35% decrease in maintenance downtime",
      "Real-time alerts for safety incidents"
    ],
    testimonial: {
      quote: "The visibility we now have into our fleet operations is incredible. We've reduced costs, improved safety, and our customers love the accurate delivery estimates.",
      author: "Robert Turner",
      role: "Director of Operations",
      company: "TransCon Logistics"
    },
    timeline: "9 months",
    team: "10 engineers"
  },
  {
    id: "5",
    title: "AI Content Platform",
    category: "Media",
    description: "Machine learning-powered content recommendation engine for a major publisher.",
    technologies: ["Python", "TensorFlow", "GCP", "BigQuery", "FastAPI", "React"],
    metrics: "3x engagement",
    imageUrl: "",
    featured: true,
    challenge: "A major digital publisher with 50M monthly readers wanted to increase engagement through personalized content recommendations. Their existing rule-based system couldn't adapt to changing reader preferences or scale with their content volume.",
    solution: "We built an ML-powered recommendation engine using TensorFlow and deployed on GCP. The system analyzes reading patterns, content semantics, and real-time behavior to serve personalized recommendations. A/B testing infrastructure enables continuous model improvement.",
    results: [
      "3x increase in articles read per session",
      "45% improvement in time on site",
      "2x increase in newsletter subscriptions",
      "Personalization for 50M+ monthly users"
    ],
    testimonial: {
      quote: "The recommendation engine has completely transformed reader engagement. Our audience is discovering more content than ever, and our subscription numbers reflect that.",
      author: "Emily Rodriguez",
      role: "Head of Product",
      company: "Digital Media Group"
    },
    timeline: "6 months",
    team: "8 engineers"
  },
  {
    id: "6",
    title: "Supply Chain Analytics",
    category: "Manufacturing",
    description: "Predictive analytics platform reducing inventory costs by 40%.",
    technologies: ["React", "Scala", "Spark", "Snowflake", "Airflow", "Tableau"],
    metrics: "40% cost reduction",
    imageUrl: "",
    featured: false,
    challenge: "A manufacturing company struggled with inventory management across 20 facilities. Overstocking tied up capital while stockouts disrupted production. They needed predictive visibility into demand patterns and supply chain disruptions.",
    solution: "We built a predictive analytics platform using Apache Spark for processing historical data and ML models for demand forecasting. Snowflake provides the data warehouse, with Airflow orchestrating pipelines. Custom React dashboards give stakeholders actionable insights.",
    results: [
      "40% reduction in inventory holding costs",
      "90% accuracy in 30-day demand forecasts",
      "25% reduction in stockouts",
      "Unified visibility across 20 facilities"
    ],
    testimonial: {
      quote: "The analytics platform paid for itself within the first quarter. We're making better decisions faster, and our inventory levels are finally optimized.",
      author: "David Kim",
      role: "Supply Chain Director",
      company: "Precision Manufacturing Inc."
    },
    timeline: "7 months",
    team: "9 engineers"
  }
];

export function getCaseStudyById(id: string): CaseStudy | undefined {
  return caseStudies.find(cs => cs.id === id);
}
