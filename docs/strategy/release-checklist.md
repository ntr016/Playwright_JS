# Release Checklist

**Release Version:** _______
**Release Date:** _______
**Release Manager:** _______

## Pre-Release (T-2 days)

### Code & Build
- [ ] All feature branches merged to `main`
- [ ] Build passes on CI/CD
- [ ] Version number updated in `package.json`
- [ ] Release notes drafted
- [ ] Database migration scripts reviewed (if applicable)

### Testing
- [ ] Smoke test suite passes (>98%)
- [ ] Regression test suite passes (>95%)
- [ ] API contract tests pass (100%)
- [ ] Performance baseline tests pass (within SLO)
- [ ] Cross-browser tests pass (Chrome, Firefox, Safari)
- [ ] Exploratory testing sessions completed for new features

### Bug Triage
- [ ] No P0 (Critical) bugs open
- [ ] No P1 (High) bugs open
- [ ] All P2 (Medium) bugs reviewed and accepted for release or deferred
- [ ] Known issues documented in release notes

### Security & Compliance
- [ ] Security scan completed (no critical vulnerabilities)
- [ ] Dependencies updated and vulnerability check passed
- [ ] Secrets/credentials rotated if needed
- [ ] GDPR/compliance requirements met (if applicable)

## Deployment Day (T-0)

### Pre-Deployment
- [ ] Deployment window communicated to stakeholders
- [ ] Rollback plan documented and tested
- [ ] Database backup completed and verified
- [ ] Feature flags configured (if applicable)
- [ ] Monitoring dashboards reviewed

### Deployment
- [ ] Deploy to staging environment
- [ ] Smoke tests pass on staging (100%)
- [ ] Sanity check by Product Owner/Stakeholder
- [ ] Deploy to production (off-peak hours recommended)
- [ ] Deployment logs reviewed for errors

### Post-Deployment (30 min - 2 hours)
- [ ] Production smoke tests pass
- [ ] Critical user flows verified manually:
  - [ ] User sign-in/sign-up
  - [ ] Product browsing & search
  - [ ] Add to cart & checkout
  - [ ] Booking creation & retrieval
  - [ ] Payment processing
- [ ] Sentry/error monitoring shows no critical errors
- [ ] Performance metrics within SLO (check APM)
- [ ] Database health check passed
- [ ] API endpoints responding (health check)

### Communication
- [ ] Release notes published (internal wiki/docs)
- [ ] Stakeholders notified of successful deployment
- [ ] Customer support team briefed on changes
- [ ] Social media/marketing notified (if customer-facing changes)

## Post-Release (T+1 day)

### Monitoring
- [ ] Monitor error rates for 24 hours
- [ ] Check performance metrics (p95, p99 latency)
- [ ] Review user feedback/support tickets
- [ ] Verify analytics/tracking events firing correctly

### Retrospective
- [ ] Schedule release retrospective meeting
- [ ] Document lessons learned
- [ ] Update release process based on feedback
- [ ] Celebrate the release! 🎉

## Emergency Rollback Procedure

**Trigger Rollback If:**
- Critical bug discovered in production (P0)
- Error rate >5% for critical flows
- Performance degradation >50% from baseline
- Payment/transaction failures >2%

**Rollback Steps:**
1. Execute rollback script: `./scripts/rollback.sh <previous-version>`
2. Verify rollback success with smoke tests
3. Notify all stakeholders immediately
4. Investigate root cause
5. Schedule hotfix deployment

---

**Sign-Off:**
- [ ] QA Lead: ___________________ Date: _______
- [ ] Tech Lead: _________________ Date: _______
- [ ] Product Manager: ___________ Date: _______
