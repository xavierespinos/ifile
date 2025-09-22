const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || "";
const WS_URL = API_BASE_URL.replace("http", "ws") + "/notifications";

import {
  NotificationDTO,
  Notification,
  mapNotificationDTOToNotification,
} from "types/Notification";

class WebSocketService {
  private ws: WebSocket | null = null;
  private listeners: Map<string, ((data: Notification) => void)[]> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 3000;
  private isConnecting = false;
  private throttleInterval = 5000; // 5 seconds
  private pendingNotifications: Notification[] = [];
  private throttleTimer: NodeJS.Timeout | null = null;

  connect(): void {
    if (this.ws?.readyState === WebSocket.OPEN || this.isConnecting) {
      return;
    }

    this.isConnecting = true;

    try {
      this.ws = new WebSocket(WS_URL);

      this.ws.onopen = () => {
        this.isConnecting = false;
        this.reconnectAttempts = 0;
      };

      this.ws.onmessage = (event) => {
        try {
          const dto: NotificationDTO = JSON.parse(event.data);
          const notification = mapNotificationDTOToNotification(dto);
          this.addToThrottleBuffer(notification);
        } catch (error) {}
      };

      this.ws.onclose = () => {
        this.isConnecting = false;
        this.handleReconnect();
      };

      this.ws.onerror = () => {
        this.isConnecting = false;
      };
    } catch (error) {
      this.isConnecting = false;
    }
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.reconnectAttempts = this.maxReconnectAttempts;
    this.clearThrottleTimer();
  }

  private handleReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;

      setTimeout(() => {
        this.connect();
      }, this.reconnectInterval);
    }
  }

  subscribe(
    eventType: string,
    callback: (data: Notification) => void
  ): () => void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }

    this.listeners.get(eventType)!.push(callback);

    return () => {
      const callbacks = this.listeners.get(eventType);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) {
          callbacks.splice(index, 1);
        }
      }
    };
  }

  private notifyListeners(eventType: string, data: Notification): void {
    const callbacks = this.listeners.get(eventType);
    if (callbacks) {
      callbacks.forEach((callback) => callback(data));
    }

    const wildcardCallbacks = this.listeners.get("*");
    if (wildcardCallbacks) {
      wildcardCallbacks.forEach((callback) => callback(data));
    }
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  send(data: unknown): void {
    if (this.isConnected()) {
      this.ws!.send(JSON.stringify(data));
    }
  }

  // Used to reduce the number of notifications sent in a short period
  private addToThrottleBuffer(notification: Notification): void {
    this.pendingNotifications.push(notification);

    if (!this.throttleTimer) {
      this.throttleTimer = setTimeout(() => {
        this.processThrottledNotifications();
      }, this.throttleInterval);
    }
  }

  private processThrottledNotifications(): void {
    if (this.pendingNotifications.length > 0) {
      // Send all pending notifications
      this.pendingNotifications.forEach((notification) => {
        this.notifyListeners("notification", notification);
      });

      // Clear the buffer
      this.pendingNotifications = [];
    }

    // Clear the timer
    this.clearThrottleTimer();
  }

  private clearThrottleTimer(): void {
    if (this.throttleTimer) {
      clearTimeout(this.throttleTimer);
      this.throttleTimer = null;
    }
  }
}

export const websocketService = new WebSocketService();
