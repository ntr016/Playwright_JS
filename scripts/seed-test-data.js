#!/usr/bin/env node

/**
 * Test Data Seeding Script
 *
 * Purpose: Creates stable, repeatable test data in Restful Booker API
 * Usage: node scripts/seed-test-data.js
 *
 * Features:
 * - Creates predefined bookings for test automation
 * - Generates auth tokens
 * - Can be run in CI/CD pipeline before tests
 */

const https = require('https');

const BASE_URL = 'restful-booker.herokuapp.com';

// Test data templates
const TEST_BOOKINGS = [
  {
    firstname: 'Automation',
    lastname: 'User1',
    totalprice: 100,
    depositpaid: true,
    bookingdates: {
      checkin: '2025-01-15',
      checkout: '2025-01-20'
    },
    additionalneeds: 'Breakfast'
  },
  {
    firstname: 'Automation',
    lastname: 'User2',
    totalprice: 250,
    depositpaid: false,
    bookingdates: {
      checkin: '2025-02-01',
      checkout: '2025-02-10'
    },
    additionalneeds: 'Late checkout'
  },
  {
    firstname: 'Automation',
    lastname: 'User3',
    totalprice: 500,
    depositpaid: true,
    bookingdates: {
      checkin: '2025-03-15',
      checkout: '2025-03-25'
    },
    additionalneeds: 'Airport shuttle'
  }
];

/**
 * Make HTTPS request
 */
function makeRequest(path, method, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: BASE_URL,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        try {
          const jsonBody = JSON.parse(body);
          resolve({ status: res.statusCode, body: jsonBody });
        } catch (e) {
          resolve({ status: res.statusCode, body: body });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

/**
 * Get authentication token
 */
async function getAuthToken() {
  console.log('🔑 Getting authentication token...');

  const response = await makeRequest('/auth', 'POST', {
    username: 'admin',
    password: 'password123'
  });

  if (response.status === 200 && response.body.token) {
    console.log('✅ Token obtained successfully');
    return response.body.token;
  } else {
    throw new Error('Failed to get auth token');
  }
}

/**
 * Create a booking
 */
async function createBooking(bookingData) {
  const response = await makeRequest('/booking', 'POST', bookingData);

  if (response.status === 200 && response.body.bookingid) {
    return response.body;
  } else {
    throw new Error(`Failed to create booking for ${bookingData.firstname} ${bookingData.lastname}`);
  }
}

/**
 * Clean up old automation bookings (optional)
 */
async function cleanupOldBookings(token) {
  console.log('🧹 Checking for existing automation bookings...');

  // Get all bookings with firstname "Automation"
  const response = await makeRequest('/booking?firstname=Automation', 'GET');

  if (response.status === 200 && Array.isArray(response.body)) {
    console.log(`Found ${response.body.length} existing automation bookings`);

    // Note: Restful Booker API might not support bulk delete
    // This is a placeholder for cleanup logic
    if (response.body.length > 20) {
      console.log('⚠️  Warning: Many automation bookings exist. Consider manual cleanup.');
    }
  }
}

/**
 * Seed all test data
 */
async function seedTestData() {
  console.log('🌱 Starting test data seeding...\n');

  try {
    // Get auth token
    const token = await getAuthToken();

    // Optional: Cleanup old bookings
    await cleanupOldBookings(token);

    console.log('\n📝 Creating test bookings...');

    const createdBookings = [];

    // Create each booking
    for (const bookingData of TEST_BOOKINGS) {
      console.log(`Creating booking: ${bookingData.firstname} ${bookingData.lastname}...`);

      const result = await createBooking(bookingData);
      createdBookings.push(result);

      console.log(`✅ Booking created with ID: ${result.bookingid}`);

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('✨ Test data seeding completed successfully!');
    console.log('='.repeat(50));
    console.log('\nCreated Bookings:');
    createdBookings.forEach((booking, index) => {
      console.log(`${index + 1}. ID: ${booking.bookingid} - ${booking.booking.firstname} ${booking.booking.lastname}`);
    });
    console.log('\nThese bookings can be used in your automated tests.');
    console.log('Store these IDs in your test environment variables if needed.\n');

    // Export booking IDs to a file (optional)
    const fs = require('fs');
    const bookingIds = createdBookings.map(b => b.bookingid);
    fs.writeFileSync(
      './scripts/seeded-booking-ids.json',
      JSON.stringify({ bookingIds, timestamp: new Date().toISOString() }, null, 2)
    );
    console.log('💾 Booking IDs saved to: scripts/seeded-booking-ids.json\n');

  } catch (error) {
    console.error('\n❌ Error during test data seeding:');
    console.error(error.message);
    process.exit(1);
  }
}

// Run the seeding
if (require.main === module) {
  seedTestData();
}

module.exports = { seedTestData, createBooking, getAuthToken };
