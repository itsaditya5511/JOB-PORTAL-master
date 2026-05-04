# 💼 JobPortal — Full-Stack MERN Job Platform

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-3D-000000?style=for-the-badge&logo=three.js&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Build-646CFF?style=for-the-badge&logo=vite&logoColor=white)

A modern, full-featured job portal built with the MERN stack. Students discover and apply for jobs; recruiters post roles, manage companies, and track applicants — all in one platform with a stunning 3D-enhanced UI.

[Live Demo](#) · [Report Bug](https://github.com/itsaditya5511/JOB-PORTAL-master/issues) · [Request Feature](https://github.com/itsaditya5511/JOB-PORTAL-master/issues)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Frontend Routes](#-frontend-routes)
- [Security](#-security)
- [Contributors](#-contributors)
- [License](#-license)

---

## ✨ Features

### For Students / Job Seekers
- 🔍 **Browse & Search** — Keyword search with location, salary, and job-type filters
- 📄 **One-Click Apply** — Apply instantly using your saved profile
- 📁 **Resume Upload** — PDF/DOC/DOCX support with persistent storage
- 🖼️ **Profile Photo** — Permanent photo saved to server (not just local preview)
- 📊 **Application Tracker** — Track all applications with real-time status badges (Pending → Shortlisted → Accepted / Rejected)
- 🔒 **Auth-Gated Content** — Unauthenticated users see a preview gate with sign-in prompt

### For Recruiters
- 🏢 **Company Management** — Register and manage multiple companies with logo uploads
- 💼 **Job Posting** — Full-featured job form (title, description, requirements, salary range, type, experience level)
- 👥 **Applicant Dashboard** — View all applicants per job with gradient avatar cards
- ✅ **Status Management** — Accept, shortlist, or reject applicants with one click + live status updates
- 📈 **Dashboard Stats** — Total jobs, openings this week, total positions overview

### Platform-wide
- 🌗 **Dark Mode** — System-persistent dark/light toggle across every page
- 🎨 **3D UI** — Three.js animated scenes on Login/Register auth pages
- 📱 **Responsive** — Mobile-first with collapsible filter sidebar and hamburger menu
- 🔔 **Toast Notifications** — Rich Sonner toasts with descriptions and action buttons
- ⚡ **Framer Motion** — Staggered card animations throughout the app
- 🛡️ **Security** — Helmet, rate-limiting, Zod validation, mongo-sanitize, bcrypt, JWT

---

## 🛠 Tech Stack

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js + Express | 4.21.2 | REST API server |
| MongoDB + Mongoose | 8.8.4 | Database & ODM |
| JWT + bcryptjs | 9.0.2 / 2.4.3 | Authentication & password hashing |
| Multer | 1.4.5-lts.1 | File uploads (resume, photo, logo) |
| Zod | 4.4.1 | Request schema validation |
| Helmet | 8.1.0 | HTTP security headers |
| express-rate-limit | 8.4.1 | Brute-force protection |
| express-mongo-sanitize | 2.2.0 | NoSQL injection prevention |

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.3.1 | UI library |
| Vite | 6.0.3 | Build tool & dev server |
| Redux Toolkit + redux-persist | 2.5.0 / 6.0.0 | Global state + persistence |
| react-router-dom | 7.0.2 | Client-side routing |
| Axios | 1.7.9 | HTTP client with interceptors |
| Tailwind CSS | 3.4.17 | Utility-first styling |
| Radix UI + shadcn/ui | various | Accessible component primitives |
| Framer Motion | 12.0.3 | Animations |
| Three.js + R3F + Drei | 0.184.0 / 8.x / 9.x | 3D auth page scenes |
| Sonner | 1.7.1 | Toast notifications |
| Lucide React | 0.468.0 | Icon library |

---

## 🖥 Screenshots

> The application features a modern dark/light UI built with Tailwind CSS and shadcn/ui components.

| Page | Description |
|------|-------------|
| **Home** | Hero with search bar, company marquee, "Why JobPortal" cards, latest job listings (auth-gated) |
| **Login / Register** | Split-screen layout — animated 3D Three.js scene on left, glass-card form on right. Password strength meter on register. |
| **Browse / Jobs** | Responsive job grid with filter sidebar (location, technology, experience, salary). Auth-gated for guests. |
| **Job Description** | Hero card with company logo, quick-stat tiles, description + requirements, overview sidebar, Apply Now CTA |
| **Profile** | Gradient banner + avatar, persistent photo upload, skills pills, resume link, applied-jobs tracker |
| **Admin — Companies** | Card grid with company logos, edit buttons, empty states |
| **Admin — Jobs** | Rich job cards with type badges, salary/experience/location pills, applicant counts |
| **Admin — Applicants** | Applicant cards with gradient avatars, contact info, resume link, Accept/Shortlist/Reject actions |
| **About** | Full-page portfolio — 3D hero, skill cards, timeline |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://cloud.mongodb.com))
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/itsaditya5511/JOB-PORTAL-master.git
cd JOB-PORTAL-master
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/`:

```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/jobportal
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5011
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

Expected output:
```
Server is running on port 5011
MongoDB Connected...
```

### 3. Frontend Setup

```bash
cd ../Frontend
npm install
```

Create a `.env` file in `Frontend/`:

```env
VITE_BACKEND_URL=http://localhost:5011
```

Start the frontend:

```bash
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 🔐 Environment Variables

### Backend (`Backend/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `MONGO_URI` | ✅ | — | MongoDB connection string |
| `JWT_SECRET` | ✅ | — | Secret key for signing JWT tokens |
| `PORT` | ❌ | `5001` | Server port |
| `NODE_ENV` | ❌ | — | Set to `production` to enable secure cookies and stricter rate-limiting |
| `CLIENT_URL` | ❌ | `http://localhost:5173` | Comma-separated list of allowed CORS origins |
| `DISABLE_RATE_LIMIT` | ❌ | — | Set to `true` to bypass auth rate-limiting in development |

### Frontend (`Frontend/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_BACKEND_URL` | ❌ | `http://localhost:5011` | Backend API base URL |

---

## 📁 Project Structure

```
JOB-PORTAL-master/
├── Backend/
│   ├── controllers/
│   │   ├── application.controller.js   # Apply, get applicants, update status
│   │   ├── company.controller.js       # CRUD for companies
│   │   ├── job.controller.js           # Post, list, search jobs
│   │   └── user.controller.js          # Auth, profile, photo, resume
│   ├── middleware/
│   │   ├── asyncHandler.js             # Wraps async controllers
│   │   ├── errorHandler.js             # Global error + Zod error formatter
│   │   ├── isAuthenticated.js          # JWT cookie verification
│   │   ├── multer.js                   # File upload configs (logo/resume/photo)
│   │   ├── requireRole.js              # Role-based access (Student/Recruiter)
│   │   └── validate.js                 # Zod request validation middleware
│   ├── models/
│   │   ├── application.model.js        # Application schema + status enum
│   │   ├── company.model.js            # Company schema
│   │   ├── job.model.js                # Job schema + text indexes
│   │   └── user.model.js               # User schema + profile sub-document
│   ├── routes/
│   │   ├── application.route.js
│   │   ├── company.route.js
│   │   ├── job.route.js
│   │   ├── resume.route.js             # Protected resume download
│   │   └── user.route.js
│   ├── uploads/                        # Local file storage
│   │   ├── logos/
│   │   ├── photos/
│   │   └── resumes/
│   ├── utils/
│   │   └── db.js                       # MongoDB connect + legacy index cleanup
│   ├── validators/
│   │   └── schemas.js                  # All Zod schemas
│   └── index.js                        # Express app, middleware stack
│
├── Frontend/
│   └── src/
│       ├── assets/                     # Static images
│       ├── components/
│       │   ├── admincomponent/         # Recruiter dashboard pages + tables
│       │   ├── authentication/         # Login + Register (3D split layout)
│       │   ├── components_lite/        # Candidate-facing pages + shared UI
│       │   ├── creator/                # About / portfolio page
│       │   ├── three/                  # AuthScene + HeroScene (Three.js R3F)
│       │   └── ui/                     # shadcn/Radix component wrappers
│       ├── hooks/                      # Custom React hooks (data fetching)
│       ├── redux/                      # Store, slices (auth, job, company, application)
│       └── utils/
│           └── data.js                 # API endpoint constants + URL builders
```

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Auth | Body | Description |
|--------|----------|------|------|-------------|
| `POST` | `/api/user/register` | ❌ | `fullname, email, phoneNumber, password, role` | Register new user |
| `POST` | `/api/user/login` | ❌ | `email, password, role` | Login, returns `httpOnly` JWT cookie |
| `POST` | `/api/user/logout` | ❌ | — | Clears auth cookie |
| `POST` | `/api/user/upload-resume` | ✅ | `FormData: bio, skills, resume (file)` | Update profile + resume |
| `POST` | `/api/user/upload-photo` | ✅ | `FormData: photo (file)` | Upload persistent profile photo |

### Jobs

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| `GET` | `/api/job/get` | ❌ | — | List all jobs (pagination, keyword search) |
| `GET` | `/api/job/get/:id` | ❌ | — | Get single job with applications |
| `GET` | `/api/job/getadminjobs` | ✅ | Recruiter | Get jobs posted by current user |
| `POST` | `/api/job/post` | ✅ | Recruiter | Create a new job listing |

### Companies

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| `POST` | `/api/company/register` | ✅ | Recruiter | Register a company |
| `GET` | `/api/company/get` | ✅ | Recruiter | Get recruiter's companies |
| `GET` | `/api/company/get/:id` | ✅ | — | Get company by ID |
| `PUT` | `/api/company/update/:id` | ✅ | Recruiter | Update company + logo upload |

### Applications

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| `POST` | `/api/application/apply/:id` | ✅ | Student | Apply for a job |
| `GET` | `/api/application/get` | ✅ | Student | Get own application history |
| `GET` | `/api/application/:id/applicants` | ✅ | Recruiter | Get all applicants for a job |
| `POST` | `/api/application/status/:id/update` | ✅ | Recruiter | Update application status |

### Files

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/resume/:filename` | ✅ | Download resume (owner or recruiter only) |
| `GET` | `/uploads/*` | ❌ | Static file serving (logos, photos) |
| `GET` | `/health` | ❌ | Health check `{ ok: true }` |

> All `POST`/`PUT` request bodies are validated with Zod. Invalid payloads return `400` with a structured error list.

---

## 🗺 Frontend Routes

| Path | Auth Required | Role | Component |
|------|:---:|------|-----------|
| `/` or `/Home` | ❌ | — | Home (gated job listings) |
| `/login` | ❌ | — | Login (3D split layout) |
| `/register` | ❌ | — | Register (3D split layout) |
| `/Browse` | ❌ | — | Browse jobs (auth-gated grid) |
| `/Jobs` | ❌ | — | Jobs with filters (auth-gated) |
| `/description/:id` | ❌ | — | Job detail + apply |
| `/Profile` | ✅ | Student | Profile, skills, resume, applied jobs |
| `/Creator` | ❌ | — | About / portfolio page |
| `/PrivacyPolicy` | ❌ | — | Privacy policy |
| `/TermsofService` | ❌ | — | Terms of service |
| `/admin/companies` | ✅ | Recruiter | Company card grid dashboard |
| `/admin/companies/create` | ✅ | Recruiter | Register a new company |
| `/admin/companies/:id` | ✅ | Recruiter | Company setup / logo upload |
| `/admin/jobs` | ✅ | Recruiter | Job listings dashboard |
| `/admin/jobs/create` | ✅ | Recruiter | Post a new job |
| `/admin/jobs/:id/applicants` | ✅ | Recruiter | Applicant cards + status management |

> Unauthenticated access to any `/admin/*` route redirects to `/login` via `ProtectedRoute`.

---

## 🛡 Security

| Layer | Implementation |
|-------|---------------|
| **Authentication** | `httpOnly` JWT cookie (7-day expiry), `SameSite=Strict` in dev, `SameSite=None; Secure` in production |
| **Authorization** | `requireRole` middleware on every sensitive route; applicant ownership check on resume download |
| **Input Validation** | Zod schemas on every POST/PUT endpoint — request body AND URL params |
| **Password Security** | bcrypt with cost factor 10 |
| **Rate Limiting** | 300 req/15min general API; 10 auth attempts/15min in production |
| **NoSQL Injection** | `express-mongo-sanitize` strips `$` and `.` from all request inputs |
| **HTTP Headers** | `helmet()` sets CSP, X-Frame-Options, HSTS, and more |
| **CORS** | Whitelist-based origin check; credentials mode required for cookie auth |
| **File Uploads** | Extension + MIME-type double validation; size limits (2–5 MB); UUID filenames prevent enumeration |
| **Session Expired** | Global Axios 401 interceptor auto-dispatches logout + redirects to `/login` |
| **PII** | Aadhaar / PAN removed from registration; `password` field excluded from all API responses via `select: false` + `toJSON` transform |

---

## 🤝 Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/itsaditya5511">
        <img src="https://github.com/itsaditya5511.png" width="80" alt="Aditya Shinde"/><br />
        <sub><b>Aditya Shinde</b></sub>
      </a><br />
      <sub>Project Owner · Full-Stack Developer</sub>
    </td>
    <td align="center">
      <a href="https://github.com/claude">
        <img src="https://avatars.githubusercontent.com/u/189858399?s=200&v=4" width="80" alt="Claude"/><br />
        <sub><b>Claude</b></sub>
      </a><br />
      <sub>AI Pair Programmer · Anthropic</sub>
    </td>
  </tr>
</table>

> Built collaboratively with **Claude (claude-sonnet-4-6)** by Anthropic as an AI pair-programming partner via [Claude Code](https://claude.ai/code). Claude contributed to architecture decisions, security hardening, UI redesigns, and bug fixes throughout development.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ by [Aditya Shinde](https://github.com/itsaditya5511) · Powered by [Claude Code](https://claude.ai/code)

⭐ Star this repo if you found it helpful!

</div>
