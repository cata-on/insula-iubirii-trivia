# Insula Iubirii Trivia

A modern web application for "Insula Iubirii" show participants featuring a Tinder-like swipe interface for viewing participant information.

**Current Version:** 0.2.1

---

## 🚀 **Features**

### **Swipe Interface**

- **Tinder-like swipe gestures** - Swipe left/right to like/dislike participants
- **Visual feedback** - Color-coded borders and shadows during swipes
- **Keyboard navigation** - Arrow keys and escape for accessibility
- **Touch and mouse support** - Works on all devices

### **Participant Information**

- **Detailed profiles** - Name, age, location, occupation, bio
- **High-quality images** - Consistent aspect ratios across all participants
- **Three categories** - Female temptations, male temptations, couples
- **Responsive design** - Optimized for mobile, tablet, and desktop

### **User Experience**

- **Mobile-first design** - Touch-friendly interactions
- **Smooth animations** - 60fps performance with cubic-bezier easing
- **Accessibility compliant** - Screen reader support and keyboard navigation
- **Cross-platform** - Works on iOS, Android, and desktop browsers

---

## 🏗️ **Technical Architecture**

### **Tech Stack**

- **React 19** - Latest React with concurrent features
- **Next.js 15** - App Router with SSR support
- **TypeScript** - Full type safety throughout
- **CSS Modules** - Scoped styling without external dependencies

### **Key Components**

- `SwipeableCard` - Main swipe interface component
- `useSwipeGesture` - Custom hook for gesture detection
- `AppContext` - Global state management
- `ParticipantCard` - Grid display cards

### **Data Structure**

```typescript
interface Participant {
  id: string;
  name: string;
  age: number | null;
  birthplace: string | null;
  currentLocation: string | null;
  otherLocations: string[];
  bio: string;
  occupation: string;
  role: ParticipantCategory;
  picture: string;
}
```

---

## 📱 **How to Use**

### **Desktop**

1. **Browse participants** - Use bottom navigation to switch categories
2. **View details** - Click any participant card to open swipe interface
3. **Swipe or navigate** - Use mouse drag, arrow keys, or click overlay to close
4. **Keyboard shortcuts** - Arrow keys for navigation, Escape to close

### **Mobile**

1. **Touch navigation** - Tap cards to open, swipe to interact
2. **Gesture support** - Natural touch gestures with visual feedback
3. **Scroll content** - Long bios are scrollable within the card
4. **Close easily** - Tap outside the card or use back gesture

---

## 🎨 **Design System**

### **Colors**

- **Primary:** #667eea (Purple Blue)
- **Secondary:** #764ba2 (Deep Purple)
- **Success:** #10b981 (Green for likes)
- **Error:** #ef4444 (Red for dislikes)
- **Background:** Linear gradient (135deg, #667eea 0%, #764ba2 100%)

### **Typography**

- **Font:** -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto"
- **Card Title:** 2rem, font-weight: 700
- **Bio Text:** 1.125rem, line-height: 1.6
- **Stats:** 0.875rem, font-weight: 600

### **Layout**

- **Card Padding:** 24px
- **Grid Gap:** 16px
- **Border Radius:** 20px (cards), 12px (elements)
- **Shadow:** 0 20px 60px rgba(0, 0, 0, 0.3)

---

## 📊 **Participant Categories**

### **Ispite Femei** (Female Temptations)

- **9 participants** including models, instructors, and entrepreneurs
- **Age range:** 25-36 years
- **Locations:** Romania, Moldova, Canada, UK

### **Ispite Bărbați** (Male Temptations)

- **6 participants** including entrepreneurs and professionals
- **Age range:** Various ages
- **Locations:** Romania and international

### **Cupluri** (Couples)

- **10 participants** (5 couples) including models and professionals
- **Age range:** Various ages
- **Locations:** Romania and international

---

## 🔧 **Development**

### **Getting Started**

```bash
npm install
npm run dev
```

### **Available Scripts**

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### **Project Structure**

```
src/
├── app/                 # Next.js App Router pages
├── components/          # React components
├── context/            # Global state management
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── data/               # Static participant data
```

---

## 🚧 **Current Limitations**

- **No backend integration** - Swipes are logged to console only
- **No data persistence** - Statistics reset on page refresh
- **No user sessions** - Anonymous usage only
- **No analytics** - No tracking of user behavior

---

## 📈 **Performance**

- **Zero console errors** in production
- **Zero linter warnings**
- **100% TypeScript coverage**
- **Mobile-first responsive design**
- **Accessibility compliance**
- **60fps animations**

---

## 🔮 **Future Roadmap**

### **Phase 2: Backend Integration**

- API endpoints for swipe storage
- Database schema for participant statistics
- User session management
- Real-time data updates

### **Phase 3: Enhanced Features**

- Swipe history and analytics
- Advanced filtering and search
- Social features and sharing
- Performance optimizations

---

_Documentation last updated: January 2025_
