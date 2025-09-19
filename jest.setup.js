import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock MultiversX providers
jest.mock('@multiversx/sdk-web-wallet-provider', () => ({
  ExtensionProvider: {
    getInstance: () => ({
      init: jest.fn().mockResolvedValue(true),
      login: jest.fn().mockResolvedValue('erd1mock'),
      logout: jest.fn().mockResolvedValue(true),
      getAddress: jest.fn().mockReturnValue('erd1mock'),
      isInitialized: jest.fn().mockReturnValue(true),
      isConnected: jest.fn().mockReturnValue(true),
      signTransactions: jest.fn().mockResolvedValue([]),
      signMessage: jest.fn().mockResolvedValue('signature'),
    }),
  },
  WalletConnectV2Provider: jest.fn(),
  WebWalletProvider: jest.fn(),
  HWProvider: jest.fn(),
}));

// Mock sonner toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warning: jest.fn(),
  },
}));