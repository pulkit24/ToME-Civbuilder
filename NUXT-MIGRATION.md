# Vue3/Nuxt4 Frontend Migration Guide

This document describes the new Vue3/Nuxt4 frontend implementation and how it coexists with the legacy frontend.

## Overview

The AoE2 Civbuilder now includes two frontends:

1. **Legacy Frontend** (original): Vanilla JavaScript + HTML
   - Routes: `/`, `/build`, `/draft/*` (or with `/civbuilder` prefix)
   - Location: `./public/`
   - Fully functional with all features

2. **New Vue3 Frontend**: Vue 3 + Nuxt 4 + TypeScript
   - Routes: `/v2/*`
   - Location: `./nuxt-app/`
   - In active development - some features not yet implemented

## Architecture

### Why Two Frontends?

The dual-frontend approach allows:
- ✅ No downtime during migration
- ✅ Easy rollback if issues arise
- ✅ Gradual feature migration and testing
- ✅ Side-by-side comparison during development

### Integration Strategy

Both frontends are served by the same Express server (`server.js`):

```
Express Server (port 4000)
├── Legacy Routes (/, /build, /draft/*)
│   └── Serves static files from ./public/
└── New Routes (/v2/*)
    └── Serves Nuxt build from ./.output-nuxt/
```

The integration is handled by `nuxt-integration.js` which:
1. Checks if Nuxt build exists
2. Serves static assets (JS, CSS, images)
3. Routes all `/v2/*` requests to the Nuxt SPA

## Development Workflow

### For Legacy Frontend Development
No changes needed - continue working in `./public/` as before.

### For New Frontend Development

1. **Start Nuxt dev server**:
   ```bash
   npm run dev:nuxt
   # or
   cd nuxt-app && npm run dev
   ```
   Opens at http://localhost:3000/v2

2. **Make changes** in `./nuxt-app/app/`:
   - Pages: `./pages/`
   - Components: `./components/`
   - Layouts: `./layouts/`
   - Stores: `./stores/`

3. **Test integration** with main server:
   ```bash
   npm run build:nuxt
   npm start
   ```
   Open http://localhost:4000/v2

## Feature Parity Checklist

### Home Page (/)
- [x] Navigation bar
- [x] Main action buttons
- [ ] Help modal
- [ ] About modal
- [ ] Events section
- [ ] Updates section

### Build Page (/build)
- [x] Basic page structure
- [ ] Tech tree editor component
- [ ] Flag builder component
- [ ] Civilization name input
- [ ] Architecture selector
- [ ] Language selector
- [ ] Bonus selection (5 categories)
- [ ] Unique unit picker
- [ ] Castle tech picker
- [ ] Imperial tech picker
- [ ] Team bonus picker
- [ ] Mod generation API integration
- [ ] Download functionality

### Draft Pages (/draft/*)
- [ ] Create draft form
- [ ] Join draft flow
- [ ] Draft lobby
- [ ] Card selection interface
- [ ] Socket.io real-time updates
- [ ] Tech tree building phase
- [ ] Mod download

### Combine Page
- [ ] Load existing civs
- [ ] Select multiple civs
- [ ] Generate combined mod

## Component Architecture

### Shared Components to Implement

1. **TechTree Component**
   - Used in: Build page, Draft page
   - Features: Interactive tech tree editing, point tracking
   - Based on: `./public/aoe2techtree/`

2. **FlagBuilder Component**
   - Used in: Build page, Draft page
   - Features: Color palette, division, overlay, symbol selection
   - Based on: `./public/js/builder.js` flag functions

3. **CivBonusSelector Component**
   - Used in: Build page, Draft page
   - Features: Browse and select bonuses by category and rarity
   - Based on: `./public/js/common.js` card_descriptions

4. **ModDownload Component**
   - Used in: Build page, Draft result
   - Features: Generate and download mod

## API Integration

The new frontend uses the same API endpoints as the legacy frontend:

### POST /random
Generate random civilizations mod
```javascript
const response = await fetch('/random', {
  method: 'POST',
  body: formData
})
```

### POST /create
Create custom civilization mod
```javascript
const response = await fetch('/create', {
  method: 'POST',
  body: formData
})
```

### POST /draft
Create new draft
```javascript
const response = await fetch('/draft', {
  method: 'POST',
  body: formData
})
```

### WebSocket (Socket.io)
For real-time draft functionality:
```javascript
import io from 'socket.io-client'
const socket = io()
socket.emit('join room', draftId)
socket.on('set gamestate', (draft) => {
  // Update state
})
```

## State Management

Using Pinia for state management:

```
stores/
├── civ.ts        # Civilization builder state
├── draft.ts      # Draft state
├── techtree.ts   # Tech tree state
└── user.ts       # User preferences
```

## Styling

- Global styles: `./nuxt-app/app/app.vue`
- Scoped component styles: In each `.vue` file
- Theme: Dark theme matching original design
- Colors:
  - Primary: `#8b4513` (brown)
  - Accent: `#d4af37` (gold)
  - Background: `#1a1a1a` (dark gray)
  - Text: `#ffffff` (white)

## Testing

### Current Tests
All existing tests in `__tests__/` continue to work and test the backend/legacy frontend.

### Future Tests (To Add)
- Vue component tests with Vitest
- E2E tests with Playwright
- Visual regression tests

## Deployment

### Local Development
```bash
# Build Nuxt
npm run build:nuxt

# Start server
npm start

# Both frontends available:
# - Legacy: http://localhost:4000/
# - New: http://localhost:4000/v2/
```

### Docker
```bash
docker build -f Dockerfile.prebuilt-cpp -t aoe2-civbuilder .
docker run -p 4000:4000 aoe2-civbuilder

# Both frontends included in image
```

### Production
The Docker image automatically builds the Nuxt app during image creation.

## Migration Timeline

### Phase 1: Foundation ✅ (Current)
- Nuxt setup and configuration
- Basic pages and layout
- Server integration
- Docker support

### Phase 2: Core Components (Next)
- TechTree component
- FlagBuilder component
- CivBonusSelector component

### Phase 3: Feature Implementation
- Complete build page
- Draft pages
- Combine page
- Socket.io integration

### Phase 4: Polish & Testing
- Component tests
- E2E tests
- Performance optimization
- Accessibility improvements

### Phase 5: Deprecation (Future)
- Feature parity verified
- User testing completed
- Redirect legacy routes to new frontend
- Eventually remove legacy code

## Troubleshooting

### Nuxt build not found
```bash
cd nuxt-app && npm install && npm run build
```

### Port conflicts
- Nuxt dev: port 3000
- Express server: port 4000
- Can run both simultaneously

### Build errors
Check Node.js version: `node --version` (requires 20+)

### Static assets not loading
Ensure images copied to `./nuxt-app/public/img/`:
```bash
cp -r public/img nuxt-app/public/
```

## Contributing

When adding features to the new frontend:

1. Check if legacy implementation exists
2. Review data structures in `./public/js/common.js`
3. Implement Vue3 version in `./nuxt-app/`
4. Test both frontends work independently
5. Document any API changes

## Resources

- [Vue 3 Docs](https://vuejs.org/)
- [Nuxt 4 Docs](https://nuxt.com/)
- [Pinia Docs](https://pinia.vuejs.org/)
- [Socket.io Client](https://socket.io/docs/v4/client-api/)

## Questions?

Check the main README.md and nuxt-app/README.md for more details.
