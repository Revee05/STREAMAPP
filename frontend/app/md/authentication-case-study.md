# Authentication Process Case Study for STREAMAPP Frontend

## Overview

This case study explains the authentication process implemented in the STREAMAPP frontend located in the `frontend/app/` directory. The authentication system includes user login, registration, token-based session management with refresh tokens, and logout functionality. The frontend interacts with backend API endpoints to perform these actions and manages authentication state using React Context.

---

## Key Files and Their Roles

- **`_lib/auth/authService.js`**  
  Contains async functions to call backend API endpoints for login, registration, and logout. Uses `fetch` with credentials included to handle cookies and tokens.

- **`_lib/auth/contextService.js`**  
  Provides a function to check the current authentication status by calling `/api/auth/status`. Implements token refresh logic by calling `/api/auth/refresh` if the access token is expired.

- **`context/AuthContext.js`**  
  React Context provider that manages authentication state (`user`, `isLoggedIn`, `loading`). On mount, it calls `checkAuthStatus` to verify if the user is authenticated and updates state accordingly. It also syncs login status with `localStorage`.

- **`auth/components/LoginForm.js`**  
  Login form component that collects user credentials and calls `login` from `authService`. On successful login, it sets login status in `localStorage` and redirects to the home page.

- **`auth/components/RegisterForm.js`**  
  Registration form component that collects user details, validates password strength and matching, and calls `register` from `authService`. On success, it switches to the login form.

- **`components/AuthWrapper.js`**  
  Wrapper component that shows a loading spinner while authentication status is being checked, preventing premature rendering of protected content.

- **`components/Header/Header.js` and `components/Header/ProfileDropdown.js`**  
  Header components that use the authentication context to display user profile options and handle logout by calling `logout` from `authService`. Logout clears login state and redirects to home.

---

## Authentication Flow

1. **Login**  
   - User submits credentials via `LoginForm`.  
   - `authService.login` sends a POST request to `/api/auth/login`.  
   - On success, login status is saved in `localStorage` and user is redirected.

2. **Registration**  
   - User submits registration details via `RegisterForm`.  
   - `authService.register` sends a POST request to `/api/auth/register`.  
   - On success, user is prompted to login.

3. **Session Management**  
   - On app load, `AuthContext` calls `checkAuthStatus` to verify authentication.  
   - If access token expired, `contextService` attempts token refresh via `/api/auth/refresh`.  
   - Auth state (`user`, `isLoggedIn`) is updated accordingly.

4. **Logout**  
   - User triggers logout via UI in `ProfileDropdown`.  
   - `authService.logout` sends a POST request to `/api/auth/logout`.  
   - Auth state and `localStorage` are cleared, and user is redirected.

---

## Summary

The frontend authentication system uses React Context to manage auth state and provides a seamless user experience with token refresh and persistent login status. API calls are centralized in `authService`, and UI components interact with this service and context to implement login, registration, and logout flows.

This modular and robust design ensures secure and user-friendly authentication for STREAMAPP.
