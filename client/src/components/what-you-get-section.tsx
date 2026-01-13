import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
  const [activeCardIndex, setActiveCardIndex] = useState(1);

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

      // Initial card animations
      const cards = cardsContainer.querySelectorAll('[data-card]');
      
      cards.forEach((card, index) => {
        const isPrincipal = card.getAttribute('data-principal') === 'true';
        
        // Set initial positions based on card position
        if (index === 0) {
          gsap.set(card, { y: -100, scale: 0.85, opacity: 0 });
        } else if (index === 1) {
          gsap.set(card, { y: 0, scale: 0.9, opacity: 0 });
        } else if (index === 2) {
          gsap.set(card, { y: 100, scale: 0.85, opacity: 0 });
        } else {
          gsap.set(card, { y: 150, scale: 0.8, opacity: 0 });
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
        y: 60,
        scale: 0.9,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: closing,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Animate text elements inside closing
      const closingText = closing?.querySelectorAll('p');
      gsap.from(closingText, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: closing,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Rolling animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCardIndex((prev) => (prev + 1) % benefits.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Apply rolling animation when active card changes
  useEffect(() => {
    const cardsContainer = cardsContainerRef.current;
    if (!cardsContainer) return;

    const cards = cardsContainer.querySelectorAll('[data-card]');
    
    cards.forEach((card, index) => {
      const isActive = index === activeCardIndex;
      
      // Calculate new scale and position based on distance from active card
      let targetScale = 0.8;
      let targetY = 150;
      let targetOpacity = 0.5;
      
      if (isActive) {
        targetScale = 1.05;
        targetY = 0;
        targetOpacity = 1;
      } else if (index === (activeCardIndex - 1 + benefits.length) % benefits.length) {
        targetScale = 0.85;
        targetY = -100;
        targetOpacity = 0.7;
      } else if (index === (activeCardIndex + 1) % benefits.length) {
        targetScale = 0.85;
        targetY = 100;
        targetOpacity = 0.7;
      } else if (index === (activeCardIndex + 2) % benefits.length) {
        targetScale = 0.8;
        targetY = 150;
        targetOpacity = 0.6;
      }
      
      gsap.to(card, {
        scale: targetScale,
        y: targetY,
        opacity: targetOpacity,
        duration: 0.8,
        ease: "power2.inOut",
      });
    });
  }, [activeCardIndex]);

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

        {/* Card Stack with Rolling Animation */}
        <div ref={cardsContainerRef} className="max-w-5xl mx-auto mb-16 lg:mb-24 relative h-[600px] flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.id}
                data-card
                data-principal={benefit.isPrincipal}
                className={`group absolute backdrop-blur-xl border transition-all duration-500 ${
                  activeCardIndex === index
                    ? 'bg-gradient-to-br from-yellow-500/10 to-background/60 border-yellow-500/40 hover:border-yellow-500/60 hover:shadow-[0_30px_80px_-15px_rgba(234,179,8,0.4)] max-w-4xl z-30'
                    : 'bg-background/40 border-border/50 hover:border-yellow-500/20 hover:shadow-[0_20px_60px_-15px_rgba(234,179,8,0.15)] max-w-3xl z-10'
                } rounded-[2rem] p-8 lg:p-10 w-full`}
                style={{ opacity: 0 }}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] ${
                  activeCardIndex === index ? 'from-yellow-500/10 via-transparent to-transparent' : 'from-yellow-500/5 via-transparent to-transparent'
                }`} />
                
                {/* Active card glow effect */}
                {activeCardIndex === index && (
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
                      activeCardIndex === index
                        ? 'w-16 h-16 bg-yellow-500/30 border-yellow-500/60'
                        : 'w-14 h-14 bg-yellow-500/20 border-yellow-500/40'
                    }`}
                  >
                    <span className={`font-bold text-yellow-500 ${activeCardIndex === index ? 'text-3xl' : 'text-2xl'}`}>
                      {benefit.id}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 space-y-3">
                    <h3 data-title className={`font-bold ${
                      activeCardIndex === index ? 'text-3xl lg:text-4xl' : 'text-2xl lg:text-3xl'
                    }`}>
                      {benefit.title}
                    </h3>
                    <p data-description className={`text-muted-foreground leading-relaxed ${
                      activeCardIndex === index ? 'text-xl' : 'text-lg'
                    }`}>
                      {benefit.description}
                    </p>
                    {/* Decorator line */}
                    <div 
                      data-decorator
                      className={`h-px bg-gradient-to-r mt-4 ${
                        activeCardIndex === index
                          ? 'from-yellow-500/50 via-yellow-500/20 to-transparent'
                          : 'from-yellow-500/30 via-yellow-500/10 to-transparent'
                      }`}
                    />
                  </div>
                </div>

                {/* Corner accent */}
                <div className={`absolute bottom-0 right-0 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  activeCardIndex === index
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
          className="max-w-5xl mx-auto text-center relative py-16 lg:py-20"
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
          
          {/* Main text */}
          <div className="space-y-6 relative z-10">
            <p className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              <span className="text-foreground">No pressure. If we're not a fit, </span>
              <span className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                you'll still leave with a clear growth roadmap
              </span>
            </p>
            
            {/* (FOR FREE) - Large and prominent */}
            <div className="relative inline-block">
              <div className="absolute -inset-6 bg-gradient-to-r from-yellow-500/20 via-yellow-500/30 to-yellow-500/20 rounded-full blur-2xl" />
              <p className="relative text-4xl sm:text-5xl lg:text-6xl font-bold text-yellow-500 tracking-wide">
                (FOR FREE)
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-8">
              <Button
                size="lg"
                onClick={() => {
                  const element = document.querySelector("#contact");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="bg-transparent text-yellow-500 border-2 border-yellow-500/50 group text-lg px-8 py-6 rounded-full hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,179,8,0.5)]"
              >
                Claim Your Free Roadmap Call
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />

          {/* Decorative elements */}
          <div className="absolute top-1/2 left-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl -translate-y-1/2" />
          <div className="absolute top-1/2 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl -translate-y-1/2" />
        </div>
      </div>
    </section>
  );
}
