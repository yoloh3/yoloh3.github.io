# Love Road Story - Interactive Journey Demo 🏍️💖
# -
# Love Road Story - Interactive Journey Demo 🏍️💖

**A modern web experience showcasing romantic journey storytelling with React, TypeScript, and Vite. Built as a Vibe-coding course project.**

---

## 🎯 Overview

This is a **demo version** of an interactive love journey web application. It simulates a motorcycle trip through a hilly terrain, passing by milestones that represent key moments in a relationship.

All personal information has been removed and replaced with generic placeholder content to showcase the technical implementation and features.

**Demo:** [Live Site](https://yoloh3.com/sites/demo_valentine/index/dist)  
**Password:** `9999`

---

## 🛠️ Development Journey (Vibe-coding Workflow)

This project was built in **2 days** using a "Vibe-coding" workflow, leveraging multiple AI tools to accelerate development.

### Phase 1: Brainstorming & Ideation 💡
- **Tool:** Claude 4.6 (Opus)
- **Process:** Chatting with Claude to find a concept that fits a "gentle, romantic" vibe.
- **Input:** "Want to build a web gift for girlfriend, capturing timeline milestones, 2 people on a bike animation." + **PRD template by Nguyen Nhat Quang**.
- **Output:** Concept of a physics-based motorcycle ride on SVG terrain.

### Phase 2: Rapid Prototyping ⚡
- **Tool:** Google AI Studio
- **Process:** Generated the initial frontend boilerplate from the PRD.
- **Tech Stack:** React + Vite + Tailwind CSS.
- **Result:** Functional bike animation and basic timeline created in minutes.

### Phase 3: Optimization & Refactoring (Homework #3) 🔧
- **Tool:** **Antigravity** (IDE Agent) + **AWF Skills**
- **Process:**
    - Downloaded codebase from Google AI Studio.
    - Used **AWF (Antigravity Workflow Framework)** skills like `/brainstorm` to understand and refine the code, used `/debug` to fix issues and interactions...
    - Refactored components, separated data (`constants.ts`), and polished interactions.
    - **Models:** Gemini Flash for git ops, Claude Sonnet for coding, Claude Opus for planning.

### Phase 4: Security Check (Homework #2) 🔒
- **Process:** Implemented a **Password Gate** to protect privacy.
- **Audit:** Reviewed code to ensure no hardcoded sensitive data before public deployment.

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
- Simple password gate (`9999`)
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
- **Password:** `9999`

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

---

## Credits

- **Author:** H3 (fb.com/yoloh3) - Contact me if you want to use this demo for real deployment.
- **Course:** The1light Vibe-coding
- **PRD Template:** Nguyen Nhat Quang
- **Tools:** Claude, Google AI Studio, Antigravity, AWF.
- **Tech Stack:** React, Tailwind, Canvas-confetti.

---

**Demo Password:** `9999`

**Enjoy the journey! 🏍️💝**
