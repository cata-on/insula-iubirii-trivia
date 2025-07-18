# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.1] - 2025-07-19

### Added

- **Product Documentation** - Clean README with current-state information
- **Comprehensive Changelog** - Follows Keep a Changelog format
- **Documentation Separation** - Product docs vs changelog distinction

### Changed

- **Documentation Structure** - Removed changelog details from product docs
- **Version Bump** - Updated to 0.2.1 for documentation improvements

### Technical

- **Clean Product Docs** - Focus on "what it is and how to use it"
- **Detailed Changelog** - Tracks "what changed and when"
- **Best Practices** - Follows conventional documentation standards

## [Unreleased]

## [0.2.0] - 2025-07-19

### Added

- **Swipeable Card Interface** - Full-screen Tinder-like swipe interface
- **Custom Swipe Gesture Hook** - Touch and mouse gesture detection
- **Visual Feedback System** - Color-coded borders and shadows during swipes
- **Keyboard Navigation** - Arrow keys and escape key support
- **Mobile Optimization** - iOS scrolling support and gesture conflict resolution
- **Fluid Layout System** - Flexbox-based responsive design
- **Consistent Image Sizing** - Fixed 300px height with object-fit cover
- **Viewport Constraints** - 85vh max height with content scrolling
- **Accessibility Features** - ARIA labels, screen reader support, focus management

### Changed

- **Replaced Modal System** - Swipeable cards now replace traditional modals
- **Updated Navigation** - Bottom navigation with Next.js Link components
- **Enhanced State Management** - Added swipe state to AppContext
- **Improved Mobile Experience** - Touch-friendly interactions and scrolling

### Fixed

- **Mobile Scrolling Conflict** - Resolved touch event interference with scrolling
- **Overlay Click Issues** - Fixed close button functionality with enabled flag
- **Content Overflow** - Implemented proper scrolling for long bios
- **Image Aspect Ratios** - Consistent sizing across all participants
- **Modal Height Overflow** - Capped height to prevent viewport overflow
- **Event Listener Cleanup** - Proper cleanup in useEffect hooks

### Technical

- **TypeScript Types** - Added comprehensive swipe-related type definitions
- **Performance Optimizations** - RequestAnimationFrame for smooth animations
- **Code Cleanup** - Removed unused imports and variables
- **Error Handling** - Graceful fallbacks for image loading failures

## [0.1.0] - 2025-07-19

### Added

- **Initial Application Setup** - Next.js 15 with React 19
- **Participant Data Structure** - JSON files for all participant categories
- **Basic Grid Layout** - Responsive card grid for participant display
- **Modal System** - Traditional modal for participant details
- **Navigation System** - Bottom navigation between categories
- **TypeScript Integration** - Full type safety throughout the application
- **Responsive Design** - Mobile-first approach with CSS Grid
- **Image Support** - Participant photos with fallback placeholders
- **SEO Optimization** - Next.js metadata and dynamic routes

### Technical

- **Project Structure** - Organized component architecture
- **State Management** - React Context API for global state
- **Data Loading** - Utility functions for participant data
- **Styling System** - CSS with modern design principles
- **Build Configuration** - Next.js with TypeScript and ESLint

---

## Release Notes

### Version 0.2.0

This major release introduces the core swipe functionality, transforming the application from a static participant viewer into an interactive, Tinder-like experience. The swipe interface provides a modern, engaging way to browse participant information with smooth animations and intuitive gestures.

**Key Highlights:**

- Complete UI transformation with swipeable cards
- Mobile-optimized touch interactions
- Accessibility compliance with keyboard navigation
- Performance optimizations for smooth 60fps animations

### Version 0.1.0

Initial release establishing the foundation for the Insula Iubirii Trivia application. This version provides the basic structure and participant data display functionality.

**Key Highlights:**

- Complete participant database with 25 participants across 3 categories
- Responsive design working on all devices
- Modern React/Next.js architecture
- TypeScript integration for type safety
