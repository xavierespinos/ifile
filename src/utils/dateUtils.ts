export const formatTimeAgo = (
  timestamp: Date | string,
  t: (key: string, options?: { count?: number }) => string
): string => {
  const now = new Date();
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);

  if (isNaN(date.getTime())) {
    return t("notifications.timeAgo.unknownTime");
  }

  const diffInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60)
  );

  if (diffInMinutes < 1) return t("notifications.timeAgo.justNow");
  if (diffInMinutes < 60)
    return t("notifications.timeAgo.minutesAgo", { count: diffInMinutes });

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24)
    return t("notifications.timeAgo.hoursAgo", { count: diffInHours });

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7)
    return t("notifications.timeAgo.daysAgo", { count: diffInDays });

  return date.toLocaleDateString();
};
