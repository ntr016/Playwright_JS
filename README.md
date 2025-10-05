# Playwright Test Automation - Lean & Risk-Driven

## 🎯 Overview

This project implements a **lean, risk-driven test automation strategy** focused on critical user flows with fast feedback loops.

**Key Principles:**
- ✅ Smoke tests run on every PR (<5 min)
- ✅ Risk-first approach - cover critical paths first
- ✅ Automated + Exploratory testing balance
- ✅ Fast, stable, maintainable tests

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run smoke tests only (fast!)
npm run test:smoke

# Run API tests
npm run test:api

# Seed test data
npm run seed:data

# View test report
npm run test:report
```

---

## 📁 Project Structure

```
.
├── tests/
│   ├── smoke/              # Critical smoke tests (<5 min)
│   │   ├── critical-flows.spec.ts
│   │   └── api-health.spec.ts
│   ├── api/                # API contract tests
│   │   └── jsonplaceholder.spec.ts
│   └── ui/                 # UI tests
│       └── getting-started.spec.ts
├── docs/
│   ├── strategy/           # Test strategy documents
│   │   ├── test-strategy.md
│   │   ├── release-checklist.md
│   │   └── user-journeys.md
│   └── charters/           # Exploratory testing charters
│       ├── charter-template.md
│       └── example-checkout-charter.md
├── scripts/
│   └── seed-test-data.js   # Test data seeding
├── .github/
│   └── workflows/
│       └── smoke-tests.yml # CI/CD pipeline
└── playwright.config.ts
```

---

## 🧪 Test Strategy

### Smoke Tests (10-15 tests, <5 min)
**Run on:** Every PR
**Coverage:**
- ✅ Add to cart & checkout flow
- ✅ User authentication
- ✅ Booking creation & retrieval (API)
- ✅ Critical page loads

**Command:** `npm run test:smoke`

### Regression Tests
**Run on:** Pre-release
**Coverage:**
- Extended user journeys
- Edge cases
- Cross-browser compatibility

**Command:** `npm run test:regression`

### API Tests
**Run on:** Every PR
**Coverage:**
- Booking API (Restful Booker)
- Contract validation
- Error handling

**Command:** `npm run test:api`

### Exploratory Testing
**When:** Per module, 1-2 hour sessions
**Documentation:** `docs/charters/`

---

## 📊 Critical User Journeys

We've mapped the **top 5 critical user journeys** based on business impact and risk:

1. **Guest Checkout** (Critical - 60% revenue)
2. **User Registration & Login** (High)
3. **Booking Creation & Management** (Critical)
4. **Search & Filter Products** (Medium)
5. **Shopping Cart Management** (High)

See [docs/strategy/user-journeys.md](docs/strategy/user-journeys.md) for details.

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow
- Runs on every PR to `main` or `develop`
- Executes smoke test suite (<5 min)
- Uploads test reports as artifacts
- Comments on PR if tests fail

**Workflow file:** `.github/workflows/smoke-tests.yml`

---

## 🛠️ Tools & Framework

| Purpose | Tool |
|---------|------|
| E2E Testing | Playwright (TypeScript) |
| API Testing | Playwright API + Postman |
| Performance | k6 (planned) |
| CI/CD | GitHub Actions |
| Reporting | Playwright HTML Reports + Allure (planned) |
| Test Management | JIRA/Linear with risk tags |
| Monitoring | Sentry alerts |

---

## 📝 Release Process

Before every release, follow the **Release Checklist**:
- [docs/strategy/release-checklist.md](docs/strategy/release-checklist.md)

**Exit Criteria:**
- ✅ All smoke tests pass
- ✅ No P0/P1 bugs open
- ✅ Performance baseline within SLO
- ✅ Post-deployment smoke passes

---

## 🌱 Test Data Management

### Seeding Test Data
We use stable, repeatable test data for consistent test execution:

```bash
npm run seed:data
```

This creates:
- 3 predefined bookings in Restful Booker API
- Auth tokens for testing
- Booking IDs saved to `scripts/seeded-booking-ids.json`

**When to seed:**
- Before running regression tests
- After database resets
- In CI/CD pipeline (before tests)

---

## 🔍 Exploratory Testing

### Charter-Based Sessions
Use the template: `docs/charters/charter-template.md`

**Example charter:**
> Explore the checkout payment flow with various credit card inputs to discover data validation and error handling issues.

**Session notes:** Stored in `docs/charters/`

See example: [docs/charters/example-checkout-charter.md](docs/charters/example-checkout-charter.md)

---

## 📈 Success Metrics

| Metric | Target |
|--------|--------|
| Smoke suite runtime | <5 minutes |
| Smoke suite stability | >98% pass rate |
| Bug escape to production | <2 per release |
| Mean time to detect (MTTD) | <1 hour |
| Critical path coverage | 100% |

---

## 🎯 First 2 Weeks Roadmap

### Week 1
- [x] Map top 5 user journeys
- [x] Write one-page test strategy
- [x] Create release checklist
- [x] Implement smoke tests (10-15 tests)
- [x] Set up GitHub Actions CI
- [ ] Review and iterate based on feedback

### Week 2
- [ ] Add exploratory charters for critical flows
- [ ] Set up k6 performance baseline
- [ ] Integrate Sentry alerts
- [ ] Add contract tests (Pact - if needed)
- [ ] Document learnings & iterate

---

## 🤝 Contributing

### Adding New Tests

1. **Smoke tests:** Add to `tests/smoke/` with `@smoke` tag
2. **Regression tests:** Add to appropriate folder with `@regression` tag
3. **Keep it fast:** Smoke tests must complete in <5 min total

### Test Naming Convention
```typescript
// Good
test('should add product to cart and update count @smoke', async ({ page }) => {
  // ...
});

// Bad
test('test1', async ({ page }) => {
  // ...
});
```

---

## 📚 Documentation

- **Test Strategy:** [docs/strategy/test-strategy.md](docs/strategy/test-strategy.md)
- **User Journeys:** [docs/strategy/user-journeys.md](docs/strategy/user-journeys.md)
- **Release Checklist:** [docs/strategy/release-checklist.md](docs/strategy/release-checklist.md)
- **Charter Template:** [docs/charters/charter-template.md](docs/charters/charter-template.md)

---

## 🐛 Bug Tracking

- Use **risk tags** in JIRA/Linear
- Link test failures to bug tickets
- Include:
  - Severity (Critical/High/Medium/Low)
  - Priority (P0/P1/P2/P3)
  - Steps to reproduce
  - Screenshots/logs

---

## 📞 Support

For questions or issues:
1. Check the documentation in `docs/`
2. Review existing test examples
3. Reach out to the QA team

---

## 🎉 Philosophy

> "Stay lean and risk-first, automate the critical path, and tighten the release ritual every week."

We prioritize:
- **Speed** over perfection
- **Critical flows** over 100% coverage
- **Stability** over quantity
- **Feedback loops** over comprehensive suites

---

**Last Updated:** 2025-10-06
**Version:** 0.1.0
