---
name: Cyber Freelance AI
colors:
  surface: '#11131c'
  surface-dim: '#11131c'
  surface-bright: '#373943'
  surface-container-lowest: '#0c0e17'
  surface-container-low: '#191b24'
  surface-container: '#1d1f29'
  surface-container-high: '#282933'
  surface-container-highest: '#33343e'
  on-surface: '#e2e1ef'
  on-surface-variant: '#c4c5d9'
  inverse-surface: '#e2e1ef'
  inverse-on-surface: '#2e303a'
  outline: '#8e90a2'
  outline-variant: '#434656'
  surface-tint: '#b8c3ff'
  primary: '#b8c3ff'
  on-primary: '#002388'
  primary-container: '#2e5bff'
  on-primary-container: '#efefff'
  inverse-primary: '#124af0'
  secondary: '#dcb8ff'
  on-secondary: '#480081'
  secondary-container: '#7701d0'
  on-secondary-container: '#dcb7ff'
  tertiary: '#ffb59b'
  on-tertiary: '#5b1a00'
  tertiary-container: '#c24100'
  on-tertiary-container: '#ffece6'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b8c3ff'
  on-primary-fixed: '#001356'
  on-primary-fixed-variant: '#0035be'
  secondary-fixed: '#efdbff'
  secondary-fixed-dim: '#dcb8ff'
  on-secondary-fixed: '#2c0051'
  on-secondary-fixed-variant: '#6700b5'
  tertiary-fixed: '#ffdbcf'
  tertiary-fixed-dim: '#ffb59b'
  on-tertiary-fixed: '#380d00'
  on-tertiary-fixed-variant: '#812800'
  background: '#11131c'
  on-background: '#e2e1ef'
  surface-variant: '#33343e'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-base:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  data-mono:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: -0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 20px
  gutter: 12px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style

This design system is engineered for the modern freelancer who navigates the gig economy with a tech-forward mindset. The brand personality is **intelligent, energetic, and premium**, positioning the app as a sophisticated AI partner rather than a static tool.

The visual style is a hybrid of **Glassmorphism** and **High-Tech Futurology**. It utilizes deep, immersive backgrounds to reduce eye strain during late-night deep work sessions, while vibrant gradients and "inner-glow" lighting effects draw focus to key financial insights. The aesthetic prioritizes depth through layering, using semi-transparent surfaces that mimic frosted glass to create a sense of lightness despite the dark color palette.

## Colors

The palette is anchored by a **Deep Navy/Black** foundation to provide a high-contrast environment for data visualization. 

- **Primary & Secondary:** A gradient bridge between Electric Blue and Deep Purple is used for hero components and "AI-powered" insights.
- **Surface Tints:** Use varying degrees of transparency and subtle blue tints for containers to maintain depth.
- **Functional Accents:** 
    - **Neon Green:** Reserved exclusively for positive trends, growth, and completion.
    - **Neon Pink/Red:** Used for critical warnings, payment deadlines, and high-priority alerts.
    - **Electric Blue:** The primary interaction color for buttons, active states, and navigation.

## Typography

This design system utilizes **Inter** for its exceptional legibility and neutral, high-tech feel. For specific data-heavy financial figures, a secondary typeface like **Space Grotesk** can be used to emphasize the "technical" nature of the app.

Hierarchy is established through weight and scale rather than color, as the dark background requires high-contrast white or off-white text for readability. Use **Semi-Bold (600)** for section headers and **Regular (400)** for descriptive body text.

## Layout & Spacing

The layout follows a **Fluid Grid** model with high internal density to mirror the complexity of financial data. A 4px baseline grid ensures consistent alignment across all components.

- **Margins:** Standard mobile margins are set to 20px to allow the glassmorphic card edges to breathe.
- **Grouping:** Use tighter spacing (8px) for related data points (e.g., a label and its value) and wider spacing (24px) to separate distinct functional modules.
- **Rhythm:** Vertical stacks should maintain a consistent rhythm to help the user scan long lists of transactions or insights.

## Elevation & Depth

Hierarchy is communicated through **Optical Layering** rather than traditional shadows:

1.  **Base (0dp):** The deep navy background.
2.  **Surface (1dp):** Dark gray-blue containers with a subtle 1px border (#ffffff10).
3.  **Raised (2dp):** Glassmorphic cards with a background blur (12px to 20px) and a semi-transparent fill.
4.  **Feature (3dp):** Vibrant gradient cards with an "inner glow" effect and external bloom/shadow that matches the gradient color at low opacity (15-20%).

Use 1px "rim lights" (top-left stroke) on buttons and cards to simulate a light source from above, enhancing the 3D feel.

## Shapes

The design system uses **Rounded (16px/1rem)** corners for primary containers to balance the "high-tech" sharpness with a sense of approachability. 

- **Cards:** 16px to 24px corner radius.
- **Buttons:** 12px corner radius for a modern, slightly softer look.
- **Interactive Elements:** Small tags or chips use a pill-shape (full rounding) to distinguish them from structural layout elements.

## Components

### Buttons & Inputs
- **Primary Action:** Solid Electric Blue with a subtle outer glow.
- **Secondary Action:** Ghost style with a 1px border and 10% opacity white fill.
- **Inputs:** Darker than the surface color, using a bright blue focus ring and a subtle inner shadow to look "recessed."

### Cards & Containers
- **Insight Cards:** Feature a background blur and a subtle gradient stroke. 
- **AI-Hero Cards:** Use a full linear gradient (Purple to Blue) with 3D-illustrated icons or glass-textured assets.

### Data Visualization
- **Line Charts:** Use "Neon Green" for the path with a soft glow effect. The area under the curve should have a fading gradient fill.
- **Progress Bars:** Thick, rounded bars with a dual-tone gradient fill to indicate completion.

### Icons & Imagery
- **Icons:** Use thin-line (1.5px) icons with rounded terminals.
- **AI Assistant:** Incorporate 3D-rendered, high-gloss characters or abstract neural meshes to emphasize the AI-driven nature of the platform.