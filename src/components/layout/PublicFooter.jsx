import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layers, Github, Twitter, Linkedin, Heart } from 'lucide-react';

const PublicFooter = () => {
  return (
    <footer className="bg-white dark:bg-[#080b12] border-t border-slate-200/80 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Column 1: Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <NavLink to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">StudioFlow</span>
            </NavLink>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              Run your business. Without the busywork. The modern operating system for digital agencies and freelancers.
            </p>
            <div className="flex items-center gap-3 text-slate-400 pt-2">
              <a href="#twitter" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-brand-500 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#github" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-brand-500 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#linkedin" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-brand-500 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">Product</h4>
            <ul className="space-y-2.5 text-xs">
              <li><NavLink to="/dashboard" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Dashboard</NavLink></li>
              <li><NavLink to="/clients" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Client CRM</NavLink></li>
              <li><NavLink to="/projects" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Project Hub</NavLink></li>
              <li><NavLink to="/invoices" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Smart Invoicing</NavLink></li>
              <li><NavLink to="/settings" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Settings</NavLink></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">Resources</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#docs" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Documentation</a></li>
              <li><a href="#api" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">API References</a></li>
              <li><a href="#changelog" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Changelog</a></li>
              <li><a href="#community" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Discord Community</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">Stay updated</h4>
            <p className="text-xs text-slate-500 mb-3">Subscribe to product updates and agency growth tips.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button
                type="submit"
                className="px-3.5 py-2 text-xs font-medium rounded-xl bg-brand-600 text-white hover:bg-brand-500 transition-colors shrink-0"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} StudioFlow Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
            Designed with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current inline" /> for modern creators.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
