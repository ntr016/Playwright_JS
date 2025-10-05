# Top 5 Critical User Journeys

**Priority:** Based on business impact and risk
**Review Date:** 2025-10-06

---

## Journey 1: Guest Checkout (Highest Priority)
**Business Impact:** 60% of revenue
**Risk Level:** CRITICAL

### Happy Path
1. User lands on homepage
2. Browses product catalog
3. Selects product (e.g., "Falcon 9")
4. Adds product to cart
5. Clicks "View Cart"
6. Proceeds to checkout
7. Enters shipping information (guest)
8. Selects payment method
9. Enters payment details
10. Confirms order
11. Receives order confirmation (email + UI)

### Key Validations
- Product details accurate (price, name, description)
- Cart total calculated correctly (including tax/shipping)
- Payment processed successfully
- Order created in database
- Confirmation email sent

### Edge Cases to Test
- Out of stock products
- Invalid payment details
- Session timeout during checkout
- Discount codes/promo codes
- Multiple items in cart with different quantities

### Dependencies
- Payment gateway API
- Email service
- Inventory system
- Booking API (Restful Booker)

---

## Journey 2: User Registration & Login
**Business Impact:** Foundation for user retention
**Risk Level:** HIGH

### Happy Path
1. User clicks "My Account"
2. Clicks "Register"
3. Fills registration form (email, password, name)
4. Submits form
5. Receives verification email
6. Verifies email (clicks link)
7. Redirected to login page
8. Enters credentials
9. Successfully logs in
10. Lands on account dashboard

### Key Validations
- Email validation (format + uniqueness)
- Password strength requirements met
- Verification email sent and link works
- Session created on successful login
- Account dashboard displays user info

### Edge Cases to Test
- Duplicate email registration
- Weak passwords
- Expired verification links
- Incorrect login credentials (3 attempts lockout)
- "Forgot Password" flow

---

## Journey 3: Booking Creation & Management
**Business Impact:** Core product functionality
**Risk Level:** CRITICAL

### Happy Path
1. User logs in
2. Navigates to "Create Booking"
3. Selects dates (check-in, check-out)
4. Enters guest details (firstname, lastname)
5. Selects room type/product
6. Enters special requests (additionalneeds)
7. Reviews booking summary
8. Confirms booking
9. Receives booking confirmation (ID + details)
10. Booking appears in "My Bookings"

### Key Validations
- Date validation (check-out > check-in)
- Price calculation based on dates
- Booking ID generated correctly
- Booking retrievable via API
- Booking details accurate in UI and database

### Edge Cases to Test
- Invalid date ranges (past dates, same date)
- Overlapping bookings
- Price changes between selection and confirmation
- API timeout during booking creation
- Concurrent bookings for same resource

### API Endpoints
- POST `/booking` - Create booking
- GET `/booking/{id}` - Retrieve booking
- PUT `/booking/{id}` - Update booking
- DELETE `/booking/{id}` - Cancel booking
- GET `/booking` - List all bookings

---

## Journey 4: Search & Filter Products
**Business Impact:** Product discovery drives 40% of purchases
**Risk Level:** MEDIUM

### Happy Path
1. User enters search query in search bar
2. Submits search
3. Results displayed with relevant products
4. User applies filters (price range, category)
5. Results update dynamically
6. User sorts by price (low to high)
7. User clicks on product
8. Product details page loads

### Key Validations
- Search returns relevant results
- Filters work correctly (AND/OR logic)
- Sort order applied correctly
- No products shown = proper "No results" message
- Pagination works if >10 results

### Edge Cases to Test
- Special characters in search query
- Empty search query
- Filter combinations that return 0 results
- Very long search queries
- Case-insensitive search

---

## Journey 5: Shopping Cart Management
**Business Impact:** Cart abandonment = 30% revenue loss
**Risk Level:** HIGH

### Happy Path
1. User adds product to cart
2. Cart icon updates with item count
3. User clicks cart icon
4. Cart displays correct items and quantities
5. User updates quantity (increase/decrease)
6. Cart total recalculates
7. User removes item
8. Cart updates immediately
9. User proceeds to checkout

### Key Validations
- Cart persists across sessions (for logged-in users)
- Cart total accurate (subtotal + tax + shipping)
- Quantity limits enforced (max per product)
- Empty cart shows appropriate message
- Cart count badge updates in real-time

### Edge Cases to Test
- Adding same product multiple times
- Removing last item from cart
- Cart with mixed product types
- Price changes while item in cart
- Stock availability check on checkout
- Cart persistence after logout/login

---

## Testing Coverage Matrix

| Journey | Smoke | Regression | API | Performance | Exploratory |
|---------|-------|------------|-----|-------------|-------------|
| 1. Guest Checkout | ✅ | ✅ | ✅ | ✅ | ✅ |
| 2. Registration/Login | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| 3. Booking Management | ✅ | ✅ | ✅ | ✅ | ✅ |
| 4. Search & Filter | ⚠️ | ✅ | ⚠️ | ⚠️ | ✅ |
| 5. Cart Management | ✅ | ✅ | ⚠️ | ⚠️ | ✅ |

**Legend:**
- ✅ Full coverage
- ⚠️ Partial coverage
- ❌ No coverage (planned)

---

## Next Steps (First 2 Weeks)

**Week 1:**
- [ ] Implement smoke tests for Journey 1, 2, 3, 5 (10-15 tests total)
- [ ] Set up GitHub Actions to run smoke suite on every PR
- [ ] Document API contracts for Journey 3

**Week 2:**
- [ ] Add exploratory charters for Journey 1 & 3
- [ ] Set up k6 performance baseline for top 5 API endpoints
- [ ] Create test data seeding script for bookings
- [ ] Review and iterate on test strategy based on initial results
