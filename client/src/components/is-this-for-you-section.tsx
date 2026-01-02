import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined" && gsap && "registerPlugin" in gsap) {
  gsap.registerPlugin(ScrollTrigger);
}

export function IsThisForYouSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const description = descriptionRef.current;
    const cardsContainer = cardsContainerRef.current;

    if (!section || !heading || !description || !cardsContainer) return;

    const ctx = gsap.context(() => {
      // Heading animation with split reveal
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

      // Description fade in
      gsap.from(description, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: description,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Cards stagger animation
      const cards = cardsContainer.querySelectorAll('[data-card]');
      
      cards.forEach((card, index) => {
        const items = card.querySelectorAll('[data-item]');
        const badge = card.querySelector('[data-badge]');
        const divider = card.querySelector('[data-divider]');
        
        // Card entrance
        gsap.from(card, {
          opacity: 0,
          y: 80,
          scale: 0.9,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        // Badge pop
        gsap.from(badge, {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          delay: 0.3,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });

        // Divider draw
        gsap.from(divider, {
          scaleX: 0,
          opacity: 0,
          duration: 0.8,
          delay: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });

        // Items stagger with unique animations
        gsap.from(items, {
          opacity: 0,
          x: index === 0 ? -40 : 40,
          duration: 0.6,
          stagger: 0.15,
          delay: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-36 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-20">
          <h2 ref={headingRef} className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Is This For You<span className="text-yellow-500">?</span>
          </h2>
          <p ref={descriptionRef} className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Let's make sure we're the right fit to work together
          </p>
        </div>

        {/* Cards Grid */}
        <div ref={cardsContainerRef} className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* NOT A FIT Card */}
          <div 
            data-card
            className="group relative overflow-hidden rounded-[2rem] border border-border/50 bg-background/40 backdrop-blur-xl p-8 lg:p-12 hover:border-red-500/30 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(239,68,68,0.3)]"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Content */}
            <div className="relative">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-8">
                <div data-badge className="flex items-center justify-center w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20">
                  <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-red-500 uppercase tracking-wider">Not A Fit</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl lg:text-3xl font-bold mb-6">
                Skip This If You...
              </h3>

              {/* Divider */}
              <div data-divider className="h-px bg-gradient-to-r from-red-500/50 to-transparent mb-8" />

              {/* Items */}
              <div className="space-y-6">
                <div data-item className="flex items-start gap-4 group/item">
                  <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-red-500/10 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                  </div>
                  <p className="text-lg text-muted-foreground group-hover/item:text-foreground transition-colors">
                    Want "get rich quick" or overnight results
                  </p>
                </div>
                <div data-item className="flex items-start gap-4 group/item">
                  <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-red-500/10 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                  </div>
                  <p className="text-lg text-muted-foreground group-hover/item:text-foreground transition-colors">
                    Aren't willing to implement or delegate
                  </p>
                </div>
              </div>
            </div>

            {/* Corner accent */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-red-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* PERFECT FIT Card */}
          <div 
            data-card
            className="group relative overflow-hidden rounded-[2rem] border border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-background/40 backdrop-blur-xl p-8 lg:p-12 hover:border-yellow-500/50 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(234,179,8,0.4)]"
          >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Glowing effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-8">
                <div data-badge className="flex items-center justify-center w-12 h-12 rounded-2xl bg-yellow-500/20 border border-yellow-500/40">
                  <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-yellow-500 uppercase tracking-wider">Perfect Fit</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl lg:text-3xl font-bold mb-6">
                Perfect If You...
              </h3>

              {/* Divider */}
              <div data-divider className="h-px bg-gradient-to-r from-yellow-500/50 to-transparent mb-8" />

              {/* Items */}
              <div className="space-y-6">
                <div data-item className="flex items-start gap-4 group/item">
                  <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-yellow-500/20 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  </div>
                  <p className="text-lg text-muted-foreground group-hover/item:text-foreground transition-colors">
                    Are already getting some sales but want to grow faster
                  </p>
                </div>
                <div data-item className="flex items-start gap-4 group/item">
                  <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-yellow-500/20 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  </div>
                  <p className="text-lg text-muted-foreground group-hover/item:text-foreground transition-colors">
                    Are ready to follow a plan and take action
                  </p>
                </div>
                <div data-item className="flex items-start gap-4 group/item">
                  <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-yellow-500/20 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  </div>
                  <p className="text-lg text-muted-foreground group-hover/item:text-foreground transition-colors">
                    Value long‑term, predictable growth over quick hacks
                  </p>
                </div>
              </div>
            </div>

            {/* Corner accent */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-yellow-500/20 to-transparent rounded-tl-full opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
}
