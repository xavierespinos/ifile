import { FC } from "react";
import { Text, View } from "react-native";
import { Document } from "../types/Document";

interface Props {
  document: Document;
}

const DocumentCard: FC<Props> = ({ document }) => {
  return (
    <View>
      <Text>{document.title}</Text>
    </View>
  );
};

export default DocumentCard;
