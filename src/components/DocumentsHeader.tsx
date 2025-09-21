import { Text, View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNotifications } from "hooks/useNotifications";
import { useTranslation } from "hooks/useTranslation";
import { COLORS, UNIT, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, LAYOUT } from "constants/theme";

const DocumentsHeader = () => {
  const { t } = useTranslation();
  const { notificationCount, isConnected, clearNotifications } =
    useNotifications();
  const badgeCount =
    typeof notificationCount === "number" ? notificationCount : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('documents.title')}</Text>
      <Pressable onPress={clearNotifications} testID="notification-button">
        <View style={styles.iconWrapper}>
          <Ionicons
            name="notifications-outline"
            size={20}
            style={styles.iconContainer}
          />
          {!!badgeCount && badgeCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {badgeCount > 99 ? t('notifications.moreThan99') : String(badgeCount)}
              </Text>
            </View>
          )}
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND_PRIMARY,
    padding: LAYOUT.CONTENT_PADDING,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_PRIMARY,
  },
  title: {
    fontSize: FONT_SIZE.XXXL,
    fontWeight: FONT_WEIGHT.BOLD,
    color: COLORS.TEXT_PRIMARY,
  },
  iconWrapper: {
    position: "relative",
  },
  iconContainer: {
    padding: UNIT.SM,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: COLORS.BORDER_PRIMARY,
    borderRadius: BORDER_RADIUS.MD,
    color: COLORS.TEXT_PRIMARY,
  },
  badge: {
    position: "absolute",
    top: UNIT.XS / 2,
    right: UNIT.XS / 2,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: BORDER_RADIUS.MD,
    minWidth: UNIT.LG,
    height: UNIT.LG,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: UNIT.XS,
  },
  badgeText: {
    color: COLORS.TEXT_LIGHT,
    fontSize: FONT_SIZE.XS,
    fontWeight: FONT_WEIGHT.BOLD,
    textAlign: "center",
  },
});

export default DocumentsHeader;
