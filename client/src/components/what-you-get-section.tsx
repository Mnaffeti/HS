import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined" && gsap && "registerPlugin" in gsap) {
  gsap.registerPlugin(ScrollTrigger);
}

const benefits = [
  {
    id: 1,
    title: "1:1 Strategy Call",
    description: "Personal session to map your Growth Engine and identify your unique opportunities.",
    position: "top",
  },
  {
    id: 2,
    title: "Customized Scale Plan",
    description: "Tailored roadmap covering offers, funnels, and traffic strategies for your business.",
    position: "middle",
    isPrincipal: true,
  },
  {
    id: 3,
    title: "Done-For-You Pieces",
    description: "We handle the implementation so you can focus on what you do best.",
    position: "bottom",
  },
  {
    id: 4,
    title: "30-90 Days Follow-Up",
    description: "Ongoing guidance and support to ensure your success and momentum.",
    position: "end",
  },
];

export function WhatYouGetSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const closingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cardsContainer = cardsContainerRef.current;
    const closing = closingRef.current;

    if (!section || !heading || !cardsContainer || !closing) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(heading, {
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Vertical stack animation
      const cards = cardsContainer.querySelectorAll('[data-card]');
      
      cards.forEach((card, index) => {
        const isPrincipal = card.getAttribute('data-principal') === 'true';
        
        // Set initial positions based on card position
        if (index === 0) {
          // Top card
          gsap.set(card, {
            y: -100,
            scale: 0.85,
            opacity: 0,
          });
        } else if (index === 1) {
          // Middle (principal) card
          gsap.set(card, {
            y: 0,
            scale: 0.9,
            opacity: 0,
          });
        } else if (index === 2) {
          // Bottom card
          gsap.set(card, {
            y: 100,
            scale: 0.85,
            opacity: 0,
          });
        } else {
          // End card
          gsap.set(card, {
            y: 150,
            scale: 0.8,
            opacity: 0,
          });
        }

        // Animate cards into position vertically
        gsap.to(card, {
          y: 0,
          scale: isPrincipal ? 1.05 : 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsContainer,
            start: "top 70%",
            toggleActions: "play none none none",
          },
          delay: index * 0.2,
        });

        // Card content animations
        const number = card.querySelector('[data-number]');
        const title = card.querySelector('[data-title]');
        const description = card.querySelector('[data-description]');
        const decorator = card.querySelector('[data-decorator]');

        gsap.from(number, {
          opacity: 0,
          scale: 0,
          rotation: isPrincipal ? 360 : -180,
          duration: isPrincipal ? 0.8 : 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cardsContainer,
            start: "top 70%",
            toggleActions: "play none none none",
          },
          delay: index * 0.2 + 0.3,
        });

        gsap.from(title, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsContainer,
            start: "top 70%",
            toggleActions: "play none none none",
          },
          delay: index * 0.2 + 0.4,
        });

        gsap.from(description, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsContainer,
            start: "top 70%",
            toggleActions: "play none none none",
          },
          delay: index * 0.2 + 0.5,
        });

        gsap.from(decorator, {
          scaleX: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsContainer,
            start: "top 70%",
            toggleActions: "play none none none",
          },
          delay: index * 0.2 + 0.6,
        });
      });

      // Closing message animation
      gsap.from(closing, {
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: closing,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-36 overflow-hidden bg-gradient-to-b from-background/50 to-background">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16 lg:mb-24">
          <h2 ref={headingRef} className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
            What You Get<span className="text-yellow-500">...</span>
          </h2>
        </div>

        {/* Card Stack */}
        <div ref={cardsContainerRef} className="max-w-5xl mx-auto mb-16 lg:mb-24 relative">
          <div className="flex flex-col items-center gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.id}
                data-card
                data-principal={benefit.isPrincipal}
                className={`group relative w-full backdrop-blur-xl border transition-all duration-500 ${
                  benefit.isPrincipal
                    ? 'bg-gradient-to-br from-yellow-500/10 to-background/60 border-yellow-500/40 hover:border-yellow-500/60 hover:shadow-[0_30px_80px_-15px_rgba(234,179,8,0.4)] max-w-4xl scale-105'
                    : 'bg-background/40 border-border/50 hover:border-yellow-500/20 hover:shadow-[0_20px_60px_-15px_rgba(234,179,8,0.15)] max-w-3xl'
                } rounded-[2rem] p-8 lg:p-10`}
                style={{ opacity: 0 }}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] ${
                  benefit.isPrincipal ? 'from-yellow-500/10 via-transparent to-transparent' : 'from-yellow-500/5 via-transparent to-transparent'
                }`} />
                
                {/* Principal card glow effect */}
                {benefit.isPrincipal && (
                  <div className="absolute inset-0 opacity-50">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
                  </div>
                )}
                
                {/* Content */}
                <div className="relative flex items-start gap-6">
                  {/* Number Badge */}
                  <div 
                    data-number
                    className={`flex-shrink-0 rounded-2xl border flex items-center justify-center ${
                      benefit.isPrincipal
                        ? 'w-16 h-16 bg-yellow-500/30 border-yellow-500/60'
                        : 'w-14 h-14 bg-yellow-500/20 border-yellow-500/40'
                    }`}
                  >
                    <span className={`font-bold text-yellow-500 ${benefit.isPrincipal ? 'text-3xl' : 'text-2xl'}`}>
                      {benefit.id}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 space-y-3">
                    <h3 data-title className={`font-bold ${
                      benefit.isPrincipal ? 'text-3xl lg:text-4xl' : 'text-2xl lg:text-3xl'
                    }`}>
                      {benefit.title}
                    </h3>
                    <p data-description className={`text-muted-foreground leading-relaxed ${
                      benefit.isPrincipal ? 'text-xl' : 'text-lg'
                    }`}>
                      {benefit.description}
                    </p>
                    {/* Decorator line */}
                    <div 
                      data-decorator
                      className={`h-px bg-gradient-to-r mt-4 ${
                        benefit.isPrincipal
                          ? 'from-yellow-500/50 via-yellow-500/20 to-transparent'
                          : 'from-yellow-500/30 via-yellow-500/10 to-transparent'
                      }`}
                    />
                  </div>
                </div>

                {/* Corner accent */}
                <div className={`absolute bottom-0 right-0 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  benefit.isPrincipal
                    ? 'w-32 h-32 bg-gradient-to-tl from-yellow-500/20 to-transparent'
                    : 'w-24 h-24 bg-gradient-to-tl from-yellow-500/10 to-transparent'
                }`} />
              </div>
            ))}
          </div>
        </div>

        {/* Closing Message */}
        <div 
          ref={closingRef}
          className="max-w-3xl mx-auto text-center relative"
        >
          <div className="relative bg-gradient-to-br from-yellow-500/10 via-background/60 to-background/60 backdrop-blur-xl border border-yellow-500/30 rounded-[2rem] p-8 lg:p-12 shadow-[0_20px_60px_-15px_rgba(234,179,8,0.3)]">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent rounded-[2rem]" />
            
            {/* Content */}
            <div className="relative">
              <p className="text-xl lg:text-2xl font-semibold text-foreground leading-relaxed mb-2">
                No pressure. If we're not a fit, you'll still leave with a clear growth roadmap
              </p>
              <p className="text-2xl lg:text-3xl font-bold text-yellow-500">
                (FOR FREE)
              </p>
            </div>

            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-yellow-500/40 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-yellow-500/40 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-yellow-500/40 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-yellow-500/40 rounded-br-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
