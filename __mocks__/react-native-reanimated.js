const Animated = {
  View: 'View',
  Text: 'Text',
  createAnimatedComponent: (component) => component,
};

module.exports = {
  default: Animated,
  useSharedValue: (val) => ({ value: val }),
  useAnimatedStyle: () => ({}),
  withTiming: (val) => val,
  interpolate: (val) => val,
};