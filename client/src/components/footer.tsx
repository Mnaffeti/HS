import { ArrowUp } from "lucide-react";
import { SiLinkedin, SiFacebook } from "react-icons/si";
import { Button } from "@/components/ui/button";

const socialLinks = [
  { icon: SiLinkedin, href: "https://www.linkedin.com/company/hemma-consulting", label: "LinkedIn" },
  { icon: SiFacebook, href: "https://www.facebook.com/people/Hemma-Consulting/61585817244400/", label: "Facebook" },
];

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="text-2xl font-bold tracking-tight"
              data-testid="link-footer-logo"
            >
              Hemma Consulting
            </a>
            <p className="mt-4 text-muted-foreground text-sm max-w-xs">
              Building exceptional software solutions for forward-thinking companies.
            </p>
          </div>

          <div className="md:col-span-4">
            <nav className="flex flex-wrap gap-x-8 gap-y-4">
              {footerLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-testid={`link-footer-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="md:col-span-4 flex items-start justify-between md:justify-end gap-4">
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={link.label}
                  data-testid={`link-social-${link.label.toLowerCase()}`}
                >
                  <link.icon className="h-7 w-7" />
                </a>
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollToTop}
              aria-label="Back to top"
              data-testid="button-back-to-top"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground" data-testid="text-copyright">
            &copy; {new Date().getFullYear()} Hemma Consulting. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-privacy">
              Privacy Policy
            </button>
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-terms">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
