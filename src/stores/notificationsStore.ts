import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { websocketService } from 'services/websocketService';
import { Notification } from 'types/Notification';
import Toast from 'react-native-toast-message';

interface NotificationsState {
  notifications: Notification[];
  notificationCount: number;
  isConnected: boolean;
  isInitialized: boolean;
  unsubscribe: (() => void) | null;
  connectionInterval: NodeJS.Timeout | null;

  // Actions
  addNotification: (notification: Notification) => void;
  clearNotifications: () => void;
  setIsConnected: (connected: boolean) => void;
  initializeWebSocket: () => void;
  cleanup: () => void;
}

export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set, get) => ({
      notifications: [],
      notificationCount: 0,
      isConnected: false,
      isInitialized: false,
      unsubscribe: null,
      connectionInterval: null,

      addNotification: (notification: Notification) => {
        const { notifications } = get();
        const updatedNotifications = [notification, ...notifications];

        set({
          notifications: updatedNotifications,
          notificationCount: updatedNotifications.length,
        });
      },

      clearNotifications: () => {
        set({
          notifications: [],
          notificationCount: 0,
        });
        Toast.show({ type: 'success', text1: 'Notifications cleared' });
      },

      setIsConnected: (connected: boolean) => {
        set({ isConnected: connected });
      },

      initializeWebSocket: () => {
        const state = get();

        if (state.isInitialized) return;

        // Subscribe to WebSocket notifications
        const unsubscribeNotifications = websocketService.subscribe(
          'notification',
          state.addNotification
        );

        // Check connection status
        const checkConnection = () => {
          const connected = websocketService.isConnected();
          get().setIsConnected(connected);
        };

        checkConnection();
        const connectionInterval = setInterval(checkConnection, 2000);

        // Store cleanup references and mark as initialized
        set({
          isInitialized: true,
          unsubscribe: unsubscribeNotifications,
          connectionInterval: connectionInterval,
        });
      },

      cleanup: () => {
        const { unsubscribe, connectionInterval } = get();

        if (unsubscribe) {
          unsubscribe();
        }

        if (connectionInterval) {
          clearInterval(connectionInterval);
        }

        set({
          isInitialized: false,
          unsubscribe: null,
          connectionInterval: null,
        });
      },
    }),
    {
      name: 'notifications-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        notifications: state.notifications,
        notificationCount: state.notificationCount,
      }),
      skipHydration: true,
    }
  )
);