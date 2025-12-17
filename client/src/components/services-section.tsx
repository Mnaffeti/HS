import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import type { Service } from "@shared/schema";

if (typeof window !== "undefined" && gsap && "registerPlugin" in gsap) {
  gsap.registerPlugin(ScrollTrigger);
}

const services: Service[] = [
  {
    id: "1",
    number: "01",
    title: "Custom Software Development",
    description: "End-to-end development of bespoke applications tailored to your unique business requirements. From initial architecture to deployment and maintenance.",
  },
  {
    id: "2",
    number: "02",
    title: "Digital Transformation",
    description: "Modernize legacy systems and processes with cutting-edge technology. We help organizations embrace digital innovation to stay competitive.",
  },
  {
    id: "3",
    number: "03",
    title: "Technical Strategy",
    description: "Strategic technology consulting to align your tech stack with business goals. Architecture reviews, technology audits, and roadmap planning.",
  },
  {
    id: "4",
    number: "04",
    title: "Cloud Solutions",
    description: "Design and implementation of scalable cloud infrastructure. Migration services, DevOps practices, and cloud-native application development.",
  },
  {
    id: "5",
    number: "05",
    title: "Product Engineering",
    description: "Full-cycle product development from concept to market. MVP development, product scaling, and continuous feature enhancement.",
  },
  {
    id: "6",
    number: "06",
    title: "Team Augmentation",
    description: "Extend your development capacity with our experienced engineers. Seamless integration with your existing team and processes.",
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!section || !cards.length) return;

    const ctx = gsap.context(() => {
      // Set initial hidden state
      gsap.set(cards, { opacity: 0, y: 60, scale: 0.95 });

      cards.forEach((card, idx) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 20%",
            toggleActions: "play none none none",
          },
          delay: idx * 0.08,
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium mb-4" data-testid="text-services-label">
              What We Do
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight" data-testid="text-services-headline">
              Services
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed" data-testid="text-services-description">
              We offer comprehensive software consulting services designed to 
              accelerate your digital journey and deliver lasting value.
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
              {services.map((service, idx) => (
                <div
                  key={service.id}
                  ref={(el) => { cardsRef.current[idx] = el; }}
                  className="group"
                  style={{ opacity: 0, transform: 'translateY(60px) scale(0.95)' }}
                  data-testid={`card-service-${service.id}`}
                >
                  <span className="text-sm font-mono text-accent" data-testid={`text-service-number-${service.id}`}>
                    {service.number}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight" data-testid={`text-service-title-${service.id}`}>
                    {service.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed" data-testid={`text-service-description-${service.id}`}>
                    {service.description}
                  </p>
                  <div className="mt-4 h-px bg-border group-hover:bg-accent transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
