import { create } from 'zustand';

interface ThemeStore {
    theme: 'dark' | 'light';
    toggleTheme: () => void;
    setTheme: (theme: 'dark' | 'light') => void;
}

const getInitialTheme = (): 'dark' | 'light' => {
    if (typeof window === 'undefined') return 'dark';
    const stored = localStorage.getItem('kibali-theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return 'dark';
};

export const useThemeStore = create<ThemeStore>((set) => ({
    theme: getInitialTheme(),
    toggleTheme: () =>
        set((state) => {
            const next = state.theme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('kibali-theme', next);
            document.documentElement.classList.toggle('dark', next === 'dark');
            document.documentElement.classList.toggle('light', next === 'light');
            return { theme: next };
        }),
    setTheme: (theme) => {
        localStorage.setItem('kibali-theme', theme);
        document.documentElement.classList.toggle('dark', theme === 'dark');
        document.documentElement.classList.toggle('light', theme === 'light');
        set({ theme });
    },
}));
