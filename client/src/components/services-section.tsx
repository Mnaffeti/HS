import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import teamWorkSvg from "../assests/Team work.svg";

if (typeof window !== "undefined" && gsap && "registerPlugin" in gsap) {
  gsap.registerPlugin(ScrollTrigger);
}

const scaleServices = [
  {
    id: "1",
    number: "01",
    title: "Growth Engine Map",
    description: "We map out exactly how strangers become superfans in your world, step by step so growth stops being random.",
  },
  {
    id: "2",
    number: "02",
    title: "Offer & Messaging Upgrade",
    description: "We sharpen your offer and messaging so your ideal clients instantly feel 'This is for me'.",
  },
  {
    id: "3",
    number: "03",
    title: "Traffic & Conversion Machine",
    description: "We plug in simple campaigns that bring you leads consistently and turn them into paying clients with a high converting website.",
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const teamWorkSvgRef = useRef<HTMLImageElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const teamWork = teamWorkSvgRef.current;
    const card = cardRef.current;
    if (!section || !heading || !teamWork || !card) return;

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

      // Animate SVG entrance
      gsap.from(teamWork, {
        opacity: 0,
        scale: 0.5,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: teamWork,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Floating animation for SVG
      gsap.to(teamWork, {
        y: -20,
        duration: 2.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Subtle rotation
      gsap.to(teamWork, {
        rotation: 5,
        duration: 3.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Card entrance
      gsap.from(card, {
        opacity: 0,
        x: 100,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Auto-rotate cards every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % scaleServices.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToCard = (index: number) => {
    setActiveIndex(index);
  };

  const currentService = scaleServices[activeIndex];

  return (
    <section id="services" ref={sectionRef} className="py-24 lg:py-32 bg-black relative overflow-hidden">
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
        {/* Header Section */}
        <div className="mb-20">
          <h2 ref={headingRef} className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-2">
            How We Scale Your
          </h2>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-yellow-500">
            Business?
          </h2>
        </div>

        {/* Main Content - Swiss Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Animated SVG */}
          <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-lg">
              <img 
                ref={teamWorkSvgRef}
                src={teamWorkSvg} 
                alt="Team Work" 
                className="w-full h-auto drop-shadow-2xl"
              />
              
              {/* Decorative elements - Swiss style */}
              <div className="absolute -top-8 -right-8 w-32 h-32 border-4 border-yellow-500 rounded-full opacity-20" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-yellow-500 opacity-10 rounded-full" />
            </div>
          </div>

          {/* Right: Card Carousel */}
          <div className="order-1 lg:order-2">
            <div 
              ref={cardRef}
              className="relative bg-gradient-to-br from-zinc-900 to-black border-2 border-yellow-500/30 rounded-none overflow-hidden"
              style={{ minHeight: '400px' }}
            >
              {/* Card number badge - Swiss style */}
              <div className="absolute top-0 left-0 bg-yellow-500 text-black px-8 py-4">
                <span className="text-4xl font-black tracking-tighter">
                  {currentService.number}
                </span>
              </div>

              {/* Card content */}
              <div className="p-8 pt-20 lg:p-12 lg:pt-24">
                <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-6 leading-tight">
                  {currentService.title}
                </h3>
                
                <div className="h-1 w-20 bg-yellow-500 mb-6" />
                
                <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
                  {currentService.description}
                </p>
              </div>

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-800">
                <div 
                  className="h-full bg-yellow-500 transition-all duration-5000 ease-linear"
                  style={{ width: '100%' }}
                  key={activeIndex}
                />
              </div>
            </div>

            {/* Navigation dots - Swiss minimal style */}
            <div className="flex gap-4 mt-8">
              {scaleServices.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToCard(idx)}
                  className={`h-1 transition-all duration-300 ${
                    activeIndex === idx
                      ? "bg-yellow-500 w-16"
                      : "bg-yellow-500/30 w-8 hover:bg-yellow-500/50"
                  }`}
                  aria-label={`Go to service ${idx + 1}`}
                />
              ))}
            </div>

            {/* Service indicators - Swiss typography */}
            <div className="mt-8 flex gap-6">
              {scaleServices.map((service, idx) => (
                <button
                  key={service.id}
                  onClick={() => goToCard(idx)}
                  className={`text-left transition-all duration-300 ${
                    activeIndex === idx
                      ? "opacity-100"
                      : "opacity-30 hover:opacity-60"
                  }`}
                >
                  <span className="block text-yellow-500 font-black text-sm mb-1">
                    {service.number}
                  </span>
                  <span className="block text-white text-xs font-medium tracking-tight">
                    {service.title.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
