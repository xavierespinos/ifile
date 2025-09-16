import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DocumentsHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Documents</Text>
      <Ionicons
        name="notifications-outline"
        size={20}
        style={styles.iconContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  iconContainer: {
    padding: 8,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
});

export default DocumentsHeader;
