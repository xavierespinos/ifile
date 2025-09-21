const React = require('react');

const ActionSheet = React.forwardRef(({ children, containerStyle }, ref) => {
  React.useImperativeHandle(ref, () => ({
    show: jest.fn(),
    hide: jest.fn(),
  }));

  return React.createElement('View', { style: containerStyle }, children);
});

ActionSheet.displayName = 'ActionSheet';

module.exports = ActionSheet;
module.exports.ActionSheetRef = {};
module.exports.default = ActionSheet;