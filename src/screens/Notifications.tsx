import React, { FC, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ListRenderItem,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNotifications } from "hooks/useNotifications";
import { useTranslation } from "hooks/useTranslation";
import { Notification } from "types/Notification";
import { formatTimeAgo } from "utils/dateUtils";
import {
  COLORS,
  UNIT,
  BORDER_RADIUS,
  FONT_SIZE,
  FONT_WEIGHT,
  SHADOWS,
  LAYOUT,
} from "constants/theme";

const Notifications: FC = () => {
  const { t } = useTranslation();
  const { notifications, clearNotifications, isConnected } = useNotifications();

  const keyExtractor = useCallback((item: Notification) => item.id, []);

  const renderNotificationItem: ListRenderItem<Notification> = useCallback(
    ({ item }) => (
      <View style={styles.notificationCard}>
        <View style={styles.notificationHeader}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="document-text-outline"
              size={20}
              color={COLORS.PRIMARY}
            />
          </View>
          <View style={styles.notificationContent}>
            <Text style={styles.notificationTitle}>
              {t("notifications.documentUpdated")}
            </Text>
            <Text style={styles.notificationMessage}>
              <Text style={styles.userName}>{item.user.name}</Text>{" "}
              {t("notifications.hasUpdatedDocument")}{" "}
              <Text style={styles.documentTitle}>{item.document.title}</Text>{" "}
              {t("notifications.document")}
            </Text>
            <Text style={styles.timestamp}>
              {formatTimeAgo(item.timestamp, t)}
            </Text>
          </View>
        </View>
      </View>
    ),
    [t]
  );

  const ListEmptyComponent = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <Ionicons
          name="notifications-off-outline"
          size={64}
          color={COLORS.TEXT_TERTIARY}
        />
        <Text style={styles.emptyTitle}>{t("notifications.emptyTitle")}</Text>
        <Text style={styles.emptySubtitle}>
          {t("notifications.emptySubtitle")}
        </Text>
      </View>
    ),
    [t]
  );

  const ListHeaderComponent = useCallback(
    () => (
      <View style={styles.headerContent}>
        {notifications.length > 0 && (
          <Pressable onPress={clearNotifications}>
            <Text style={styles.clearButtonText}>
              {t("notifications.clearAll")}
            </Text>
          </Pressable>
        )}
      </View>
    ),
    [isConnected, notifications.length, clearNotifications, t]
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={ListEmptyComponent}
        ListHeaderComponent={ListHeaderComponent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          notifications.length === 0 && styles.emptyListContent,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_SECONDARY,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: LAYOUT.CONTENT_PADDING,
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  headerContent: {
    paddingVertical: UNIT.LG,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: UNIT.SM,
  },
  screenTitle: {
    fontSize: FONT_SIZE.XL,
    fontWeight: FONT_WEIGHT.BOLD,
    color: COLORS.TEXT_PRIMARY,
  },
  connectionText: {
    fontSize: FONT_SIZE.XS,
    color: COLORS.TEXT_TERTIARY,
  },
  clearButtonText: {
    fontSize: FONT_SIZE.SM,
    color: COLORS.PRIMARY,
    fontWeight: FONT_WEIGHT.MEDIUM,
  },
  notificationCard: {
    backgroundColor: COLORS.BACKGROUND_PRIMARY,
    borderRadius: BORDER_RADIUS.LG,
    padding: UNIT.LG,
    marginBottom: UNIT.LG,
    ...SHADOWS.SMALL,
  },
  notificationHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.BACKGROUND_SECONDARY,
    justifyContent: "center",
    alignItems: "center",
    marginRight: UNIT.MD,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: FONT_SIZE.MD,
    fontWeight: FONT_WEIGHT.SEMIBOLD,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: UNIT.XS,
  },
  notificationMessage: {
    fontSize: FONT_SIZE.SM,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 20,
    marginBottom: UNIT.SM,
  },
  userName: {
    fontWeight: FONT_WEIGHT.MEDIUM,
    color: COLORS.TEXT_PRIMARY,
  },
  documentTitle: {
    fontWeight: FONT_WEIGHT.MEDIUM,
    color: COLORS.PRIMARY,
  },
  timestamp: {
    fontSize: FONT_SIZE.XS,
    color: COLORS.TEXT_TERTIARY,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: UNIT.XXXL,
  },
  emptyTitle: {
    fontSize: FONT_SIZE.LG,
    fontWeight: FONT_WEIGHT.SEMIBOLD,
    color: COLORS.TEXT_PRIMARY,
    marginTop: UNIT.LG,
    marginBottom: UNIT.SM,
  },
  emptySubtitle: {
    fontSize: FONT_SIZE.MD,
    color: COLORS.TEXT_SECONDARY,
    textAlign: "center",
    lineHeight: 20,
  },
});

export default Notifications;
