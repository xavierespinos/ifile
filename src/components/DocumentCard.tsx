import { FC } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Document } from "../types/Document";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  document: Document;
}

const DocumentCard: FC<Props> = ({ document }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{document.title}</Text>
        <Text style={styles.version}>Version {document.version}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={{ width: "50%" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Ionicons name="people-outline" size={20} color={"#6f6e6eff"} />
            <Text style={styles.subtitle}>Contributors</Text>
          </View>
          {document.contributors.map((contributor) => (
            <Text key={contributor.id} style={styles.detail}>
              {contributor.name}
            </Text>
          ))}
        </View>
        <View style={{ width: "50%" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Ionicons name="people-outline" size={20} color={"#6f6e6eff"} />
            <Text style={styles.subtitle}>Attachments</Text>
          </View>
          {document.attachments.map((attachment) => (
            <Text key={attachment} style={styles.detail}>
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
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  version: {
    fontSize: 14,
    color: "#6f6e6eff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  detailsContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detail: {
    fontSize: 14,
    color: "#6f6e6eff",
    marginTop: 8,
  },
});

export default DocumentCard;
