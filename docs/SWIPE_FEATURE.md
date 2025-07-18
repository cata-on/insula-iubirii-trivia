# Swipeable Participant Cards Feature

## Overview

Transform the current modal-based participant viewing into an interactive, Tinder-like swipe experience. Users can swipe on participant cards to express their preferences, with results persisted and displayed as dynamic information on participant cards.

## User Stories

### Core Swipe Experience

- **As a user**, I want to swipe right on participants I like, so I can express positive interest
- **As a user**, I want to swipe left on participants I dislike, so I can express negative preference
- **As a user**, I want to swipe up for a "super like", so I can show special interest
- **As a user**, I want to swipe down to skip, so I can remain neutral
- **As a user**, I want to see visual feedback during swipes, so I understand my actions

### Dynamic Information Display

- **As a user**, I want to see how many people liked each participant, so I can gauge popularity
- **As a user**, I want to see how many people disliked each participant, so I can understand reception
- **As a user**, I want to see my own swipe history, so I can review my preferences
- **As a user**, I want to see real-time updates of swipe statistics, so I have current information

### Data Persistence

- **As a user**, I want my swipe preferences to be saved, so I don't lose my data
- **As a user**, I want to access my swipe history across sessions, so I can track my preferences over time

## Technical Requirements

### Frontend Components

1. **SwipeableCard Component**

   - Full-screen card interface
   - Touch/click gesture recognition
   - Smooth animations and transitions
   - Visual feedback indicators

2. **Swipe Gesture Handler**

   - Support for touch and mouse interactions
   - Velocity-based swipe detection
   - Threshold-based action triggers
   - Haptic feedback (mobile)

3. **Swipe Results Display**
   - Statistics overlay on participant cards
   - Real-time counter updates
   - Visual indicators for popular participants

### Backend API Endpoints

1. **POST /api/swipes**

   - Store swipe result
   - Validate participant ID and swipe action
   - Return updated statistics

2. **GET /api/swipes/:participantId**

   - Retrieve swipe statistics for participant
   - Include user's personal swipe if authenticated

3. **GET /api/swipes/user/history**
   - Retrieve user's swipe history
   - Support pagination and filtering

### Database Schema

```sql
-- Swipe results table
CREATE TABLE swipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id VARCHAR(255) NOT NULL,
  user_session_id VARCHAR(255) NOT NULL,
  action ENUM('like', 'dislike', 'super_like', 'skip') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_swipes_participant_id ON swipes(participant_id);
CREATE INDEX idx_swipes_user_session ON swipes(user_session_id);
CREATE INDEX idx_swipes_created_at ON swipes(created_at);
```

## Implementation Phases

### Phase 1: Core Swipe UI (Week 1)

- [ ] Create SwipeableCard component
- [ ] Implement swipe gesture detection
- [ ] Add visual feedback and animations
- [ ] Replace modal with swipe interface
- [ ] Add swipe action buttons for accessibility

### Phase 2: Backend Integration (Week 2)

- [ ] Design and implement API endpoints
- [ ] Set up database schema
- [ ] Add session management
- [ ] Implement data validation
- [ ] Add error handling and logging

### Phase 3: Dynamic Display (Week 3)

- [ ] Update participant cards with swipe statistics
- [ ] Implement real-time updates
- [ ] Add visual indicators for popular participants
- [ ] Create swipe history view
- [ ] Add analytics dashboard

### Phase 4: Polish & Testing (Week 4)

- [ ] Performance optimization
- [ ] Mobile responsiveness testing
- [ ] Accessibility improvements
- [ ] User testing and feedback
- [ ] Bug fixes and refinements

## Success Metrics

- **Engagement**: Average swipes per session
- **Retention**: Return user rate after first swipe
- **Performance**: Swipe response time < 100ms
- **Accessibility**: WCAG 2.1 AA compliance
- **User Satisfaction**: Positive feedback on swipe experience

## Future Enhancements

- Swipe preferences and filters
- Social features (comments, reactions)
- Advanced analytics and insights
- Integration with social media
- Personalized recommendations based on swipe patterns
