import { Ionicons } from "@expo/vector-icons";
import { FC, RefObject } from "react";
import { Text, View, StyleSheet } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import Divider from "./Divider";
import CustomButton from "./Button";
import CustomInput from "./CustomInput";

type Props = {
  actionSheetRef: RefObject<ActionSheetRef | null>;
};

const AddDocumentModal: FC<Props> = ({ actionSheetRef }) => {
  return (
    <ActionSheet ref={actionSheetRef} containerStyle={{ padding: 20 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.title}>Add document</Text>
        <Ionicons
          name="close"
          size={24}
          color={"grey"}
          onPress={() => actionSheetRef?.current?.hide()}
        ></Ionicons>
      </View>
      <Text style={styles.subtitle}>Document information</Text>
      <CustomInput
        placeholder="Document name"
        label="Name"
        style={styles.input}
      />
      <CustomInput
        placeholder="Version"
        label="Version number"
        style={styles.input}
      />
      <>
        <View style={styles.dividerContainer}>
          <Divider />
        </View>
        <CustomButton cta="Submit" onPress={() => {}} style={styles.button} />
      </>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  dividerContainer: {
    marginHorizontal: -20,
  },
  button: {
    marginTop: 10,
  },
});

export default AddDocumentModal;
