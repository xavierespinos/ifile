import { Text, View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useNotifications } from "hooks/useNotifications";
import { useTranslation } from "hooks/useTranslation";

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
    backgroundColor: "#fff",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  iconWrapper: {
    position: "relative",
  },
  iconContainer: {
    padding: 8,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  badge: {
    position: "absolute",
    top: 3,
    right: 3,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DocumentsHeader;
