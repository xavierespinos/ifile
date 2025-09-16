import { StyleSheet, Text, View } from "react-native";
import DocumentsHeader from "../components/DocumentsHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/Button";
import Divider from "../components/Divider";

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
          <View>
            <View style={styles.dividerContainer}>
              <Divider />
            </View>
            <View style={styles.buttonContainer}>
              <CustomButton
                cta="+ Add document"
                onPress={() => console.log("Button Pressed")}
              />
            </View>
          </View>
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
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: "space-between",
  },
  dividerContainer: {
    marginHorizontal: -20,
  },
  buttonContainer: {
    marginTop: 0,
  },
});
