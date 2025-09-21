export interface NotificationDTO {
  Timestamp: string;
  UserID: string;
  UserName: string;
  DocumentID: string;
  DocumentTitle: string;
}

export interface Notification {
  id: string;
  timestamp: Date;
  user: {
    id: string;
    name: string;
  };
  document: {
    id: string;
    title: string;
  };
}

export const mapNotificationDTOToNotification = (
  dto: NotificationDTO
): Notification => {
  return {
    id: `${dto.UserID}-${dto.DocumentID}-${dto.Timestamp}`,
    timestamp: new Date(dto.Timestamp),
    user: {
      id: dto.UserID,
      name: dto.UserName,
    },
    document: {
      id: dto.DocumentID,
      title: dto.DocumentTitle,
    },
  };
};
