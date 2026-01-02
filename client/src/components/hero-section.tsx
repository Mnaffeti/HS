import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined" && gsap && "registerPlugin" in gsap) {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const horizontalRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const rotatingTextRef = useRef<HTMLDivElement | null>(null);
  const beforeSectionRef = useRef<HTMLDivElement | null>(null);
  const afterSectionRef = useRef<HTMLDivElement | null>(null);
  const imagineHeadingRef = useRef<HTMLHeadingElement | null>(null);
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
    const overlay = overlayRef.current;
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
      const split = SplitType.create(headingRef.current, {
        types: "words, chars",
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

  useEffect(() => {
    if (!overlayDone) return;
    if (!horizontalRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const wrapper = horizontalRef.current;
      const text = wrapper?.querySelector(".horizontal__text");
      if (!wrapper || !text) return;

      const split = SplitType.create(text as HTMLElement, { types: "chars, words" });

      gsap.set(text, { opacity: 1 });

      const scrollTween = gsap.to(text, {
        xPercent: -60,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          end: "+=900px",
          scrub: true,
          onLeave: () => gsap.set(text, { opacity: 0 }),
          onLeaveBack: () => gsap.set(text, { opacity: 0 }),
          onEnter: () => gsap.set(text, { opacity: 1 }),
          onEnterBack: () => gsap.set(text, { opacity: 1 }),
        },
      });

      split.chars.forEach((char) => {
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

  useEffect(() => {
    if (!beforeSectionRef.current || !afterSectionRef.current) return;

    const ctx = gsap.context(() => {
      const beforeSection = beforeSectionRef.current;
      const afterSection = afterSectionRef.current;

      if (!beforeSection || !afterSection) return;

      // Before section animation - shake and fade in
      const beforeItems = beforeSection.querySelectorAll('[data-before-item]');
      const beforeBadge = beforeSection.querySelector('[data-badge]');
      const beforeVisual = beforeSection.querySelector('[data-visual]');

      gsap.from(beforeSection, {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: beforeSection,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(beforeBadge, {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: beforeSection,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(beforeItems, {
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: beforeSection,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(beforeVisual, {
        opacity: 0,
        scale: 0.5,
        rotation: -180,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: beforeSection,
          start: "top 65%",
          toggleActions: "play none none none",
        },
      });

      // After section animation - smooth reveal
      const afterItems = afterSection.querySelectorAll('[data-after-item]');
      const afterBadge = afterSection.querySelector('[data-badge]');
      const afterVisual = afterSection.querySelector('[data-visual]');

      gsap.from(afterSection, {
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: afterSection,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(afterBadge, {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: afterSection,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(afterItems, {
        opacity: 0,
        x: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: afterSection,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(afterVisual, {
        opacity: 0,
        scale: 0.5,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: afterSection,
          start: "top 65%",
          toggleActions: "play none none none",
        },
      });

      // Draw the growth path
      const growthPath = afterVisual?.querySelector('path');
      if (growthPath) {
        const length = (growthPath as SVGPathElement).getTotalLength();
        gsap.set(growthPath, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(growthPath, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: afterSection,
            start: "top 65%",
            toggleActions: "play none none none",
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

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
          <div className="flex flex-col items-center justify-center text-center space-y-12">
            {/* Main Headline */}
            <div className="space-y-8 max-w-4xl">
              <h1
                ref={headingRef}
                className="split text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-tight"
                data-testid="text-hero-headline"
              >
                You're One Call Away From..
              </h1>
              
              {/* Rotating Items */}
              <div className="min-h-[80px] flex items-center justify-center">
                <div
                  ref={rotatingTextRef}
                  key={currentItemIndex}
                  className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-accent"
                  data-testid="text-rotating-item"
                >
                  {rotatingItems[currentItemIndex]}
                </div>
              </div>
            </div>

            {/* Subhead */}
            <p
              ref={descriptionRef}
              className="text-xl lg:text-2xl text-muted-foreground max-w-4xl leading-relaxed scramble-desc"
              data-testid="text-hero-description"
            >
              Done‑For‑You Growth Systems That Attract, Convert, And Retain Your Dream Clients Without Tech overwhelm, Guesswork, Or Hiring A Huge Team.
            </p>

            {/* CTA Button */}
            <div className="flex justify-center pt-8">
              <Button
                size="lg"
                onClick={scrollToContact}
                className="bg-transparent text-yellow-500 border-2 border-yellow-500/50 group text-lg px-8 py-6 rounded-full hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,179,8,0.5)]"
                data-testid="button-hero-cta"
              >
                Free 10-Minute Audit Call
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGINE THIS Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-b from-background to-background/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 ref={imagineHeadingRef} className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              IMAGINE THIS<span className="text-yellow-500">...</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center max-w-6xl mx-auto">
            {/* Before Section */}
            <div ref={beforeSectionRef} className="relative p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-red-950/20 to-red-900/10 border border-red-900/30 backdrop-blur-sm">
              <div className="absolute -top-4 left-8">
                <span data-badge className="bg-red-500 text-white px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
                  Before
                </span>
              </div>
              <div className="mt-6 space-y-6">
                <p data-before-item className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                  You never know where the next client is coming from.
                </p>
                <p data-before-item className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                  Revenue swings.
                </p>
                <p data-before-item className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                  You're doing everything yourself.
                </p>
              </div>
              {/* Chaos visual element */}
              <div data-visual className="mt-8 opacity-20">
                <div className="h-32 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-1 bg-red-500/30 transform rotate-12"></div>
                    <div className="w-full h-1 bg-red-500/30 transform -rotate-12"></div>
                    <div className="w-1 h-full bg-red-500/30 transform rotate-45"></div>
                    <div className="w-1 h-full bg-red-500/30 transform -rotate-45"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="bg-background border-4 border-yellow-500 rounded-full p-4 shadow-lg">
                <ArrowRight className="w-8 h-8 text-yellow-500" />
              </div>
            </div>

            {/* After Section */}
            <div ref={afterSectionRef} className="relative p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-green-950/20 to-emerald-900/10 border border-green-900/30 backdrop-blur-sm">
              <div className="absolute -top-4 left-8">
                <span data-badge className="bg-green-500 text-white px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
                  After
                </span>
              </div>
              <div className="mt-6 space-y-6">
                <p data-after-item className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                  Your calendar stays booked.
                </p>
                <p data-after-item className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                  Your offers sell consistently.
                </p>
                <p data-after-item className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                  You can finally focus on delivery, not chasing.
                </p>
              </div>
              {/* Growth path visual element */}
              <div data-visual className="mt-8 opacity-20">
                <div className="h-32 relative">
                  <svg viewBox="0 0 200 100" className="w-full h-full">
                    <path
                      d="M 10 90 Q 60 70, 100 50 T 190 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-green-500"
                    />
                    <circle cx="190" cy="10" r="5" className="fill-green-500" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={horizontalRef} className="horizontal overflow-hidden flex items-center" aria-label="Horizontal marquee">
        <div className="w-full">
          <h3 className="horizontal__text text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight">
            Debut your journey with us
          </h3>
        </div>
      </section>
    </>
  );
}
