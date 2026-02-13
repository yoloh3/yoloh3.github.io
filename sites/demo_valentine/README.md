# Love Trip - Interactive Journey Demo

**A modern web experience showcasing romantic journey storytelling with React, TypeScript, and Vite.**

---

## 🎯 Overview

This is a **demo version** of an interactive love journey web application. All personal information has been removed and replaced with generic placeholder content to showcase the technical implementation and features.

---

## ✨ Features

### 1. **Interactive Road Trip Journey**
- Horizontal scrolling animation with SVG terrain
- Motorcycle follows terrain curves with physics-based rotation
- Auto-scroll with speed variation at milestones

### 2. **7 Milestone Timeline**
- Photo frames with Polaroid-style design
- Animated milestone cards with emoji and messages
- Content changes based on user progress

### 3. **Background Music System**
- Seamless switching between 2 music tracks
- Music 1 plays initially
- Music 2 plays during and after video
- Play/pause control

### 4. **YouTube Video Integration**
- Modal video player at final milestone
- Auto-play with muted start (browser policy compliance)
- Close button for manual dismissal

### 5. **Confetti Animation**
- 3-second fireworks effect using canvas-confetti
- Triggers after closing video

### 6. **Password Protection**
- Simple password gate (demo: `demo2024`)
- Animated error messages

### 7. **Responsive Design**
- Mobile-friendly layout
- Adaptive YouTube video quality
- Touch-friendly controls

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Access
- **Development:** http://localhost:5173
- **Password:** `demo2024`

---

## 🛠️ Tech Stack

| Category       | Technology      | Version  |
| -------------- | --------------- | -------- |
| **Framework**  | React           | 19.2.4   |
| **Language**   | TypeScript      | 5.8.2    |
| **Build Tool** | Vite            | 6.2.0    |
| **Styling**    | Tailwind CSS    | (inline) |
| **Animation**  | canvas-confetti | 1.9.4    |
| **Deployment** | GitHub Pages    | -        |

---

## 📁 Project Structure

```
index/
├── components/
│   ├── PasswordGate.tsx    # Password protection screen
│   ├── RoadTrip.tsx         # Main journey component
│   ├── Motorcycle.tsx       # Animated motorcycle SVG
│   └── GiftBox.tsx          # Video modal with confetti
├── utils/
│   └── terrainUtils.ts      # SVG terrain generation
├── public/
│   ├── photos/              # Milestone placeholder images
│   └── media/               # Placeholder audio files
├── constants.ts             # Milestones data & config
├── vite.config.ts           # Vite configuration
└── package.json             # Dependencies
```

---

## 🎨 Key Features Explained

### SVG Terrain Generation
- Dynamic Bezier curves for realistic hills
- Bike position calculated based on terrain slope
- Smooth rotation animation

### Music Switching Logic
```typescript
if (isVideoPlaying || videoCompleted) {
  // Play Music 2
} else {
  // Play Music 1
}
```

### Milestone Detection
- Triggers when bike is within 200px of milestone
- Slows down auto-scroll for better viewing
- Animates milestone cards

### YouTube Autoplay
- Uses `mute=1` parameter to bypass browser policy
- Background music continues during video
- User can unmute YouTube manually

---

## 🔧 Configuration

### Milestones
Edit `constants.ts` to customize:
- Dates and titles
- Emoji icons
- Messages (before/after video)
- Photo paths
- Position on road (0-100%)

### Password
Change in `constants.ts`:
```typescript
export const PASSWORD = "your_password";
```

### YouTube Video
Update in `GiftBox.tsx`:
```typescript
src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1&mute=1"
```

---

## 📊 Performance

- **Bundle Size:** ~219 KB (gzipped: ~70 KB)
- **Load Time:** < 2 seconds
- **Mobile Optimized:** Adaptive quality
- **No Large Assets:** Placeholder images only

---

## 🎯 Use Cases

This demo showcases:
- ✅ Modern React development with TypeScript
- ✅ SVG animation and physics simulation
- ✅ Audio/video integration with browser APIs
- ✅ State management with React hooks
- ✅ Responsive design patterns
- ✅ Third-party library integration (canvas-confetti)
- ✅ Build optimization with Vite

---

## 📝 Notes

### Placeholder Content
All personal information has been removed:
- Photos: AI-generated romantic illustrations
- Audio: Empty placeholder files
- Video: Generic YouTube demo video
- Messages: Generic milestone descriptions
- Password: Changed to `demo2024`

### Original Features Preserved
- All technical implementations remain intact
- UI/UX design unchanged
- Animation and interaction logic preserved
- Performance optimizations maintained

---

## 🚀 Deployment

### GitHub Pages
```bash
# Build
npm run build

# Deploy dist/ folder to GitHub Pages
# Configure base path in vite.config.ts
```

### Vite Config
```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})
```

---

## 📄 License

This is a demo project for showcasing technical skills.

---

## 🙏 Credits

**Built with:**
- React + TypeScript + Vite
- Tailwind CSS
- canvas-confetti
- YouTube IFrame API

**Created to demonstrate:**
Modern web development techniques and interactive storytelling.

---

**Demo Password:** `999`

**Enjoy the journey! 🏍️💝**
