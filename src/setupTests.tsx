import React from 'react';
import '@testing-library/jest-dom';

//------------------------------------------------------------------------------
// https://create-react-app.dev/docs/running-tests/#initializing-test-environment
// If your app uses a browser API that you need to mock in your tests or if you need a global setup before running your
// tests, add a src/setupTests.js to your project. It will be automatically executed before running your tests.
//------------------------------------------------------------------------------
import {server} from './__mocks__/server/mockServer';

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests, so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
