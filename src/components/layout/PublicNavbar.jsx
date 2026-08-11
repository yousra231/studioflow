import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layers, ArrowRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';

const PublicNavbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-[#0b0f19]/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform">
            <Layers className="w-6 h-6" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            StudioFlow
          </span>
        </NavLink>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="#features" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Features</a>
          <a href="#metrics" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Metrics</a>
          <a href="#testimonials" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Testimonials</a>
          <a href="#pricing" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Pricing</a>
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          <NavLink to="/dashboard">
            <Button variant="secondary" size="md" className="hidden sm:inline-flex">
              View demo
            </Button>
          </NavLink>

          <NavLink to="/dashboard">
            <Button variant="primary" size="md" icon={ArrowRight}>
              Get started
            </Button>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;
