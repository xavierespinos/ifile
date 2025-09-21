import React, { FC, memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Document } from "types/Document";
import { COLORS, UNIT, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, SHADOWS } from "constants/theme";

interface Props {
  document: Document;
}

const DocumentCardGrid: FC<Props> = ({ document }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title} numberOfLines={2}>
        {document.title}
      </Text>
      <Text style={styles.version}>v{document.version}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.BACKGROUND_PRIMARY,
    borderRadius: BORDER_RADIUS.MD,
    padding: UNIT.MD,
    marginBottom: UNIT.MD,
    marginHorizontal: UNIT.XS,
    ...SHADOWS.SMALL,
    minHeight: 70,
    justifyContent: "space-between",
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZE.MD,
    fontWeight: FONT_WEIGHT.SEMIBOLD,
    color: COLORS.TEXT_PRIMARY,
    lineHeight: UNIT.XL,
    marginBottom: UNIT.XS,
  },
  version: {
    fontSize: FONT_SIZE.XS,
    color: COLORS.TEXT_SECONDARY,
    fontWeight: FONT_WEIGHT.MEDIUM,
  },
});

export default memo(DocumentCardGrid);
