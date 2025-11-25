# Vue3/Nuxt4 Frontend Pages

This document describes all implemented pages in the Vue3/Nuxt4 frontend.

## Pages Overview

### 1. Home Page (`/v2/`)
**File**: `src/frontend/app/pages/index.vue`

**Description**: Main landing page with the three primary actions.

**Features**:
- Large "Civilization Builder" title in gold (Cinzel font)
- Three action buttons with brown gradients and gold borders:
  - **Build Civilization** - Links to `/v2/build`
  - **Combine Civilizations** - Placeholder (shows alert)
  - **Create Draft** - Placeholder (shows alert)
- 10vh spacing between buttons (matching original design)
- Age of Empires II background image
- Responsive design for mobile devices

**Design**:
- Background: `aoe2background.jpg` covering full viewport
- Title color: `hsl(52, 100%, 50%)` (gold)
- Button gradients: Brown to dark brown with gold borders
- Font: Cinzel serif throughout

---

### 2. Build Page (`/v2/build`)
**File**: `src/frontend/app/pages/build.vue`

**Description**: Civilization builder interface (currently placeholder).

**Features**:
- Page title: "Build Your Civilization"
- Info panel listing planned features:
  - Tech tree editor
  - Flag builder
  - Civilization bonuses
  - Unique units selection
  - Technology selection
- Back to home button

**Status**: Placeholder - awaiting implementation of TechTree and FlagBuilder components

---

### 3. Help Page (`/v2/help`)
**File**: `src/frontend/app/pages/help.vue`

**Description**: Tutorial videos and mod publication instructions.

**Features**:
- **Tutorial Videos**: Two embedded YouTube videos
  - Video 1: General tutorial (`JNQdYs9Tl5w`)
  - Video 2: Additional tutorial (`2eVGyL93Wmk`)
- **Publication Instructions**: Step-by-step guide
  1. Download and extract mod
  2. Log in to ageofempires.com
  3. Submit Data Mod with specifications
  4. Submit UI Mod with specifications
  5. Subscribe and enable in mod manager
- Scrollable content area (max-height: 70vh)
- Back to home button

**Design**:
- Dark semi-transparent background with gold border
- Gold section headers
- White body text with proper spacing
- Responsive iframe sizing for mobile

---

### 4. About Page (`/v2/about`)
**File**: `src/frontend/app/pages/about.vue`

**Description**: Information about the website and its features.

**Features**:
- **Introduction**: Explanation of the mod creation tool
- **Three Main Features**:
  1. **Randomized Civilizations**: Generate random civs instantly
  2. **Civilization Building**: Custom civ creation with presets
  3. **Civilization Drafting**: Multiplayer draft experience
- **Credits Section**:
  - Created by Krakenmeister
  - Discord link
  - Buy Me a Coffee link
- Scrollable content area
- Back to home button

**Design**:
- Justified text with indentation
- Gold headers and links
- Hover effects on links
- Credits separated by border

---

### 5. Events Page (`/v2/events`)
**File**: `src/frontend/app/pages/events.vue`

**Description**: Community events and tournaments page.

**Features**:
- **No Events State**: "No events currently scheduled" message
- **Community Call-to-Action**: Join Discord for event updates
- **Discord Button**: Large button with Discord invite image
- Back to home button

**Status**: Placeholder for future event listings

**Design**:
- Centered layout with flex display
- Discord button with image and text
- Encourages community participation

---

### 6. Updates Page (`/v2/updates`)
**File**: `src/frontend/app/pages/updates.vue`

**Description**: Changelog dynamically loaded from CHANGELOG.md.

**Features**:
- **Dynamic Loading**: Fetches `/CHANGELOG.md` on mount
- **Markdown Parsing**: Converts markdown to styled HTML
  - Version headers with dates
  - GitHub release links for versions > 0.1.0
  - Bullet points with proper indentation
  - Skips header/preamble lines
- **Loading State**: "Loading changelog..." message
- **Error Handling**: "Failed to load" message on error
- Scrollable content area
- Back to home button

**Design**:
- Gold version headers (bold, larger font)
- White bullet points with indentation
- Gold links with hover effects
- Proper spacing between versions

---

## Layout Components

### Default Layout (`src/frontend/app/layouts/default.vue`)

**Navigation** (Fixed bottom-left):
- Home
- Help
- About
- Events
- Updates

**Footer** (Fixed bottom-right):
- Discord invite image (clickable)
- Donate button (links to Buy Me a Coffee)

**Design Features**:
- Navigation uses brown gradient buttons with gold borders
- All buttons have hover effects (lift and glow)
- Fixed positioning (z-index: 100)
- Responsive sizing with viewport units
- External links in footer

---

## Common Design Patterns

All pages share these design elements:

1. **Color Scheme**:
   - Primary: `hsl(52, 100%, 50%)` (gold)
   - Background: `rgba(0, 0, 0, 0.8)` (semi-transparent black)
   - Borders: 3px solid gold
   - Text: White

2. **Typography**:
   - Headings: Cinzel serif font
   - Body: Inherited with proper line-height (1.8)
   - Titles: Large, responsive sizing

3. **Buttons**:
   - Brown gradients
   - Gold borders (2-3px)
   - Hover: Lighter brown, lift effect
   - Transition: 0.3s ease

4. **Layout**:
   - Content wrappers with padding and borders
   - Scrollable areas (max-height: 70vh)
   - Back buttons centered at bottom
   - Responsive breakpoints at 768px and 1024px

5. **Responsiveness**:
   - Viewport-based sizing (vh, vw units)
   - Mobile-first approach
   - Adjusted padding and font sizes for small screens

---

## Route Structure

```
/v2/             → Home Page (index.vue)
/v2/build        → Build Page (build.vue)
/v2/help         → Help Page (help.vue)
/v2/about        → About Page (about.vue)
/v2/events       → Events Page (events.vue)
/v2/updates      → Updates Page (updates.vue)
```

---

## Future Enhancements

### Build Page
- Implement TechTree component (interactive tree editor)
- Implement FlagBuilder component (visual flag creator)
- Add bonus selection with card interface
- Connect to backend API for mod generation

### Draft Pages
- Create draft host page
- Create draft player page
- Implement Socket.io real-time updates
- Add draft card selection interface

### Events Page
- Add event listing functionality
- Tournament brackets
- Event registration
- Calendar integration

---

## Technical Notes

- All pages use Vue 3 Composition API with `<script setup>`
- TypeScript for type safety
- Scoped styles to avoid CSS conflicts
- NuxtLink for client-side navigation
- Responsive design with media queries
- Accessibility considerations (alt text, ARIA labels where needed)

---

**Last Updated**: November 24, 2025
**Version**: Initial implementation (Phase 1)
