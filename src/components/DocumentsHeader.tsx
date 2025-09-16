import { Text, View, StyleSheet } from "react-native";

const DocumentsHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Documents</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default DocumentsHeader;
