import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import DocumentsHeader from "components/DocumentsHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "components/Button";
import Divider from "components/Divider";
import { fetchDocuments } from "api/api";
import { useQuery } from "@tanstack/react-query";
import DocumentCard from "components/DocumentCard";
import DocumentCardGrid from "components/DocumentCardGrid";
import DocumentCardSkeleton from "components/DocumentCardSkeleton";
import AddDocumentModal from "components/AddDocumentModal";
import { ActionSheetRef } from "react-native-actions-sheet";
import { useMemo, useRef, useState, useCallback } from "react";
import DocumentsFilters from "components/DocumentsFilters";
import { ViewMode, SortOption } from "types/types";
import { sortDocuments } from "utils/sorting";
import { useTranslation } from "hooks/useTranslation";
import { Document } from "types/Document";
import { ListRenderItem } from "react-native";

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

  const renderItem: ListRenderItem<Document> = useCallback(
    ({ item }) => {
      return selectedMode === "list" ? (
        <DocumentCard document={item} />
      ) : (
        <DocumentCardGrid document={item} />
      );
    },
    [selectedMode]
  );

  const keyExtractor = useCallback((item: Document) => item.id, []);

  const getItemLayout = useCallback(
    (_data: ArrayLike<Document> | null | undefined, index: number) => {
      const ITEM_HEIGHT = selectedMode === "list" ? 120 : 160;
      return {
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      };
    },
    [selectedMode]
  );

  const ListEmptyComponent = useMemo(
    () => <Text>{t("documents.noDocuments")}</Text>,
    [t]
  );

  const refreshControl = useMemo(
    () => <RefreshControl onRefresh={refetch} refreshing={isRefetching} />,
    [refetch, isRefetching]
  );

  const handleModeChange = useCallback((mode: ViewMode) => {
    setSelectedMode(mode);
  }, []);

  const handleSortChange = useCallback((sort: SortOption) => {
    setSelectedSort(sort);
  }, []);

  const handleAddDocument = useCallback(() => {
    actionSheetRef.current?.show();
  }, []);

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
                onModeChange={handleModeChange}
                selectedSort={selectedSort}
                onSortChange={handleSortChange}
              />
              <FlatList
                style={styles.documentsContainer}
                data={sortedData || []}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                getItemLayout={getItemLayout}
                showsVerticalScrollIndicator={false}
                numColumns={selectedMode === "grid" ? 2 : 1}
                key={selectedMode}
                columnWrapperStyle={
                  selectedMode === "grid" ? styles.gridRow : undefined
                }
                ListEmptyComponent={ListEmptyComponent}
                refreshControl={refreshControl}
                // Performance optimizations
                removeClippedSubviews={true}
                maxToRenderPerBatch={10}
                updateCellsBatchingPeriod={50}
                initialNumToRender={10}
                windowSize={10}
                // Reduce re-renders
                extraData={selectedMode}
              />
            </>
          )}

          <AddDocumentModal actionSheetRef={actionSheetRef} />

          <>
            <View style={styles.dividerContainer}>
              <Divider />
            </View>
            <CustomButton
              cta={t("documents.addDocument")}
              onPress={handleAddDocument}
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
