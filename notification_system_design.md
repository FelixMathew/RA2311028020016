# Notification System Design

## 1. Overview
This project implements a frontend application that displays user data and integrates a reusable logging middleware to send structured logs to a remote logging API.

## 2. Architecture
- Frontend: React (Vite)
- Logging Middleware: Reusable JS module
- External APIs:
  - User Data: https://jsonplaceholder.typicode.com/users
  - Logging API: http://20.207.122.201/evaluation-service/logs

## 3. Components
- App Component:
  - Fetches user data
  - Handles loading, error, and search states
  - Displays users in a responsive grid

- Logging Middleware:
  - Function: Log(stack, level, package, message)
  - Sends POST request with structured log data
  - Used across app lifecycle and user interactions

## 4. Data Flow
1. App loads → fetchUsers()
2. API returns user list
3. State updated → UI renders cards
4. User searches → filteredUsers computed
5. Logging middleware logs:
   - App start
   - Fetch success/failure
   - Search activity

## 5. Logging Strategy
- Stack: "frontend"
- Levels: debug, info, error
- Packages: component
- Messages describe actions and errors clearly
- Logs are sent with Bearer token authentication

## 6. UI/UX
- Dark theme dashboard
- Responsive grid layout
- Search functionality
- Loading spinner
- Error and empty states
- Avatar initials for users

## 7. Scalability
- Modular logging middleware allows reuse
- UI components can be extended for pagination, sorting
- API abstraction allows backend replacement

## 8. Conclusion
The system demonstrates clean architecture, reusable middleware, and production-style UI with proper logging integration.