# Login Execution Flow in STREAMAPP Frontend

## Overview

This document explains the detailed execution flow of the login process in the STREAMAPP frontend, highlighting the code executed on both the client and server sides.

---

## Client-Side Execution

1. **LoginForm Component (`auth/components/LoginForm.js`)**  
   - User inputs their identifier (email or username) and password.  
   - On form submission, the `handleSubmit` function calls the `login` function from `authService`.  
   - If login is successful, it sets `isLoggedIn` in `localStorage` and redirects the user to the home page.  
   - If login fails, an error message is displayed.

2. **AuthService (`_lib/auth/authService.js`)**  
   - The `login` function sends a POST request to `/api/auth/login` with the user credentials in the request body.  
   - The request includes credentials (`credentials: 'include'`) to handle cookies for session management.  
   - The response is parsed as JSON. If the response is not OK, an error is thrown.

3. **AuthContext (`context/AuthContext.js`)**  
   - Manages authentication state (`isLoggedIn`, `user`, `loading`).  
   - On app load, it calls `checkAuthStatus` to verify if the user is authenticated and updates state accordingly.

---

## Server-Side Execution

1. **Login API Route (`api/auth/login/route.js`)**  
   - Receives the POST request with user credentials.  
   - Validates the credentials against the backend user database.  
   - If valid, generates access and refresh tokens, sets cookies, and returns a success response.  
   - If invalid, returns an error response.

2. **Token Management**  
   - Access tokens are used for authenticating subsequent API requests.  
   - Refresh tokens are used to obtain new access tokens when the current one expires.

---

## Summary

The login process starts with the user submitting credentials via the LoginForm component. The frontend calls the login API through authService, which communicates with the backend to authenticate the user. Upon successful login, authentication state is updated, and the user is redirected. The system uses cookies to manage session tokens securely.

This flow ensures a seamless and secure login experience for users of STREAMAPP.
