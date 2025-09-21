import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomButton from '../Button';

describe('CustomButton', () => {
  it('renders button text correctly', () => {
    const { getByText } = render(
      <CustomButton cta="Click me" onPress={() => {}} />
    );

    expect(getByText('Click me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <CustomButton cta="Click me" onPress={onPressMock} />
    );

    fireEvent.press(getByText('Click me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('shows loading spinner when loading', () => {
    const { queryByText } = render(
      <CustomButton cta="Click me" onPress={() => {}} isLoading={true} />
    );

    // Button text should not be visible when loading
    expect(queryByText('Click me')).toBeNull();
  });

  it('does not call onPress when loading', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <CustomButton cta="Click me" onPress={onPressMock} isLoading={true} />
    );

    // Find the Pressable by the loading spinner it contains
    const loadingSpinner = getByTestId('loading-spinner');
    fireEvent.press(loadingSpinner.parent);
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('renders with custom text', () => {
    const longText = "This is a very long button text that might wrap";
    const { getByText } = render(
      <CustomButton cta={longText} onPress={() => {}} />
    );

    expect(getByText(longText)).toBeTruthy();
  });
});