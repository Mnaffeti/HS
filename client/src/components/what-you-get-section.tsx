import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined" && gsap && "registerPlugin" in gsap) {
  gsap.registerPlugin(ScrollTrigger);
}

const benefits = [
  {
    id: 1,
    title: "Website Creation",
    description: "Custom, high-converting websites designed to turn visitors into customers with modern UX and mobile-first approach.",
  },
  {
    id: 2,
    title: "Social Media Management",
    description: "Strategic content creation and community management across all platforms to build your brand presence.",
  },
  {
    id: 3,
    title: "Business Growth Strategy",
    description: "Data-driven roadmap covering offers, funnels, and scaling strategies tailored to your business goals.",
  },
  {
    id: 4,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications that enhance customer experience and drive engagement.",
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

      // Card animations - enhanced stagger entrance
      const cards = cardsContainer.querySelectorAll('[data-card]');
      
      cards.forEach((card, index) => {
        // Set initial state with dynamic positioning
        gsap.set(card, { 
          opacity: 0, 
          y: 80,
          scale: 0.85,
          rotation: index % 2 === 0 ? -5 : 5
        });

        // Animate cards in with stagger and rotation
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsContainer,
            start: "top 75%",
            toggleActions: "play none none none",
          },
          delay: index * 0.2,
        });

        // Card content animations with enhanced effects
        const number = card.querySelector('[data-number]');
        const title = card.querySelector('[data-title]');
        const description = card.querySelector('[data-description]');
        const decorator = card.querySelector('[data-decorator]');

        if (number) {
          gsap.set(number, { scale: 0, rotation: -360, opacity: 0 });
          gsap.to(number, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: cardsContainer,
              start: "top 75%",
              toggleActions: "play none none none",
            },
            delay: index * 0.2 + 0.3,
          });
        }

        if (title) {
          gsap.set(title, { opacity: 0, y: 30, x: -20 });
          gsap.to(title, {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsContainer,
              start: "top 75%",
              toggleActions: "play none none none",
            },
            delay: index * 0.2 + 0.4,
          });
        }

        if (description) {
          gsap.set(description, { opacity: 0, y: 20 });
          gsap.to(description, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsContainer,
              start: "top 75%",
              toggleActions: "play none none none",
            },
            delay: index * 0.2 + 0.5,
          });
        }

        if (decorator) {
          gsap.set(decorator, { scaleX: 0, transformOrigin: "left center" });
          gsap.to(decorator, {
            scaleX: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsContainer,
              start: "top 75%",
              toggleActions: "play none none none",
            },
            delay: index * 0.2 + 0.6,
          });
        }

        // Add hover animations with smooth transitions
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            scale: 1.03,
            duration: 0.5,
            ease: "power2.out"
          });
          if (number) {
            gsap.to(number, {
              scale: 1.2,
              rotation: 10,
              duration: 0.5,
              ease: "back.out(1.7)"
            });
          }
          if (title) {
            gsap.to(title, {
              x: 5,
              duration: 0.5,
              ease: "power2.out"
            });
          }
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
          });
          if (number) {
            gsap.to(number, {
              scale: 1,
              rotation: 0,
              duration: 0.5,
              ease: "power2.out"
            });
          }
          if (title) {
            gsap.to(title, {
              x: 0,
              duration: 0.5,
              ease: "power2.out"
            });
          }
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
      if (closingText) {
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
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden bg-black">
      {/* Grid pattern background - Swiss design */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #FFC100 1px, transparent 1px),
            linear-gradient(to bottom, #FFC100 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Heading - Swiss Style */}
        <div className="mb-20">
          <h2 ref={headingRef} className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tighter text-white">
            What You Get<span className="text-yellow-500">...</span>
          </h2>
          <div className="h-1 w-32 bg-yellow-500 mt-6" />
        </div>

        {/* Service Cards - Swiss Grid */}
        <div ref={cardsContainerRef} className="max-w-7xl mx-auto mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.id}
                data-card
                className={`group relative bg-gradient-to-br from-zinc-900 to-black border-2 transition-all duration-500 hover:bg-zinc-900 ${
                  index === 0 ? 'border-r-0 border-b-0 border-yellow-500/30' :
                  index === 1 ? 'border-b-0 border-yellow-500/30' :
                  index === 2 ? 'border-r-0 border-yellow-500/30' :
                  'border-yellow-500/30'
                }`}
                style={{ opacity: 0 }}
              >
                {/* Large Number Badge - Swiss Style */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-yellow-500 flex items-center justify-center">
                  <span 
                    data-number
                    className="font-black text-black text-4xl"
                  >
                    {benefit.id}
                  </span>
                </div>

                {/* Content */}
                <div className="p-12 pt-28">
                  <h3 
                    data-title 
                    className="font-black text-white text-3xl lg:text-4xl tracking-tight mb-6 leading-tight"
                  >
                    {benefit.title}
                  </h3>
                  
                  {/* Horizontal divider - Swiss element */}
                  <div 
                    data-decorator
                    className="h-1 w-20 bg-yellow-500 mb-6"
                  />
                  
                  <p 
                    data-description 
                    className="text-gray-300 leading-relaxed text-base lg:text-lg"
                  >
                    {benefit.description}
                  </p>
                </div>

                {/* Decorative corner element */}
                <div className="absolute bottom-0 right-0 w-16 h-16 border-l-4 border-t-4 border-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Closing Message - Swiss Typography */}
        <div 
          ref={closingRef}
          className="max-w-5xl mx-auto text-center py-16"
        >
          {/* Top line accent */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent mb-12" />
          
          <div className="space-y-8">
            <p className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
              <span className="text-white">No pressure. If we're not a fit, </span>
              <span className="text-yellow-500">
                you'll still leave with a clear growth roadmap
              </span>
            </p>
            
            {/* Large (FOR FREE) badge */}
            <div className="inline-block">
              <div className="bg-yellow-500 px-12 py-6">
                <p className="text-4xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight">
                  (FOR FREE)
                </p>
              </div>
            </div>

            {/* CTA Button - Swiss Style */}
            <div className="pt-8">
              <a
                href="#contact"
                className="group relative inline-block bg-yellow-500 text-black px-12 py-6 text-lg lg:text-xl font-black tracking-tight uppercase transition-all duration-300 hover:bg-white hover:shadow-[0_0_40px_rgba(255,193,0,0.5)]"
              >
                <span className="relative z-10">Claim Your Free Roadmap Call</span>
                <div className="absolute inset-0 border-4 border-yellow-500 translate-x-2 translate-y-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
              </a>
            </div>
          </div>

          {/* Bottom line accent */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent mt-12" />
        </div>
      </div>
    </section>
  );
}
