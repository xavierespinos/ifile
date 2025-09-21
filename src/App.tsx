import { StatusBar } from "expo-status-bar";
import AppNavigator from "./navigation/AppNavigator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect } from "react";
import Toast from "react-native-toast-message";
import { AppState } from "react-native";
import { websocketService } from "services/websocketService";
import "./assets/localization";

const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    // Handle app state changes for WebSocket connection
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === "active") {
        // App came to foreground, ensure WebSocket is connected
        websocketService.connect();
      } else if (nextAppState === "background") {
        // App went to background, disconnect WebSocket to save resources
        websocketService.disconnect();
      }
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);

    // Initial connection when app loads
    websocketService.connect();

    return () => {
      subscription?.remove();
      websocketService.disconnect();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" />
      <AppNavigator />
      <Toast />
    </QueryClientProvider>
  );
}
