# AoE2 Civbuilder - Vue3/Nuxt4 Frontend

This directory contains the new Vue3/Nuxt4 implementation of the AoE2 Civbuilder frontend.

## Overview

The new frontend is built with:
- **Vue 3** - Modern reactive framework
- **Nuxt 4** - Server-side rendering and static generation
- **Pinia** - State management
- **TypeScript** - Type safety

## Architecture

The application follows a component-based architecture:

```
app/
├── pages/           # Route pages (index.vue, build.vue, etc.)
├── components/      # Reusable Vue components
├── layouts/         # Page layouts (default.vue)
├── composables/     # Vue composables for shared logic
├── stores/          # Pinia stores for state management
└── assets/          # Static assets (CSS, images)
```

## Development

### Prerequisites
- Node.js 20+
- npm

### Setup
```bash
npm install
```

### Development Server
```bash
npm run dev
```
The dev server will start at http://localhost:3000/v2

### Build for Production
```bash
npm run build
```

This creates a production build in `../.output-nuxt/` directory which is served by the main Express server.

## Integration with Express

The Nuxt app is integrated with the existing Express server via `nuxt-integration.js` in the root directory. The new frontend is served at the `/v2` route prefix, allowing both old and new frontends to coexist.

### Routes
- `/v2/` - New Vue3 home page
- `/v2/build` - New Vue3 build page  
- `/v2/draft/*` - Draft pages (to be implemented)

## Features

### Implemented
- ✅ Basic home page with navigation
- ✅ Build page placeholder
- ✅ Responsive layout
- ✅ Integration with Express server

### To be Implemented
- [ ] Tech Tree component
- [ ] Flag Builder component
- [ ] Civilization bonus selection
- [ ] Socket.io integration for drafts
- [ ] API integration for mod generation
- [ ] Draft pages (/draft/host, /draft/player, etc.)
- [ ] Combine civilizations page

## Component Structure

### Shared Components
The following components are used across multiple pages:
- **TechTree** - Technology tree editor (used in /build and /draft)
- **FlagBuilder** - Custom flag creator
- **CivBonusSelector** - Civilization bonus picker
- **NavigationBar** - Main navigation
- **Footer** - Site footer

## Styling

The app uses scoped CSS with Vue single-file components. Global styles are defined in `app.vue`.

## API Integration

The frontend communicates with the Express backend API endpoints:
- `/random` - Generate random civilizations
- `/create` - Create custom civilization mod
- `/draft` - Draft management
- `/download` - Download generated mods

## Socket.io

For real-time draft functionality, the app will use socket.io-client to connect to the server's socket.io instance.

## Testing

Testing infrastructure to be added.

## Deployment

The built Nuxt app is automatically served by the Express server when available. The Docker image includes both frontends.

## Migration from Old Frontend

The old frontend remains at:
- `/` or `/civbuilder/` - Old home page
- `/build` or `/civbuilder/build` - Old build page
- `/draft/*` - Old draft pages

Users can access either version. Once the new version is feature-complete and tested, the old version can be deprecated.

---

For more information about Nuxt, check out the [Nuxt documentation](https://nuxt.com/docs).
