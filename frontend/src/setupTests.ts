import '@testing-library/jest-dom';

// Mock fetch
global.fetch = jest.fn();

// Clear all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

// Reset all mocks after each test
afterEach(() => {
  jest.resetAllMocks();
}); 