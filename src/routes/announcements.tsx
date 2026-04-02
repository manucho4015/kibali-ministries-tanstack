import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';
import {
  Megaphone, Calendar, MapPin, Clock, Image as ImageIcon, Heart, MessageCircle, Repeat2,
  ExternalLink, ArrowRight, Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import PageTransition from '@/components/layout/PageTransition';
import ScrollReveal from '@/components/layout/ScrollReveal';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/announcements')({
  component: Announcements,
});



// ── Mock Data ────────────────────────────────────────────────

type PostType = 'announcement' | 'event' | 'image' | 'tweet' | 'instagram';

interface Post {
  id: string;
  type: PostType;
  title: string;
  body?: string;
  date: string;
  author?: string;
  image?: boolean;
  location?: string;
  time?: string;
  likes?: number;
  comments?: number;
  retweets?: number;
  handle?: string;
}

const posts: Post[] = [
  {
    id: 'n1', type: 'event', title: 'Easter Sunday Celebration',
    body: 'Join us for a special Easter service filled with worship, praise, and the resurrection message. Children\'s activities available.',
    date: 'Apr 20, 2026', time: '9:00 AM — 12:00 PM', location: 'Main Sanctuary',
  },
  {
    id: 'n2', type: 'image', title: 'Community Outreach — Last Saturday',
    body: 'Our team distributed food packages to over 200 families in the Mathare community. Thank you to all who served!',
    date: 'Mar 15, 2026', image: true,
  },
  {
    id: 'n3', type: 'announcement', title: 'New Small Group Sessions Starting',
    body: 'Registration is now open for our April small groups. Topics include prayer, marriage, parenting, and financial stewardship.',
    date: 'Mar 14, 2026', author: 'Admin',
  },
  {
    id: 'n4', type: 'tweet', title: '',
    body: '"The greatest glory in living lies not in never falling, but in rising every time we fall." Thank you Kibali family for an incredible worship night! 🙌 #KibaliMinistry',
    date: '2h ago', handle: '@kibaliministry', likes: 124, retweets: 38, comments: 15,
  },
  {
    id: 'n5', type: 'event', title: 'Youth Conference 2026',
    body: 'A 3-day conference for young adults aged 16-25. Theme: "Unshakable." Featuring worship, workshops, and powerful speakers.',
    date: 'May 1-3, 2026', time: '8:00 AM — 9:00 PM', location: 'Kibali Conference Center',
  },
  {
    id: 'n6', type: 'instagram', title: '', body: '',
    date: '1d ago', image: true, likes: 342, comments: 28, handle: '@kibaliministry',
  },
  {
    id: 'n7', type: 'announcement', title: 'Giving Campaign — Building Fund',
    body: 'We\'re raising funds for our community center expansion. Your generous contributions help us serve more families in need.',
    date: 'Mar 10, 2026', author: 'Finance Team',
  },
  {
    id: 'n8', type: 'image', title: 'Worship Night Highlights',
    body: 'An unforgettable evening of praise, worship, and prayer. See you at the next one!',
    date: 'Mar 8, 2026', image: true,
  },
  {
    id: 'n9', type: 'tweet', title: '',
    body: 'Sunday is coming! 🎉 Join us for a powerful message from Pastor James on "Walking in Purpose." Service starts at 9 AM. See you there! ✨',
    date: '5h ago', handle: '@kibaliministry', likes: 89, retweets: 22, comments: 8,
  },
  {
    id: 'n10', type: 'instagram', title: '', body: '',
    date: '3d ago', image: true, likes: 567, comments: 43, handle: '@kibaliministry',
  },
  {
    id: 'n11', type: 'instagram', title: '', body: '',
    date: '5d ago', image: true, likes: 221, comments: 19, handle: '@kibaliministry',
  },
  {
    id: 'n12', type: 'announcement', title: 'Volunteer Sign-Up Open',
    body: 'We need volunteers for greeting, parking, children\'s ministry, and tech team. Sign up at the info desk or online.',
    date: 'Mar 5, 2026', author: 'Ministry Team',
  },
];

const filterTabs = [
  { value: 'all', label: 'All' },
  { value: 'announcement', label: 'Announcements' },
  { value: 'event', label: 'Events' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'tweet', label: 'Twitter' },
];

// ── Post Cards ──────────────────────────────────────────────

const EventCard = ({ post }: { post: Post }) => (
  <div className="rounded-lg border border-border bg-card hover:border-border-hover transition-geist overflow-hidden">
    <div className="p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-primary">
          <Calendar size={12} />
          <span className="text-[10px] font-mono font-medium">{post.date}</span>
        </div>
      </div>
      <h3 className="text-base font-display font-bold text-foreground mb-2">{post.title}</h3>
      <p className="text-sm text-foreground-secondary leading-relaxed">{post.body}</p>
      {(post.time || post.location) && (
        <div className="mt-4 space-y-1.5">
          {post.time && (
            <div className="flex items-center gap-2 text-xs text-foreground-muted">
              <Clock size={12} /> {post.time}
            </div>
          )}
          {post.location && (
            <div className="flex items-center gap-2 text-xs text-foreground-muted">
              <MapPin size={12} /> {post.location}
            </div>
          )}
        </div>
      )}
      <Button className="mt-4 w-full rounded-md text-xs h-9 bg-primary text-primary-foreground hover:bg-primary-hover">
        RSVP
      </Button>
    </div>
  </div>
);

const AnnouncementCard = ({ post }: { post: Post }) => (
  <div className="rounded-lg border border-border bg-card hover:border-border-hover transition-geist overflow-hidden">
    <div className="p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 rounded-md bg-warning/10">
          <Bell size={14} className="text-warning" />
        </div>
        <span className="text-[10px] font-mono text-foreground-muted">{post.date}</span>
        {post.author && (
          <span className="text-[10px] font-mono text-foreground-muted">· {post.author}</span>
        )}
      </div>
      <h3 className="text-base font-semibold text-foreground mb-2">{post.title}</h3>
      <p className="text-sm text-foreground-secondary leading-relaxed">{post.body}</p>
      <button className="mt-3 text-xs text-primary hover:underline inline-flex items-center gap-1">
        Read More <ArrowRight size={10} />
      </button>
    </div>
  </div>
);

const ImagePostCard = ({ post }: { post: Post }) => (
  <div className="rounded-lg border border-border bg-card hover:border-border-hover transition-geist overflow-hidden">
    <AspectRatio ratio={4 / 3}>
      <div className="w-full h-full bg-surface flex items-center justify-center">
        <ImageIcon size={32} className="text-foreground-muted/30" />
      </div>
    </AspectRatio>
    <div className="p-5">
      <span className="text-[10px] font-mono text-foreground-muted">{post.date}</span>
      <h3 className="text-base font-semibold text-foreground mt-2 mb-2">{post.title}</h3>
      <p className="text-sm text-foreground-secondary leading-relaxed">{post.body}</p>
    </div>
  </div>
);

const TweetCard = ({ post }: { post: Post }) => (
  <div className="rounded-lg border border-border bg-card hover:border-border-hover transition-geist overflow-hidden">
    <div className="p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center">
          <img src='x.svg' className='text-foreground-muted' width={16} height={16} />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Kibali Ministry</p>
          <p className="text-[10px] font-mono text-foreground-muted">{post.handle}</p>
        </div>
        <img src='x.svg' className='ml-auto text-foreground-muted' width={16} height={16} />
      </div>
      <p className="text-sm text-foreground leading-relaxed">{post.body}</p>
      <p className="text-[10px] font-mono text-foreground-muted mt-3">{post.date}</p>
      <div className="flex items-center gap-6 mt-4 pt-3 border-t border-border">
        <span className="flex items-center gap-1.5 text-xs text-foreground-muted">
          <Heart size={13} /> {post.likes}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-foreground-muted">
          <Repeat2 size={13} /> {post.retweets}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-foreground-muted">
          <MessageCircle size={13} /> {post.comments}
        </span>
        <a href="#" className="ml-auto text-xs text-primary hover:underline inline-flex items-center gap-1">
          View on X <ExternalLink size={10} />
        </a>
      </div>
    </div>
  </div>
);

const InstagramCard = ({ post }: { post: Post }) => (
  <div className="rounded-lg border border-border bg-card hover:border-border-hover transition-geist overflow-hidden group cursor-pointer">
    <AspectRatio ratio={1}>
      <div className="w-full h-full bg-surface flex items-center justify-center relative">
        <img src='instagram.svg' className='text-foreground-muted/30' width={26} height={26} />
        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-geist flex items-center justify-center gap-4">
          <span className="flex items-center gap-1 text-sm text-foreground font-medium">
            <Heart size={16} /> {post.likes}
          </span>
          <span className="flex items-center gap-1 text-sm text-foreground font-medium">
            <MessageCircle size={16} /> {post.comments}
          </span>
        </div>
      </div>
    </AspectRatio>
  </div>
);

const PostCard = ({ post }: { post: Post }) => {
  switch (post.type) {
    case 'event': return <EventCard post={post} />;
    case 'announcement': return <AnnouncementCard post={post} />;
    case 'image': return <ImagePostCard post={post} />;
    case 'tweet': return <TweetCard post={post} />;
    case 'instagram': return <InstagramCard post={post} />;
    default: return null;
  }
};

// ── Main Announcements Page ─────────────────────────────────

function Announcements() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredPosts = activeFilter === 'all'
    ? posts
    : posts.filter((p) => p.type === activeFilter || (activeFilter === 'image' && p.type === 'image'));

  // Separate instagram posts for the grid
  const instagramPosts = posts.filter((p) => p.type === 'instagram');
  const feedPosts = activeFilter === 'instagram'
    ? []
    : filteredPosts.filter((p) => p.type !== 'instagram');

  return (
    <PageTransition>
      {/* Header */}
      <section className="pt-20 md:pt-28 pb-8 md:pb-12">
        <div className="container mx-auto px-6">
          <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2">Updates</p>
          <h1 className="font-display text-fluid-h1 font-extrabold tracking-tight text-foreground mb-4">
            Announcements
          </h1>
          <p className="text-foreground-secondary max-w-xl">
            Stay up to date with the latest news, events, and social updates from Kibali Ministry.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-0 md:top-16 z-30 bg-background/85 backdrop-blur-2xl border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 h-12 overflow-x-auto no-scrollbar">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={cn(
                  'px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-geist',
                  activeFilter === tab.value
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground-secondary hover:text-foreground hover:bg-surface'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Feed — Masonry-like layout */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          {feedPosts.length > 0 && (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
              {feedPosts.map((post, i) => (
                <ScrollReveal key={post.id} delay={i * 40}>
                  <div className="break-inside-avoid">
                    <PostCard post={post} />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Instagram Grid Section */}
      {(activeFilter === 'all' || activeFilter === 'instagram') && instagramPosts.length > 0 && (
        <section className="py-12 md:py-20 bg-background-2">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <img src='instagram.svg' className='text-foreground' width={20} height={20} />
                  <div>
                    <h2 className="text-lg font-display font-bold text-foreground">Follow Our Journey</h2>
                    <p className="text-xs font-mono text-foreground-muted">@kibaliministry</p>
                  </div>
                </div>
                <a href="#" className="text-xs text-primary hover:underline inline-flex items-center gap-1">
                  Follow Us <ExternalLink size={10} />
                </a>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {instagramPosts.map((post, i) => (
                <ScrollReveal key={post.id} delay={i * 60}>
                  <InstagramCard post={post} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Twitter/X Section */}
      {(activeFilter === 'all' || activeFilter === 'tweet') && (
        <section className={cn('py-12 md:py-20', activeFilter === 'all' ? '' : 'bg-background-2')}>
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <img src='x.svg' className='text-foreground' width={20} height={20} />
                  <div>
                    <h2 className="text-lg font-display font-bold text-foreground">Latest on X</h2>
                    <p className="text-xs font-mono text-foreground-muted">@kibaliministry</p>
                  </div>
                </div>
                <a href="#" className="text-xs text-primary hover:underline inline-flex items-center gap-1">
                  Follow Us <ExternalLink size={10} />
                </a>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl">
              {posts.filter((p) => p.type === 'tweet').map((post, i) => (
                <ScrollReveal key={post.id} delay={i * 60}>
                  <TweetCard post={post} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </PageTransition>
  );
};

