import { test, expect } from '@playwright/test';

const BASE_URL = 'https://restful-booker.herokuapp.com';

test.describe('Restful Booker API Tests', () => {
  let bookingId: number;

  test('should create a new booking', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/booking`, {
      data: {
        firstname: 'John',
        lastname: 'Doe',
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
          checkin: '2025-01-01',
          checkout: '2025-01-05'
        },
        additionalneeds: 'Breakfast'
      }
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    bookingId = body.bookingid;
    expect(body.booking.firstname).toBe('John');
    expect(body.booking.lastname).toBe('Doe');
    expect(body.booking.totalprice).toBe(150);
  });

  test('should get all booking ids', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/booking`);
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('bookingid');
  });

  test('should authenticate and get token', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/auth`, {
      data: {
        username: 'admin',
        password: 'password123'
      }
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body).toHaveProperty('token');
    expect(body.token).toBeTruthy();
  });
});