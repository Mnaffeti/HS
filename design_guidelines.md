# Design Guidelines: Software Consulting Agency Portfolio

## Design Approach: SWISS Design System

**Primary Aesthetic:** Pure SWISS design principles - strict grid system, bold sans-serif typography, asymmetric layouts, generous whitespace, and restrained color palette.

**Reference Inspiration:** Stripe's minimalism + Linear's typography hierarchy + classic Swiss International Style

---

## Core Design Elements

### Typography
- **Primary Font:** Inter or Helvetica Neue via Google Fonts CDN
- **Hierarchy:**
  - Hero Headlines: text-6xl to text-8xl, font-bold, tracking-tight
  - Section Headers: text-4xl to text-5xl, font-semibold
  - Subheadings: text-xl to text-2xl, font-medium
  - Body: text-base to text-lg, font-normal, leading-relaxed
  - Captions/Labels: text-sm, uppercase, tracking-wider

### Layout System
- **Spacing Units:** Tailwind spacing of 4, 8, 12, 16, 24, 32 (p-4, gap-8, my-12, py-16, etc.)
- **Container:** max-w-7xl with px-6 to px-8
- **Grid System:** 12-column grid for precise alignment, use asymmetric 2/3 + 1/3 splits frequently
- **Section Padding:** py-20 to py-32 on desktop, py-12 to py-16 on mobile

### Color Strategy
- **Base:** Black (#000000) text on white (#FFFFFF) background
- **Accent:** Single vibrant red (#FF0000 or #E63946) for CTAs and highlights
- **Neutrals:** Gray-100 to Gray-200 for subtle backgrounds, Gray-400 to Gray-500 for borders

---

## Page Structure & Components

### 1. Navigation
- Fixed header with blur backdrop (backdrop-blur-lg)
- Logo left, navigation links right
- Smooth scroll anchors to sections
- Minimal hamburger menu on mobile

### 2. Hero Section (80vh)
- **Layout:** Asymmetric - 60/40 text-to-image split
- **Content:** Large bold headline (company tagline), 2-3 line subheading, primary CTA button with red background
- **Image:** High-quality abstract geometric image or modern office workspace (right side, full-height)
- **Typography:** Massive headline with tight letter-spacing, creates visual impact

### 3. Services Section
- **Layout:** 3-column grid (lg:grid-cols-3, gap-12) on desktop, stacks on mobile
- **Cards:** Borderless, number-prefixed (01, 02, 03), bold service title, description text, no icons
- **Styling:** Minimal - rely on typography hierarchy and whitespace

### 4. Portfolio/Case Studies Section
- **Layout:** Asymmetric masonry-style grid - alternating large and small project cards
- **Implementation:** 2-column base (md:grid-cols-2), some items span 2 rows (row-span-2)
- **Cards:** Project image (grayscale with color on hover), overlay with project title, tech stack tags, brief outcome metrics
- **Interaction:** Subtle scale transform on hover

### 5. About/Team Section
- **Layout:** Split layout - left side large text block about agency mission, right side team grid (2x2)
- **Team Cards:** Headshot photo (circular or square), name, role in small caps
- **Content:** Company philosophy, expertise areas, years of experience

### 6. Contact Section
- **Layout:** 50/50 split - form on left, contact info + map/office image on right
- **Form:** Minimalist inputs with bottom borders only, labels as placeholders, red accent on focus
- **Right Side:** Office address, email, phone, response time expectation

### 7. Footer
- Slim footer with copyright, social links (LinkedIn, GitHub, Twitter), back-to-top link
- Gray-100 background for subtle separation

---

## Component Library

### Buttons
- **Primary:** Red background, white text, px-8 py-4, hover:bg-red-700 transition
- **Secondary:** Black border, black text, px-8 py-4, hover:bg-black hover:text-white
- **Text Links:** Underline decoration on hover, red accent color

### Cards
- No borders or shadows by default
- Rely on whitespace and typography for separation
- Hover states: subtle border or background change

### Forms
- Minimal styling: border-b-2 only, focus:border-red-500
- Labels as floating placeholders or top-aligned
- Error states: red border and text

### Icons
- Use Heroicons (outline style) via CDN
- Limited usage - only for navigation menu, social links, and directional arrows
- Size: 24px (w-6 h-6) standard

---

## Images

### Hero Image
- **Type:** Large hero image (modern workspace, abstract geometric pattern, or consulting team in action)
- **Placement:** Right 40% of hero section, full-height
- **Treatment:** High-quality, subtle overlay if placing text over it

### Portfolio Images
- **Type:** Project screenshots, product mockups, or branded visuals
- **Treatment:** Initially desaturated (grayscale filter), color returns on hover
- **Aspect Ratio:** Varied (some 16:9, some square) for visual interest

### Team Photos
- **Type:** Professional headshots
- **Treatment:** Consistent size and cropping (square or circular)
- **Placement:** About section grid

### Supporting Images
- Office/workspace photo in contact section for authenticity
- Abstract geometric patterns as subtle backgrounds (if needed)

---

## Animations
- **Scroll Reveal:** Fade-in with slight y-translate for section entries (subtle, <20px movement)
- **Hover States:** Scale transforms (1.02-1.05), color shifts, underlines
- **Page Load:** Hero content fades in sequentially (headline → subheading → CTA)
- **Keep Minimal:** SWISS design favors clean transitions over elaborate effects

---

## Accessibility
- Semantic HTML5 elements throughout
- ARIA labels for icon-only buttons
- Focus states with visible outlines (ring-2 ring-red-500)
- Color contrast ratio minimum 4.5:1
- Keyboard navigation support for all interactive elements

---

**Design Philosophy:** Embrace asymmetry, trust whitespace, let typography breathe. Every element should serve a clear purpose. Grid precision over decorative flourishes.