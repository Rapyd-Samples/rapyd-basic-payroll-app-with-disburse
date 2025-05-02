# 💸 Rapyd Payroll Disburse App

A Next.js reference project that shows **how to pay employees or contractors worldwide _and_ earn a fee on every payout**.  
Fork it ➜ add your markup ➜ ship a monetisable payroll service in minutes.

[Rapyd docs](https://docs.rapyd.net) • Need help? [Community](https://community.rapyd.net) / [Support](https://docs.rapyd.net/en/client-support.html)

---

## ✨ Features

| Category | What you get |
| -------- | ------------ |
| **Global payouts** | Uses Rapyd **Disburse** API to send money to 190+ countries. |
| **Monetisation hook** | `FEE_FIXED` & `FEE_PERCENT` env vars let you charge per payout (pay-per-use) or offer tiered plans. |
| **Modern stack** | Next.js 14 (App Router) + Tailwind, running API routes in the same repo—no separate backend needed. |
| **Webhook billing** | Listens to payout-completed events, logs the markup, and creates an invoice row in PostgreSQL. |
| **Admin dashboard** | `/admin/usage` shows payouts, fees collected, and free-tier limits. |
| **One-click deploy** | Ready for Render / Railway; secrets managed in dashboard. |

---

## 🏗️ Architecture
Next.js (pages + API routes)
│\
├── app/ # React server components / UI\
├── pages/api/ # REST handlers → Rapyd Disburse\
├── utilities/rapyd/ # Signature + SDK helpers\
└── PostgreSQL # Employees · Payouts · Invoices


> **Why Next.js?** Single repo, zero-config API routes, easy server-side secrets. Scale later with serverless adapters or standalone Node.

---

## 🚀 Quick start

```
bash
git clone https://github.com/your-handle/rapyd-basic-payroll-app-with-disburse.git
cd rapyd-basic-payroll-app-with-disburse
pnpm install          # or yarn / npm
cp .env.example .env  # then fill the vars below
pnpm dev              # http://localhost:3000
```


### Required environment variables
| Variable | Example | Notes |
| -------- | ------- | ----- |
| RAPYD_ACCESS_KEY |	san_...	| From Rapyd Client Portal
| RAPYD_SECRET_KEY | ...	| Keep it safe!
| FEE_FIXED	| 0.50	| Adds a fixed markup (USD) to every payout
| FEE_PERCENT	| 1.5	| Percentage markup (%)
| DATABASE_URL	| postgresql://...	| Any Postgres 14+

 ### Create the schema:
```
pnpm run db:migrate
```

### 📈 How the billing works

1. Frontend posts a payout request → `/api/payout`.
2. Route signs the call and hits **Rapyd Disburse**.
3. Rapyd sends a `payout.completed` webhook → `/api/webhook`.
4. Listener calculates
`fee = FEE_FIXED + amount * FEE_PERCENT / 100`.
Fee & payout ID are stored in `invoices` → surfaced in `/admin/usage`.

#### Free tier logic (example)

```
const MAX_FREE_PAYOUTS = 3;
if (user.monthlyPayouts > MAX_FREE_PAYOUTS) chargeFee();
```
### 🛠️ Extending the project
- Multi-currency fees – read utilities/currency.ts; add FX markup.
- KYC add-on – call Rapyd Identity before first payout.
- Marketplace mode – expose your own /api/disburse and let other apps pay via your service (pay-per-use).

### 📚 Further reading
- Blog post: “How Developers Turn APIs Into Revenue Streams” (Rapyd Dev Blog)
- Community walkthrough: Payroll Payment Processing with Rapyd Disburse
- Rapyd Disburse docs: https://docs.rapyd.net/en/disburse.html

### 🤝 Contributing
- Issues & PRs welcome! Please read SECURITY.md first.

### 🪪 License
- MIT — use it, ship it, profit.




