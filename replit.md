# Singularity Housing Website

## Project Overview
A professional website for Singularity Housing (formerly Changes Healing Center), showcasing their innovative housing model for vulnerable populations. The organization was founded by Eric Davis and Jeff Gruver and operates 20+ properties across Florida.

## Key Features
- Hero section with mission statement and key statistics
- About section featuring the founders Eric Davis and Jeff Gruver
- Singularity Housing Model explanation (SRO approach)
- Target populations served (recovery, elderly, veterans, developmental disabilities, justice-impacted, fixed income)
- Impact metrics and timeline
- Partnership inquiry form with email functionality

## Technical Stack
- Frontend: React, TypeScript, Tailwind CSS, Shadcn UI components
- Backend: Express.js, Node.js
- Email: Nodemailer with Gmail SMTP
- Routing: Wouter for client-side routing

## Email Functionality
The partnership inquiry form sends emails to singularityhousing@gmail.com using:
- Replit Gmail integration (handles OAuth authentication automatically)
- Gmail API for reliable email delivery
- Backend endpoint: POST /api/partnership-inquiry

## Design
- Primary color: Deep Teal (185 65% 35%) - Trust and professionalism
- Accent: Soft Coral (15 75% 60%) - Hope and warmth
- Secondary: Sage Green (145 30% 55%) - Growth and healing
- Typography: Inter for all text, Merriweather italic for quotes
- Responsive design with smooth scrolling navigation

## Navigation
- Sticky header with navigation links
- Smooth scroll to sections: About (#about), Our Model (#our-model), Impact (#impact), Press (#press), Partners (#partners)
- Mobile-responsive menu

## Content Sections
1. **Hero**: Mission statement with key statistics overlay
2. **About (#about)**: Founders' story and backgrounds
3. **Housing Model (#our-model)**: Four key features of the Singularity Housing model
4. **Target Populations**: Six population groups served
5. **Impact (#impact)**: Statistics and growth timeline
6. **Press (#press)**: Press coverage and media mentions
7. **Partnership (#partners)**: Contact form for potential investors/funders/partners

## Recent Changes
- Replaced "Changes Healing Center" with "Singularity Housing" throughout the site
- Implemented email functionality for partnership inquiries
- Added smooth scrolling navigation to page sections
- Removed CTA buttons from hero section (per user request)
- Added Press section with media coverage (positioned after Impact, before Partners)
- Updated Eric Davis's founder photo with professional headshot
- Singularity Housing logo positioned in navbar and footer next to company name
- Hero section uses solid teal/primary color background
- Reduced section spacing by 50% for more compact layout (py-20→py-10, md:py-24→md:py-12, lg:py-32→lg:py-16)
- Added five press items to Press section:
  - Block by Block article about Eric Davis's outreach work (March 2025)
  - Yahoo Finance article about seeking partnerships (2024)
  - St. Francis House Testimonial video (2024) - Updated with new MP4 video file
  - Two podcast episodes from The Independent Life featuring Eric Davis (September 2022)
- Implemented CAPTCHA verification ("I am not a robot") on partnership form:
  - Checkbox-based verification above submit button
  - Frontend and backend validation to prevent spam submissions
  - Includes timing check to prevent bot submissions (minimum 3-second delay)
- Migrated email functionality from nodemailer/SMTP to Replit Gmail integration:
  - Uses Gmail API with OAuth for reliable authentication
  - Automatic token refresh handling
  - More secure and stable email delivery
- Added phone numbers to footer Contact section on one line: 352-275-1712, 352-890-6300
- Added Eric Davis's LinkedIn profile link to footer Contact section
- Added background images to all four Housing Model section cards with 50% dark overlays for text readability:
  - Single Room Occupancy (SRO) card: room interior photo
  - Pseudo-Family Environment card: historical illustration depicting community
  - Ethical Property Management card: compass pointing to integrity
  - Long-Term Stability card: wooden blocks showing "Long Term" concept
- Added background images to all six Target Populations section cards with 50% dark overlays for text readability:
  - People in Recovery card: colorful illustration of collaboration
  - Elderly Individuals card: photo of elderly people in community setting
  - Veterans card: person in military attire with American flag
  - Developmental Disabilities card: infographic showing various developmental disabilities
  - Justice-Impacted card: person in vocational training/woodworking
  - Fixed Income Residents card: "Fixed Income" text with coins representing financial constraints
