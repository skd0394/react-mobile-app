# Fastor: React Mobile App

A mobile-first React implementation of the **Fastor** Figma design: phone sign-up, OTP verification, a food home feed, and a product detail screen.

**Stack:** React 19, React Router 7, Vite, CSS Modules (no UI library). Fonts are Mulish, League Spartan and Inter, the same as in the design.

**Live demo:** https://skd-fastor.vercel.app (open in mobile view; any 6-digit OTP works)

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run lint       # oxlint
```

Open it in your browser's device mode (e.g. iPhone 12/13, 375–390px wide). On a desktop the app renders as a centered phone-width column.

## Flow

| Screen | Route | What works |
| ------ | ----- | ---------- |
| Sign up | `/signup` | +91 mobile input with numeric keypad and `XXXXX XXXXX` formatting. Validates Indian mobile numbers (10 digits, starting 6–9). **Get OTP** stays disabled until 10 digits are entered. |
| OTP | `/otp` | Six digit boxes with auto-advance, backspace to the previous box, arrow keys, paste, and SMS autofill (`autocomplete="one-time-code"`). 30-second resend countdown. |
| Home | `/home` | Location header, user name, call and wallet actions, **Best Seller** grid, swipeable auto-playing **offer carousel** with dot navigation (pauses on hover/focus and respects reduced motion), and **Popular Items** with *Cancel Order* (asks for confirmation, then removes the order) and *Track Driver*. |
| Product | `/product/:id` | Hero image, quantity stepper (1–20), portion picker (accessible radio group) whose price updates with the selected portion, and **Add to cart**. |

> **Demo login:** there is no SMS backend, so **any 6-digit code is accepted**. The session is stored in `localStorage`, and `/home` and `/product/:id` are protected routes.

## Structure

```
src/
  App.jsx                 Routes and auth guards
  state/auth.jsx          Auth context (pending phone → verified user)
  data/menu.js            Products, offers, recent orders (mock data)
  components/             AuthLayout, PrimaryButton, BackButton, OfferCarousel
  pages/                  Signup, Otp, Home, ProductDetail (+ .module.css each)
  assets/                 Icons and photos exported from the Figma file
  index.css               Design tokens (colors, fonts) and base styles
```

## Notes on the implementation

- The iOS status bar, numeric keyboard and home indicator in the mockups are device chrome. They are not rebuilt in HTML; inputs use `inputMode="numeric"` so the phone shows its own keypad.
- Layout uses flexbox and grid instead of the absolute positions in the Figma export, so screens adapt to widths from 320 to 430px. Bottom actions sit above the on-screen keyboard and respect safe-area insets.
- The food photos were downscaled from 1344px PNGs to 800px JPEGs, cutting the total from about 13 MB to about 0.9 MB. They still look sharp at 2x density.
- Small design inconsistencies were normalized:
  - Prices use ₹ throughout (the mockups mix `$` and `₹`).
  - "Slides" became "Slices".
  - "1 items" became "1 item".
  - The detail screen has a back arrow, which the mockup lacks.
  - Placeholder lorem ipsum was replaced with real product copy.
