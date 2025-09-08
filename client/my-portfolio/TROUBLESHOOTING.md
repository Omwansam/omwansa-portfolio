# Authentication Troubleshooting Guide

This guide helps debug 401 authentication errors in the portfolio application.

## Common 401 Error Causes

### 1. JWT Secret Key Not Configured
**Symptoms:** 401 errors on all authenticated endpoints
**Solution:** Ensure JWT_SECRET_KEY is set in backend configuration

### 2. Token Expired
**Symptoms:** 401 errors after some time of inactivity
**Solution:** Automatic token refresh should handle this

### 3. Invalid Token Format
**Symptoms:** 401 errors immediately after login
**Solution:** Check token storage and transmission

### 4. Backend Not Running
**Symptoms:** Network errors or connection refused
**Solution:** Start the Flask backend server

## Debugging Steps

### Step 1: Check Backend Configuration
```bash
cd BACKEND/server
python test_jwt.py
```

### Step 2: Verify Database and User
```bash
cd BACKEND/server
python seed.py  # Ensure admin user exists
```

### Step 3: Check Frontend Console
Open browser dev tools and look for:
- 🔍 Authentication check logs
- 🔐 Login attempt logs
- 📡 API request/response logs
- ❌ Error messages

### Step 4: Test API Endpoints
```bash
# Test login endpoint
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

## Debug Information

### Frontend Debug Logs
The application now includes detailed logging:
- `🔍 Checking authentication...` - Authentication check started
- `🔑 Making authenticated request to: /profile` - API request with token
- `📡 Response status: 401 for /profile` - API response status
- `🔄 Token expired, attempting refresh...` - Token refresh attempt
- `✅ Authentication successful` - Successful authentication

### Backend Debug Logs
Check the Flask server console for:
- JWT token validation errors
- Database connection issues
- User lookup failures

## Quick Fixes

### Fix 1: Restart Backend with Fresh Configuration
```bash
cd BACKEND/server
python seed.py  # Reset database
python app.py   # Start server
```

### Fix 2: Clear Frontend Storage
```javascript
// In browser console
localStorage.clear();
// Then refresh the page
```

### Fix 3: Check CORS Configuration
Ensure backend CORS allows frontend origin:
```python
# In app.py
CORS(app, resources={r"/*": {"origins": "*"}})
```

## Environment Variables

Create a `.env` file in `BACKEND/server/` with:
```env
SECRET_KEY=your-super-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here
DATABASE_URL=sqlite:///portfolio.db
```

## Testing Authentication Flow

1. **Clear all tokens:**
   ```javascript
   localStorage.clear();
   ```

2. **Navigate to `/admin`**

3. **Login with credentials:**
   - Email: `admin@example.com`
   - Password: `admin123`

4. **Check console logs for:**
   - Successful login response
   - Token storage
   - Profile fetch success

## Common Error Messages

### "Session expired. Please log in again."
- Token refresh failed
- Clear localStorage and login again

### "User is not an administrator"
- User exists but `is_admin` is false
- Run seed.py to create admin user

### "Invalid email or password"
- Wrong credentials
- User doesn't exist in database
- Run seed.py to create admin user

### "No refresh token available"
- Login didn't complete successfully
- Try logging in again

## Still Having Issues?

1. Check browser network tab for actual HTTP requests
2. Verify backend server is running on port 5000
3. Check backend console for error messages
4. Ensure database file exists and is accessible
5. Try creating a fresh admin user with seed.py

---

**Note:** All debug logs are prefixed with emojis for easy identification in the console.
