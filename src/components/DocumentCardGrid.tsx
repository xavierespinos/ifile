import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Document } from "types/Document";

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
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    minHeight: 70,
    justifyContent: "space-between",
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    lineHeight: 20,
    marginBottom: 4,
  },
  version: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
});

export default DocumentCardGrid;
