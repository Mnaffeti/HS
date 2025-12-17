import { Link } from "wouter";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { caseStudies } from "@/data/case-studies";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Code2, Database, Cloud, Cpu, Brain, BarChart3 } from "lucide-react";

if (typeof window !== "undefined" && gsap && "registerPlugin" in gsap) {
  gsap.registerPlugin(ScrollTrigger);
}

const projectIcons = [Code2, Database, Cloud, Cpu, Brain, BarChart3];

const projects = caseStudies.slice(0, 6).map(cs => ({
  id: cs.id,
  title: cs.title,
  category: cs.category,
  description: cs.description,
  technologies: cs.technologies.slice(0, 4),
  metrics: cs.metrics,
  imageUrl: cs.imageUrl,
  featured: cs.featured,
}));

export function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate header
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          {
            y: 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Animate cards with alternating directions
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".portfolio-card");
        
        cards.forEach((card, index) => {
          const isEven = index % 2 === 0;
          const xOffset = isEven ? -100 : 100;
          
          gsap.fromTo(
            card,
            {
              x: xOffset,
              y: 50,
              opacity: 0,
            },
            {
              x: 0,
              y: 0,
              opacity: 1,
              duration: 1.25,
              ease: "expo.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 40%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium mb-4" data-testid="text-portfolio-label">
              Selected Work
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight" data-testid="text-portfolio-headline">
              Case Studies
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md" data-testid="text-portfolio-description">
            A selection of projects that showcase our expertise across industries and technologies.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => {
            const IconComponent = projectIcons[index % projectIcons.length];
            return (
              <Link
                key={project.id}
                href={`/case-study/${project.id}`}
                className={`portfolio-card group relative bg-card border border-card-border rounded-md overflow-visible hover-elevate active-elevate-2 cursor-pointer block ${
                  project.featured && index === 0 ? "md:row-span-2" : ""
                }`}
                data-testid={`card-project-${project.id}`}
              >
                <div className={`p-6 lg:p-8 flex flex-col ${
                  project.featured && index === 0 ? "h-full" : ""
                }`}>
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                      <p className="text-sm uppercase tracking-wider text-muted-foreground" data-testid={`text-project-category-${project.id}`}>
                        {project.category}
                      </p>
                      <h3 className="mt-2 text-xl lg:text-2xl font-semibold tracking-tight" data-testid={`text-project-title-${project.id}`}>
                        {project.title}
                      </h3>
                    </div>
                    <div className="p-2 rounded-full border border-border group-hover:border-accent group-hover:text-accent transition-colors">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>

                  <div className={`relative bg-muted rounded-md mb-6 overflow-hidden ${
                    project.featured && index === 0 ? "flex-1 min-h-[200px]" : "aspect-video"
                  }`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-foreground/10 grayscale group-hover:grayscale-0 transition-all duration-500" />
                    <svg className="absolute inset-0 w-full h-full opacity-30 group-hover:opacity-50 transition-opacity duration-500" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="20" y="20" width="100" height="60" rx="4" className="fill-foreground/5 group-hover:fill-accent/10 transition-colors duration-500" />
                      <rect x="140" y="20" width="240" height="8" rx="2" className="fill-foreground/10" />
                      <rect x="140" y="40" width="180" height="8" rx="2" className="fill-foreground/5" />
                      <rect x="140" y="60" width="220" height="8" rx="2" className="fill-foreground/5" />
                      <rect x="20" y="100" width="360" height="1" className="fill-foreground/10" />
                      <rect x="20" y="120" width="80" height="80" rx="4" className="fill-foreground/5" />
                      <rect x="20" y="220" width="80" height="60" rx="4" className="fill-foreground/5" />
                      <rect x="120" y="120" width="80" height="160" rx="4" className="fill-accent/5 group-hover:fill-accent/15 transition-colors duration-500" />
                      <rect x="220" y="120" width="160" height="80" rx="4" className="fill-foreground/5" />
                      <rect x="220" y="220" width="160" height="60" rx="4" className="fill-foreground/5" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 border border-border rounded-full flex items-center justify-center bg-background/50 backdrop-blur-sm group-hover:border-accent group-hover:bg-accent/10 transition-all duration-500">
                        <IconComponent className="h-6 w-6 text-muted-foreground group-hover:text-accent transition-colors duration-500" />
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6" data-testid={`text-project-description-${project.id}`}>
                    {project.description}
                  </p>

                  <div className="mt-auto space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs" data-testid={`badge-tech-${project.id}-${tech}`}>
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-accent" />
                      <span className="text-sm font-medium" data-testid={`text-project-metrics-${project.id}`}>{project.metrics}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
