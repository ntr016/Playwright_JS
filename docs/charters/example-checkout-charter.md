# Exploratory Testing Charter - Checkout Flow

## Session Information
- **Charter ID:** ET-001
- **Date:** 2025-10-06
- **Tester:** QA Team
- **Duration:** Planned: 90 minutes | Actual: 95 minutes
- **Module/Feature:** Guest Checkout & Payment Processing

---

## Charter Mission
**Explore** the checkout and payment flow for guest users
**With** various input combinations, network conditions, and error scenarios
**To discover** data validation issues, UX problems, and payment integration bugs

---

## Setup & Configuration
- **Environment:** Staging (http://demos.bellatrix.solutions)
- **Browser/Device:** Chrome 120, Firefox 115
- **Test Data:**
  - Test products: Falcon 9 ($50), Saturn V ($120)
  - Test card numbers (from payment gateway docs)
- **Tools Used:** Chrome DevTools (Network throttling), Postman

---

## Areas Covered
- [x] Checkout form validation
- [x] Payment processing (happy path)
- [x] Error message display
- [x] Session timeout during checkout
- [x] Cart total calculation with multiple items
- [ ] Different payment methods (blocked - only credit card available)

---

## Test Ideas & Scenarios Executed

### Scenario 1: Complete checkout with valid data
**Steps:**
1. Add Falcon 9 to cart
2. Proceed to checkout
3. Fill in shipping details with valid data
4. Enter valid payment details
5. Submit order

**Expected Result:** Order confirmation displayed, email sent
**Actual Result:** ⚠️ Confirmation page loads but no email received (staging email service might be disabled)
**Status:** ⚠️ Observed - Need to verify email service config

---

### Scenario 2: Submit checkout with empty required fields
**Steps:**
1. Proceed to checkout with item in cart
2. Leave "First Name" field empty
3. Click "Place Order"

**Expected Result:** Validation error shown
**Actual Result:** ✅ Error message: "First Name is a required field"
**Status:** ✅ Pass

---

### Scenario 3: Network interruption during payment
**Steps:**
1. Add product, go to checkout
2. Fill all details
3. Enable offline mode in DevTools before clicking "Pay"
4. Click "Pay Now"

**Expected Result:** User-friendly error message
**Actual Result:** ❌ Generic "Something went wrong" - not helpful
**Status:** ❌ Fail - Filed as Bug #1

---

## Bugs Found

### Bug #1: Unhelpful error message on payment timeout
- **Severity:** Medium
- **Priority:** P2
- **Steps to Reproduce:**
  1. Add item to cart, proceed to checkout
  2. Simulate network timeout (DevTools > Network > Offline)
  3. Submit payment
- **Expected Behavior:** Clear message like "Payment failed. Please check your connection and try again."
- **Actual Behavior:** Shows "An error occurred" with no guidance
- **Screenshots/Logs:** [Screenshot attached - checkout-error.png]
- **JIRA Ticket:** PROJ-1234

---

### Bug #2: Cart total doesn't include shipping until page refresh
- **Severity:** Low
- **Priority:** P3
- **Steps to Reproduce:**
  1. Add product to cart
  2. Go to checkout
  3. Observe cart total
  4. Refresh page
- **Expected Behavior:** Shipping cost included in total immediately
- **Actual Behavior:** Shipping added only after refresh
- **JIRA Ticket:** PROJ-1235

---

## Questions / Observations

1. **Question 1:** Is email service configured in staging? Confirmation emails not arriving.
2. **Observation 1:** Checkout page performance is slow (3-4 second load time) compared to other pages.
3. **Question 2:** Should guest users be able to create an account during checkout?

---

## Risks Identified

1. **Risk 1:** No loading indicator during payment processing - users might click submit multiple times
2. **Risk 2:** Session timeout (15 min) might be too short if user is filling a complex order
3. **Risk 3:** No validation on card expiry date format - accepts invalid dates

---

## Areas Not Covered

- [ ] Multiple payment methods (PayPal, Apple Pay) - not yet implemented
- [ ] Discount code validation
- [ ] Order history for guest users
- [ ] Mobile checkout experience (ran out of time)

---

## Follow-Up Actions

- [x] File Bug #1 and Bug #2
- [ ] Verify Question 1 with DevOps team
- [ ] Create automated test for successful checkout flow
- [ ] Schedule mobile checkout exploratory session (ET-002)
- [ ] Add performance test for checkout page load

---

## Session Notes

### Interruptions
- Staging environment was slow around 3:00 PM (possibly due to other teams testing)

### Deviations from Charter
- Spent extra 15 minutes investigating the shipping cost calculation issue

### Learning & Insights
- Payment gateway sandbox has different error codes than production (noted for future testing)
- Cart state is stored in localStorage, which explains some of the observed behavior

---

## Coverage Assessment

**Time Breakdown:**
- Setup: 10%
- Test execution: 60%
- Bug investigation: 20%
- Documentation: 10%

**Coverage Confidence:** Medium

**Would I ship this feature?** With caveats
**Reason:** Core functionality works, but UX issues (error messages, loading states) need improvement before production release.

---

## Charter Reviewed By
- **Reviewer:** Tech Lead
- **Review Date:** 2025-10-07
- **Feedback:** Good coverage. Please add automated test for Bug #1 scenario to prevent regression.
