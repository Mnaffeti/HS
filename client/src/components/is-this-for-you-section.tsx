import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import telecommutingSvg from "../assests/Telecommuting-rafiki.svg";

if (typeof window !== "undefined" && gsap && "registerPlugin" in gsap) {
  gsap.registerPlugin(ScrollTrigger);
}

export function IsThisForYouSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const svgRef = useRef<HTMLImageElement | null>(null);
  const notFitCardRef = useRef<HTMLDivElement | null>(null);
  const perfectFitCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const description = descriptionRef.current;
    const svg = svgRef.current;
    const notFitCard = notFitCardRef.current;
    const perfectFitCard = perfectFitCardRef.current;

    if (!section || !heading || !description || !svg || !notFitCard || !perfectFitCard) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(heading, {
        opacity: 0,
        y: 60,
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

      // SVG entrance animation
      gsap.from(svg, {
        opacity: 0,
        scale: 0.5,
        rotation: -15,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: svg,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Floating animation for SVG
      gsap.to(svg, {
        y: -25,
        duration: 2.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Subtle rotation
      gsap.to(svg, {
        rotation: 3,
        duration: 3.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Cards entrance
      gsap.from(notFitCard, {
        opacity: 0,
        x: -100,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: notFitCard,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(perfectFitCard, {
        opacity: 0,
        x: 100,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: perfectFitCard,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-black overflow-hidden">
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
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <h2 ref={headingRef} className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tighter text-white mb-4">
            Is This For You?
          </h2>
          <p ref={descriptionRef} className="text-xl lg:text-2xl text-gray-400 font-light">
            Let's make sure we're the right fit to work together
          </p>
        </div>

        {/* Main Split-Screen Comparison */}
        <div className="relative">
          {/* Vertical Divider Line - Swiss Element */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-yellow-500 to-transparent transform -translate-x-1/2" />
          
          <div className="grid lg:grid-cols-2 gap-0">
            
            {/* LEFT SIDE - NOT A FIT */}
            <div ref={notFitCardRef} className="relative border-r-0 lg:border-r-4 border-red-500/20 pr-0 lg:pr-16">
              {/* Large X Icon - Swiss Geometric */}
              <div className="mb-8">
                <div className="w-24 h-24 border-4 border-red-500 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-16 h-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="square" strokeLinejoin="miter" d="M6 6L18 18M18 6L6 18" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Label */}
              <div className="mb-6">
                <span className="text-red-500 text-sm font-black tracking-[0.3em] uppercase">
                  Not A Fit
                </span>
                <div className="h-px w-32 bg-red-500 mt-2" />
              </div>

              {/* Title */}
              <h3 className="text-3xl lg:text-5xl font-black tracking-tighter text-white mb-12 leading-tight">
                Skip This<br />If You...
              </h3>

              {/* Checklist Items */}
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 border-2 border-red-500 flex items-center justify-center text-red-500 text-2xl font-black">
                    ×
                  </div>
                  <div>
                    <p className="text-white text-lg lg:text-xl font-medium leading-relaxed">
                      Want "get rich quick" or overnight results
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 border-2 border-red-500 flex items-center justify-center text-red-500 text-2xl font-black">
                    ×
                  </div>
                  <div>
                    <p className="text-white text-lg lg:text-xl font-medium leading-relaxed">
                      Aren't willing to implement or delegate
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - PERFECT FIT */}
            <div ref={perfectFitCardRef} className="relative pl-0 lg:pl-16 mt-16 lg:mt-0">
              {/* Large Checkmark Icon - Swiss Geometric */}
              <div className="mb-8">
                <div className="w-24 h-24 bg-yellow-500 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-16 h-16 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Label */}
              <div className="mb-6">
                <span className="text-yellow-500 text-sm font-black tracking-[0.3em] uppercase">
                  Perfect Fit
                </span>
                <div className="h-px w-32 bg-yellow-500 mt-2" />
              </div>

              {/* Title */}
              <h3 className="text-3xl lg:text-5xl font-black tracking-tighter text-white mb-12 leading-tight">
                Perfect<br />If You...
              </h3>

              {/* Checklist Items */}
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 flex items-center justify-center text-black text-2xl font-black">
                    ✓
                  </div>
                  <div>
                    <p className="text-white text-lg lg:text-xl font-medium leading-relaxed">
                      Are already getting some sales but want to grow faster
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 flex items-center justify-center text-black text-2xl font-black">
                    ✓
                  </div>
                  <div>
                    <p className="text-white text-lg lg:text-xl font-medium leading-relaxed">
                      Are ready to follow a plan and take action
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 flex items-center justify-center text-black text-2xl font-black">
                    ✓
                  </div>
                  <div>
                    <p className="text-white text-lg lg:text-xl font-medium leading-relaxed">
                      Value long‑term, predictable growth
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom SVG - Centered */}
          <div className="mt-20 flex flex-col items-center">
            <div className="relative w-full max-w-lg lg:max-w-2xl">
              <img 
                ref={svgRef}
                src={telecommutingSvg} 
                alt="Telecommuting" 
                className="w-full h-auto drop-shadow-2xl"
              />
              
              {/* Decorative elements - Swiss geometric shapes */}
              <div className="absolute -top-8 -left-8 w-20 h-20 border-4 border-yellow-500 opacity-20" />
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-yellow-500 opacity-10" />
              <div className="absolute top-1/2 -right-12 w-16 h-16 border-4 border-red-500 opacity-10" />
            </div>

            {/* CTA Button - Swiss Style */}
            <div className="mt-16 flex flex-col items-center gap-6">
              <div className="h-px w-32 bg-yellow-500" />
              <a
                href="#contact"
                className="group relative bg-yellow-500 text-black px-12 py-6 text-lg lg:text-xl font-black tracking-tight uppercase transition-all duration-300 hover:bg-white hover:shadow-[0_0_40px_rgba(255,193,0,0.5)]"
              >
                <span className="relative z-10">Let's Work Together</span>
                <div className="absolute inset-0 border-4 border-yellow-500 translate-x-2 translate-y-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
              </a>
              <div className="h-px w-32 bg-yellow-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
