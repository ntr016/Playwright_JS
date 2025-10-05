# Exploratory Testing Charter Template

## Session Information
- **Charter ID:** [e.g., ET-001]
- **Date:** YYYY-MM-DD
- **Tester:** [Your Name]
- **Duration:** [Planned: X minutes | Actual: Y minutes]
- **Module/Feature:** [e.g., Checkout Flow, Booking API]

---

## Charter Mission
**Explore** [target area]
**With** [resources/tools]
**To discover** [types of issues/information]

### Example:
> Explore the checkout payment flow with various credit card inputs to discover data validation and error handling issues.

---

## Setup & Configuration
- **Environment:** [Dev/Staging/Production]
- **Browser/Device:** [e.g., Chrome 120, iPhone 14 Pro]
- **Test Data:** [e.g., Test user account, sample products]
- **Tools Used:** [e.g., DevTools, Postman, Browser extensions]

---

## Areas Covered
List the specific areas/features explored during this session:

- [ ] Area 1: [e.g., Payment form validation]
- [ ] Area 2: [e.g., Error message display]
- [ ] Area 3: [e.g., Session timeout handling]
- [ ] Area 4: [e.g., Network error scenarios]

---

## Test Ideas & Scenarios Executed

### Scenario 1: [Short description]
**Steps:**
1. Step 1
2. Step 2
3. Step 3

**Expected Result:** [What should happen]
**Actual Result:** [What actually happened]
**Status:** ✅ Pass / ❌ Fail / ⚠️ Observed

---

### Scenario 2: [Short description]
**Steps:**
1. ...

**Expected Result:** ...
**Actual Result:** ...
**Status:** ✅ Pass / ❌ Fail / ⚠️ Observed

---

## Bugs Found

### Bug #1: [Bug Title]
- **Severity:** Critical / High / Medium / Low
- **Priority:** P0 / P1 / P2 / P3
- **Steps to Reproduce:**
  1. Step 1
  2. Step 2
  3. Step 3
- **Expected Behavior:** ...
- **Actual Behavior:** ...
- **Screenshots/Logs:** [Attach or link]
- **JIRA/Linear Ticket:** [Link to ticket]

---

### Bug #2: [Bug Title]
...

---

## Questions / Observations

Things that made you curious or need clarification:

1. **Question 1:** Why does the cart total recalculate on page refresh but not on quantity update?
2. **Observation 1:** Payment form accepts spaces in card number, but API returns error.
3. **Question 2:** Is the session timeout supposed to be 15 or 30 minutes?

---

## Risks Identified

Potential risks discovered during this session:

1. **Risk 1:** Payment gateway timeout doesn't show user-friendly error message
2. **Risk 2:** No validation on special characters in shipping address
3. **Risk 3:** Cart state inconsistency when user has multiple tabs open

---

## Areas Not Covered

Things you didn't have time to explore or were blocked:

- [ ] Different payment methods (PayPal, Apple Pay)
- [ ] Guest checkout vs logged-in checkout differences
- [ ] Mobile responsiveness of payment form
- [ ] Accessibility (keyboard navigation, screen readers)

---

## Follow-Up Actions

- [ ] File bug tickets for issues #1, #2
- [ ] Investigate Question 2 with dev team
- [ ] Create automated test for Scenario 1 (critical path)
- [ ] Schedule another session to cover areas not tested

---

## Session Notes

### Interruptions
- [e.g., Staging environment went down at 2:30 PM for 10 minutes]

### Deviations from Charter
- [e.g., Spent extra time exploring discount code behavior due to unexpected bug]

### Learning & Insights
- [e.g., Learned that the payment API has rate limiting that affects test execution]

---

## Coverage Assessment

**Time Breakdown:**
- Setup: X%
- Test execution: Y%
- Bug investigation: Z%
- Documentation: W%

**Coverage Confidence:** [Low / Medium / High]

**Would I ship this feature?** [Yes / No / With caveats]
**Reason:** [Brief explanation]

---

## Attachments
- Screenshots: [Link to folder/files]
- Screen recordings: [Link to video]
- Log files: [Link to logs]
- Test data used: [Link or embedded data]

---

## Charter Reviewed By
- **Reviewer:** [Name]
- **Review Date:** YYYY-MM-DD
- **Feedback:** [Any feedback on the session]
