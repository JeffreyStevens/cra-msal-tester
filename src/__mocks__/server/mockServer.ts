import {setupServer} from 'msw/node';
import {handlers} from './mockServerHandlers';

// This configures a request mocking server with the given request handlers.
// See setupTests.js for additional setup related to this server.
export const server = setupServer(...handlers);
