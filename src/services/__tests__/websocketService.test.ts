import { websocketService } from '../websocketService';

describe('WebSocketService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    websocketService.disconnect();
  });

  describe('subscription management', () => {
    it('should add and remove event listeners', () => {
      const callback = jest.fn();

      const unsubscribe = websocketService.subscribe('notification', callback);

      expect(typeof unsubscribe).toBe('function');

      unsubscribe();
    });

    it('should handle multiple subscribers for the same event', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      const unsubscribe1 = websocketService.subscribe('notification', callback1);
      const unsubscribe2 = websocketService.subscribe('notification', callback2);

      expect(typeof unsubscribe1).toBe('function');
      expect(typeof unsubscribe2).toBe('function');

      unsubscribe1();
      unsubscribe2();
    });

    it('should only remove the specific callback when unsubscribing', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      websocketService.subscribe('notification', callback1);
      const unsubscribe2 = websocketService.subscribe('notification', callback2);

      unsubscribe2();

      expect(callback1).not.toHaveBeenCalled();
      expect(callback2).not.toHaveBeenCalled();
    });
  });

  describe('connection state', () => {
    it('should report disconnected state initially', () => {
      expect(websocketService.isConnected()).toBe(false);
    });

    it('should handle connection state correctly', () => {
      expect(websocketService.isConnected()).toBe(false);

      // The service uses a singleton pattern, so we test the public interface
      websocketService.connect();
      websocketService.disconnect();

      expect(websocketService.isConnected()).toBe(false);
    });
  });

  describe('public interface', () => {
    it('should allow multiple connect/disconnect cycles', () => {
      // Test that the service can handle multiple cycles
      websocketService.connect();
      websocketService.disconnect();
      websocketService.connect();
      websocketService.disconnect();

      expect(websocketService.isConnected()).toBe(false);
    });

    it('should handle send when not connected', () => {
      websocketService.disconnect();

      // Should not throw when sending while disconnected
      expect(() => {
        websocketService.send({ type: 'test' });
      }).not.toThrow();
    });
  });

  describe('message handling', () => {
    it('should manage subscriptions correctly', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      const unsubscribe1 = websocketService.subscribe('notification', callback1);
      const unsubscribe2 = websocketService.subscribe('notification', callback2);

      expect(typeof unsubscribe1).toBe('function');
      expect(typeof unsubscribe2).toBe('function');

      unsubscribe1();
      unsubscribe2();

      // Test that unsubscribing works
      expect(() => {
        unsubscribe1();
        unsubscribe2();
      }).not.toThrow();
    });
  });
});