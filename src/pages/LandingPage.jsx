import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  FolderKanban, 
  FileText, 
  Layers,
  Star,
  Play
} from 'lucide-react';
import PublicNavbar from '../components/layout/PublicNavbar';
import PublicFooter from '../components/layout/PublicFooter';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const LandingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 flex flex-col transition-colors selection:bg-brand-500 selection:text-white">
      {/* Navbar */}
      <PublicNavbar />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-28 md:pb-32 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/15 dark:bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 dark:bg-brand-500/20 border border-brand-500/20 text-brand-600 dark:text-brand-300 text-xs font-semibold mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-brand-500" />
            <span>StudioFlow 2.0 is live • All-in-One Client & Invoice Suite</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.1] mb-6">
            Run your business. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Without the busywork.
            </span>
          </h1>

          {/* Supporting text */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
            StudioFlow simplifies client relationships, project milestones, and smart invoicing for modern freelancers and growing digital agencies.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <NavLink to="/dashboard">
              <Button variant="primary" size="lg" icon={ArrowRight} className="w-full sm:w-auto shadow-glow">
                Get started
              </Button>
            </NavLink>
            <NavLink to="/dashboard">
              <Button variant="secondary" size="lg" icon={Play} className="w-full sm:w-auto">
                View demo
              </Button>
            </NavLink>
          </div>

          {/* Interactive Product Preview Dashboard Mockup */}
          <div className="relative max-w-5xl mx-auto rounded-3xl p-3 sm:p-4 bg-slate-900/10 dark:bg-white/5 border border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-2xl animate-slide-up">
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111726] shadow-inner">
              {/* Window controls bar */}
              <div className="h-10 px-4 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] font-mono text-slate-400">app.studioflow.design/dashboard</span>
                <div className="w-12" />
              </div>

              {/* Preview image / simulated UI header */}
              <div className="p-6 sm:p-8 text-left space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Welcome back, Alex 👋</h2>
                    <p className="text-xs text-slate-500">Here is your agency overview for August 2026</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                      ● Live Syncing
                    </span>
                  </div>
                </div>

                {/* Simulated KPI Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase">Monthly Revenue</p>
                    <p className="text-xl font-extrabold text-slate-900 dark:text-white">$48,900</p>
                    <span className="text-[10px] text-emerald-500 font-bold">+24.5% vs last month</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase">Active Projects</p>
                    <p className="text-xl font-extrabold text-slate-900 dark:text-white">8 Active</p>
                    <span className="text-[10px] text-indigo-500 font-bold">92% on schedule</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase">Total Clients</p>
                    <p className="text-xl font-extrabold text-slate-900 dark:text-white">18 Accounts</p>
                    <span className="text-[10px] text-blue-500 font-bold">+3 new this week</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase">Pending Invoices</p>
                    <p className="text-xl font-extrabold text-slate-900 dark:text-white">$12,500</p>
                    <span className="text-[10px] text-amber-500 font-bold">2 due this week</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-100/60 dark:bg-[#080b12] border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Built for Performance</h2>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight sm:text-4xl">
              Everything you need to scale your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card hover className="flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Client CRM</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Keep all client contacts, revenue histories, and communication notes organized in one clean directory.
                </p>
              </div>
            </Card>

            <Card hover className="flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6">
                  <FolderKanban className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Project Tracking</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Monitor deadlines, budgets, and team allocations with dynamic progress bars and visual project cards.
                </p>
              </div>
            </Card>

            <Card hover className="flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Smart Invoicing</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Build auto-calculating invoices with custom line items, tax percentage, discounts, and printable views.
                </p>
              </div>
            </Card>

            <Card hover className="flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Financial Analytics</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Visualize revenue over time with interactive Recharts area charts and real-time margin insights.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="metrics" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">$4.8M+</p>
              <p className="text-xs text-slate-500 mt-2 font-medium">Invoiced by users</p>
            </div>
            <div>
              <p className="text-3xl sm:text-5xl font-extrabold text-brand-600 dark:text-brand-400 tracking-tight">99.4%</p>
              <p className="text-xs text-slate-500 mt-2 font-medium">On-time client payments</p>
            </div>
            <div>
              <p className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">12,000+</p>
              <p className="text-xs text-slate-500 mt-2 font-medium">Active Freelancers & Agencies</p>
            </div>
            <div>
              <p className="text-3xl sm:text-5xl font-extrabold text-amber-500 tracking-tight">4.9 / 5</p>
              <p className="text-xs text-slate-500 mt-2 font-medium">Average Customer Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-slate-100/60 dark:bg-[#080b12] border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Loved by creators</h2>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Trusted by top agencies worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic mb-6">
                  "StudioFlow replaced three separate apps for us. Our invoicing cycle went from 2 weeks down to instant automated billing."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
                  alt="Sarah Jenkins"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Sarah Jenkins</h4>
                  <p className="text-[11px] text-slate-500">Founder, Apex Design Co.</p>
                </div>
              </div>
            </Card>

            <Card className="flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic mb-6">
                  "The project status tracking and financial charts give our executive team crystal clear visibility over all active client retainers."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                  alt="Marcus Vance"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Marcus Vance</h4>
                  <p className="text-[11px] text-slate-500">CEO, Hyperion Labs</p>
                </div>
              </div>
            </Card>

            <Card className="flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic mb-6">
                  "The interface aesthetics are unmatched. It feels like a tool crafted by linear-level designers. Highly recommended."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                  alt="Elena Rostova"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Elena Rostova</h4>
                  <p className="text-[11px] text-slate-500">Product Lead, Vanguard Ventures</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Flexible Plans</h2>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight sm:text-4xl mb-6">
              Simple, transparent pricing
            </p>

            {/* Toggle */}
            <div className="inline-flex items-center gap-3 p-1.5 rounded-2xl bg-slate-200/70 dark:bg-slate-800/70 text-xs font-semibold">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-1.5 rounded-xl transition-all ${
                  billingCycle === 'monthly' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  billingCycle === 'yearly' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'
                }`}
              >
                Yearly Billing
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plan 1 */}
            <Card className="flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Freelancer</h3>
                <p className="text-xs text-slate-500 mb-6">Ideal for independent solo contractors.</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                    ${billingCycle === 'yearly' ? '15' : '19'}
                  </span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Up to 5 active clients</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Unlimited invoices</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Basic revenue charts</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Email support</li>
                </ul>
              </div>
              <NavLink to="/dashboard">
                <Button variant="outline" className="w-full">
                  Start free trial
                </Button>
              </NavLink>
            </Card>

            {/* Plan 2: Featured Pro */}
            <Card className="relative flex flex-col justify-between border-2 border-brand-500 shadow-glow dark:shadow-glow-dark">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-600 text-white text-[10px] font-extrabold tracking-wider uppercase">
                Most Popular
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Agency Pro</h3>
                <p className="text-xs text-slate-500 mb-6">Perfect for small teams and studios.</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                    ${billingCycle === 'yearly' ? '39' : '49'}
                  </span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Unlimited active clients</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Smart invoice calculation engine</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Project progress tracking</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Advanced Recharts analytics</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Priority 24/7 support</li>
                </ul>
              </div>
              <NavLink to="/dashboard">
                <Button variant="primary" className="w-full shadow-glow">
                  Get Started Now
                </Button>
              </NavLink>
            </Card>

            {/* Plan 3 */}
            <Card className="flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Enterprise</h3>
                <p className="text-xs text-slate-500 mb-6">For large agencies requiring custom workflows.</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                    ${billingCycle === 'yearly' ? '79' : '99'}
                  </span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Dedicated account manager</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Custom branding & domain</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Automated ERP integrations</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> SLA guarantee & 99.9% uptime</li>
                </ul>
              </div>
              <NavLink to="/dashboard">
                <Button variant="outline" className="w-full">
                  Contact Sales
                </Button>
              </NavLink>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-brand-600 via-indigo-600 to-purple-700 text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6">
            Ready to streamline your business?
          </h2>
          <p className="text-base sm:text-lg text-indigo-100 max-w-xl mx-auto mb-8 font-light">
            Join thousands of creators using StudioFlow to manage projects, bill clients, and focus on what they do best.
          </p>
          <NavLink to="/dashboard">
            <Button variant="secondary" size="lg" icon={ArrowRight} className="bg-white text-slate-900 hover:bg-slate-100 shadow-xl">
              Open Dashboard Demo
            </Button>
          </NavLink>
        </div>
      </section>

      {/* Footer */}
      <PublicFooter />
    </div>
  );
};

export default LandingPage;
