import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone, ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import goodTeamBroSvg from "../assests/Good team-bro.svg";

if (typeof window !== "undefined" && gsap && "registerPlugin" in gsap) {
  gsap.registerPlugin(ScrollTrigger);
}

export function ContactSection() {
  const { toast } = useToast();
  const svgRef = useRef<HTMLImageElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  
  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const svg = svgRef.current;

    if (!section || !heading || !svg) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(heading, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // SVG entrance animation
      gsap.from(svg, {
        opacity: 0,
        scale: 0.5,
        rotation: -10,
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
        y: -20,
        duration: 2.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Subtle rotation
      gsap.to(svg, {
        rotation: 5,
        duration: 3.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const mutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent",
        description: "Thank you for reaching out. We'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    mutation.mutate(data);
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 lg:py-32 bg-black overflow-hidden">
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
        {/* Header - Swiss Style */}
        <div className="mb-20">
          <h2 ref={headingRef} className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tighter text-white mb-4">
            Let's Work Together
          </h2>
          <div className="h-1 w-32 bg-yellow-500 mt-6" />
          <p className="text-xl lg:text-2xl text-gray-400 font-light mt-6">
            Have a project in mind? Send us a message and we'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Contact Form */}
          <div className="order-2 lg:order-1">
            <div className="bg-white border-2 border-yellow-500/30 p-8 lg:p-12">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-[0.3em] text-black font-black mb-3 block">
                            Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Foulen Ben Foulen "
                              className="border-0 border-b-2 border-gray-300 rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-yellow-500 px-0 py-3 text-base text-black placeholder:text-gray-400 transition-colors"
                              data-testid="input-name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-500" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-[0.3em] text-black font-black mb-3 block">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="foulen@company.com"
                              className="border-0 border-b-2 border-gray-300 rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-yellow-500 px-0 py-3 text-base text-black placeholder:text-gray-400 transition-colors"
                              data-testid="input-email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-[0.3em] text-black font-black mb-3 block">
                          Company (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your company name"
                            className="border-0 border-b-2 border-gray-300 rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-yellow-500 px-0 py-3 text-base text-black placeholder:text-gray-400 transition-colors"
                            data-testid="input-company"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-[0.3em] text-black font-black mb-3 block">
                          Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your project..."
                            className="border-0 border-b-2 border-gray-300 rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-yellow-500 px-0 py-3 min-h-[140px] resize-none text-base text-black placeholder:text-gray-400 transition-colors"
                            data-testid="input-message"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                  
                  {/* Swiss Style Button */}
                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="group relative w-full bg-yellow-500 text-black px-12 py-6 text-lg font-black tracking-tight uppercase transition-all duration-300 hover:bg-black hover:text-white hover:shadow-[0_0_40px_rgba(255,193,0,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                    data-testid="button-submit"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {mutation.isPending ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 border-4 border-yellow-500 translate-x-2 translate-y-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
                  </button>
                </form>
              </Form>
            </div>

            {/* Contact Info - Swiss Style */}
            <div className="mt-12 space-y-6">
              <div className="h-px w-full bg-yellow-500/30" />
              
              <div className="flex items-start gap-6" data-testid="contact-email">
                <div className="w-12 h-12 border-2 border-yellow-500 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-xs text-yellow-500 uppercase tracking-[0.3em] mb-2 font-black">Email</p>
                  <p className="font-medium text-white text-lg">contact@hemmaconsulting.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6" data-testid="contact-phone">
                <div className="w-12 h-12 border-2 border-yellow-500 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-xs text-yellow-500 uppercase tracking-[0.3em] mb-2 font-black">Phone</p>
                  <p className="font-medium text-white text-lg">+216 96 196 407</p>
                </div>
              </div>
              
              <div className="h-px w-full bg-yellow-500/30" />
            </div>
          </div>

          {/* Right Column - Animated SVG */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <img 
                ref={svgRef}
                src={goodTeamBroSvg} 
                alt="Good Team" 
                className="w-full h-auto drop-shadow-2xl"
              />
              
              {/* Decorative elements - Swiss geometric shapes */}
              <div className="absolute -top-8 -left-8 w-24 h-24 border-4 border-yellow-500 opacity-20" />
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-yellow-500 opacity-10" />
              <div className="absolute top-1/2 -left-12 w-16 h-16 border-4 border-yellow-500 opacity-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
