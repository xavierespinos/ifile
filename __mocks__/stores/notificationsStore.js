export const useNotificationsStore = jest.fn(() => ({
  notifications: [],
  notificationCount: 0,
  isConnected: false,
  isInitialized: false,
  unsubscribe: null,
  connectionInterval: null,
  addNotification: jest.fn(),
  clearNotifications: jest.fn(),
  setIsConnected: jest.fn(),
  initializeWebSocket: jest.fn(),
  cleanup: jest.fn(),
}));

useNotificationsStore.persist = {
  rehydrate: jest.fn(),
};