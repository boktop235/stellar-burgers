import '@testing-library/jest-dom';
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
    length: 0,
    key: (index: number) => Object.keys(store)[index] || null
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Мок для cookie
Object.defineProperty(document, 'cookie', {
  writable: true,
  value: '',
});

// Мок для matchMedia
global.matchMedia = global.matchMedia || function() {
  return {
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  };
};