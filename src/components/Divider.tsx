import { View, StyleSheet } from "react-native";
import { COLORS } from "constants/theme";

const Divider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: COLORS.BORDER_PRIMARY,
    width: "100%",
  },
});

export default Divider;
