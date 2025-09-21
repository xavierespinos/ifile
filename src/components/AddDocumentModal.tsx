import { AntDesign, Ionicons } from "@expo/vector-icons";
import { FC, RefObject } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { uploadDocument } from "api/api";
import Divider from "./Divider";
import CustomButton from "./Button";
import CustomInput from "./CustomInput";
import Toast from "react-native-toast-message";

type DocumentFormData = {
  name: string;
  version: string;
  file?: string;
};

type Props = {
  actionSheetRef: RefObject<ActionSheetRef | null>;
};

const AddDocumentModal: FC<Props> = ({ actionSheetRef }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<DocumentFormData>({
    defaultValues: {
      name: "",
      version: "",
      file: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: async (data: DocumentFormData) => {
      return uploadDocument(data.name, data.version, data.file);
    },
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Document uploaded successfully",
      });
      reset();
      actionSheetRef.current?.hide();
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Upload failed",
        text2: "Please try again later",
      });
    },
  });

  const onSubmit = (data: DocumentFormData) => {
    mutation.mutate(data);
  };

  const handleClose = () => {
    reset();
    actionSheetRef.current?.hide();
  };

  return (
    <ActionSheet ref={actionSheetRef} containerStyle={{ padding: 20 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.title}>Add document</Text>
        <Pressable onPress={handleClose}>
          <Ionicons name="close" size={24} color={"grey"} />
        </Pressable>
      </View>
      <Text style={styles.subtitle}>Document information</Text>

      <CustomInput
        control={control}
        name="name"
        label="Name"
        placeholder="Document name"
        rules={{
          required: "Document name is required",
          minLength: {
            value: 2,
            message: "Name must be at least 2 characters",
          },
        }}
      />

      <CustomInput
        control={control}
        name="version"
        label="Version number"
        placeholder="1.0.0"
        rules={{
          required: "Version is required",
          pattern: {
            value: /^\d+(\.\d+)*$/,
            message: "Version must be in format like 1.0 or 1.2.3",
          },
        }}
      />
      <View>
        <Text>File</Text>
        <View style={styles.chooseFileButton}>
          <AntDesign name="file-add" color={"#007AFF"} />
          <Text style={{ color: "#007AFF" }}>Choose file</Text>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <View style={styles.dividerContainer}>
          <Divider />
        </View>
        <CustomButton
          cta={mutation.isPending ? "Uploading..." : "Submit"}
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
          isLoading={mutation.isPending}
        />
      </View>
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
  dividerContainer: {
    marginHorizontal: -20,
  },
  button: {
    marginTop: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  chooseFileButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 8,
    borderColor: "#ccc",
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: "flex-start",
  },
});

export default AddDocumentModal;
