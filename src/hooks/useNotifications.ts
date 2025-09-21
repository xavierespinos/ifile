import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { websocketService } from "services/websocketService";
import { Notification } from "types/Notification";
import Toast from "react-native-toast-message";

const NOTIFICATIONS_STORAGE_KEY = "@notifications";

export const useNotifications = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  // Save notifications to AsyncStorage
  const saveNotifications = async (notificationsList: Notification[]) => {
    try {
      await AsyncStorage.setItem(
        NOTIFICATIONS_STORAGE_KEY,
        JSON.stringify(notificationsList)
      );
    } catch (error) {
      // Silent error handling
    }
  };

  // Load notifications from AsyncStorage
  const loadNotifications = async () => {
    try {
      const stored = await AsyncStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      if (stored) {
        const parsedNotifications: Notification[] = JSON.parse(stored);
        setNotifications(parsedNotifications);
        setNotificationCount(parsedNotifications.length);
      }
    } catch (error) {
      // Silent error handling
    }
  };

  useEffect(() => {
    // Load saved notifications on app start
    loadNotifications();

    const unsubscribeNotifications = websocketService.subscribe(
      "notification",
      (notification: Notification) => {
        // Add new notification to the list
        setNotifications((prev) => {
          const updatedNotifications = [notification, ...prev];

          // Save to AsyncStorage
          saveNotifications(updatedNotifications);

          return updatedNotifications;
        });

        setNotificationCount((prev) => prev + 1);

        // Show toast message
        // Toast.show({
        //   type: "info",
        //   text1: "Document Updated",
        //   text2: `${notification.user.name} has updated the ${notification.document.title} document`,
        //   position: "top",
        //   visibilityTime: 4000,
        // });
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

  const clearNotifications = async () => {
    setNotificationCount(0);
    setNotifications([]);
    await saveNotifications([]);
    Toast.show({ type: "success", text1: "Notifications cleared" });
  };

  return {
    notificationCount,
    notifications,
    isConnected,
    clearNotifications,
  };
};
