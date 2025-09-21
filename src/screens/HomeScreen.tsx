import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import DocumentsHeader from "components/DocumentsHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "components/Button";
import Divider from "components/Divider";
import { fetchDocuments } from "api/api";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "components/LoadingSpinner";
import DocumentCard from "components/DocumentCard";
import DocumentCardGrid from "components/DocumentCardGrid";
import DocumentCardSkeleton from "components/DocumentCardSkeleton";
import AddDocumentModal from "components/AddDocumentModal";
import { ActionSheetRef } from "react-native-actions-sheet";
import { useMemo, useRef, useState } from "react";
import DocumentsFilters from "components/DocumentsFilters";
import { ViewMode, SortOption } from "types/types";
import { sortDocuments } from "utils/sorting";
import { useTranslation } from "hooks/useTranslation";

const HomeScreen = () => {
  const { t } = useTranslation();
  const [selectedMode, setSelectedMode] = useState<ViewMode>("list");
  const [selectedSort, setSelectedSort] = useState<SortOption>("name");
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const { isPending, data, refetch, isRefetching } = useQuery({
    queryKey: ["documents"],
    queryFn: fetchDocuments,
  });

  const sortedData = useMemo(() => {
    if (!data) return [];
    return sortDocuments(data, selectedSort === "name" ? "name" : "date");
  }, [data, selectedSort]);

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
              <DocumentCardSkeleton />
              <DocumentCardSkeleton />
              <DocumentCardSkeleton />
            </View>
          ) : (
            <>
              <DocumentsFilters
                style={styles.filters}
                selectedMode={selectedMode}
                onModeChange={(mode) => setSelectedMode(mode)}
                selectedSort={selectedSort}
                onSortChange={(sort) => setSelectedSort(sort)}
              />
              <FlatList
                style={styles.documentsContainer}
                data={sortedData || []}
                renderItem={({ item }) =>
                  selectedMode === "list" ? (
                    <DocumentCard document={item} />
                  ) : (
                    <DocumentCardGrid document={item} />
                  )
                }
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                numColumns={selectedMode === "grid" ? 2 : 1}
                key={selectedMode}
                columnWrapperStyle={
                  selectedMode === "grid" ? styles.gridRow : undefined
                }
                ListEmptyComponent={<Text>{t('documents.noDocuments')}</Text>}
                refreshControl={
                  <RefreshControl
                    onRefresh={() => refetch()}
                    refreshing={isRefetching}
                  />
                }
              />
            </>
          )}

          <AddDocumentModal actionSheetRef={actionSheetRef} />

          <>
            <View style={styles.dividerContainer}>
              <Divider />
            </View>
            <CustomButton
              cta={t('documents.addDocument')}
              onPress={() => {
                actionSheetRef.current?.show();
              }}
              style={styles.button}
            />
          </>
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
    marginTop: 20,
    gap: 20,
  },
  filters: {
    marginVertical: 10,
  },
  gridRow: {
    justifyContent: "space-between",
    marginHorizontal: -4,
  },
});
