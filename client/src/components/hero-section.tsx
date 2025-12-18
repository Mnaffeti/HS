import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import mainLogo from "@/assests/mainlogo.png";

if (typeof window !== "undefined" && gsap && "registerPlugin" in gsap) {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const horizontalRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const [overlayDone, setOverlayDone] = useState(false);

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

  // Hero image GSAP animation
  useEffect(() => {
    if (!overlayDone) return;
    if (!heroImageRef.current) return;

    const ctx = gsap.context(() => {
      const container = heroImageRef.current;
      const image = container?.querySelector(".hero-logo");
      const glowRing = container?.querySelector(".glow-ring");
      const floatingShapes = container?.querySelectorAll(".floating-shape");
      const particles = container?.querySelectorAll(".particle");

      if (!container || !image) return;

      // Initial state
      gsap.set(container, { autoAlpha: 0, scale: 0.8 });
      gsap.set(image, { scale: 0.5, rotation: -15, autoAlpha: 0 });
      if (glowRing) gsap.set(glowRing, { scale: 0, autoAlpha: 0 });
      if (floatingShapes) gsap.set(floatingShapes, { scale: 0, autoAlpha: 0 });
      if (particles) gsap.set(particles, { scale: 0, autoAlpha: 0 });

      // Main timeline
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.to(container, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.8,
      })
      .to(image, {
        scale: 1,
        rotation: 0,
        autoAlpha: 1,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
      }, "-=0.4")
      .to(glowRing, {
        scale: 1,
        autoAlpha: 1,
        duration: 1,
        ease: "power2.out",
      }, "-=0.8")
      .to(floatingShapes, {
        scale: 1,
        autoAlpha: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
      }, "-=0.6")
      .to(particles, {
        scale: 1,
        autoAlpha: 1,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out",
      }, "-=0.4");

      // Continuous floating animation for logo
      gsap.to(image, {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Glow ring pulse animation
      if (glowRing) {
        gsap.to(glowRing, {
          scale: 1.1,
          autoAlpha: 0.6,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Floating shapes orbit animation
      if (floatingShapes) {
        floatingShapes.forEach((shape, i) => {
          const duration = 8 + i * 2;
          const delay = i * 0.5;
          gsap.to(shape, {
            rotation: 360,
            duration,
            repeat: -1,
            ease: "none",
            delay,
          });
          gsap.to(shape, {
            y: gsap.utils.random(-20, 20),
            x: gsap.utils.random(-10, 10),
            duration: 3 + i,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay,
          });
        });
      }

      // Particles floating animation
      if (particles) {
        particles.forEach((particle, i) => {
          gsap.to(particle, {
            y: gsap.utils.random(-30, 30),
            x: gsap.utils.random(-20, 20),
            duration: 2 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.1,
          });
        });
      }

    }, heroImageRef);

    return () => ctx.revert();
  }, [overlayDone]);

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
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-6">
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium" data-testid="text-hero-label">
                  Software Consulting
                </p>
                <h1
                  ref={headingRef}
                  className="split text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.9]"
                  data-testid="text-hero-headline"
                >
                  Frustrated ? 
                  <span className="block">{" "} Digital</span>
                  <span className="block text-accent">Excellence</span>
                </h1>
              </div>
              <p
                ref={descriptionRef}
                className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed scramble-desc"
                data-testid="text-hero-description"
              >
                Transform your business with custom software solutions. We partner with 
                ambitious companies to architect, build, and scale technology that drives 
                measurable results.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={scrollToContact}
                  className="bg-accent text-accent-foreground border border-accent-border group"
                  data-testid="button-hero-cta"
                >
                  Start a Project
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={scrollToWork}
                  data-testid="button-hero-secondary"
                >
                  View Our Work
                </Button>
              </div>
              {/* <div className="flex gap-12 pt-8 border-t border-border">
                <div data-testid="stat-projects">
                  <p className="text-3xl lg:text-4xl font-bold">150+</p>
                  <p className="text-sm text-muted-foreground mt-1">Projects Delivered</p>
                </div>
                <div data-testid="stat-clients">
                  <p className="text-3xl lg:text-4xl font-bold">50+</p>
                  <p className="text-sm text-muted-foreground mt-1">Happy Clients</p>
                </div>
                <div data-testid="stat-years">
                  <p className="text-3xl lg:text-4xl font-bold">12+</p>
                  <p className="text-sm text-muted-foreground mt-1">Years Experience</p>
                </div>
              </div> */}
            </div>
            <div className="lg:col-span-5 relative hidden lg:block">
              <div 
                ref={heroImageRef}
                className="aspect-[4/5] relative rounded-2xl overflow-hidden flex items-center justify-center"
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10" />
                
                {/* Animated glow ring */}
                <div className="glow-ring absolute inset-8 rounded-full border-2 border-accent/30 blur-sm" />
                
                {/* Floating geometric shapes */}
                <div className="floating-shape absolute top-12 left-8 w-16 h-16 border border-accent/20 rounded-lg rotate-12" />
                <div className="floating-shape absolute top-24 right-12 w-12 h-12 border border-border rounded-full" />
                <div className="floating-shape absolute bottom-20 left-16 w-20 h-20 border border-accent/30 rotate-45" />
                <div className="floating-shape absolute bottom-32 right-8 w-8 h-8 bg-accent/10 rounded-lg" />
                
                {/* Particles */}
                <div className="particle absolute top-16 left-1/4 w-2 h-2 bg-accent/40 rounded-full" />
                <div className="particle absolute top-1/3 right-1/4 w-3 h-3 bg-accent/30 rounded-full" />
                <div className="particle absolute bottom-1/4 left-1/3 w-2 h-2 bg-foreground/20 rounded-full" />
                <div className="particle absolute top-1/2 left-12 w-1.5 h-1.5 bg-accent/50 rounded-full" />
                <div className="particle absolute bottom-16 right-1/3 w-2 h-2 bg-accent/25 rounded-full" />
                <div className="particle absolute top-1/4 right-16 w-1 h-1 bg-foreground/30 rounded-full" />
                
                {/* Main logo */}
                <img
                  src={mainLogo}
                  alt="Hemma Consult logo"
                  className="hero-logo relative z-10 w-4/5 h-4/5 object-contain drop-shadow-2xl"
                />
                
                {/* Decorative corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-accent/40" />
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-accent/40" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-accent/40" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-accent/40" />
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
