const Animated = {
  View: 'View',
  Text: 'Text',
  createAnimatedComponent: (component) => component,
};

module.exports = {
  default: Animated,
  useSharedValue: (val) => ({ value: val }),
  useAnimatedStyle: (fn) => ({}),
  withTiming: (val) => val,
  interpolate: (val, input, output) => val,
};