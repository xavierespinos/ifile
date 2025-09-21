import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { FC, useState, useRef } from "react";
import { View, StyleSheet, ViewProps, Pressable, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { ViewMode, SortOption } from "types/types";

interface Props extends ViewProps {
  onModeChange?: (mode: ViewMode) => void;
  selectedMode?: ViewMode;
  onSortChange?: (sort: SortOption) => void;
  selectedSort?: SortOption;
}

const DocumentsFilters: FC<Props> = ({
  onModeChange,
  selectedMode,
  onSortChange,
  selectedSort = "name",
  ...props
}) => {
  const animatedValue = useSharedValue(0);
  const sortActionSheetRef = useRef<ActionSheetRef>(null);

  const handleModeChange = (mode: ViewMode) => {
    animatedValue.value = withTiming(mode === "list" ? 0 : 1, {
      duration: 200,
    });
    onModeChange?.(mode);
  };

  const handleSortPress = () => {
    sortActionSheetRef.current?.show();
  };

  const handleSortSelect = (sort: SortOption) => {
    onSortChange?.(sort);
    sortActionSheetRef.current?.hide();
  };

  const backgroundAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(animatedValue.value, [0, 1], [0, 40]);
    return {
      transform: [{ translateX }],
    };
  });

  return (
    <>
      <View style={[styles.container, props.style]}>
        <Pressable style={styles.sortButton} onPress={handleSortPress}>
          <FontAwesome name="sort" size={20} color="#666" />
          <Text style={styles.sortText}>Sort by</Text>
          <View style={styles.divider} />
          <FontAwesome name="caret-down" size={14} color="#666" />
        </Pressable>

        <View style={styles.selector}>
          <Animated.View
            style={[styles.selectedBackground, backgroundAnimatedStyle]}
          />

          <Pressable
            style={styles.option}
            onPress={() => handleModeChange("list")}
          >
            <Ionicons
              name="list"
              size={20}
              color={selectedMode === "list" ? "#007AFF" : "#666"}
            />
          </Pressable>

          <Pressable
            style={styles.option}
            onPress={() => handleModeChange("grid")}
          >
            <Ionicons
              name="grid-outline"
              size={18}
              color={selectedMode === "grid" ? "#007AFF" : "#666"}
            />
          </Pressable>
        </View>
      </View>

      <ActionSheet ref={sortActionSheetRef} containerStyle={styles.actionSheet}>
        <View style={styles.actionSheetContent}>
          <Text style={styles.actionSheetTitle}>Sort by</Text>

          <Pressable
            style={[
              styles.sortOption,
              selectedSort === "name" && styles.selectedSortOption,
            ]}
            onPress={() => handleSortSelect("name")}
          >
            <Text
              style={[
                styles.sortOptionText,
                selectedSort === "name" && styles.selectedSortOptionText,
              ]}
            >
              Document name
            </Text>
            {selectedSort === "name" && (
              <Ionicons name="checkmark" size={20} color="#007AFF" />
            )}
          </Pressable>

          <Pressable
            style={[
              styles.sortOption,
              selectedSort === "date" && styles.selectedSortOption,
            ]}
            onPress={() => handleSortSelect("date")}
          >
            <Text
              style={[
                styles.sortOptionText,
                selectedSort === "date" && styles.selectedSortOptionText,
              ]}
            >
              Date
            </Text>
            {selectedSort === "date" && (
              <Ionicons name="checkmark" size={20} color="#007AFF" />
            )}
          </Pressable>
        </View>
      </ActionSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selector: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 2,
    backgroundColor: "#f8f8f8",
    position: "relative",
  },
  selectedBackground: {
    position: "absolute",
    width: 40,
    height: 36,
    backgroundColor: "#fff",
    borderRadius: 6,
    top: 2,
    left: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  option: {
    width: 40,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
  },
  sortText: {
    fontSize: 14,
    color: "#666",
  },
  divider: {
    width: 1,
    height: 16,
    backgroundColor: "#ddd",
  },
  actionSheet: {
    padding: 20,
  },
  actionSheetContent: {
    gap: 16,
  },
  actionSheetTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  sortOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
  },
  selectedSortOption: {
    backgroundColor: "#e3f2fd",
  },
  sortOptionText: {
    fontSize: 16,
    color: "#333",
  },
  selectedSortOptionText: {
    color: "#007AFF",
    fontWeight: "500",
  },
});

export default DocumentsFilters;
