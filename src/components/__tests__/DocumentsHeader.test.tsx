import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DocumentsHeader from '../DocumentsHeader';

// Mock the useNotifications hook
jest.mock('hooks/useNotifications', () => ({
  useNotifications: jest.fn(),
}));

// Mock react-native-toast-message
jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

const mockUseNotifications = require('hooks/useNotifications').useNotifications;

describe('DocumentsHeader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays Documents title', () => {
    mockUseNotifications.mockReturnValue({
      notificationCount: 0,
      isConnected: true,
      clearNotifications: jest.fn(),
    });

    const { getByText } = render(<DocumentsHeader />);

    expect(getByText('Documents')).toBeTruthy();
  });

  it('shows no badge when no notifications', () => {
    mockUseNotifications.mockReturnValue({
      notificationCount: 0,
      isConnected: true,
      clearNotifications: jest.fn(),
    });

    const { queryByText } = render(<DocumentsHeader />);

    expect(queryByText('0')).toBeNull();
  });

  it('displays notification count badge', () => {
    mockUseNotifications.mockReturnValue({
      notificationCount: 5,
      isConnected: true,
      clearNotifications: jest.fn(),
    });

    const { getByText } = render(<DocumentsHeader />);

    expect(getByText('Documents')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
  });

  it('displays 99+ for high notification counts', () => {
    mockUseNotifications.mockReturnValue({
      notificationCount: 150,
      isConnected: true,
      clearNotifications: jest.fn(),
    });

    const { getByText } = render(<DocumentsHeader />);

    expect(getByText('99+')).toBeTruthy();
  });

  it('calls clearNotifications when notification icon is pressed', () => {
    const clearNotificationsMock = jest.fn();
    mockUseNotifications.mockReturnValue({
      notificationCount: 3,
      isConnected: true,
      clearNotifications: clearNotificationsMock,
    });

    const { getByTestId } = render(<DocumentsHeader />);

    const notificationButton = getByTestId('notification-button');
    fireEvent.press(notificationButton);

    expect(clearNotificationsMock).toHaveBeenCalledTimes(1);
  });

  it('displays single notification correctly', () => {
    mockUseNotifications.mockReturnValue({
      notificationCount: 1,
      isConnected: true,
      clearNotifications: jest.fn(),
    });

    const { getByText } = render(<DocumentsHeader />);

    expect(getByText('Documents')).toBeTruthy();
    expect(getByText('1')).toBeTruthy();
  });

  it('handles null notification count', () => {
    mockUseNotifications.mockReturnValue({
      notificationCount: null,
      isConnected: true,
      clearNotifications: jest.fn(),
    });

    const { getByText, queryByText } = render(<DocumentsHeader />);

    expect(getByText('Documents')).toBeTruthy();
    expect(queryByText('0')).toBeNull();
  });

  it('renders when disconnected', () => {
    mockUseNotifications.mockReturnValue({
      notificationCount: 3,
      isConnected: false,
      clearNotifications: jest.fn(),
    });

    const { getByText } = render(<DocumentsHeader />);

    expect(getByText('Documents')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
  });
});