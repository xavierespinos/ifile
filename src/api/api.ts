import { ApiDTO, Document, mapApiDocumentToDocument } from "types/Document";

// Interface for file upload that works with both web File and React Native DocumentPickerAsset
export interface UploadableFile {
  name?: string;
  uri?: string;
  type?: string;
  size?: number;
}

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || "";

export const fetchDocuments = async (): Promise<Document[]> => {
  const response = await fetch(`${API_BASE_URL}/documents`);
  const apiDocuments: ApiDTO[] = await response.json();
  // wait for 2 seconds to simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return apiDocuments.map(mapApiDocumentToDocument);
};

// This mocks the BE upload endpoint
export const uploadDocument = async (
  _name: string,
  _version: string,
  _file: UploadableFile | undefined
): Promise<void> => {
  // Simulate a network request
  await new Promise((resolve) => setTimeout(resolve, 2500));
  return;
};
