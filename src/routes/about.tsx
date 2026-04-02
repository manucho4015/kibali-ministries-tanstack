import { createFileRoute } from '@tanstack/react-router';
import { Heart, Eye, BookOpen, Handshake, Lightbulb, Shield } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import PageTransition from '@/components/layout/PageTransition';
import ScrollReveal from '@/components/layout/ScrollReveal';
import Footer from '@/components/layout/Footer';

export const Route = createFileRoute('/about')({
  component: About,
});

const timeline = [
  { year: '2009', title: 'Ministry Founded', desc: 'Kibali Ministry was founded with a small group of 12 believers meeting in a living room in Nairobi.' },
  { year: '2012', title: 'First Church Building', desc: 'Moved into our first permanent worship space, accommodating over 200 members.' },
  { year: '2015', title: 'Youth Ministry Launch', desc: 'Launched a dedicated youth program, reaching hundreds of young people across the city.' },
  { year: '2018', title: 'Community Outreach Expansion', desc: 'Extended our reach to 5 cities through community outreach programs and partnerships.' },
  { year: '2021', title: 'Online Ministry', desc: 'Launched online services and digital content, reaching believers across 12 countries.' },
  { year: '2024', title: 'New Sanctuary', desc: 'Opened our new 5,000-seat sanctuary, a testament to God\'s faithfulness.' },
];

const values = [
  { icon: BookOpen, title: 'Biblical Truth', desc: 'We hold firmly to the authority and sufficiency of God\'s Word.' },
  { icon: Heart, title: 'Authentic Love', desc: 'We love genuinely, creating a community where everyone belongs.' },
  { icon: Handshake, title: 'Radical Generosity', desc: 'We give freely of our time, resources, and talents to bless others.' },
  { icon: Lightbulb, title: 'Spirit-Led Living', desc: 'We seek the Holy Spirit\'s guidance in every aspect of life and ministry.' },
  { icon: Shield, title: 'Integrity', desc: 'We walk in honesty and transparency before God and one another.' },
  { icon: Eye, title: 'Kingdom Vision', desc: 'We look beyond ourselves to impact nations for Christ.' },
];

const leaders = [
  { name: 'Pastor James Mwangi', title: 'Senior Pastor', bio: 'Leading Kibali Ministry since 2009 with a passion for teaching and discipleship.' },
  { name: 'Sarah Otieno', title: 'Worship Director', bio: 'A gifted musician leading our worship ministry for over a decade.' },
  { name: 'David Kimani', title: 'Youth Pastor', bio: 'Passionate about equipping the next generation to live for Christ.' },
];

const beliefs = [
  { q: 'The Bible', a: 'We believe the Bible is the inspired, infallible Word of God and the supreme authority for all faith and practice.' },
  { q: 'God', a: 'We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit.' },
  { q: 'Jesus Christ', a: 'We believe Jesus Christ is the Son of God, born of a virgin, who lived a sinless life, died for our sins, rose again, and will return.' },
  { q: 'Salvation', a: 'We believe salvation is a free gift of God, received by grace through faith in Jesus Christ alone.' },
  { q: 'The Church', a: 'We believe the Church is the body of Christ, called to worship, fellowship, discipleship, and evangelism.' },
  { q: 'The Holy Spirit', a: 'We believe the Holy Spirit indwells every believer, empowering them for godly living and service.' },
];

function About() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative flex items-center justify-center min-h-[50vh] md:min-h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-surface" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="font-mono text-xs text-primary uppercase tracking-widest mb-4">Our Story</p>
          <h1 className="font-display text-fluid-h1 font-extrabold tracking-tight text-foreground mb-4">
            About Kibali Ministry
          </h1>
          <p className="text-lg text-foreground-secondary">Who we are and what we believe.</p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2 text-center">Journey</p>
            <h2 className="text-fluid-h2 font-display font-bold text-foreground text-center mb-16">Our Story</h2>
          </ScrollReveal>

          <div className="relative max-w-2xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            {timeline.map((item, i) => (
              <ScrollReveal key={item.year} delay={i * 80}>
                <div className={`relative flex items-start gap-8 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background -translate-x-1.5 md:-translate-x-1.5 mt-1.5 z-10" />

                  <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <span className="font-display text-2xl font-bold text-primary">{item.year}</span>
                    <h3 className="text-base font-semibold text-foreground mt-1">{item.title}</h3>
                    <p className="text-sm text-foreground-secondary mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background-2">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="p-8 rounded-lg border border-primary/20 bg-primary/5">
                <p className="font-mono text-xs text-primary uppercase tracking-widest mb-3">Mission</p>
                <h3 className="text-xl font-display font-bold text-foreground mb-4">Why We Exist</h3>
                <p className="text-foreground-secondary leading-relaxed">
                  To share the love of Jesus Christ with all people, building a community of believers
                  who worship, serve, and grow together, transforming lives and impacting our world
                  for the glory of God.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <div className="p-8 rounded-lg border border-success/20 bg-success/5">
                <p className="font-mono text-xs text-success uppercase tracking-widest mb-3">Vision</p>
                <h3 className="text-xl font-display font-bold text-foreground mb-4">Where We're Going</h3>
                <p className="text-foreground-secondary leading-relaxed">
                  To be a beacon of hope and transformation in every community we reach,
                  raising a generation of purpose-driven disciples who carry the message of
                  Christ to the ends of the earth.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2 text-center">Foundation</p>
            <h2 className="text-fluid-h2 font-display font-bold text-foreground text-center mb-12">Our Values</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 60}>
                <div className="p-6 rounded-lg border border-border bg-card hover:border-border-hover transition-geist group">
                  <v.icon size={24} className="text-primary mb-4 group-hover:scale-110 transition-geist" />
                  <h3 className="text-base font-semibold text-foreground mb-2">{v.title}</h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-background-2">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2 text-center">Team</p>
            <h2 className="text-fluid-h2 font-display font-bold text-foreground text-center mb-12">Leadership</h2>
          </ScrollReveal>

          <div className="flex md:grid md:grid-cols-3 gap-6 max-w-4xl mx-auto overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0  px-6 md:mx-auto md:px-0">
            {leaders.map((leader, i) => (
              <ScrollReveal key={leader.name} delay={i * 80} className="snap-start min-w-[260px] md:min-w-0">
                <div className="p-6 rounded-lg border border-border bg-card text-center hover:border-border-hover transition-geist">
                  <div className="w-20 h-20 rounded-full bg-surface border border-border mx-auto mb-4 flex items-center justify-center">
                    <span className="font-mono text-xs text-foreground-muted">Photo</span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{leader.name}</h3>
                  <p className="text-xs font-mono text-primary mt-1">{leader.title}</p>
                  <p className="text-sm text-foreground-secondary mt-3 leading-relaxed">{leader.bio}</p>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <a href="#" className="p-1.5 rounded text-foreground-muted hover:text-foreground transition-geist"><img src='x.svg' width={16} height={16} /></a>
                    <a href="#" className="p-1.5 rounded text-foreground-muted hover:text-foreground transition-geist"><img src='instagram.svg' width={16} height={16} /></a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2 text-center">Doctrine</p>
            <h2 className="text-fluid-h2 font-display font-bold text-foreground text-center mb-12">What We Believe</h2>
          </ScrollReveal>

          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="space-y-2">
              {beliefs.map((b, i) => (
                <ScrollReveal key={b.q} delay={i * 40}>
                  <AccordionItem value={`item-${i}`} className="border border-border rounded-lg px-5 data-[state=open]:border-border-hover transition-geist">
                    <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline py-4">
                      {b.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-foreground-secondary leading-relaxed pb-4">
                      {b.a}
                    </AccordionContent>
                  </AccordionItem>
                </ScrollReveal>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <Footer />
    </PageTransition>
  );
};
