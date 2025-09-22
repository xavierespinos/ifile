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
import * as Sentry from "@sentry/react-native";
import {
  COLORS,
  UNIT,
  BORDER_RADIUS,
  FONT_SIZE,
  FONT_WEIGHT,
  LAYOUT,
} from "constants/theme";
import { useTranslation } from "hooks/useTranslation";

type DocumentFormData = {
  name: string;
  version: string;
  file?: DocumentPicker.DocumentPickerAsset;
};

type Props = {
  actionSheetRef: RefObject<ActionSheetRef | null>;
};

const AddDocumentModal: FC<Props> = ({ actionSheetRef }) => {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] =
    useState<DocumentPicker.DocumentPickerAsset | null>(null);

  const { control, handleSubmit, reset, setValue, setFocus } =
    useForm<DocumentFormData>({
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
        text1: t("addDocument.uploadSuccess"),
      });
      reset();
      actionSheetRef.current?.hide();
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: t("addDocument.uploadError"),
        text2: t("common.tryAgainLater"),
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
        multiple: false,
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
      Sentry.captureException(error, {
        tags: {
          component: "AddDocumentModal",
          operation: "pickDocument",
        },
      });

      Toast.show({
        type: "error",
        text1: t("addDocument.fileSelectionError"),
        text2: t("common.tryAgain"),
      });
    }
  };

  const handleClose = () => {
    reset();
    setSelectedFile(null);
    actionSheetRef.current?.hide();
  };

  return (
    <ActionSheet
      ref={actionSheetRef}
      containerStyle={styles.actionSheetContainer}
    >
      <View style={styles.buttonRow}>
        <Text style={styles.title}>{t("addDocument.title")}</Text>
        <Pressable onPress={handleClose}>
          <Ionicons name="close" size={24} color={COLORS.TEXT_SECONDARY} />
        </Pressable>
      </View>
      <Text style={styles.subtitle}>
        {t("addDocument.documentInformation")}
      </Text>

      <CustomInput
        control={control}
        name="name"
        label={t("addDocument.name")}
        placeholder={t("addDocument.namePlaceholder")}
        onSubmitEditing={() => {
          setFocus("version");
        }}
        rules={{
          required: t("addDocument.nameRequired"),
          minLength: {
            value: 2,
            message: t("addDocument.nameMinLength"),
          },
        }}
      />

      <CustomInput
        control={control}
        name="version"
        label={t("addDocument.version")}
        placeholder={t("addDocument.versionPlaceholder")}
        rules={{
          required: t("addDocument.versionRequired"),
          pattern: {
            value: /^\d+(\.\d+)*$/,
            message: t("addDocument.versionFormat"),
          },
        }}
      />
      <View>
        <Text style={styles.fileLabel}>{t("addDocument.file")}</Text>
        <Pressable onPress={pickDocument} style={styles.chooseFileButton}>
          <AntDesign name="file-add" color={COLORS.PRIMARY} />
          <Text style={styles.chooseFileText}>
            {selectedFile ? selectedFile.name : t("addDocument.chooseFile")}
          </Text>
        </Pressable>
        {!!selectedFile && selectedFile.size && (
          <Text style={styles.fileInfo}>
            {t("addDocument.fileSize", {
              size: (selectedFile.size / 1024).toFixed(1),
            })}
          </Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.dividerContainer}>
          <Divider />
        </View>
        <CustomButton
          cta={t("common.submit")}
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
          isLoading={mutation.isPending}
        />
      </View>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: FONT_SIZE.XL,
    fontWeight: FONT_WEIGHT.SEMIBOLD,
  },
  subtitle: {
    marginTop: UNIT.SM,
    fontSize: FONT_SIZE.MD,
    marginBottom: UNIT.LG,
  },
  dividerContainer: {
    marginHorizontal: -UNIT.XL,
  },
  button: {
    marginTop: UNIT.SM,
  },
  fileLabel: {
    fontSize: FONT_SIZE.MD,
    fontWeight: FONT_WEIGHT.MEDIUM,
    marginBottom: UNIT.SM,
  },
  chooseFileButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: UNIT.SM,
    marginTop: UNIT.SM,
    borderColor: COLORS.BORDER_PRIMARY,
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: 1,
    paddingHorizontal: UNIT.MD,
    paddingVertical: UNIT.SM,
    alignSelf: "flex-start",
  },
  chooseFileText: {
    color: COLORS.PRIMARY,
    fontSize: FONT_SIZE.MD,
  },
  fileInfo: {
    fontSize: FONT_SIZE.XS,
    color: COLORS.TEXT_SECONDARY,
    marginTop: UNIT.XS,
  },
  actionSheetContainer: {
    padding: LAYOUT.CONTENT_PADDING,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    marginTop: LAYOUT.SECTION_MARGIN,
  },
});

export default AddDocumentModal;
