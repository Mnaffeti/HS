import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined" && gsap && "registerPlugin" in gsap) {
  gsap.registerPlugin(ScrollTrigger);
}

const scaleServices = [
  {
    id: "1",
    number: "01",
    title: "Growth Engine Map",
    description: "We map out exactly how strangers become superfans in your world, step by step so growth stops being random.",
    icon: "map",
  },
  {
    id: "2",
    number: "02",
    title: "Offer & Messaging Upgrade",
    description: "We sharpen your offer and messaging so your ideal clients instantly feel 'This is for me'.",
    icon: "message",
  },
  {
    id: "3",
    number: "03",
    title: "Traffic & Conversion Machine",
    description: "We plug in simple campaigns that bring you leads consistently and turn them into paying clients with a high converting website.",
    icon: "traffic",
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    if (!section || !heading) return;

    const ctx = gsap.context(() => {
      // Animate heading
      gsap.from(heading, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Simple card animation on scroll
  useEffect(() => {
    const cards = document.querySelectorAll('.service-card');
    if (cards.length === 0) return;

    cards.forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Auto-rotate cards every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % scaleServices.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Animate active card change
  useEffect(() => {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card, index) => {
      if (index === activeIndex) {
        gsap.to(card, {
          scale: 1.05,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(card, {
          scale: 0.95,
          opacity: 0.6,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    });
  }, [activeIndex]);

  const goToCard = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section id="services" ref={sectionRef} className="py-24 lg:py-32 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 ref={headingRef} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            How We Scale Your Business<span className="text-yellow-500">?</span>
          </h2>
        </div>

        <div ref={cardsContainerRef} className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {scaleServices.map((service, idx) => (
            <div
              key={service.id}
              className="service-card relative group cursor-pointer"
              data-testid={`card-service-${service.id}`}
              onClick={() => goToCard(idx)}
            >
              <div className={`relative p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 backdrop-blur-sm h-full flex flex-col transition-all duration-300 ${
                activeIndex === idx
                  ? "border-accent/40 hover:shadow-[0_0_30px_rgba(234,179,8,0.15)]"
                  : "hover:border-accent/40 hover:shadow-[0_0_30px_rgba(234,179,8,0.15)]"
              }`}>
                {/* Number Badge */}
                <div className="absolute -top-4 -left-4">
                  <span className="bg-yellow-500 text-black px-6 py-2 rounded-full text-sm font-bold">
                    {service.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl lg:text-3xl font-bold tracking-tight mb-4 mt-4">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-lg text-muted-foreground leading-relaxed flex-grow">
                  {service.description}
                </p>

                {/* Visual Element */}
                <div className="mt-8 opacity-30 flex justify-center">
                  {service.icon === "map" && (
                    <svg viewBox="0 0 120 80" className="w-32 h-20">
                      <circle cx="20" cy="60" r="8" className="fill-yellow-500" />
                      <path d="M 28 60 L 50 40" stroke="currentColor" strokeWidth="2" className="text-yellow-500" />
                      <circle cx="50" cy="40" r="8" className="fill-yellow-500" />
                      <path d="M 58 40 L 80 20" stroke="currentColor" strokeWidth="2" className="text-yellow-500" />
                      <circle cx="80" cy="20" r="8" className="fill-yellow-500" />
                      <path d="M 88 20 L 100 10" stroke="currentColor" strokeWidth="2" className="text-yellow-500" />
                      <circle cx="100" cy="10" r="10" className="fill-yellow-500" />
                    </svg>
                  )}
                  {service.icon === "message" && (
                    <svg viewBox="0 0 100 80" className="w-32 h-20">
                      <rect x="10" y="20" width="80" height="50" rx="8" className="fill-yellow-500/30 stroke-yellow-500" strokeWidth="2" />
                      <circle cx="30" cy="40" r="3" className="fill-yellow-500" />
                      <circle cx="50" cy="40" r="3" className="fill-yellow-500" />
                      <circle cx="70" cy="40" r="3" className="fill-yellow-500" />
                      <path d="M 30 55 Q 50 60, 70 55" stroke="currentColor" strokeWidth="2" className="text-yellow-500" fill="none" />
                    </svg>
                  )}
                  {service.icon === "traffic" && (
                    <svg viewBox="0 0 120 60" className="w-32 h-16">
                      <path d="M 10 30 L 30 30 L 25 25 M 30 30 L 25 35" stroke="currentColor" strokeWidth="2" className="text-yellow-500" fill="none" />
                      <path d="M 40 30 L 60 30 L 55 25 M 60 30 L 55 35" stroke="currentColor" strokeWidth="2" className="text-yellow-500" fill="none" />
                      <path d="M 70 30 L 90 30 L 85 25 M 90 30 L 85 35" stroke="currentColor" strokeWidth="2" className="text-yellow-500" fill="none" />
                      <circle cx="105" cy="30" r="12" className="fill-yellow-500" />
                      <text x="105" y="35" textAnchor="middle" className="fill-black text-xs font-bold">$</text>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {scaleServices.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToCard(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? "bg-yellow-500 w-8"
                  : "bg-yellow-500/30 hover:bg-yellow-500/50"
              }`}
              aria-label={`Go to card ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
