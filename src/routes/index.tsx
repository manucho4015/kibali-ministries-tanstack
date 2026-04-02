import { createFileRoute, Link } from '@tanstack/react-router';
import { ChevronDown, ArrowRight, Play, MapPin, Clock, Calendar, Users, Heart, Globe, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/layout/PageTransition';
import ScrollReveal from '@/components/layout/ScrollReveal';
import Footer from '@/components/layout/Footer';
import { useEffect, useState, useRef } from 'react';

// Mock data
const events = [
  { id: 1, title: 'Sunday Worship Service', date: 'Mar 16', time: '9:00 AM', location: 'Main Sanctuary' },
  { id: 2, title: 'Youth Fellowship Night', date: 'Mar 18', time: '6:30 PM', location: 'Youth Hall' },
  { id: 3, title: 'Women\'s Prayer Breakfast', date: 'Mar 20', time: '7:00 AM', location: 'Fellowship Center' },
  { id: 4, title: 'Community Outreach', date: 'Mar 22', time: '10:00 AM', location: 'City Park' },
];

const stats = [
  { label: 'Members', value: 2500, icon: Users },
  { label: 'Years', value: 15, icon: Heart },
  { label: 'Services/Week', value: 7, icon: Zap },
  { label: 'Cities Reached', value: 12, icon: Globe },
];

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen overflow-hidden">
        {/* Gradient orb */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-primary/15 blur-[120px] animate-pulse-glow" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="font-display text-fluid-display font-extrabold tracking-tight text-foreground mb-6">
            Welcome to{' '}
            <span className="text-primary">Kibali Ministry</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            A community rooted in faith, love, and purpose. Join us as we grow together in Christ.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild className="h-12 px-8 text-base rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover transition-geist">
              <Link to="/contact">Join Us</Link>
            </Button>
            <Button asChild variant="outline" className="h-12 px-8 text-base rounded-lg border-border hover:border-border-hover transition-geist">
              <a href="#latest-message">
                <Play size={16} className="mr-2" />
                Watch Live
              </a>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-hint">
          <ChevronDown size={24} className="text-foreground-muted" />
        </div>
      </section>

      {/* About Snippet */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="aspect-[4/3] rounded-lg bg-surface border border-border overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-foreground-muted">
                  <span className="font-mono text-sm">Church Photo</span>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <div>
                <p className="font-mono text-xs text-primary uppercase tracking-widest mb-3">Est. 2009 · Nairobi, Kenya</p>
                <h2 className="text-fluid-h2 font-display font-bold text-foreground mb-5">
                  Our Mission Is Simple
                </h2>
                <p className="text-foreground-secondary leading-relaxed mb-8">
                  Kibali Ministry exists to share the love of Jesus Christ with all people, building a community
                  of believers who worship, serve, and grow together. Through teaching, fellowship, and outreach,
                  we seek to transform lives and impact our world.
                </p>
                <Link to="/about" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 60}>
                <div className="text-center p-6 rounded-lg border border-border bg-card transition-geist hover:border-border-hover">
                  <stat.icon size={24} className="mx-auto mb-3 text-primary" />
                  <div className="text-fluid-h3 font-display font-bold text-foreground">
                    <AnimatedCounter target={stat.value} />
                    {stat.label === 'Members' && '+'}
                  </div>
                  <p className="text-xs font-mono text-foreground-muted mt-1 uppercase tracking-wider">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-background-2">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2">What's Coming</p>
                <h2 className="text-fluid-h2 font-display font-bold text-foreground">Upcoming Events</h2>
              </div>
              <Link to="/announcements" className="hidden md:inline-flex items-center gap-2 text-sm text-primary hover:underline">
                View All <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>

          {/* Mobile: horizontal scroll, Desktop: grid */}
          <div className="flex md:grid md:grid-cols-3 gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
            {events.slice(0, 3).map((event, i) => (
              <ScrollReveal key={event.id} delay={i * 60} className="snap-start min-w-[280px] md:min-w-0">
                <div className="glass rounded-lg p-5 hover:border-border-hover transition-geist h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-primary">
                      <Calendar size={13} />
                      <span className="text-xs font-mono font-medium">{event.date}</span>
                    </div>
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-3">{event.title}</h3>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-sm text-foreground-secondary">
                      <Clock size={13} /> {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground-secondary">
                      <MapPin size={13} /> {event.location}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-5 w-full rounded-md text-xs">
                    More Info
                  </Button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Message */}
      <section id="latest-message" className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2 text-center">Latest Message</p>
              <h2 className="text-fluid-h2 font-display font-bold text-foreground text-center mb-10">
                Sunday Sermon
              </h2>
              <div className="relative aspect-video rounded-lg bg-surface border border-border overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-geist">
                    <Play size={28} className="ml-1" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-lg font-semibold text-foreground">Walking in Purpose</h3>
                  <p className="text-sm text-foreground-secondary mt-1">
                    <span className="font-mono text-xs">Pastor James • Mar 10, 2026</span>
                  </p>
                </div>
              </div>
              <div className="text-center mt-8">
                <Link to="/content" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                  Watch More Messages <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
        <div className="container mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-fluid-h2 font-display font-bold text-foreground mb-4">
              New Here? We'd love to meet you.
            </h2>
            <p className="text-foreground-secondary max-w-lg mx-auto mb-8">
              Whether you're exploring faith or looking for a church family, you're welcome at Kibali Ministry.
            </p>
            <Button asChild className="h-12 px-8 text-base rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover transition-geist">
              <Link to="/contact">Plan Your Visit</Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </PageTransition>
  );
};
