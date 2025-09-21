import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { FC, useRef } from "react";
import { View, StyleSheet, ViewProps, Pressable, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { ViewMode, SortOption } from "types/types";
import { useTranslation } from "hooks/useTranslation";
import { COLORS, UNIT, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, SHADOWS } from "constants/theme";

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
  const { t } = useTranslation();
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
    const translateX = interpolate(animatedValue.value, [0, 1], [0, UNIT.XL * 2]);
    return {
      transform: [{ translateX }],
    };
  });

  return (
    <>
      <View style={[styles.container, props.style]}>
        <Pressable style={styles.sortButton} onPress={handleSortPress}>
          <FontAwesome name="sort" size={UNIT.XL} color={COLORS.TEXT_SECONDARY} />
          <Text style={styles.sortText}>{t('sorting.sortBy')}</Text>
          <View style={styles.divider} />
          <FontAwesome name="caret-down" size={UNIT.MD + 2} color={COLORS.TEXT_SECONDARY} />
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
              size={UNIT.XL}
              color={selectedMode === "list" ? COLORS.PRIMARY : COLORS.TEXT_SECONDARY}
            />
          </Pressable>

          <Pressable
            style={styles.option}
            onPress={() => handleModeChange("grid")}
          >
            <Ionicons
              name="grid-outline"
              size={UNIT.LG + 2}
              color={selectedMode === "grid" ? COLORS.PRIMARY : COLORS.TEXT_SECONDARY}
            />
          </Pressable>
        </View>
      </View>

      <ActionSheet ref={sortActionSheetRef} containerStyle={styles.actionSheet}>
        <View style={styles.actionSheetContent}>
          <Text style={styles.actionSheetTitle}>{t('sorting.sortBy')}</Text>

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
              {t('sorting.documentName')}
            </Text>
            {selectedSort === "name" && (
              <Ionicons name="checkmark" size={UNIT.XL} color={COLORS.PRIMARY} />
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
              {t('sorting.date')}
            </Text>
            {selectedSort === "date" && (
              <Ionicons name="checkmark" size={UNIT.XL} color={COLORS.PRIMARY} />
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
    borderColor: COLORS.BORDER_SECONDARY,
    borderRadius: BORDER_RADIUS.MD,
    padding: UNIT.XS / 2,
    backgroundColor: COLORS.BACKGROUND_TERTIARY,
    position: "relative",
  },
  selectedBackground: {
    position: "absolute",
    width: UNIT.XL * 2,
    height: UNIT.XL + UNIT.LG,
    backgroundColor: COLORS.BACKGROUND_PRIMARY,
    borderRadius: BORDER_RADIUS.LG,
    top: UNIT.XS / 2,
    left: UNIT.XS / 2,
    ...SHADOWS.SMALL,
  },
  option: {
    width: UNIT.XL * 2,
    height: UNIT.XL + UNIT.LG,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: UNIT.SM,
    paddingHorizontal: UNIT.MD,
    paddingVertical: UNIT.SM,
    borderWidth: 1,
    borderColor: COLORS.BORDER_SECONDARY,
    borderRadius: BORDER_RADIUS.MD,
    backgroundColor: COLORS.BACKGROUND_TERTIARY,
  },
  sortText: {
    fontSize: FONT_SIZE.SM,
    color: COLORS.TEXT_SECONDARY,
  },
  divider: {
    width: 1,
    height: UNIT.LG,
    backgroundColor: COLORS.BORDER_PRIMARY,
  },
  actionSheet: {
    padding: UNIT.XL,
  },
  actionSheetContent: {
    gap: UNIT.LG,
  },
  actionSheetTitle: {
    fontSize: FONT_SIZE.LG,
    fontWeight: FONT_WEIGHT.SEMIBOLD,
    textAlign: "center",
    marginBottom: UNIT.SM,
  },
  sortOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: UNIT.MD,
    paddingHorizontal: UNIT.LG,
    borderRadius: BORDER_RADIUS.MD,
    backgroundColor: COLORS.BACKGROUND_TERTIARY,
  },
  selectedSortOption: {
    backgroundColor: COLORS.PRIMARY_LIGHT,
  },
  sortOptionText: {
    fontSize: FONT_SIZE.MD,
    color: COLORS.TEXT_PRIMARY,
  },
  selectedSortOptionText: {
    color: COLORS.PRIMARY,
    fontWeight: FONT_WEIGHT.MEDIUM,
  },
});

export default DocumentsFilters;
