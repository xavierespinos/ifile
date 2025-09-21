import { useState, useEffect } from "react";
import { websocketService } from "services/websocketService";

export const useNotifications = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const unsubscribeNotifications = websocketService.subscribe(
      "notification",
      () => {
        setNotificationCount((prev) => prev + 1);
      }
    );

    const checkConnection = () => {
      const connected = websocketService.isConnected();
      setIsConnected(connected);
    };

    checkConnection();
    const connectionInterval = setInterval(checkConnection, 2000);

    return () => {
      unsubscribeNotifications();
      clearInterval(connectionInterval);
    };
  }, []);

  const clearNotifications = () => {
    setNotificationCount(0);
  };

  return {
    notificationCount,
    isConnected,
    clearNotifications,
  };
};
