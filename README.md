<p align="center">
  <img src="./public/banner.png" alt="UptimeGuard Banner" />
</p>

<h1 align="center">UptimeGuard 🌐</h1>

<p align="center">
  A full-stack uptime monitoring platform to track websites, visualize uptime trends, and receive real-time alerts.
</p>

<p align="center">
  <a href="https://uptimeguard.sonupandit.in"><strong>🌐 Live Demo → uptimeguard.sonupandit.in</strong></a>
</p>

---

## 🔍 What is UptimeGuard?

**UptimeGuard** is a production-ready uptime monitoring system where users can:

- Add their websites or services.
- Select custom intervals (1min, 5min, 30min, etc.).
- Get alerts via UI or email when downtime occurs.
- View public status pages.
- Authenticate securely via Google or email/password.

---

## 🖼 Preview

### 🧭 Dashboard
<img src="./public/dashboard.png" alt="Dashboard" width="100%" />

### 📊 Public Status Page
<img src="./public/status-page.png" alt="Status Page" width="100%" />

---

## 🏗 Architecture

### 🧠 High-Level System Diagram

<img src="./public/architecture.png" alt="System Architecture" width="100%" />

### 🧬 Architecture Flow

```mermaid
graph TD
  A[User Logs In] --> B[Next.js App (App Router)]
  B --> C[Add Website Monitor Form]
  C --> D[API Route - POST /api/addWebsite]
  D --> E[Prisma ORM → PostgreSQL DB]

  subgraph Worker System
    F[Cron Job Triggers Worker]
    F --> G[Redis Queue (with website list)]
    G --> H[Worker Fetches URLs at Intervals]
    H --> I[Check Response / Latency]
    I --> J[Update DB via Prisma]
    I --> K[Trigger Alert if Threshold Breached]
  end

  J --> L[UI Dashboard Revalidates Status]
  K --> M[Send Email / UI Alerts]
