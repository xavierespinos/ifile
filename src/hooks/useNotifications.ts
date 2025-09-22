import { useEffect } from "react";
import { useNotificationsStore } from "stores/notificationsStore";

export const useNotifications = () => {
  const store = useNotificationsStore();

  useEffect(() => {
    // Manually rehydrate the store
    useNotificationsStore.persist.rehydrate();

    // Initialize WebSocket
    store.initializeWebSocket();

    // Cleanup on unmount
    return () => {
      store.cleanup();
    };
  }, []); // Empty dependency array to run only once

  return {
    notificationCount: store.notificationCount,
    notifications: store.notifications,
    isConnected: store.isConnected,
    clearNotifications: store.clearNotifications,
  };
};
