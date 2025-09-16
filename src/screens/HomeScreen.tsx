import { ScrollView, StyleSheet, Text, View } from "react-native";
import DocumentsHeader from "../components/DocumentsHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/Button";
import Divider from "../components/Divider";
import { fetchDocuments } from "../api/api";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/LoadingSpinner";
import DocumentCard from "../components/DocumentCard";

const HomeScreen = () => {
  const { isPending, data, error } = useQuery({
    queryKey: ["documents"],
    queryFn: fetchDocuments,
  });

  console.log({ isPending, data, error });

  return (
    <>
      <SafeAreaView style={styles.topSafeArea} edges={["top"]} />
      <SafeAreaView
        style={styles.container}
        edges={["left", "right", "bottom"]}
      >
        <DocumentsHeader />
        <View style={styles.content}>
          <ScrollView>
            {isPending ? (
              <LoadingSpinner />
            ) : (
              <>
                <Text style={styles.title}>Your Documents</Text>
                {data?.length === 0 ? (
                  <Text>No documents available.</Text>
                ) : (
                  data?.map((doc) => <DocumentCard document={doc} />)
                )}
              </>
            )}
          </ScrollView>

          <View>
            <View style={styles.dividerContainer}>
              <Divider />
            </View>
            <CustomButton
              cta="+ Add document"
              onPress={() => console.log("Button Pressed")}
              style={styles.button}
            />
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
  button: {
    marginTop: 10,
  },
});
