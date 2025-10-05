# Test Strategy - One Page

**Last Updated:** 2025-10-06
**Owner:** QA Team

## Scope
- **In Scope:**
  - Critical user flows (sign-in, checkout/payment, product browsing, cart management, account management)
  - API contract testing for booking and product endpoints
  - Cross-browser testing (Chrome, Firefox, Safari)
  - Performance baseline for top 5 endpoints
  - Smoke tests on every PR (<5 min runtime)

- **Out of Scope (for now):**
  - Mobile app testing
  - Load testing beyond baseline
  - Accessibility testing (planned for Q2)
  - Internationalization testing

## Key Risks & Mitigation
| Risk | Impact | Mitigation |
|------|--------|-----------|
| Payment gateway failures | Critical | Automated smoke tests on every PR; contract tests with payment provider |
| Booking system data corruption | High | API tests with data validation; database backup verification |
| Session management bugs | High | Auth flow in smoke suite; token expiry tests |
| Cart calculation errors | Medium | E2E checkout tests with various scenarios |
| Performance degradation | Medium | k6 baseline on top 5 endpoints; nightly runs with SLO alerts |

## Test Environments
- **Dev:** Feature development and unit tests
- **Staging:** Full smoke + regression suite; API contract tests; performance baseline
- **Production:** Smoke tests post-deployment; synthetic monitoring

## Test Approach
**Automation Priority:**
1. **Smoke (10-15 tests, <5 min)** - Every PR
   - Sign-in/sign-out
   - Add to cart → Checkout → Payment
   - Booking creation & retrieval
   - Critical API endpoints health

2. **Regression (30-50 tests)** - Pre-release
   - Extended user journeys
   - Edge cases for critical flows
   - Cross-browser compatibility

3. **API Tests** - Every PR
   - Contract validation (Restful Booker)
   - Data integrity checks
   - Error handling scenarios

4. **Performance** - Nightly
   - k6 baseline on top 5 endpoints
   - SLO: p95 < 200ms for GET, < 500ms for POST

**Exploratory Testing:**
- Charter-based sessions per module (1-2 hours/week)
- Session notes tracked in `/docs/charters/`

**Manual Testing:**
- Payment flows with real gateways (staging only)
- UX/UI validation for new features
- Ad-hoc testing for hotfixes

## Tools & Framework
- **E2E:** Playwright (TypeScript)
- **API:** Playwright API + Postman for exploratory
- **Performance:** k6
- **CI/CD:** GitHub Actions
- **Reporting:** Playwright HTML Reports + Allure
- **Test Management:** JIRA/Linear with risk tags
- **Monitoring:** Sentry alerts

## Exit Criteria
**PR Merge:**
- ✅ All smoke tests pass
- ✅ No critical/blocker bugs
- ✅ Code review approved

**Release to Staging:**
- ✅ Smoke + regression suite passes (>95%)
- ✅ API contract tests pass
- ✅ No P0/P1 bugs open
- ✅ Performance baseline within SLO

**Production Release:**
- ✅ Staging smoke tests pass
- ✅ Release checklist completed
- ✅ Rollback plan documented
- ✅ Post-deployment smoke passes
- ✅ Sentry shows no critical errors (30 min post-deploy)

## Success Metrics
- Smoke suite runtime: <5 minutes
- Smoke suite stability: >98% pass rate
- Bug escape to production: <2 per release
- Mean time to detect (MTTD): <1 hour
- Test coverage of critical paths: 100%
