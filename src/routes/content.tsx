import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';
import {
    Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
    Share2, BookOpen, Clock, Mic, ChevronRight, X,
    ListMusic, Film, Headphones, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import PageTransition from '@/components/layout/PageTransition';
import ScrollReveal from '@/components/layout/ScrollReveal';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/content')({
    component: Content,
});

// ── Mock Data ────────────────────────────────────────────────

const todaysDevotion = {
    id: 'd1',
    title: 'Finding Rest in God\'s Promises',
    scripture: 'Matthew 11:28-30',
    date: 'Mar 18, 2026',
    speaker: 'Pastor James Mwangi',
    verse: '"Come to me, all you who are weary and burdened, and I will give you rest."',
    thumbnail: null,
};

const recentDevotions = [
    { id: 'd2', title: 'The Power of Gratitude', scripture: 'Psalm 100:4', date: 'Mar 17' },
    { id: 'd3', title: 'Walking by Faith', scripture: '2 Corinthians 5:7', date: 'Mar 16' },
    { id: 'd4', title: 'God\'s Unfailing Love', scripture: 'Romans 8:38-39', date: 'Mar 15' },
    { id: 'd5', title: 'Strength in Weakness', scripture: '2 Corinthians 12:9', date: 'Mar 14' },
    { id: 'd6', title: 'Purpose in the Storm', scripture: 'James 1:2-4', date: 'Mar 13' },
];

const audioTracks = [
    { id: 'a1', title: 'Grace That Transforms', speaker: 'Pastor James', duration: '42:18', date: 'Mar 15, 2026' },
    { id: 'a2', title: 'The Heart of Worship', speaker: 'Sarah Otieno', duration: '38:05', date: 'Mar 12, 2026' },
    { id: 'a3', title: 'Living Surrendered', speaker: 'David Kimani', duration: '35:42', date: 'Mar 8, 2026' },
    { id: 'a4', title: 'Unshakable Faith', speaker: 'Pastor James', duration: '45:10', date: 'Mar 5, 2026' },
    { id: 'a5', title: 'Called to Serve', speaker: 'Sarah Otieno', duration: '29:33', date: 'Mar 1, 2026' },
    { id: 'a6', title: 'The Joy of the Lord', speaker: 'David Kimani', duration: '33:55', date: 'Feb 26, 2026' },
];

const videoPlaylists = [
    { id: 'p1', name: 'The Foundations Series', episodes: 12, totalDuration: '8h 24m', desc: 'A deep dive into the core doctrines of the Christian faith.' },
    { id: 'p2', name: 'Kingdom Living', episodes: 8, totalDuration: '5h 12m', desc: 'Practical teachings on living out kingdom principles daily.' },
    { id: 'p3', name: 'Worship Nights', episodes: 6, totalDuration: '9h 30m', desc: 'Live worship recordings from our monthly worship nights.' },
    { id: 'p4', name: 'Youth Talks', episodes: 15, totalDuration: '6h 45m', desc: 'Engaging messages for the next generation of believers.' },
];

const latestVideos = [
    { id: 'v1', title: 'Walking in Purpose — Sunday Service', speaker: 'Pastor James', duration: '48:22', date: 'Mar 10' },
    { id: 'v2', title: 'The Armor of God — Part 3', speaker: 'Pastor James', duration: '41:05', date: 'Mar 7' },
    { id: 'v3', title: 'Praise & Worship Night — February', speaker: 'Worship Team', duration: '1:32:00', date: 'Feb 28' },
    { id: 'v4', title: 'Identity in Christ', speaker: 'David Kimani', duration: '36:18', date: 'Feb 24' },
];

// ── Audio Player State (simplified, no Howler for now) ──────

function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}

// ── Waveform Bars Component ─────────────────────────────────

const WaveformBars = ({ playing, count = 24 }: { playing: boolean; count?: number }) => {
    const bars = Array.from({ length: count }, (_, i) => {
        const height = 20 + Math.random() * 60;
        return (
            <div
                key={i}
                className={cn(
                    'w-[3px] rounded-full bg-primary transition-all duration-300',
                    playing ? 'animate-pulse' : ''
                )}
                style={{
                    height: `${playing ? height : 15}%`,
                    animationDelay: `${i * 50}ms`,
                    opacity: playing ? 0.6 + Math.random() * 0.4 : 0.3,
                }}
            />
        );
    });
    return <div className="flex items-end justify-center gap-[2px] h-16">{bars}</div>;
};

// ── Components ──────────────────────────────────────────────

const DevotionCard = ({ devotion, featured = false }: { devotion: typeof recentDevotions[0]; featured?: boolean }) => (
    <div className={cn(
        'rounded-lg border border-border bg-card hover:border-border-hover transition-geist group cursor-pointer overflow-hidden',
        featured ? 'col-span-full' : 'snap-start min-w-[240px] md:min-w-0'
    )}>
        <AspectRatio ratio={16 / 9}>
            <div className="w-full h-full bg-surface flex items-center justify-center relative">
                <BookOpen size={featured ? 32 : 24} className="text-foreground-muted" />
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-background/80 backdrop-blur text-[10px] font-mono text-foreground-secondary">
                    {devotion.date}
                </div>
                {featured && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center text-primary-foreground opacity-0 group-hover:opacity-100 transition-geist">
                            <Play size={24} className="ml-0.5" />
                        </div>
                    </div>
                )}
            </div>
        </AspectRatio>
        <div className="p-4">
            <h3 className={cn('font-semibold text-foreground', featured ? 'text-lg' : 'text-sm')}>{devotion.title}</h3>
            <p className="text-xs font-mono text-primary mt-1">{devotion.scripture}</p>
        </div>
    </div>
);

const VideoCard = ({ video }: { video: typeof latestVideos[0] }) => (
    <div className="rounded-lg border border-border bg-card hover:border-border-hover transition-geist group cursor-pointer overflow-hidden snap-start min-w-[280px] md:min-w-0">
        <AspectRatio ratio={16 / 9}>
            <div className="w-full h-full bg-surface flex items-center justify-center relative">
                <Film size={28} className="text-foreground-muted" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-geist">
                    <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center text-primary-foreground">
                        <Play size={20} className="ml-0.5" />
                    </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-background/90 backdrop-blur text-[10px] font-mono text-foreground-secondary">
                    {video.duration}
                </div>
            </div>
        </AspectRatio>
        <div className="p-4">
            <h3 className="text-sm font-semibold text-foreground line-clamp-2">{video.title}</h3>
            <p className="text-xs text-foreground-secondary mt-1.5">
                <span className="font-mono">{video.speaker}</span> · {video.date}
            </p>
        </div>
    </div>
);

const PlaylistCard = ({ playlist }: { playlist: typeof videoPlaylists[0] }) => (
    <div className="rounded-lg border border-border bg-card hover:border-border-hover transition-geist group cursor-pointer overflow-hidden snap-start min-w-[300px] md:min-w-0">
        <AspectRatio ratio={16 / 9}>
            <div className="w-full h-full bg-gradient-to-br from-primary/10 via-surface to-surface flex items-center justify-center relative">
                <ListMusic size={36} className="text-primary/40" />
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-mono font-medium">
                    {playlist.episodes} episodes
                </div>
            </div>
        </AspectRatio>
        <div className="p-5">
            <h3 className="text-base font-display font-bold text-foreground">{playlist.name}</h3>
            <p className="text-xs font-mono text-foreground-muted mt-1">{playlist.totalDuration}</p>
            <p className="text-sm text-foreground-secondary mt-2 line-clamp-2 leading-relaxed">{playlist.desc}</p>
            <Button variant="outline" size="sm" className="mt-4 w-full rounded-md text-xs gap-1.5">
                View Playlist <ChevronRight size={12} />
            </Button>
        </div>
    </div>
);

// ── Audio Player (fullscreen on mobile) ─────────────────────

const AudioPlayer = ({
    track,
    onClose,
}: {
    track: typeof audioTracks[0] | null;
    onClose: () => void;
}) => {
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(35);
    const [volume, setVolume] = useState(80);
    const [muted, setMuted] = useState(false);

    if (!track) return null;

    return (
        <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-2xl flex flex-col animate-fade-up">
            {/* Close */}
            <div className="flex items-center justify-between p-4">
                <span className="font-mono text-xs text-foreground-muted uppercase tracking-widest">Now Playing</span>
                <button onClick={onClose} className="p-2 rounded-md text-foreground-muted hover:text-foreground transition-geist">
                    <X size={20} />
                </button>
            </div>

            {/* Artwork */}
            <div className="flex-1 flex flex-col items-center justify-center px-8 gap-8">
                <div className="w-full max-w-xs aspect-square rounded-2xl bg-surface border border-border flex items-center justify-center overflow-hidden">
                    <div className="text-center">
                        <Headphones size={48} className="mx-auto text-primary/40 mb-4" />
                        <WaveformBars playing={playing} />
                    </div>
                </div>

                {/* Track Info */}
                <div className="text-center w-full max-w-sm">
                    <h2 className="text-xl font-display font-bold text-foreground">{track.title}</h2>
                    <p className="text-sm text-foreground-secondary mt-1">{track.speaker}</p>
                    <p className="text-xs font-mono text-foreground-muted mt-1">{track.date}</p>
                </div>

                {/* Progress */}
                <div className="w-full max-w-sm space-y-2">
                    <Slider
                        value={[progress]}
                        onValueChange={([v]) => setProgress(v)}
                        max={100}
                        step={1}
                        className="cursor-pointer"
                    />
                    <div className="flex items-center justify-between text-[10px] font-mono text-foreground-muted">
                        <span>{formatTime((progress / 100) * 2538)}</span>
                        <span>{track.duration}</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-6">
                    <button className="p-3 rounded-full text-foreground-secondary hover:text-foreground transition-geist">
                        <SkipBack size={24} />
                    </button>
                    <button
                        onClick={() => setPlaying(!playing)}
                        className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary-hover transition-geist"
                    >
                        {playing ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
                    </button>
                    <button className="p-3 rounded-full text-foreground-secondary hover:text-foreground transition-geist">
                        <SkipForward size={24} />
                    </button>
                </div>

                {/* Volume */}
                <div className="flex items-center gap-3 w-full max-w-[200px]">
                    <button
                        onClick={() => setMuted(!muted)}
                        className="text-foreground-muted hover:text-foreground transition-geist"
                    >
                        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                    <Slider
                        value={[muted ? 0 : volume]}
                        onValueChange={([v]) => { setVolume(v); setMuted(v === 0); }}
                        max={100}
                        step={1}
                        className="cursor-pointer"
                    />
                </div>

                {/* Share */}
                <button className="flex items-center gap-2 text-xs text-foreground-muted hover:text-foreground transition-geist mt-2">
                    <Share2 size={14} /> Share this message
                </button>
            </div>
        </div>
    );
};

// ── Mini Player ─────────────────────────────────────────────

const MiniPlayer = ({
    track,
    onExpand,
    onClose,
}: {
    track: typeof audioTracks[0] | null;
    onExpand: () => void;
    onClose: () => void;
}) => {
    const [playing, setPlaying] = useState(false);

    if (!track) return null;

    return (
        <div className="fixed bottom-16 md:bottom-0 left-0 right-0 z-50 border-t border-border bg-card/90 backdrop-blur-2xl">
            <div className="flex items-center gap-3 px-4 py-2.5 cursor-pointer" onClick={onExpand}>
                <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center flex-shrink-0">
                    <Headphones size={16} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{track.title}</p>
                    <p className="text-[10px] font-mono text-foreground-muted">{track.speaker}</p>
                </div>
                <button
                    onClick={(e) => { e.stopPropagation(); setPlaying(!playing); }}
                    className="p-2 text-foreground hover:text-primary transition-geist"
                >
                    {playing ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    className="p-2 text-foreground-muted hover:text-foreground transition-geist"
                >
                    <X size={16} />
                </button>
            </div>
            {/* Progress bar */}
            <div className="h-0.5 bg-border">
                <div className="h-full bg-primary w-[35%] transition-all" />
            </div>
        </div>
    );
};

// ── Main Content Page ───────────────────────────────────────

function Content() {
    const [activeTrack, setActiveTrack] = useState<typeof audioTracks[0] | null>(null);
    const [showFullPlayer, setShowFullPlayer] = useState(false);
    const [activeTab, setActiveTab] = useState('all');

    return (
        <PageTransition>
            {/* Header */}
            <section className="pt-20 md:pt-28 pb-8 md:pb-12">
                <div className="container mx-auto px-6">
                    <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2">Media</p>
                    <h1 className="font-display text-fluid-h1 font-extrabold tracking-tight text-foreground mb-4">
                        Content
                    </h1>
                    <p className="text-foreground-secondary max-w-xl">
                        Explore sermons, devotions, worship, and teaching — available in video and audio formats.
                    </p>
                </div>
            </section>

            {/* Tab Filter */}
            <section className="sticky top-0 md:top-16 z-30 bg-background/85 backdrop-blur-2xl border-b border-border">
                <div className="container mx-auto px-6">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="h-12 bg-transparent gap-1 p-0">
                            {[
                                { value: 'all', label: 'All', icon: null },
                                { value: 'devotions', label: 'Devotions', icon: BookOpen },
                                { value: 'video', label: 'Video', icon: Film },
                                { value: 'audio', label: 'Audio', icon: Headphones },
                                { value: 'playlists', label: 'Series', icon: ListMusic },
                            ].map((tab) => (
                                <TabsTrigger
                                    key={tab.value}
                                    value={tab.value}
                                    className="px-4 py-2 rounded-md text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none"
                                >
                                    {tab.icon && <tab.icon size={14} className="mr-1.5" />}
                                    {tab.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </div>
            </section>

            {/* ── Daily Devotion ─────────────────────────────────── */}
            {(activeTab === 'all' || activeTab === 'devotions') && (
                <section className="py-12 md:py-20">
                    <div className="container mx-auto px-6">
                        <ScrollReveal>
                            <div className="flex items-end justify-between mb-8">
                                <div>
                                    <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2">Daily</p>
                                    <h2 className="text-fluid-h2 font-display font-bold text-foreground">Today's Devotion</h2>
                                </div>
                            </div>
                        </ScrollReveal>

                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                            {/* Featured devotion */}
                            <ScrollReveal className="lg:col-span-3">
                                <div className="rounded-lg border border-border bg-card overflow-hidden group">
                                    <AspectRatio ratio={16 / 9}>
                                        <div className="w-full h-full bg-surface flex items-center justify-center relative">
                                            <BookOpen size={40} className="text-foreground-muted/50" />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-geist">
                                                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center text-primary-foreground">
                                                    <Play size={28} className="ml-1" />
                                                </div>
                                            </div>
                                        </div>
                                    </AspectRatio>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-mono font-medium">TODAY</span>
                                            <span className="text-xs font-mono text-foreground-muted">{todaysDevotion.date}</span>
                                        </div>
                                        <h3 className="text-xl font-display font-bold text-foreground">{todaysDevotion.title}</h3>
                                        <p className="text-sm font-mono text-primary mt-1">{todaysDevotion.scripture}</p>
                                        <p className="text-sm text-foreground-secondary mt-1">{todaysDevotion.speaker}</p>
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Verse card + mini list */}
                            <ScrollReveal delay={100} className="lg:col-span-2 flex flex-col gap-4">
                                {/* Today's Verse */}
                                <div className="rounded-lg border-l-4 border-l-primary border border-border bg-card p-6">
                                    <p className="font-mono text-[10px] text-primary uppercase tracking-widest mb-3">Today's Verse</p>
                                    <blockquote className="text-lg text-foreground font-display italic leading-relaxed">
                                        {todaysDevotion.verse}
                                    </blockquote>
                                    <p className="text-xs font-mono text-foreground-muted mt-3">— {todaysDevotion.scripture}</p>
                                </div>

                                {/* Recent devotions list */}
                                <div className="rounded-lg border border-border bg-card p-4 flex-1">
                                    <p className="font-mono text-[10px] text-foreground-muted uppercase tracking-widest mb-3">Recent</p>
                                    <div className="space-y-1">
                                        {recentDevotions.slice(0, 4).map((d) => (
                                            <div
                                                key={d.id}
                                                className="flex items-center gap-3 p-2.5 rounded-md hover:bg-surface cursor-pointer transition-geist"
                                            >
                                                <BookOpen size={14} className="text-primary flex-shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm text-foreground truncate">{d.title}</p>
                                                    <p className="text-[10px] font-mono text-foreground-muted">{d.scripture}</p>
                                                </div>
                                                <span className="text-[10px] font-mono text-foreground-muted flex-shrink-0">{d.date}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Devotion horizontal scroll on mobile */}
                        <div className="mt-6 flex md:grid md:grid-cols-4 gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
                            {recentDevotions.map((d, i) => (
                                <ScrollReveal key={d.id} delay={i * 60}>
                                    <DevotionCard devotion={d} />
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Latest Videos ──────────────────────────────────── */}
            {(activeTab === 'all' || activeTab === 'video') && (
                <section className="py-12 md:py-20 bg-background-2">
                    <div className="container mx-auto px-6">
                        <ScrollReveal>
                            <div className="flex items-end justify-between mb-8">
                                <div>
                                    <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2">Video</p>
                                    <h2 className="text-fluid-h2 font-display font-bold text-foreground">Latest Messages</h2>
                                </div>
                                <span className="hidden md:inline-flex items-center gap-1 text-sm text-primary cursor-pointer hover:underline">
                                    View All <ArrowRight size={14} />
                                </span>
                            </div>
                        </ScrollReveal>

                        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
                            {latestVideos.map((v, i) => (
                                <ScrollReveal key={v.id} delay={i * 60}>
                                    <VideoCard video={v} />
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Audio Messages ─────────────────────────────────── */}
            {(activeTab === 'all' || activeTab === 'audio') && (
                <section className="py-12 md:py-20">
                    <div className="container mx-auto px-6">
                        <ScrollReveal>
                            <div className="flex items-end justify-between mb-8">
                                <div>
                                    <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2">Audio</p>
                                    <h2 className="text-fluid-h2 font-display font-bold text-foreground">Audio Messages</h2>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Desktop: playlist layout */}
                        <div className="hidden md:grid md:grid-cols-5 gap-6">
                            {/* Track list */}
                            <div className="col-span-3 rounded-lg border border-border bg-card overflow-hidden">
                                <div className="p-4 border-b border-border">
                                    <p className="text-sm font-medium text-foreground">All Messages</p>
                                    <p className="text-xs font-mono text-foreground-muted mt-0.5">{audioTracks.length} tracks</p>
                                </div>
                                <div className="divide-y divide-border">
                                    {audioTracks.map((track, i) => (
                                        <button
                                            key={track.id}
                                            onClick={() => { setActiveTrack(track); setShowFullPlayer(false); }}
                                            className={cn(
                                                'w-full flex items-center gap-4 p-4 text-left hover:bg-surface transition-geist',
                                                activeTrack?.id === track.id && 'bg-primary/5'
                                            )}
                                        >
                                            <span className="w-6 text-xs font-mono text-foreground-muted text-center">
                                                {activeTrack?.id === track.id ? (
                                                    <Mic size={14} className="text-primary mx-auto" />
                                                ) : (
                                                    i + 1
                                                )}
                                            </span>
                                            <div className="flex-1 min-w-0">
                                                <p className={cn('text-sm font-medium truncate', activeTrack?.id === track.id ? 'text-primary' : 'text-foreground')}>
                                                    {track.title}
                                                </p>
                                                <p className="text-xs text-foreground-muted">{track.speaker}</p>
                                            </div>
                                            <span className="text-xs font-mono text-foreground-muted">{track.duration}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Artwork / Waveform */}
                            <div className="col-span-2">
                                <div className="rounded-lg border border-border bg-card p-6 sticky top-28">
                                    <div className="aspect-square rounded-xl bg-surface border border-border flex items-center justify-center mb-6 overflow-hidden">
                                        <div className="text-center">
                                            <Headphones size={40} className="mx-auto text-primary/30 mb-4" />
                                            <WaveformBars playing={!!activeTrack} count={20} />
                                        </div>
                                    </div>
                                    {activeTrack ? (
                                        <>
                                            <h3 className="text-base font-display font-bold text-foreground">{activeTrack.title}</h3>
                                            <p className="text-xs text-foreground-secondary mt-1">{activeTrack.speaker} · {activeTrack.date}</p>
                                            <div className="mt-4">
                                                <Slider value={[35]} max={100} step={1} className="cursor-pointer" />
                                                <div className="flex justify-between text-[10px] font-mono text-foreground-muted mt-1">
                                                    <span>14:52</span>
                                                    <span>{activeTrack.duration}</span>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <p className="text-sm text-foreground-muted text-center">Select a track to play</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Mobile: horizontal scroll cards */}
                        <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6">
                            {audioTracks.map((track, i) => (
                                <button
                                    key={track.id}
                                    onClick={() => { setActiveTrack(track); setShowFullPlayer(true); }}
                                    className="snap-start min-w-[220px] rounded-lg border border-border bg-card p-4 text-left hover:border-border-hover transition-geist"
                                >
                                    <div className="w-full aspect-square rounded-lg bg-surface border border-border flex items-center justify-center mb-3">
                                        <Headphones size={28} className="text-primary/40" />
                                    </div>
                                    <h3 className="text-sm font-semibold text-foreground truncate">{track.title}</h3>
                                    <p className="text-xs text-foreground-secondary mt-1">{track.speaker}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Clock size={10} className="text-foreground-muted" />
                                        <span className="text-[10px] font-mono text-foreground-muted">{track.duration}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Message Series (Playlists) ─────────────────────── */}
            {(activeTab === 'all' || activeTab === 'playlists') && (
                <section className="py-12 md:py-20 bg-background-2">
                    <div className="container mx-auto px-6">
                        <ScrollReveal>
                            <div className="flex items-end justify-between mb-8">
                                <div>
                                    <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2">Series</p>
                                    <h2 className="text-fluid-h2 font-display font-bold text-foreground">Message Series</h2>
                                </div>
                            </div>
                        </ScrollReveal>

                        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
                            {videoPlaylists.map((p, i) => (
                                <ScrollReveal key={p.id} delay={i * 60}>
                                    <PlaylistCard playlist={p} />
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Footer />

            {/* ── Mini Player ────────────────────────────────────── */}
            {activeTrack && !showFullPlayer && (
                <MiniPlayer
                    track={activeTrack}
                    onExpand={() => setShowFullPlayer(true)}
                    onClose={() => setActiveTrack(null)}
                />
            )}

            {/* ── Full Audio Player ──────────────────────────────── */}
            {showFullPlayer && (
                <AudioPlayer
                    track={activeTrack}
                    onClose={() => setShowFullPlayer(false)}
                />
            )}
        </PageTransition>
    );
};
