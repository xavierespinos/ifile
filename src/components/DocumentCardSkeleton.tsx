import { View, StyleSheet } from "react-native";
import SkeletonBox from "components/SkeletonBox";
import { COLORS, UNIT, BORDER_RADIUS, SHADOWS } from "constants/theme";

const DocumentCardSkeleton = () => {
  return (
    <View style={styles.card}>
      {/* Header section */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <SkeletonBox width="80%" height={16} style={{ marginBottom: 4 }} />
          <SkeletonBox width="60%" height={14} />
        </View>
        <SkeletonBox width={80} height={14} />
      </View>

      {/* Details section */}
      <View style={styles.detailsContainer}>
        {/* Contributors section */}
        <View style={{ width: "50%" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              marginBottom: 8,
            }}
          >
            <SkeletonBox width={20} height={20} style={{ borderRadius: 10 }} />
            <SkeletonBox width={80} height={14} />
          </View>
          <SkeletonBox width="90%" height={14} style={{ marginBottom: 8 }} />
          <SkeletonBox width="75%" height={14} style={{ marginBottom: 8 }} />
          <SkeletonBox width="85%" height={14} />
        </View>

        {/* Attachments section */}
        <View style={{ width: "50%" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              marginBottom: 8,
            }}
          >
            <SkeletonBox width={20} height={20} style={{ borderRadius: 10 }} />
            <SkeletonBox width={90} height={14} />
          </View>
          <SkeletonBox width="80%" height={14} style={{ marginBottom: 8 }} />
          <SkeletonBox width="70%" height={14} style={{ marginBottom: 8 }} />
          <SkeletonBox width="90%" height={14} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.BACKGROUND_PRIMARY,
    paddingHorizontal: UNIT.LG,
    paddingVertical: UNIT.XL,
    borderRadius: BORDER_RADIUS.LG,
    ...SHADOWS.SMALL,
  },
  titleContainer: {
    flex: 1,
    marginRight: UNIT.SM,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  detailsContainer: {
    marginTop: UNIT.SM,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default DocumentCardSkeleton;
