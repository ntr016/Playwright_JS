import { test, expect } from '@playwright/test';

/**
 * SMOKE TEST SUITE - API Health Checks
 * Target: <2 minutes runtime
 * Runs on: Every PR
 * Coverage: Journey 3 - Booking API (Critical endpoints)
 */

const BASE_URL = 'https://restful-booker.herokuapp.com';

test.describe('Smoke Tests - API Health @smoke', () => {

  // Journey 3: Booking Management - Health Checks
  test('should get all bookings successfully', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/booking`);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
  });

  test('should create a new booking', async ({ request }) => {
    const bookingData = {
      firstname: 'Smoke',
      lastname: 'Test',
      totalprice: 100,
      depositpaid: true,
      bookingdates: {
        checkin: '2025-01-15',
        checkout: '2025-01-20'
      },
      additionalneeds: 'Automated test'
    };

    const response = await request.post(`${BASE_URL}/booking`, {
      data: bookingData
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('bookingid');
    expect(body.booking.firstname).toBe('Smoke');
    expect(body.booking.lastname).toBe('Test');
  });

  test('should authenticate and receive token', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/auth`, {
      data: {
        username: 'admin',
        password: 'password123'
      }
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('token');
    expect(typeof body.token).toBe('string');
    expect(body.token.length).toBeGreaterThan(0);
  });

  test('should retrieve a specific booking', async ({ request }) => {
    // First, get list of booking IDs
    const listResponse = await request.get(`${BASE_URL}/booking`);
    const bookings = await listResponse.json();
    const firstBookingId = bookings[0].bookingid;

    // Then retrieve specific booking
    const response = await request.get(`${BASE_URL}/booking/${firstBookingId}`);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('firstname');
    expect(body).toHaveProperty('lastname');
    expect(body).toHaveProperty('totalprice');
    expect(body).toHaveProperty('bookingdates');
  });

  test('should handle API errors gracefully', async ({ request }) => {
    // Test with invalid booking ID
    const response = await request.get(`${BASE_URL}/booking/999999999`);

    // Expecting 404 for non-existent booking
    expect(response.status()).toBe(404);
  });

  test('should complete end-to-end booking flow', async ({ request }) => {
    // 1. Create booking
    const createResponse = await request.post(`${BASE_URL}/booking`, {
      data: {
        firstname: 'E2E',
        lastname: 'Smoke',
        totalprice: 250,
        depositpaid: false,
        bookingdates: {
          checkin: '2025-02-01',
          checkout: '2025-02-05'
        },
        additionalneeds: 'Late checkout'
      }
    });

    expect(createResponse.ok()).toBeTruthy();
    const createBody = await createResponse.json();
    const bookingId = createBody.bookingid;

    // 2. Retrieve the created booking
    const getResponse = await request.get(`${BASE_URL}/booking/${bookingId}`);
    expect(getResponse.ok()).toBeTruthy();

    const getBody = await getResponse.json();
    expect(getBody.firstname).toBe('E2E');
    expect(getBody.lastname).toBe('Smoke');
    expect(getBody.totalprice).toBe(250);

    // 3. Verify it appears in the list
    const listResponse = await request.get(`${BASE_URL}/booking`);
    const allBookings = await listResponse.json();
    const bookingExists = allBookings.some((b: any) => b.bookingid === bookingId);
    expect(bookingExists).toBeTruthy();
  });
});
