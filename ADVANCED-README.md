# Biriyani Kada — Advanced UI

An optional, redesigned front-end for the Biriyani Kada website.
**The original site (`index.html` + `style.css`) is completely untouched and works exactly as before.**

## New files

| File | Purpose |
| --- | --- |
| `advanced.html` | Redesigned page — same content, sections, anchors (`#home`, `#about`, `#contact-heading`), dishes and prices as the original |
| `advanced.css` | Modern dark-gold theme, Google Fonts, glassmorphism sticky navbar, hover effects, scroll-reveal animations, fully responsive layout with mobile menu |
| `advanced.js` | Interactions: preloader, sticky-nav state, hamburger menu, **live search filter**, active-link highlighting, animated stat counters, order toast, back-to-top button |

## How to use

Open `advanced.html` directly in a browser, or serve the folder with any static server:

```powershell
cd "c:\Python-ML files\biriyani_kada"
python -m http.server 8000
# then visit http://localhost:8000/advanced.html
```

## What stayed the same

- Same dishes & prices (Thalassery ₹180, Kolkata ₹190, Hyderabadi ₹170)
- Same About / Contact text, phone number, hours and location
- Same images and anchor-based navigation
