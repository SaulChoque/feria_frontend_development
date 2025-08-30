# 🚀 Frontend Marketplace — Project README

A clean, modern front-end proof-of-concept for a general marketplace built with Next.js, TypeScript and TailwindCSS.

---

## 📌 Quick plan (what I will do next)

- Make the README clear, visual and actionable.
- Document what was reviewed, what was fixed, and what to do next.
- Provide copy/paste commands for development.

---

## ✨ At-a-glance

- Tech: Next.js (app router), React, TypeScript, TailwindCSS
- UI: Reusable components under `components/ui/` (Cards, Buttons, Inputs, etc.)
- Main page: `app/page.tsx` (marketplace UI, filters, product cards, cart, sell modal)

---

## ▶️ Run locally

```powershell
# install
npm install

# dev server (PowerShell)
npm run dev

# build & start for production
npm run build
npm run start
```

Open: http://localhost:3000

---

## 🧩 What I reviewed & fixed

- Reviewed the whole `app/` folder (page layout, product listing, modal forms, cart logic).
- Fixed the sell-product form so it is controlled and newly listed products appear immediately on the page (stored in local state + localStorage).
- Ensured the ProductCard footer stacks actions vertically so the secondary CTA (Contact Seller) no longer overlaps the Add to Cart button.
- Added small UX fixes (button types for non-submit actions, image preview flow, modal close behavior).

Status: core fixes applied to `app/page.tsx` and documented here. If you want I can also normalize `components/ui/*` to make the layout stricter.

---

## ✅ Features implemented (client-side)

- Search, category, condition and location filters
- Grid / list view toggles
- Product cards with badges, wishlist and Add to Cart action
- Floating cart (Sheet) with quantity controls
- Sell Product modal with controlled form, image upload preview
- Contact Seller sheet with product and seller details
- Dark / Light mode persisted to localStorage
- Products persisted to localStorage (newly listed items persist)

---

## ⚠️ Known issues & recommendations

- Cart is client-only. If you need persistence across devices, connect to a backend or sync via user account.
- Accessibility improvements: add ARIA attributes and keyboard focus flows for all interactive widgets.
- Add unit tests for `Card` and `Button` to prevent regressions in layout.

---

## 🛠 Development notes

- Where to look:
  - `app/page.tsx` — main application scaffold and product card UI
  - `components/ui/` — primitives used across the UI
  - `lib/utils.ts` — small helpers

- Quick editing loop:
  1. Edit code (VS Code)
  2. npm run dev
  3. Test in browser and refresh

---

## 📌 Next steps I can do for you (pick any)

- Apply permanent layout fixes to `components/ui/card.tsx` and `components/ui/button.tsx` to prevent overlapping in all screen sizes
- Add localStorage sync for the cart
- Add 2–3 unit tests (Jest + React Testing Library) for Card and Button
- Create a tiny e2e smoke test for the sell flow (Cypress)

Reply with the option you want (for example: "Fix components and run build").

---

## 🤝 Contribute

- Create a branch, make changes, run `npm run build` and open a PR.
- If you'd like I can prepare a small patch/PR here with the requested follow-ups.

---

Thanks — tell me which of the next steps you want me to implement and I’ll apply them and run a build to validate.