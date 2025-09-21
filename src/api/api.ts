import { ApiDTO, Document, mapApiDocumentToDocument } from "types/Document";

const API_BASE_URL = "http://localhost:8080";

export const fetchDocuments = async (): Promise<Document[]> => {
  const response = await fetch(`${API_BASE_URL}/documents`);
  const apiDocuments: ApiDTO[] = await response.json();
  // wait for 2 seconds to simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return apiDocuments.map(mapApiDocumentToDocument);
};

export const uploadDocument = async (
  name: string,
  version: string,
  file: any
): Promise<void> => {
  // Simulate a network request
  await new Promise((resolve) => setTimeout(resolve, 2500));
  return;
};
