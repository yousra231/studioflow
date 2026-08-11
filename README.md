# StudioFlow - Commercial Business Management SaaS Platform

StudioFlow is a complete, modern SaaS business management platform tailored for freelancers, agencies, and small businesses. Inspired by high-end financial and productivity platforms such as Linear and Stripe, StudioFlow provides an intuitive operating system to manage client CRM directories, deliverable project pipelines, financial analytics, and smart automated invoicing.

![StudioFlow SaaS Platform](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80)

---

## 🌟 Key Features

### 1. 🚀 Interactive Marketing Landing Page (`/`)
- High-impact hero headline (*"Run your business. Without the busywork."*) with dual CTAs.
- Interactive SaaS product dashboard mockup preview.
- Bento-grid feature breakdown highlighting Client CRM, Smart Invoicing, Project Tracking, and Financial Analytics.
- Live agency stats callout ($4.8M+ invoiced, 99.4% on-time payments, 12,000+ active users).
- Testimonials carousel with real-world agency social proof.
- Tiered pricing table with Monthly / Yearly billing cycle toggle.

### 2. 📊 Executive Dashboard (`/dashboard`)
- KPI summary cards (Total Billed Revenue, Active Projects, Total Clients, Outstanding Invoices) with monthly trend indicators.
- Interactive financial charts powered by **Recharts** (AreaChart for Revenue vs. Expenses; Donut Chart for Project Status distribution).
- Quick action menu (`+ New Client`, `+ New Project`, `+ New Invoice`).
- Live Activity Audit Stream tracking real-time agency events.

### 3. 👥 Client CRM Directory (`/clients`)
- Full client listing with avatars, company, contact details, active projects count, and total billed revenue.
- Real-time search and status filtering (`Active`, `Lead`, `Inactive`).
- Toggleable Table & Card Grid views.
- Add, Edit, and Delete client modals with validation and Toast feedback.

### 4. 📁 Project Tracking Hub (`/projects`)
- Visually rich project cards with progress bars, team avatars, budget indicators, and deadline countdowns.
- Multi-dimensional status filtering (`In Progress`, `Review`, `Completed`, `On Hold`) and client filtering.
- Dynamic project milestone creator and progress updater.

### 5. 🧾 Smart Invoicing & Billing Engine (`/invoices`)
- Comprehensive invoice ledger displaying invoice number, client name, issue date, due date, calculated total, and status badges (`Paid`, `Pending`, `Overdue`, `Draft`).
- **Auto-calculating Line Item Generator**: Add multi-row descriptions, quantities, unit rates, tax percentages, and discount rates with real-time total computation.
- **Printable / Download Preview**: Instant high-fidelity printable sheet with one-click "Mark as Paid" action.

### 6. ⚙️ Application Settings (`/settings`)
- Personal Profile details & avatar selector.
- Business Invoice headers (Company Name, Tax ID, Currency, Address, Website).
- **Dark & Light Mode Switch**: Instant theme switching synchronized across Tailwind CSS classes.
- Notification preferences toggle.
- **Demo Data Reset**: One-click restore to original seed sample data.

### 7. 🔍 Global Quick Search & UX
- Keyboard shortcut `Cmd/Ctrl + K` to trigger quick search across clients, projects, and invoices.
- **LocalStorage State Persistence**: Seamless local data persistence across page reloads.

---

## 🛠️ Tech Stack

- **Frontend Library**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **State & Persistence**: React Context API & Browser `localStorage`

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v16.0 or higher) installed.

### Installation

1. **Clone or navigate to the repository directory**:
   ```bash
   cd studioflow
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 📦 GitHub Pages Deployment

StudioFlow is configured with relative base paths (`base: './'`) for effortless static deployment to GitHub Pages or Netlify.

### Deploying via GitHub Actions / Pages

1. Push your repository to GitHub.
2. Go to **Settings > Pages** in your GitHub repository.
3. Select **GitHub Actions** as your build source or deploy the generated `dist/` directory directly.

---

## 🖼️ Application Preview

| Landing Page | Executive Dashboard |
| :---: | :---: |
| ![Landing Page](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80) | ![Dashboard](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80) |

| Smart Invoicing | Project Hub |
| :---: | :---: |
| ![Invoicing](https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80) | ![Projects](https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80) |

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
