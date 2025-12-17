# Apex Consulting - Software Consulting Portfolio

## Overview
A single-page portfolio website for Apex Consulting, a software consulting agency. Built with modern React architecture and SWISS design principles featuring clean typography, grid-based layouts, and a minimalist aesthetic.

## Project Structure

### Frontend (client/)
- **client/src/App.tsx** - Main application entry with routing
- **client/src/pages/home.tsx** - Home page composing all sections
- **client/src/components/** - React components:
  - `navigation.tsx` - Fixed header with smooth scroll navigation
  - `hero-section.tsx` - Hero with 60/40 asymmetric layout and geometric visuals
  - `services-section.tsx` - Grid of 6 consulting services
  - `portfolio-section.tsx` - Case studies with hover effects
  - `about-section.tsx` - Company values and leadership team
  - `contact-section.tsx` - Contact form with validation
  - `footer.tsx` - Footer with social links

### Backend (server/)
- **server/routes.ts** - API routes (POST/GET /api/contact)
- **server/storage.ts** - In-memory storage for contact submissions

### Shared (shared/)
- **shared/schema.ts** - Data models and Zod validation schemas

## Design System
- **Typography**: Inter font, tight letter-spacing for headlines
- **Colors**: Monochrome (black/white/grays) with red accent
- **Layout**: 12-column grid, asymmetric compositions
- **Spacing**: Generous whitespace following SWISS design principles

## Features
- Responsive single-page layout
- Smooth scroll navigation
- Contact form with validation and API submission
- Loading states and error handling
- SWISS design aesthetic

## Running the Project
The workflow `Start application` runs `npm run dev` which starts both the Express backend and Vite frontend on port 5000.

## Recent Changes
- December 16, 2025: Initial implementation of portfolio website with all sections and contact form functionality
