import React, { FC, memo } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Document } from "types/Document";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "hooks/useTranslation";
import { COLORS, UNIT, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, SHADOWS } from "constants/theme";

interface Props {
  document: Document;
}

const DocumentCard: FC<Props> = ({ document }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{document.title}</Text>
        </View>
        <Text style={styles.version}>{t('documents.version', { version: document.version })}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="people-outline" size={20} color={COLORS.TEXT_TERTIARY} />
            <Text style={styles.subtitle}>{t('documents.contributors')}</Text>
          </View>
          {document.contributors.map((contributor, index) => (
            <Text
              key={`${document.id}-contributor-${index}`}
              style={styles.detail}
            >
              {contributor.name}
            </Text>
          ))}
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="attach-outline" size={20} color={COLORS.TEXT_TERTIARY} />
            <Text style={styles.subtitle}>{t('documents.attachments')}</Text>
          </View>
          {document.attachments.map((attachment, index) => (
            <Text
              key={`${document.id}-attachment-${index}`}
              style={styles.detail}
            >
              {attachment}
            </Text>
          ))}
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
    marginBottom: UNIT.LG,
  },
  title: {
    fontSize: FONT_SIZE.MD,
    fontWeight: FONT_WEIGHT.BOLD,
    color: COLORS.TEXT_PRIMARY,
  },
  titleContainer: {
    flex: 1,
    marginRight: UNIT.SM,
  },
  subtitle: {
    fontSize: FONT_SIZE.SM,
    fontWeight: FONT_WEIGHT.SEMIBOLD,
    color: COLORS.TEXT_PRIMARY,
  },
  version: {
    fontSize: FONT_SIZE.SM,
    color: COLORS.TEXT_TERTIARY,
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
  section: {
    width: "50%",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: UNIT.XS,
  },
  detail: {
    fontSize: FONT_SIZE.SM,
    color: COLORS.TEXT_TERTIARY,
    marginTop: UNIT.SM,
  },
});

export default memo(DocumentCard);
