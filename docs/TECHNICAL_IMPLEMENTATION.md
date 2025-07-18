# Technical Implementation Guide: Swipe Feature

## Component Architecture

### 1. SwipeableCard Component

```typescript
interface SwipeableCardProps {
  participant: Participant;
  onSwipe: (action: SwipeAction) => void;
  onClose: () => void;
  swipeStats?: SwipeStats;
}

type SwipeAction = "like" | "dislike" | "super_like" | "skip";

interface SwipeStats {
  likes: number;
  dislikes: number;
  superLikes: number;
  skips: number;
  userSwipe?: SwipeAction;
}
```

### 2. Swipe Gesture Handler

```typescript
interface SwipeGestureConfig {
  threshold: number; // Minimum distance for swipe
  velocity: number; // Minimum velocity for swipe
  direction: "horizontal" | "vertical" | "both";
}

interface SwipeGestureState {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  isDragging: boolean;
  direction: "left" | "right" | "up" | "down" | null;
}
```

### 3. API Response Types

```typescript
interface SwipeResponse {
  success: boolean;
  participantId: string;
  action: SwipeAction;
  updatedStats: SwipeStats;
  timestamp: string;
}

interface SwipeStatsResponse {
  participantId: string;
  stats: SwipeStats;
  totalSwipes: number;
  userSwipe?: SwipeAction;
}
```

## Implementation Steps

### Step 1: Create SwipeableCard Component

1. **File**: `src/components/SwipeableCard.tsx`
2. **Features**:
   - Full-screen overlay
   - Touch/mouse gesture handling
   - Visual feedback animations
   - Action buttons for accessibility

### Step 2: Implement Swipe Gesture Detection

1. **File**: `src/hooks/useSwipeGesture.ts`
2. **Features**:
   - Touch event handling
   - Mouse drag support
   - Velocity calculation
   - Direction detection

### Step 3: Create API Routes

1. **File**: `src/app/api/swipes/route.ts`
2. **File**: `src/app/api/swipes/[participantId]/route.ts`
3. **Features**:
   - POST for storing swipes
   - GET for retrieving statistics
   - Session management
   - Data validation

### Step 4: Update Participant Cards

1. **File**: `src/components/ParticipantCard.tsx`
2. **Features**:
   - Display swipe statistics
   - Visual indicators
   - Real-time updates

## Development Guidelines

### Code Organization

```
src/
├── components/
│   ├── SwipeableCard.tsx
│   ├── SwipeGestureHandler.tsx
│   └── SwipeStats.tsx
├── hooks/
│   ├── useSwipeGesture.ts
│   └── useSwipeStats.ts
├── types/
│   └── swipe.ts
├── utils/
│   ├── swipeHelpers.ts
│   └── gestureDetection.ts
└── app/
    └── api/
        └── swipes/
            ├── route.ts
            └── [participantId]/
                └── route.ts
```

### Performance Considerations

- Use `useCallback` for swipe handlers
- Implement debouncing for API calls
- Use `React.memo` for card components
- Optimize gesture detection with `requestAnimationFrame`

### Accessibility Features

- Keyboard navigation support
- Screen reader announcements
- High contrast mode support
- Reduced motion preferences

### Testing Strategy

- Unit tests for gesture detection
- Integration tests for API endpoints
- E2E tests for swipe flow
- Performance testing for animations

## Database Design

### Swipe Table Schema

```sql
CREATE TABLE swipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id VARCHAR(255) NOT NULL,
  user_session_id VARCHAR(255) NOT NULL,
  action VARCHAR(20) NOT NULL CHECK (action IN ('like', 'dislike', 'super_like', 'skip')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT unique_user_participant UNIQUE (user_session_id, participant_id)
);

-- Indexes for performance
CREATE INDEX idx_swipes_participant_id ON swipes(participant_id);
CREATE INDEX idx_swipes_user_session ON swipes(user_session_id);
CREATE INDEX idx_swipes_action ON swipes(action);
CREATE INDEX idx_swipes_created_at ON swipes(created_at);
```

### Statistics View

```sql
CREATE VIEW participant_swipe_stats AS
SELECT
  participant_id,
  COUNT(*) FILTER (WHERE action = 'like') as likes,
  COUNT(*) FILTER (WHERE action = 'dislike') as dislikes,
  COUNT(*) FILTER (WHERE action = 'super_like') as super_likes,
  COUNT(*) FILTER (WHERE action = 'skip') as skips,
  COUNT(*) as total_swipes
FROM swipes
GROUP BY participant_id;
```

## API Endpoints

### POST /api/swipes

**Purpose**: Store a new swipe action

```typescript
// Request
{
  participantId: string;
  action: 'like' | 'dislike' | 'super_like' | 'skip';
  userSessionId?: string;
}

// Response
{
  success: boolean;
  participantId: string;
  action: string;
  updatedStats: SwipeStats;
  timestamp: string;
}
```

### GET /api/swipes/[participantId]

**Purpose**: Get swipe statistics for a participant

```typescript
// Response
{
  participantId: string;
  stats: {
    likes: number;
    dislikes: number;
    superLikes: number;
    skips: number;
  };
  totalSwipes: number;
  userSwipe?: string;
}
```

### GET /api/swipes/user/history

**Purpose**: Get user's swipe history

```typescript
// Query Parameters
{
  page?: number;
  limit?: number;
  action?: string;
}

// Response
{
  swipes: Array<{
    participantId: string;
    action: string;
    timestamp: string;
    participant: Participant;
  }>;
  total: number;
  page: number;
  hasMore: boolean;
}
```

## Error Handling

### Client-Side Errors

- Network connectivity issues
- Invalid swipe gestures
- Animation failures
- State synchronization errors

### Server-Side Errors

- Database connection failures
- Invalid participant IDs
- Rate limiting
- Session management errors

### Error Recovery

- Retry mechanisms for API calls
- Fallback to modal view if swipe fails
- Graceful degradation for animations
- User-friendly error messages
