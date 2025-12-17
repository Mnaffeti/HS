import { useRoute, Link } from "wouter";
import { getCaseStudyById } from "@/data/case-studies";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Clock, Users, Quote, CheckCircle2, Code2, Database, Cloud, Cpu, Brain, BarChart3 } from "lucide-react";

const projectIcons = [Code2, Database, Cloud, Cpu, Brain, BarChart3];

export default function CaseStudyPage() {
  const [match, params] = useRoute("/case-study/:id");
  
  if (!match || !params?.id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Case Study Not Found</h1>
          <Link href="/">
            <Button variant="outline" data-testid="link-back-home">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const caseStudy = getCaseStudyById(params.id);
  const IconComponent = projectIcons[(parseInt(params.id) - 1) % projectIcons.length];

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Case Study Not Found</h1>
          <Link href="/">
            <Button variant="outline" data-testid="link-back-home">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm" data-testid="link-back">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <span className="text-sm text-muted-foreground uppercase tracking-wider">
            Case Study
          </span>
          <Link href="/#contact">
            <Button size="sm" className="bg-accent text-accent-foreground border border-accent-border" data-testid="link-contact">
              Get in Touch
            </Button>
          </Link>
        </div>
      </nav>

      <main className="pt-16">
        <section className="py-16 lg:py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
              <div className="lg:col-span-3">
                <p className="text-sm uppercase tracking-[0.2em] text-accent font-medium mb-4" data-testid="text-category">
                  {caseStudy.category}
                </p>
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6" data-testid="text-title">
                  {caseStudy.title}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed" data-testid="text-description">
                  {caseStudy.description}
                </p>
              </div>
              <div className="lg:col-span-2 flex flex-col justify-center gap-6">
                <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-md border border-border">
                  <Clock className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Timeline</p>
                    <p className="font-semibold" data-testid="text-timeline">{caseStudy.timeline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-md border border-border">
                  <Users className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Team Size</p>
                    <p className="font-semibold" data-testid="text-team">{caseStudy.team}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-accent/10 rounded-md border border-accent/20">
                  <div className="h-3 w-3 rounded-full bg-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Key Metric</p>
                    <p className="font-semibold text-accent" data-testid="text-metrics">{caseStudy.metrics}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="relative bg-muted rounded-md overflow-hidden aspect-video mb-16">
              <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-foreground/10" />
              <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="40" y="40" width="200" height="120" rx="8" className="fill-foreground/5" />
                <rect x="280" y="40" width="480" height="16" rx="4" className="fill-foreground/10" />
                <rect x="280" y="80" width="360" height="16" rx="4" className="fill-foreground/5" />
                <rect x="280" y="120" width="440" height="16" rx="4" className="fill-foreground/5" />
                <rect x="40" y="200" width="720" height="2" className="fill-foreground/10" />
                <rect x="40" y="240" width="160" height="160" rx="8" className="fill-foreground/5" />
                <rect x="240" y="240" width="160" height="320" rx="8" className="fill-accent/10" />
                <rect x="440" y="240" width="320" height="160" rx="8" className="fill-foreground/5" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 border-2 border-accent rounded-full flex items-center justify-center bg-background/50 backdrop-blur-sm">
                  <IconComponent className="h-10 w-10 text-accent" />
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
              <div className="lg:col-span-2 space-y-12">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-6" data-testid="heading-challenge">
                    The Challenge
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-lg" data-testid="text-challenge">
                    {caseStudy.challenge}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-6" data-testid="heading-solution">
                    Our Solution
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-lg" data-testid="text-solution">
                    {caseStudy.solution}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-6" data-testid="heading-results">
                    Results
                  </h2>
                  <ul className="space-y-4">
                    {caseStudy.results.map((result, index) => (
                      <li key={index} className="flex items-start gap-3" data-testid={`result-${index}`}>
                        <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-lg">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-sm" data-testid={`badge-tech-${tech}`}>
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {caseStudy.testimonial && (
                  <div className="p-6 bg-muted/30 rounded-md border border-border">
                    <Quote className="h-8 w-8 text-accent mb-4" />
                    <blockquote className="text-lg leading-relaxed mb-6" data-testid="text-testimonial-quote">
                      "{caseStudy.testimonial.quote}"
                    </blockquote>
                    <div className="border-t border-border pt-4">
                      <p className="font-semibold" data-testid="text-testimonial-author">{caseStudy.testimonial.author}</p>
                      <p className="text-sm text-muted-foreground" data-testid="text-testimonial-role">
                        {caseStudy.testimonial.role}, {caseStudy.testimonial.company}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-muted/30 border-t border-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve similar results for your business.
            </p>
            <Link href="/#contact">
              <Button size="lg" className="bg-accent text-accent-foreground border border-accent-border" data-testid="button-cta-contact">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <Link href="/">
            <span className="text-xl font-bold tracking-tighter">Hemma Consulting</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} Hemma Consulting. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
