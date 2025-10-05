# Playwright Learning Roadmap - Lean & Risk-Driven Testing

**Last Updated:** 2025-10-06
**Aligned with:** Current project test strategy

---

## 🎯 Learning Objectives

Master Playwright test automation using a **lean, risk-driven approach** focused on:
- Building fast, stable smoke test suites (<5 min)
- API contract testing and data validation
- Risk-first test prioritization
- CI/CD integration with GitHub Actions
- Balancing automation with exploratory testing

---

## Phase 1 - Foundation & Quick Wins (Week 1)

### 1. **Playwright Basics**
- Read [Playwright Getting Started](https://playwright.dev/docs/intro)
- Run existing tests in the project:
  ```bash
  npm test                    # All tests
  npm run test:smoke          # Smoke tests
  npm run test:api            # API tests
  npm run test:ui             # UI mode (visual)
  ```
- Explore `tests/ui/getting-started.spec.ts` in UI mode
- Practice core actions: `click`, `fill`, `waitForSelector`

### 2. **Understand the Project Structure**
- Review `docs/strategy/test-strategy.md` to understand the testing philosophy
- Explore `tests/smoke/` - critical flows (<5 min runtime target)
- Examine `tests/api/` - Restful Booker API tests
- Read `docs/strategy/user-journeys.md` for critical user paths

### 3. **Run & Understand Smoke Tests**
- Execute smoke suite: `npm run test:smoke`
- Review `tests/smoke/critical-flows.spec.ts` and `api-health.spec.ts`
- Understand the **@smoke** tag convention
- Goal: <5 min runtime, >98% stability

### 🎯 **Week 1 Deliverable**
- Run all existing tests successfully
- Understand the risk-first approach
- Write 1 new smoke test for a critical flow

---

## Phase 2 - API Testing & Contract Validation (Week 2)

### 1. **API Testing with Playwright**
- Study `tests/api/jsonplaceholder.spec.ts`
- Learn request/response handling with Playwright's `request` fixture
- Practice GET, POST, PUT, DELETE operations

### 2. **Test Data Management**
- Run the seeding script: `npm run seed:data`
- Review `scripts/seed-test-data.js`
- Understand test data isolation and repeatability

### 3. **Contract Testing Concepts**
- Validate API response schemas
- Test error scenarios (4xx, 5xx)
- Practice data integrity checks

### 🎯 **Week 2 Deliverable**
- Write 3 API tests for Restful Booker endpoints
- Create test data seeding for a new scenario
- Add validation for API response structure

---

## Phase 3 - CI/CD Integration (Week 3)

### 1. **GitHub Actions Workflow**
- Review `.github/workflows/smoke-tests.yml`
- Understand trigger conditions (PR to main/develop)
- Learn how test reports are uploaded as artifacts

### 2. **Playwright Configuration**
- Study `playwright.config.ts`
- Configure projects for different browsers
- Set up retries, timeouts, and base URLs
- Practice environment-specific configs

### 3. **Test Reporting**
- Generate HTML reports: `npm run test:report`
- Review test traces and screenshots on failure
- Configure `trace: 'on-first-retry'` for debugging

### 🎯 **Week 3 Deliverable**
- Trigger a CI run and review the workflow
- Fix a failing test using trace analysis
- Update playwright.config.ts for a new environment

---

## Phase 4 - Exploratory & Charter-Based Testing (Week 4)

### 1. **Exploratory Testing Basics**
- Read `docs/charters/charter-template.md`
- Study the example: `docs/charters/example-checkout-charter.md`
- Learn time-boxed session techniques

### 2. **Session-Based Test Management**
- Conduct a 1-hour exploratory session on checkout flow
- Document findings using the charter template
- Balance automation vs. exploration

### 3. **Bug Discovery & Prioritization**
- Practice risk-based prioritization (P0/P1/P2/P3)
- Link bugs to failing automated tests
- Create test cases from exploratory findings

### 🎯 **Week 4 Deliverable**
- Complete 1 charter-based exploratory session
- Document findings in `docs/charters/`
- Convert 1 finding into an automated test

---

## Phase 5 - Cross-Browser & Advanced Patterns (Week 5-6)

### 1. **Cross-Browser Testing**
- Configure tests for Chrome, Firefox, Safari
- Review `tests/cross-browser/` directory
- Handle browser-specific quirks

### 2. **Selectors & Locators**
- Master `getByRole`, `getByTestId`, `getByText`
- Practice CSS and XPath selectors
- Use Playwright Inspector for selector debugging

### 3. **Fixtures & Page Objects**
- Create custom fixtures for authenticated sessions
- Build page object models for reusable components
- Share context between UI and API tests

### 🎯 **Week 5-6 Deliverable**
- Write tests that run across 3 browsers
- Create 1 custom fixture for auth
- Build a page object for a critical flow

---

## Phase 6 - Performance & Release Process (Week 7-8)

### 1. **Release Checklist**
- Study `docs/strategy/release-checklist.md`
- Understand exit criteria for each stage (PR → Staging → Production)
- Practice pre-release validation steps

### 2. **Performance Baseline** (Optional/Future)
- Explore k6 for performance testing
- Measure Web Vitals with `page.evaluate()`
- Set up SLO alerts (p95 < 200ms for GET)

### 3. **Test Maintenance**
- Identify and fix flaky tests
- Refactor slow tests to meet <5 min smoke target
- Practice test debugging with traces and videos

### 🎯 **Week 7-8 Deliverable**
- Execute the full release checklist for a mock release
- Identify and fix 1 flaky test
- Document lessons learned

---

## 📊 Success Metrics

Track your progress with these targets:

| Metric | Target |
|--------|--------|
| Smoke suite runtime | <5 minutes |
| Smoke suite stability | >98% pass rate |
| Tests written | 15-20 (smoke + regression) |
| API test coverage | 5-10 endpoints |
| Exploratory sessions | 3-5 charters |

---

## 🔄 Weekly Cadence

| Week | Focus | Key Activities |
|------|-------|----------------|
| 1 | Foundation | Run tests, understand risk-first approach, write 1 smoke test |
| 2 | API Testing | Write 3 API tests, practice test data seeding |
| 3 | CI/CD | Review GitHub Actions, fix tests using traces |
| 4 | Exploratory | Conduct 1 charter session, document findings |
| 5-6 | Cross-Browser | Configure multi-browser tests, create fixtures |
| 7-8 | Release Process | Execute release checklist, fix flaky tests |

---

## 📚 Learning Resources

### Official Documentation
- [Playwright Docs](https://playwright.dev/docs/intro)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)

### Project-Specific Docs
- [Test Strategy](docs/strategy/test-strategy.md)
- [User Journeys](docs/strategy/user-journeys.md)
- [Release Checklist](docs/strategy/release-checklist.md)
- [Charter Template](docs/charters/charter-template.md)

### Community
- [Playwright Slack](https://aka.ms/playwright-slack)
- [GitHub Discussions](https://github.com/microsoft/playwright/discussions)

---

## 🧪 Hands-On Practice Tips

1. **Start Small**: Begin with smoke tests, not complex regression tests
2. **Run Tests Often**: Use `npm run test:ui` for fast feedback
3. **Debug with Traces**: Enable trace viewer for failed tests
4. **Review Examples**: Read existing tests in `tests/` before writing new ones
5. **Ask Questions**: Reference the docs and community resources
6. **Keep It Fast**: Every test you write should respect the <5 min smoke target
7. **Think Risk-First**: Always ask "What's the business impact if this fails?"

---

## 🎯 Philosophy

> "Stay lean and risk-first, automate the critical path, and tighten the release ritual every week."

**Key Principles:**
- Smoke tests on every PR (<5 min)
- Risk-driven prioritization over 100% coverage
- Fast feedback loops over comprehensive suites
- Balance automation + exploratory testing

---

## ✅ Checkpoint Questions

After each phase, ask yourself:
- Can I write a test from scratch without referencing examples?
- Do I understand why this test matters for the business?
- Can I debug a failing test using traces/reports?
- Am I following the project's lean testing philosophy?

---

**Next Steps:** Start with Phase 1 and complete the Week 1 deliverable!
