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

export function ContactSection() {
  const { toast } = useToast();
  
  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

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
    <section id="contact" className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium mb-4" data-testid="text-contact-label">
              Get in Touch
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight" data-testid="text-contact-headline">
              Let's build
              <span className="block">something great</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-md" data-testid="text-contact-description">
              Have a project in mind? We'd love to hear about it. Send us a message 
              and we'll get back to you within 24 hours.
            </p>

            <div className="mt-12 space-y-6">
              <div className="flex items-start gap-4" data-testid="contact-email">
                <div className="p-2 bg-card border border-card-border rounded-md">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider">Email</p>
                  <p className="font-medium mt-1">contact@hemmaconsulting.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4" data-testid="contact-phone">
                <div className="p-2 bg-card border border-card-border rounded-md">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider">Phone</p>
                  <p className="font-medium mt-1">+216 96 196 407</p>
                </div>
              </div>
              {/* <div className="flex items-start gap-4" data-testid="contact-address">
                <div className="p-2 bg-card border border-card-border rounded-md">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider">Office</p>
                  <p className="font-medium mt-1">100 Market Street, Suite 400</p>
                  <p className="text-muted-foreground">San Francisco, CA 94105</p>
                </div>
              </div> */}
            </div>
          </div>

          <div className="bg-card border border-card-border rounded-md p-8 lg:p-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm uppercase tracking-wider text-muted-foreground">
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Foulen ben Foulen"
                            className="border-0 border-b border-border rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-accent px-0"
                            data-testid="input-name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm uppercase tracking-wider text-muted-foreground">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Foulen@company.com"
                            className="border-0 border-b border-border rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-accent px-0"
                            data-testid="input-email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm uppercase tracking-wider text-muted-foreground">
                        Company (Optional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your company name"
                          className="border-0 border-b border-border rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-accent px-0"
                          data-testid="input-company"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm uppercase tracking-wider text-muted-foreground">
                        Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your project..."
                          className="border-0 border-b border-border rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-accent px-0 min-h-[120px] resize-none"
                          data-testid="input-message"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={mutation.isPending}
                  className="w-full bg-accent text-accent-foreground border border-accent-border group"
                  data-testid="button-submit"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
