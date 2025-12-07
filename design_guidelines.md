# Design Guidelines: Changes Healing Center Website

## Design Approach

**Reference-Based Approach**: Drawing inspiration from successful social impact organizations and mission-driven platforms:
- **Primary References**: Charity: Water (storytelling + impact), Kiva (trust-building), Habitat for Humanity (mission clarity)
- **Supporting Influences**: Airbnb (community feel), Medium (content hierarchy), Stripe (professional credibility)

**Core Principles**:
1. **Human-Centered**: Emphasize personal stories and lived experiences
2. **Trust & Credibility**: Professional aesthetic that builds confidence with investors and vulnerable populations
3. **Clarity of Mission**: Clear communication of the housing model and partnership opportunities
4. **Warmth & Accessibility**: Welcoming design that reduces stigma

## Color Palette

**Primary Colors**:
- **Deep Teal**: 185 65% 35% - Trust, stability, professional foundation
- **Warm Slate**: 210 15% 25% - Grounding, dignity, strength

**Accent Colors**:
- **Soft Coral**: 15 75% 60% - Hope, warmth, human connection
- **Sage Green**: 145 30% 55% - Growth, renewal, healing

**Neutrals**:
- **Light**: 210 20% 98% - Backgrounds
- **Mid**: 210 10% 45% - Text secondary
- **Dark**: 215 25% 15% - Primary text

**Usage Strategy**:
- Deep Teal for primary CTAs and headers
- Warm Slate for navigation and foundational elements
- Soft Coral sparingly for emotional highlights and secondary CTAs
- Sage Green for success states and community indicators

## Typography

**Font Families** (via Google Fonts):
- **Headings**: Inter (weights: 600, 700) - Modern, trustworthy, highly readable
- **Body**: Inter (weights: 400, 500) - Consistent family for professional cohesion
- **Accent/Quotes**: Merriweather (weight: 400 italic) - Warmth for testimonials

**Type Scale**:
- **Hero H1**: text-5xl md:text-6xl lg:text-7xl, font-bold
- **Section H2**: text-3xl md:text-4xl lg:text-5xl, font-semibold
- **Subsection H3**: text-2xl md:text-3xl, font-semibold
- **Body Large**: text-lg md:text-xl, font-normal
- **Body**: text-base, font-normal
- **Small**: text-sm, font-medium

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 8, 12, 16, 20, and 24
- **Micro spacing**: p-4, gap-4 (16px)
- **Component spacing**: p-8, gap-8 (32px)
- **Section spacing**: py-16 md:py-20 lg:py-24 (64-96px)
- **Large sections**: py-20 md:py-24 lg:py-32 (80-128px)

**Container Strategy**:
- **Max widths**: max-w-7xl for full sections, max-w-4xl for content, max-w-prose for long text
- **Padding**: px-4 md:px-8 lg:px-12

**Grid Systems**:
- **Hero/Full-width**: Single column centered
- **Features**: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- **Statistics**: grid-cols-2 md:grid-cols-4
- **Content + Sidebar**: grid-cols-1 lg:grid-cols-3 (2:1 ratio)

## Component Library

### Navigation
- Sticky header with blur backdrop (backdrop-blur-md bg-white/90)
- Logo left, navigation center, "Partner With Us" CTA right
- Mobile: Hamburger menu with slide-in drawer
- Include: Home, About, Our Model, Impact, Partners

### Hero Section
- **Height**: min-h-[600px] md:min-h-[700px] - not forced 100vh
- **Large hero image**: Warm, authentic photo of community/housing (not stock-looking)
- **Overlay**: Gradient overlay (from teal/90% to teal/60%) for text readability
- **Content**: Headline, subheadline, dual CTAs (primary + outline with backdrop-blur-md)
- **Statistics bar**: 3-4 key metrics overlaid at bottom

### Content Sections

**Founders Story Section**:
- Two-column layout: Founder photos (side-by-side circular frames) + narrative
- Quote callouts with Merriweather italic
- Background: Subtle Sage Green tint (145 30% 98%)

**Housing Model Explanation**:
- Icon grid showcasing key features
- Expandable cards for detailed information
- Visual diagram of the SRO model

**Impact Section**:
- Large statistics with animated counters
- Timeline of growth (2018 to present)
- Map visualization of 20+ Florida properties

**Target Populations**:
- Card grid with icons: Recovery, Elderly, Veterans, Developmental Disabilities, Justice-Impacted
- Each card: Icon, title, brief description, "Learn More" link

**Partnership CTA Section**:
- Split layout: Left - compelling copy with bullet points, Right - contact form
- Background: Deep Teal with white text
- Form fields: Name, Organization, Email, Interest Area (dropdown), Message

### Trust Elements
- Testimonial cards with resident quotes (anonymized with permission)
- "By the Numbers" section with key metrics
- Media mentions section (podcasts, press)
- Security/privacy badges near contact form

### Footer
- Multi-column: About (brief), Quick Links, Contact Info, Newsletter Signup
- Social media links (if available)
- Legal links (Privacy, Terms)
- Background: Warm Slate with white text

## Images

**Hero Image**: 
Large, warm photograph showing community interaction or a welcoming housing environment. Should convey safety, dignity, and hope. Authentic documentary-style photography preferred over staged stock images.

**Founders Section**: 
Professional headshots of Eric Davis and Jeff Gruver in circular frames, possibly in their work environment or community settings.

**Model Illustration**: 
Infographic-style visual explaining the Singularity Housing SRO model - can be custom illustration or diagram.

**Impact Section**: 
Before/after imagery (respectful), property photos, community gathering images.

**Background Patterns**: 
Subtle texture overlay on Deep Teal sections for depth without distraction.

## Interaction Design

**Micro-interactions**: 
- Card hover: Subtle lift (transform: translateY(-4px)) with shadow increase
- Button hover states: Managed by Button component automatically
- Scroll-triggered fade-ins for statistics and quotes
- Smooth scroll for anchor navigation

**Animations**: 
Minimal and purposeful only:
- Number counters for statistics (one-time on scroll into view)
- Gentle fade-in for sections (stagger by 100ms)
- Property count map animation (pulse indicators)

**Accessibility**: 
- WCAG AA contrast ratios minimum
- Focus states with 2px Soft Coral ring
- Skip navigation link
- Semantic HTML throughout
- Alt text for all images describing context and emotion