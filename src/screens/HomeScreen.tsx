import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import DocumentsHeader from "../components/DocumentsHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/Button";
import Divider from "../components/Divider";
import { fetchDocuments } from "../api/api";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/LoadingSpinner";
import DocumentCard from "../components/DocumentCard";

const HomeScreen = () => {
  const { isPending, data, error, refetch, isRefetching } = useQuery({
    queryKey: ["documents"],
    queryFn: fetchDocuments,
  });

  return (
    <>
      <SafeAreaView style={styles.topSafeArea} edges={["top"]} />
      <SafeAreaView
        style={styles.container}
        edges={["left", "right", "bottom"]}
      >
        <DocumentsHeader />
        <View style={styles.content}>
          {isPending ? (
            <View style={styles.loadingContainer}>
              <LoadingSpinner color="blue" />
            </View>
          ) : (
            <>
              <FlatList
                style={styles.documentsContainer}
                data={data || []}
                renderItem={({ item }) => <DocumentCard document={item} />}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<Text>No documents available.</Text>}
                refreshControl={
                  <RefreshControl
                    onRefresh={() => refetch()}
                    refreshing={isRefetching}
                  />
                }
              />
            </>
          )}

          <View>
            <View style={styles.dividerContainer}>
              <Divider />
            </View>
            <CustomButton
              cta="+ Add document"
              onPress={() => {}}
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
  documentsContainer: {
    paddingTop: 20,
    flex: 1,
    width: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
