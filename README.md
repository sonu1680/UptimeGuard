# 🌐 UptimeGuard

[![UptimeGuard Banner](./public/banner.png)](https://uptimeguard.sonupandit.in)

**UptimeGuard** is a modern and reliable uptime monitoring platform that tracks the availability of websites, alerts users when downtime is detected, and displays live status metrics.

🔗 **Live Website**: [https://uptimeguard.sonupandit.in](https://uptimeguard.sonupandit.in)

---

## 🚀 Features

- 🌍 Add and monitor multiple websites
- 📊 Custom interval-based checks (1 min, 5 min, 30 min, 1 hr, 24 hrs)
- 🧠 Smart alerting with failure threshold handling
- 📧 Email alerts on downtime and recovery (optional)
- 🔒 Auth support (Google & Credentials)
- ⚙️ Admin dashboard to manage monitors
- 📈 Visual status history per site
- 🔄 Background jobs powered by Cron & Workers
- 🛡️ Fully protected API routes with session-based auth

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Node.js, Cron Jobs
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: NextAuth (Google + Email/password)
- **Cache**: Redis (via Upstash/Azure Redis)
- **Deployment**: Vercel (Frontend), Railway/EC2 (Backend API)
- **Monitoring**: Custom Worker & Queue Logic

---

## 📷 Preview

![UptimeGuard Screenshot](./public/preview.png)

---

## ⚙️ Getting Started

```bash
# Clone the repository
git clone https://github.com/sonu1680/UptimeGuard.git
cd UptimeGuard

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start the development server
npm run dev
