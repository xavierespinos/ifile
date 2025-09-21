global.WebSocket = class MockWebSocket {
  constructor(url) {
    this.url = url;
    this.readyState = WebSocket.CONNECTING;
    setTimeout(() => {
      this.readyState = WebSocket.OPEN;
      if (this.onopen) this.onopen();
    }, 0);
  }

  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;

  close() {
    this.readyState = WebSocket.CLOSED;
    if (this.onclose) this.onclose();
  }

  send() {
    // Mock send
  }
};

global.fetch = jest.fn();

// Setup i18n for testing
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  lng: 'en',
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        "common": {
          "loading": "Loading...",
          "error": "Error",
          "retry": "Retry",
          "cancel": "Cancel",
          "save": "Save",
          "delete": "Delete",
          "edit": "Edit",
          "add": "Add",
          "close": "Close"
        },
        "documents": {
          "title": "Documents",
          "noDocuments": "No documents available.",
          "addDocument": "+ Add document",
          "version": "Version {{version}}",
          "contributors": "Contributors",
          "attachments": "Attachments",
          "lastUpdated": "Updated: {{date}}"
        },
        "sorting": {
          "sortBy": "Sort by",
          "documentName": "Document name",
          "date": "Date"
        },
        "notifications": {
          "moreThan99": "99+"
        }
      }
    }
  }
});