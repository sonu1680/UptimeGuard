<p align="center">
  <img src="./public/banner.png" alt="UptimeGuard Banner" />
</p>

<h1 align="center">UptimeGuard 🌐</h1>

<p align="center">
  A full-stack uptime monitoring platform to track websites, receive alerts, and visualize health data in real time.
</p>

<p align="center">
  <a href="https://uptimeguard.sonupandit.in" target="_blank"><strong>🔗 Visit Live Website</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-blue?logo=typescript" />
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql" />
  <img src="https://img.shields.io/badge/Redis-DC382D?logo=redis" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?logo=prisma" />
</p>

---

## 🖥️ Preview

### 🔧 Dashboard
<img src="./public/dashboard.png" alt="Dashboard Preview" width="100%" />

### 🟢 Public Status Page
<img src="./public/status-page.png" alt="Status Page" width="100%" />

---

## ⚡ Features

- ✅ Add and manage websites to monitor
- ⏱ Custom interval monitoring (1m, 5m, 30m, 1hr, 24hr)
- 📉 Get notified on downtime (with retry & threshold logic)
- 💬 Email notifications (configurable)
- 👥 Auth system using Google and email/password
- 🔐 Protected routes using `NextAuth`
- 📈 Visual history of uptime checks
- 🔄 Background jobs (cron-based worker system)
- 📊 Redis caching for fast performance

---

## 🛠 Tech Stack

| Layer       | Tools Used |
|-------------|------------|
| **Frontend**| Next.js 14, TypeScript, Tailwind CSS |
| **Backend** | Node.js, Cron jobs, NextAuth |
| **Database**| PostgreSQL + Prisma |
| **Auth**    | NextAuth (Google + Credentials) |
| **Queue/Cache** | Redis (Upstash or Azure Redis) |
| **Deployment** | Vercel (frontend) + Railway / EC2 (backend API) |

---

## 🚀 Getting Started

### 🧩 Clone & Install

```bash
git clone https://github.com/sonu1680/UptimeGuard.git
cd UptimeGuard
npm install
