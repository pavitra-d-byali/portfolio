# Portfolio Website - Backend Integration Contracts

## Overview
This document outlines the API contracts and integration plan for Pavitra Byali's portfolio website.

## Current Mock Data (to be replaced)
Located in `/app/frontend/src/data/mock.js`:
- `personalInfo`: Basic personal and contact information
- `technicalSkills`: Categorized technical skills data
- `certifications`: Professional certifications and achievements
- `projects`: Project details with technologies and features
- `socialLinks`: Social media and contact links
- `navigation`: Navigation menu items

## Backend APIs to Implement

### 1. Contact Form Submission
**Endpoint**: `POST /api/contact`
**Purpose**: Handle contact form submissions from portfolio visitors

```javascript
// Request Body
{
  "name": "string",
  "email": "string", 
  "subject": "string",
  "message": "string"
}

// Response
{
  "success": true,
  "message": "Message sent successfully"
}
```

**Integration Points**:
- Frontend: `/app/frontend/src/components/Contact.jsx` - `handleSubmit` function
- Replace mock setTimeout with actual API call
- Show success/error toast notifications

### 2. Portfolio Data API
**Endpoint**: `GET /api/portfolio`
**Purpose**: Serve dynamic portfolio content

```javascript
// Response
{
  "personalInfo": { ... },
  "skills": { ... },
  "projects": [...],
  "certifications": [...],
  "navigation": [...]
}
```

**Integration Points**:
- Replace imports from `mock.js` with API calls
- Update all components to use dynamic data
- Add loading states for better UX

### 3. Resume Download
**Endpoint**: `GET /api/resume/download`
**Purpose**: Serve resume PDF file

**Integration Points**:
- Frontend: `/app/frontend/src/components/Hero.jsx` - `downloadResume` function
- Replace alert with actual file download

### 4. Analytics/Contact Tracking (Optional)
**Endpoint**: `POST /api/analytics/contact-view`
**Purpose**: Track portfolio visits and contact form interactions

## Database Schema

### 1. Contacts Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  subject: String,
  message: String,
  timestamp: Date,
  ipAddress: String (optional),
  userAgent: String (optional)
}
```

### 2. Portfolio Data Collection
```javascript
{
  _id: ObjectId,
  section: String, // 'personal', 'skills', 'projects', etc.
  data: Object,    // Dynamic content
  lastUpdated: Date
}
```

## Frontend Integration Changes Required

### 1. API Service Layer
Create `/app/frontend/src/services/api.js`:
- Centralized API calls
- Error handling
- Loading states management

### 2. Component Updates
- **Contact.jsx**: Replace mock form submission
- **Hero.jsx**: Replace mock resume download
- **All components**: Replace mock data imports with API calls

### 3. State Management
- Add loading states for API calls
- Error handling for failed requests
- Success notifications for user actions

## Environment Variables Needed
- Backend: Already has MONGO_URL configured
- Frontend: REACT_APP_BACKEND_URL already configured

## Implementation Priority
1. **High Priority**: Contact form API (main user interaction)
2. **Medium Priority**: Portfolio data API (dynamic content)
3. **Low Priority**: Resume download, analytics

## Error Handling Strategy
- Frontend: Show user-friendly error messages
- Backend: Log errors for debugging
- Graceful fallbacks to prevent blank screens

## Testing Requirements
- Contact form submission flow
- API response handling
- Error scenarios (network failures, invalid data)
- Resume download functionality

## Security Considerations
- Input validation on contact form
- Rate limiting for contact submissions
- CORS configuration
- Sanitize user inputs to prevent XSS

## Performance Optimizations
- Cache portfolio data (low change frequency)
- Optimize image loading
- Minimize API calls with efficient data fetching