import { View, StyleSheet } from "react-native";

const Divider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: "#383838ff",
    marginVertical: 10,
    opacity: 0.5,
  },
});

export default Divider;
