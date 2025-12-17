import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import type { TeamMember } from "@shared/schema";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

if (typeof window !== "undefined" && gsap && "registerPlugin" in gsap) {
  gsap.registerPlugin(ScrollTrigger);
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "2 youssef",
    role: "CEO & Founder",
    imageUrl: "",
  },
  {
    id: "2",
    name: "Ghaith AZIZ",
    role: "CTO",
    imageUrl: "",
  },
  {
    id: "3",
    name: "NAFFETI Mohamed",
    role: "VP of Engineering",
    imageUrl: "",
  },
  {
    id: "4",
    name: "Ghaith ben Othmen",
    role: "Head of Design",
    imageUrl: "",
  },
];

const values = [
  {
    id: "1",
    title: "Excellence",
    description: "We set the highest standards for code quality, architecture, and delivery.",
  },
  {
    id: "2",
    title: "Partnership",
    description: "We work alongside your team, not just for you. Your success is our success.",
  },
  {
    id: "3",
    title: "Innovation",
    description: "We stay at the forefront of technology to deliver cutting-edge solutions.",
  },
  {
    id: "4",
    title: "Transparency",
    description: "Clear communication, honest timelines, and no surprises.",
  },
];

export function AboutSection() {
  const aboutTextRef = useRef<HTMLParagraphElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const valuesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = aboutTextRef.current;
    if (!el) return;

    const split = new SplitType(el, { types: "chars", tagName: "span" });
    const ctx = gsap.context(() => {
      gsap.set(split.chars, { opacity: 0, y: 24, rotateX: -90 });

      const animateIn = () => {
        gsap.fromTo(
          split.chars,
          { opacity: 0, y: 24, rotateX: -90 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            ease: "back.out(1.7)",
            stagger: 0.02,
          },
        );
      };

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        once: true,
        onEnter: animateIn,
      });

      el.addEventListener("mouseenter", animateIn);
      return () => {
        el.removeEventListener("mouseenter", animateIn);
        trigger.kill();
      };
    }, el);

    return () => {
      split.revert();
      ctx.revert();
    };
  }, []);

  // Headline SplitText animation
  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;

    let headlineSplit: SplitType | null = null;
    let ctx: gsap.Context | null = null;

    // Wait for fonts to be ready
    document.fonts.ready.then(() => {
      headlineSplit = new SplitType(el, {
        types: "words",
        tagName: "span",
      });

      // Add word class for styling
      headlineSplit.words?.forEach((word) => {
        word.classList.add("about-word");
      });

      gsap.set(el, { opacity: 1 });

      // Animation function that can be called repeatedly
      const animateWords = () => {
        if (!headlineSplit?.words) return;
        
        // Reset to initial state
        gsap.set(headlineSplit.words, { 
          opacity: 0, 
          y: -100, 
          rotation: () => gsap.utils.random(-80, 80) 
        });
        
        // Animate in - slower duration for better recognition
        gsap.to(headlineSplit.words, {
          y: 0,
          opacity: 1,
          rotation: 0,
          stagger: 0.15,
          duration: 1.4,
          ease: "back.out(1.4)",
        });
      };

      // Add hover listener
      el.addEventListener("mouseenter", animateWords);

      ctx = gsap.context(() => {
        // Initial animation on scroll enter
        ScrollTrigger.create({
          trigger: el,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: animateWords,
          onEnterBack: animateWords,
          onLeave: () => {
            // Reset when leaving viewport
            if (headlineSplit?.words) {
              gsap.set(headlineSplit.words, { opacity: 0 });
            }
          },
          onLeaveBack: () => {
            // Reset when leaving viewport going up
            if (headlineSplit?.words) {
              gsap.set(headlineSplit.words, { opacity: 0 });
            }
          },
        });
      }, el);

      // Store reference for cleanup
      (el as any)._animateWords = animateWords;
    });

    return () => {
      if (headlineRef.current) {
        const animateWords = (headlineRef.current as any)._animateWords;
        if (animateWords) {
          headlineRef.current.removeEventListener("mouseenter", animateWords);
        }
      }
      headlineSplit?.revert();
      ctx?.revert();
    };
  }, []);

  // Values cards animation
  useEffect(() => {
    const container = valuesRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>(".value-card");
    if (!cards.length) return;

    // Set initial state
    gsap.set(cards, { 
      opacity: 0, 
      y: 60, 
      scale: 0.9,
      rotateX: -15 
    });

    const animateCards = () => {
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)",
      });
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top 85%",
        end: "bottom 20%",
        onEnter: animateCards,
        onEnterBack: animateCards,
        onLeave: () => {
          gsap.set(cards, { opacity: 0 });
        },
        onLeaveBack: () => {
          gsap.set(cards, { opacity: 0 });
        },
      });
    }, container);

    // Hover animation for individual cards
    cards.forEach((card) => {
      const line = card.querySelector<HTMLElement>(".value-line");
      const title = card.querySelector<HTMLElement>(".value-title");

      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.05,
          y: -8,
          duration: 0.3,
          ease: "power2.out",
        });
        if (line) {
          gsap.to(line, {
            width: 48,
            duration: 0.3,
          });
          line.classList.add("bg-accent");
          line.classList.remove("bg-foreground");
        }
        if (title) {
          title.classList.add("text-accent");
        }
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        if (line) {
          gsap.to(line, {
            width: 32,
            duration: 0.3,
          });
          line.classList.remove("bg-accent");
          line.classList.add("bg-foreground");
        }
        if (title) {
          title.classList.remove("text-accent");
        }
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium mb-4" data-testid="text-about-label">
              About Us
            </p>
            <h2 
              ref={headlineRef}
              className="text-4xl lg:text-5xl font-bold tracking-tight opacity-0 [&_.about-word]:inline-block [&_.about-word]:border [&_.about-word]:border-dashed [&_.about-word]:border-accent/30 [&_.about-word]:px-3 [&_.about-word]:py-1 [&_.about-word]:mx-1 [&_.about-word]:my-1 [&_.about-word]:rounded-lg [&_.about-word]:bg-gradient-to-r [&_.about-word]:from-foreground [&_.about-word]:to-accent [&_.about-word]:bg-clip-text [&_.about-word]:text-transparent" 
              data-testid="text-about-headline"
            >
              Building the future, one project at a time
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p
              ref={aboutTextRef}
              className="text-lg text-muted-foreground leading-relaxed cursor-pointer"
              data-testid="text-about-description"
            >
              Founded in 2012, Hemma Consulting has grown from a small team of passionate 
              developers into a full-service software consultancy trusted by Fortune 500 
              companies and ambitious startups alike. We combine deep technical expertise 
              with a genuine commitment to understanding your business.
            </p>
          </div>
        </div>

        <div ref={valuesRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {values.map((value) => (
            <div key={value.id} className="value-card space-y-3 cursor-pointer p-4 rounded-lg transition-shadow hover:shadow-lg" data-testid={`card-value-${value.id}`}>
              <div className="value-line h-px bg-foreground w-8" />
              <h3 className="value-title text-lg font-semibold transition-colors" data-testid={`text-value-title-${value.id}`}>{value.title}</h3>
              <p className="value-desc text-muted-foreground text-sm leading-relaxed" data-testid={`text-value-description-${value.id}`}>
                {value.description}
              </p>
            </div>
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-2xl font-semibold tracking-tight" data-testid="text-team-headline">Leadership Team</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="group" data-testid={`card-team-${member.id}`}>
                <div className="aspect-[3/4] bg-muted rounded-md mb-4 relative overflow-hidden">
                  <Avatar className="w-full h-full rounded-md">
                    <AvatarFallback className="rounded-md text-2xl font-semibold bg-muted">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300" />
                </div>
                <h4 className="font-semibold" data-testid={`text-team-name-${member.id}`}>{member.name}</h4>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1" data-testid={`text-team-role-${member.id}`}>
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
