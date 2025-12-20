# Super Link - Copilot Instructions

## Project Overview
**Super Link** is a browser-based link manager that stores bookmarks in the browser's `localStorage`. The app is a single-page application (SPA) with Thai localization, designed for quick link management with drag-and-drop, search, and bulk operations.

## Architecture & Data Flow

### Storage Strategy
**Offline-Only (Permanent)**: All links stored in browser `localStorage` as JSON array under key `linkManager_links`. No server dependencies.

**Key Flow**: User edits → saved to `localStorage` → `handleSearch()` re-renders UI

### Component Boundaries
- **Frontend** (`index.html`): Single ~1300-line HTML file combining CSS + JS, centered on `LinkManager` class
- **Data**: `localStorage['linkManager_links']` - persists in browser

## Critical Implementation Patterns

### URL Validation & Normalization
- Always prepend `https://` to URLs missing protocol
- Extract domain from URL for favicon: `https://www.google.com/s2/favicons?domain={hostname}&sz=16`
- Validate with `URL()` constructor; only allow `http:` or `https:` protocols
- **Safety check** in `findUnsafeOrLongLinks()`: flags `javascript:`, `data:`, `file:` protocols; non-HTTPS URLs; Punycode domains (xn--); URLs > 300 chars

### Timestamp-Based Link IDs
- IDs are millisecond timestamps: `Date.now()` or `Date.now() + Math.random()` for batch imports
- Numeric, not UUID; allows human-readable sequential ordering by age

### Rendering & State Sync
- `renderLinks()` uses `this.filteredLinks` (search results) not `this.links` (full list)
- After any mutation (add/delete/import/reorder), call `saveLinks()` → `handleSearch()` to re-render
- Selection state (`this.selectedIds` Set) persists during search but clears when toggling select mode

### Drag-and-Drop System (Two Modes)
1. **File Upload**: Detect URL in `text/plain` or `text/html` dataTransfer → call `addLink()`
2. **Card Reordering**: Within grid, swap positions in `this.links` array based on drop target position

## Developer Workflows

### Adding Features
1. **New property on links**: Add to `addLink()` method and extend the link object
2. **New UI control**: Add form input + button → bind event → call handler
3. **Bulk operations**: Add to selection Set, update `updateBulkButtonsState()`, sync UI via `renderLinks()`

### File Import Support
- **HTML**: Parse `<a href>` elements via DOMParser
- **JSON**: Flatten nested bookmark trees from `data.bookmarks` or `data.children` recursively
- Duplicates detected by exact URL match; import adds only new URLs

## Project-Specific Conventions

### Localization (Thai)
- UI strings are hardcoded in Thai (ไทย) throughout HTML
- Button labels use emoji + Thai text: `➕ เพิ่มลิงค์` (add link), `🗑️ ลบ` (delete)
- Notification messages also in Thai

### Bulk Delete & Filters
- Bulk delete operates on `selectedIds` Set, NOT `filteredLinks`
- When deleting, filter by IDs across full `this.links` to avoid search-state bugs
- "Select All" button only enables in select mode with visible results

### Error Handling
- Validation errors show red notification (type: `'error'`)
- localStorage failures gracefully degrade (catch block returns empty array)
- Malformed imports skip invalid items; success message shows count of **added** items

### CSS Grid Layout
- Desktop (>1200px): 8-column grid
- Tablet (768-1200px): 5-column grid  
- Mobile (<480px): 3-column grid
- Cards auto-scale; gaps reduce on mobile

## External Dependencies & Integration
- **Favicon API**: Google's `s2/favicons` service (CORS-safe)
- **Storage**: `localStorage` API (browser-native, no library required)
- **File API**: FileReader for bookmark import
- **No server dependencies**: App works 100% offline

## Key Files & Patterns to Reference
- **Full app logic**: `index.html` lines 700-1300 (LinkManager class)
- **URL validation**: `isValidUrl()` method
- **Duplicate detection**: `handleRemoveDuplicates()` (normalizes URLs to lowercase, removes trailing `/`)
- **Safety filter**: `findUnsafeOrLongLinks()` (returns counts and flagged items)
