import { Document } from '../types/Document';

const API_BASE_URL = "http://localhost:8080";

interface ApiDocument {
  ID: string;
  Title: string;
  UpdatedAt: string;
  Version: string;
  CreatedAt: string;
  Attachments: string[];
  Contributors: { ID: string; Name: string }[];
}

const mapApiDocumentToDocument = (apiDoc: ApiDocument): Document => ({
  id: apiDoc.ID,
  title: apiDoc.Title,
  updatedAt: apiDoc.UpdatedAt,
  version: apiDoc.Version,
  createdAt: apiDoc.CreatedAt,
  attachments: apiDoc.Attachments,
  contributors: apiDoc.Contributors.map(contributor => ({
    id: contributor.ID,
    name: contributor.Name,
  })),
});

export const fetchDocuments = async (): Promise<Document[]> => {
  const response = await fetch(`${API_BASE_URL}/documents`);
  const apiDocuments: ApiDocument[] = await response.json();
  return apiDocuments.map(mapApiDocumentToDocument);
};
