import { AntDesign, Ionicons } from "@expo/vector-icons";
import { FC, RefObject, useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import * as DocumentPicker from "expo-document-picker";
import { uploadDocument } from "api/api";
import Divider from "./Divider";
import CustomButton from "./Button";
import CustomInput from "./CustomInput";
import Toast from "react-native-toast-message";

type DocumentFormData = {
  name: string;
  version: string;
  file?: DocumentPicker.DocumentPickerAsset;
};

type Props = {
  actionSheetRef: RefObject<ActionSheetRef | null>;
};

const AddDocumentModal: FC<Props> = ({ actionSheetRef }) => {
  const [selectedFile, setSelectedFile] =
    useState<DocumentPicker.DocumentPickerAsset | null>(null);

  const { control, handleSubmit, reset, setValue } = useForm<DocumentFormData>({
    defaultValues: {
      name: "",
      version: "",
      file: undefined,
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

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setSelectedFile(file);
        setValue("file", file);

        // Auto-fill name if not already filled
        if (!control._formValues.name && file.name) {
          const nameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
          setValue("name", nameWithoutExtension);
        }
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "File selection failed",
        text2: "Please try again",
      });
    }
  };

  const handleClose = () => {
    reset();
    setSelectedFile(null);
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
        <Text style={styles.fileLabel}>File</Text>
        <Pressable onPress={pickDocument} style={styles.chooseFileButton}>
          <AntDesign name="file-add" color={"#007AFF"} />
          <Text style={styles.chooseFileText}>
            {selectedFile ? selectedFile.name : "Choose file"}
          </Text>
        </Pressable>
        {!!selectedFile && selectedFile.size && (
          <Text style={styles.fileInfo}>
            Size: {(selectedFile.size / 1024).toFixed(1)} KB
          </Text>
        )}
      </View>
      <View style={{ marginTop: 20 }}>
        <View style={styles.dividerContainer}>
          <Divider />
        </View>
        <CustomButton
          cta={"Submit"}
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
  fileLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
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
  chooseFileText: {
    color: "#007AFF",
    fontSize: 16,
  },
  fileInfo: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
});

export default AddDocumentModal;
