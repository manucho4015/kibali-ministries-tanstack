import { Link } from '@tanstack/react-router';


const Footer = () => {

    const links = [
        { label: 'Home', to: '/' },
        { label: 'Content', to: '/content' },
        { label: 'Announcements', to: '/announcements' },
        { label: 'About', to: '/about' },
        { label: 'Contact', to: '/contact' },
    ] as const;
    return (
        <footer className="border-t border-border bg-background-2 pb-20 md:pb-0">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <span className="font-display text-xl font-bold text-foreground tracking-tight">
                            Kibali Ministry
                        </span>
                        <p className="mt-3 text-sm text-foreground-secondary leading-relaxed">
                            A community rooted in faith, love, and purpose. Join us every Sunday.
                        </p>
                        <div className="flex items-center gap-3 mt-5">
                            {['/youtube.svg', '/instagram.svg', '/x.svg', '/facebook.svg'].map((icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="p-2 rounded-md text-foreground-muted hover:text-foreground hover:bg-surface transition-geist"
                                    aria-label="Social link"
                                >
                                    <img src={icon} alt={`Follow us on ${icon.split('/').pop()?.split('.')[0]}`} className='size-18' />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Pages</h4>
                        <ul className="space-y-2.5">
                            {links.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.to}
                                        className="text-sm text-foreground-secondary hover:text-foreground transition-geist"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Resources</h4>
                        <ul className="space-y-2.5">
                            {['Daily Devotion', 'Sermons', 'Audio Messages', 'Events', 'Give'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-sm text-foreground-secondary hover:text-foreground transition-geist">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Contact</h4>
                        <ul className="space-y-2.5 text-sm text-foreground-secondary">
                            <li>123 Faith Avenue, Nairobi</li>
                            <li>+254 700 000 000</li>
                            <li>hello@kibaliministry.org</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-foreground-muted">
                        © {new Date().getFullYear()} Kibali Ministry. All rights reserved.
                    </p>
                    <p className="text-xs text-foreground-muted">
                        Built with love and purpose.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
