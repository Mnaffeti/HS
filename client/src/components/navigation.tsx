import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import mainLogo from "@/assests/navlogo.png";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const ctaRef = useRef<HTMLButtonElement | null>(null);
  const ctaTl = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    gsap.registerPlugin(TextPlugin);
  }, []);

  useEffect(() => {
    if (!ctaRef.current) return;

    const ctx = gsap.context(() => {
      ctaTl.current = gsap.to(ctaRef.current, {
        duration: 0.6,
        paused: true,
        text: { value: "Get a Quote", type: "diff" },
        ease: "sine.out",
      });
    }, ctaRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3"
            data-testid="link-logo"
          >
            <img
              src={mainLogo}
              alt="Hemma Consulting logo"
              className="h-10 w-auto drop-shadow-sm"
              loading="lazy"
              decoding="async"
            />
            <span className="text-lg lg:text-xl font-semibold tracking-tight text-foreground/80">
              Hemma Consulting
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wide"
                data-testid={`link-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </button>
            ))}
            <a 
              href="https://wa.me/21696196407" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground hover:text-accent transition-colors border border-border rounded-md hover:border-accent group"
              data-testid="link-phone"
            >
              <Phone className="h-4 w-4 group-hover:animate-pulse" />
              <span className="tracking-wide">+216 96 196 407</span>
            </a>
            <Button
              ref={ctaRef}
              onMouseEnter={() => ctaTl.current?.play()}
              onMouseLeave={() => ctaTl.current?.reverse()}
              onClick={() => scrollToSection("#contact")}
              className="bg-accent text-accent-foreground border border-accent-border shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold"
              data-testid="button-nav-cta"
            >
              Get Started
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-80 pb-6" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
                data-testid={`link-mobile-${link.label.toLowerCase()}`}
              >
                {link.label}
              </button>
            ))}
            <a 
              href="https://wa.me/21696196407" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground hover:text-accent transition-colors border border-border rounded-md hover:border-accent w-fit"
              data-testid="link-mobile-phone"
            >
              <Phone className="h-4 w-4" />
              <span className="tracking-wide">+216 96 196 407</span>
            </a>
            <Button
              onClick={() => scrollToSection("#contact")}
              className="bg-accent text-accent-foreground border border-accent-border w-fit shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold"
              data-testid="button-mobile-cta"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
