import { StyleSheet, Text, View } from "react-native";
import DocumentsHeader from "../components/DocumentsHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  return (
    <>
      <SafeAreaView style={styles.topSafeArea} edges={["top"]} />
      <SafeAreaView
        style={styles.container}
        edges={["left", "right", "bottom"]}
      >
        <DocumentsHeader />
        <View style={styles.content}>
          <Text style={styles.title}>Home Screen</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  topSafeArea: {
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    backgroundColor: "#f3f2f2ff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  content: {
    padding: 20,
  },
});
