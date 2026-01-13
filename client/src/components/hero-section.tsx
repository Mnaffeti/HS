import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import teamSpiritSvg from "../assests/Team spirit-cuate.svg";
import goodTeamSvg from "../assests/Good team-cuate.svg";

if (typeof window !== "undefined" && gsap && "registerPlugin" in gsap) {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const horizontalRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const rotatingTextRef = useRef<HTMLDivElement | null>(null);
  const imagineHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const goodTeamSvgRef = useRef<HTMLDivElement | null>(null);
  const afterSectionRef = useRef<HTMLDivElement | null>(null);
  const cartoonRef = useRef<HTMLDivElement | null>(null);
  const [overlayDone, setOverlayDone] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const rotatingItems = [
    "Your First 10K DT /Mo",
    "Your First 100 Customers",
    "Scaling To 6 Figures Business",
    "Automating Your Sales",
    "Building Recurring Revenue",
    "Selling While You Sleep",
    "10 Xing Your Business In No Time",
    "Turning Clicks Into Clients On Autopilot",
    "Scaling Beyond \"Word of Mouth\" For Ever",
    "Doubling Your Business Without Doubling Your Workload"
  ];

  useEffect(() => {
    // Check if splash screen has already been shown
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    const overlay = overlayRef.current;
    
    if (hasSeenSplash) {
      setOverlayDone(true);
      if (overlay) {
        overlay.style.display = 'none';
      }
      return;
    }

    if (!overlay) {
      setOverlayDone(true);
      return;
    }

    const lines = overlay.querySelectorAll<HTMLElement>("[data-overlay-line]");
    if (!lines.length) {
      setOverlayDone(true);
      return;
    }

    const splits = Array.from(lines).map((line) =>
      SplitType.create(line, { types: "chars", tagName: "span" }),
    );

    gsap.set(overlay, { autoAlpha: 1, display: "flex" });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onStart: () => {
        document.body.style.overflow = "hidden";
      },
      onComplete: () => {
        gsap.to(overlay, {
          autoAlpha: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            document.body.style.overflow = "";
            overlay.style.display = "none";
            setOverlayDone(true);
            // Mark splash screen as seen
            sessionStorage.setItem('hasSeenSplash', 'true');
          },
        });
      },
    });

    splits.forEach((split, index) => {
      tl.from(split.chars, {
        yPercent: 120,
        opacity: 0,
        stagger: 0.02,
        duration: 0.9,
      }, index === 0 ? 0 : "-=0.4");
    });

    return () => {
      tl.kill();
      splits.forEach((split) => split.revert());
      document.body.style.overflow = "";
      setOverlayDone(true);
    };
  }, []);

  useEffect(() => {
    if (!overlayDone) return;
    if (!headingRef.current) return;

    const ctx = gsap.context(() => {
      const split = SplitType.create(headingRef.current!, {
        types: "words,chars",
        charClass: "char",
      });

      gsap.set(headingRef.current, { visibility: "visible" });

      gsap.from(split.chars, {
        duration: 1,
        y: 100,
        autoAlpha: 0,
        stagger: 0.05,
        ease: "power3.out",
      });

      return () => {
        split.revert();
      };
    }, headingRef);

    return () => ctx.revert();
  }, [overlayDone]);

  useEffect(() => {
    if (!overlayDone) return;
    if (!descriptionRef.current) return;

    let cleanup: (() => void) | undefined;
    const ctx = gsap.context(() => {
      (async () => {
        const el = descriptionRef.current;
        if (!el) return;

        // Preserve original text, start scrambled from empty.
        const originalText = el.textContent || "";
        el.textContent = "";

        let pluginLoaded = false;
        try {
          // @ts-ignore - ScrambleTextPlugin is a GSAP bonus plugin resolved at runtime if available
          const mod = await import("gsap/ScrambleTextPlugin");
          const ScrambleTextPlugin = mod.default || mod.ScrambleTextPlugin || mod;
          gsap.registerPlugin(ScrambleTextPlugin);
          pluginLoaded = true;
        } catch (error) {
          console.warn("ScrambleTextPlugin not available; falling back to fade animation.", error);
        }

        if (pluginLoaded) {
          gsap.set(el, { opacity: 1, visibility: "visible" });
          const tween = gsap.to(el, {
            scrambleText: {
              text: originalText,
              chars: "upperAndLowerCase",
              revealDelay: 0.2,
              tweenLength: true,
            },
            duration: 2.8,
            ease: "power2.inOut",
          });
          cleanup = () => tween.kill();
        } else {
          gsap.set(el, { opacity: 0, visibility: "visible" });
          const tween = gsap.to(el, {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            onStart: () => {
              el.textContent = originalText;
            },
          });
          cleanup = () => tween.kill();
        }
      })();
    }, descriptionRef);

    return () => {
      cleanup?.();
      ctx.revert();
    };
  }, [overlayDone]);

  // Rotating text animation
  useEffect(() => {
    if (!overlayDone) return;
    if (!rotatingTextRef.current) return;

    const interval = setInterval(() => {
      setCurrentItemIndex((prev) => (prev + 1) % rotatingItems.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [overlayDone, rotatingItems.length]);

  useEffect(() => {
    if (!overlayDone) return;
    if (!rotatingTextRef.current) return;

    const ctx = gsap.context(() => {
      const el = rotatingTextRef.current;
      if (!el) return;

      gsap.fromTo(el,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }, rotatingTextRef);

    return () => ctx.revert();
  }, [currentItemIndex, overlayDone]);

  // Cartoon SVG animation
  useEffect(() => {
    if (!overlayDone) return;
    if (!cartoonRef.current) return;

    const ctx = gsap.context(() => {
      const cartoon = cartoonRef.current;
      if (!cartoon) return;

      // Initial entrance animation - slide in from right
      gsap.fromTo(cartoon,
        {
          opacity: 0,
          scale: 0.8,
          x: 150
        },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.5
        }
      );

      // Continuous floating animation
      gsap.to(cartoon, {
        y: -20,
        duration: 2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.7
      });

      // Gentle rotation animation
      gsap.to(cartoon, {
        rotation: 5,
        duration: 3,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.7
      });
    }, cartoonRef);

    return () => ctx.revert();
  }, [overlayDone]);

  useEffect(() => {
    if (!overlayDone) return;
    if (!horizontalRef.current) return;

    const ctx = gsap.context(() => {
      const wrapper = horizontalRef.current;
      const text = wrapper?.querySelector(".horizontal__text");
      if (!wrapper || !text) return;

      const split = SplitType.create(text as HTMLElement, { types: "chars,words" });

      gsap.set(text, { opacity: 1 });

      const scrollTween = gsap.to(text, {
        xPercent: -60,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top center",
          end: "bottom center",
          scrub: 1,
          onLeave: () => gsap.set(text, { opacity: 0 }),
          onLeaveBack: () => gsap.set(text, { opacity: 0 }),
          onEnter: () => gsap.set(text, { opacity: 1 }),
          onEnterBack: () => gsap.set(text, { opacity: 1 }),
        },
      });

      split.chars?.forEach((char) => {
        gsap.from(char, {
          yPercent: () => gsap.utils.random(-200, 200),
          rotation: () => gsap.utils.random(-20, 20),
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: char,
            containerAnimation: scrollTween,
            start: "left 100%",
            end: "left 30%",
            scrub: 1,
          },
        });
      });

      return () => {
        scrollTween.scrollTrigger?.kill();
        scrollTween.kill();
        split.revert();
      };
    }, horizontalRef);

    return () => ctx.revert();
  }, [overlayDone]);

  // Imagine This section animations
  useEffect(() => {
    if (!imagineHeadingRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(imagineHeadingRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imagineHeadingRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // Good Team SVG animation
  useEffect(() => {
    if (!goodTeamSvgRef.current) return;

    const ctx = gsap.context(() => {
      // Floating animation
      gsap.to(goodTeamSvgRef.current, {
        y: -25,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Subtle rotation
      gsap.to(goodTeamSvgRef.current, {
        rotation: 3,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Entrance animation
      gsap.from(goodTeamSvgRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: goodTeamSvgRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // After items - no animation, just display
  // Removed animation as per user request

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToWork = () => {
    const element = document.querySelector("#work");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 bg-background text-foreground flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div className="flex flex-col gap-3 text-center">
          <span data-overlay-line className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-[0.2em]">
            Be Present
          </span>
          <span data-overlay-line className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-[0.2em] text-accent">
            Listen Deeply
          </span>
          <span data-overlay-line className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-[0.2em]">
            Build Boldly
          </span>
        </div>
      </div>

      <section className="relative min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content - Left Side */}
            <div className="flex flex-col items-start text-left space-y-8 lg:space-y-10 order-2 lg:order-1">
              {/* Main Headline */}
              <div className="space-y-6 w-full">
                <h1
                  ref={headingRef}
                  className="split text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight"
                  data-testid="text-hero-headline"
                >
                  You're One Call Away From..
                </h1>
                
                {/* Rotating Items */}
                <div className="min-h-[60px] flex items-center">
                  <div
                    ref={rotatingTextRef}
                    key={currentItemIndex}
                    className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-accent"
                    data-testid="text-rotating-item"
                  >
                    {rotatingItems[currentItemIndex]}
                  </div>
                </div>
              </div>

              {/* Subhead */}
              <p
                ref={descriptionRef}
                className="text-lg lg:text-xl text-muted-foreground leading-relaxed scramble-desc max-w-2xl"
                data-testid="text-hero-description"
              >
                Done‑For‑You Growth Systems That Attract, Convert, And Retain Your Dream Clients Without Tech overwhelm, Guesswork, Or Hiring A Huge Team.
              </p>

              {/* CTA Button */}
              <div className="pt-4">
                <Button
                  size="lg"
                  onClick={scrollToContact}
                  className="bg-transparent text-yellow-500 border-2 border-yellow-500/50 group text-lg px-8 py-6 rounded-full hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,179,8,0.5)]"
                  data-testid="button-hero-cta"
                  style={{
                    animation: 'blink 2s ease-in-out infinite'
                  }}
                >
                  Free 10-Minute Audit Call
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>

            {/* Team Spirit SVG - Right Side */}
            <div 
              ref={cartoonRef}
              className="flex items-center justify-center lg:justify-end opacity-0 order-1 lg:order-2"
            >
              <img 
                src={teamSpiritSvg} 
                alt="Team spirit illustration" 
                className="w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* IMAGINE THIS Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-black">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-amber-500/5 to-yellow-600/5 animate-gradient"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.05),transparent_50%)] animate-pulse-slow"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          {/* Heading with SVG */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 mb-20">
            <div className="flex-shrink-0 order-2 lg:order-1">
              <div ref={goodTeamSvgRef} className="w-56 h-56 lg:w-80 lg:h-80">
                <img src={goodTeamSvg} alt="Team collaboration" className="w-full h-full object-contain drop-shadow-2xl" />
              </div>
            </div>
            <div className="text-center lg:text-left order-1 lg:order-2">
              <h2 ref={imagineHeadingRef} className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                  IMAGINE THIS
                </span>
                <span className="text-yellow-500 animate-pulse">...</span>
              </h2>
              <p className="text-2xl lg:text-3xl text-white/60 max-w-2xl font-light leading-relaxed">
                Your business transformation awaits
              </p>
            </div>
          </div>
          
          {/* After texts appearing one by one */}
          <div ref={afterSectionRef} className="max-w-4xl mx-auto space-y-8">
            <div data-after-item className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-r from-yellow-500/10 to-transparent border-l-4 border-yellow-500 backdrop-blur-sm hover:from-yellow-500/20 transition-all duration-300">
              <CheckCircle2 className="flex-shrink-0 w-8 h-8 text-yellow-500 mt-1" />
              <p className="text-2xl lg:text-3xl text-white leading-relaxed font-medium">
                Your calendar stays booked.
              </p>
            </div>
            
            <div data-after-item className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-r from-yellow-600/10 to-transparent border-l-4 border-yellow-600 backdrop-blur-sm hover:from-yellow-600/20 transition-all duration-300">
              <CheckCircle2 className="flex-shrink-0 w-8 h-8 text-yellow-600 mt-1" />
              <p className="text-2xl lg:text-3xl text-white leading-relaxed font-medium">
                Your offers sell consistently.
              </p>
            </div>
            
            <div data-after-item className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 to-transparent border-l-4 border-amber-500 backdrop-blur-sm hover:from-amber-500/20 transition-all duration-300">
              <CheckCircle2 className="flex-shrink-0 w-8 h-8 text-amber-500 mt-1" />
              <p className="text-2xl lg:text-3xl text-white leading-relaxed font-medium">
                You can finally focus on delivery, not chasing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
