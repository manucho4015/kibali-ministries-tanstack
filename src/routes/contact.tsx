import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MapPin, Phone, Mail, ExternalLink, Send, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import PageTransition from '@/components/layout/PageTransition';
import ScrollReveal from '@/components/layout/ScrollReveal';
import Footer from '@/components/layout/Footer';
import { useState } from 'react';

export const Route = createFileRoute('/contact')({
  component: Contact,
});

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const services = [
  { day: 'Sunday', name: 'Sunday Worship', time: '9:00 AM – 11:30 AM', location: 'Main Sanctuary' },
  { day: 'Wednesday', name: 'Mid-week Service', time: '6:30 PM – 8:00 PM', location: 'Main Sanctuary' },
  { day: 'Friday', name: 'Youth Service', time: '5:00 PM – 7:00 PM', location: 'Youth Hall' },
  { day: 'Saturday', name: 'Prayer Meeting', time: '6:00 AM – 7:30 AM', location: 'Chapel' },
];

function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', phone: '', subject: '', message: '' },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    toast({ title: 'Message sent!', description: 'We\'ll get back to you soon.' });
    form.reset();
  };

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative flex items-center justify-center min-h-[40vh] md:min-h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-surface" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="font-mono text-xs text-primary uppercase tracking-widest mb-4">Get In Touch</p>
          <h1 className="font-display text-fluid-h1 font-extrabold tracking-tight text-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-foreground-secondary">We'd love to hear from you.</p>
        </div>
      </section>

      {/* Map + Form */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* Map */}
            <ScrollReveal>
              <div className="relative rounded-lg overflow-hidden border border-border aspect-[4/3] lg:aspect-auto lg:h-full min-h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.277444357956!2d36.8219!3d-1.2921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnMzEuNiJTIDM2wrA0OScxOC44IkU!5e0!3m2!1sen!2ske!4v1234567890"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kibali Ministry Location"
                />
                {/* Info overlay */}
                <div className="absolute bottom-4 left-4 right-4 glass-strong rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-foreground">Kibali Ministry</h3>
                  <p className="text-xs text-foreground-secondary mt-1">123 Faith Avenue, Nairobi, Kenya</p>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-primary mt-2 hover:underline">
                    Get Directions <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal delay={120}>
              <div className="p-8 rounded-lg border border-border bg-card">
                <h2 className="text-xl font-display font-bold text-foreground mb-6">Send a Message</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-foreground">Full Name</FormLabel>
                        <FormControl><Input placeholder="Your name" className="rounded-md" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-foreground">Email</FormLabel>
                          <FormControl><Input placeholder="you@example.com" type="email" className="rounded-md" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-foreground">Phone (optional)</FormLabel>
                          <FormControl><Input placeholder="+254 700 000 000" className="rounded-md" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="subject" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-foreground">Subject</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-md">
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="prayer">Prayer Request</SelectItem>
                            <SelectItem value="giving">Giving</SelectItem>
                            <SelectItem value="volunteering">Volunteering</SelectItem>
                            <SelectItem value="pastoral">Pastoral Care</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="message" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-foreground">Message</FormLabel>
                        <FormControl><Textarea placeholder="How can we help?" className="rounded-md min-h-[120px]" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <Button type="submit" disabled={isSubmitting} className="w-full h-11 rounded-md bg-primary text-primary-foreground hover:bg-primary-hover transition-geist">
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2"><Send size={16} /> Send Message</span>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { icon: MapPin, label: 'Location', value: '123 Faith Avenue, Nairobi', action: 'Get Directions', href: 'https://maps.google.com' },
              { icon: Phone, label: 'Phone', value: '+254 700 000 000', action: 'Call Us', href: 'tel:+254700000000' },
              { icon: Mail, label: 'Email', value: 'hello@kibaliministry.org', action: 'Email Us', href: 'mailto:hello@kibaliministry.org' },
            ].map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 60}>
                <div className="p-6 rounded-lg border border-border bg-card text-center hover:border-border-hover transition-geist">
                  <item.icon size={24} className="mx-auto text-primary mb-3" />
                  <h3 className="text-sm font-semibold text-foreground">{item.label}</h3>
                  <p className="text-xs text-foreground-secondary mt-1">{item.value}</p>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-primary mt-3 hover:underline">
                    {item.action}
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Service Times */}
      <section className="py-20 bg-background-2">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2 text-center">Schedule</p>
            <h2 className="text-fluid-h2 font-display font-bold text-foreground text-center mb-10">Service Times</h2>
          </ScrollReveal>

          <div className="max-w-2xl mx-auto">
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              {services.map((s, i) => (
                <ScrollReveal key={s.name} delay={i * 40}>
                  <div className={`flex items-center justify-between p-5 ${i < services.length - 1 ? 'border-b border-border' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                        <Clock size={18} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">{s.name}</h3>
                        <p className="text-xs text-foreground-secondary">{s.day}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-mono text-foreground">{s.time}</p>
                      <p className="text-xs text-foreground-muted">{s.location}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <ScrollReveal>
            <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2">Follow Us</p>
            <h2 className="text-xl font-display font-bold text-foreground mb-8">Stay Connected</h2>
            <div className="flex items-center justify-center gap-4">
              {[
                { icon: 'youtube.svg', label: 'YouTube' },
                { icon: 'instagram.svg', label: 'Instagram' },
                { icon: 'x.svg', label: 'Twitter' },
                { icon: 'facebook.svg', label: 'Facebook' },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  className="p-3 rounded-lg border border-border bg-card text-foreground-secondary hover:text-primary hover:border-border-hover hover:scale-105 transition-geist"
                  aria-label={s.label}
                >
                  <img src={s.icon} alt={s.label} width={22} height={22} />
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </PageTransition>
  );
};

