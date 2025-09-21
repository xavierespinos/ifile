// React Native mock for testing
const React = require('react');

const Pressable = ({ onPress, children, style, ...props }) => {
  const handlePress = () => {
    if (onPress && typeof onPress === 'function') {
      onPress();
    }
  };

  return React.createElement(
    'View',
    {
      ...props,
      onClick: handlePress, // For testing purposes
      onPress: handlePress,
      role: onPress ? 'button' : undefined,
      style: typeof style === 'function' ? style({ pressed: false }) : style
    },
    children
  );
};

module.exports = {
  View: 'View',
  Text: 'Text',
  Pressable,
  StyleSheet: {
    create: (styles) => styles,
    flatten: (styles) => styles,
  },
  FlatList: 'FlatList',
  RefreshControl: 'RefreshControl',
};