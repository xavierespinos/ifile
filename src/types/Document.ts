export type Document = {
  id: string;
  title: string;
  updatedAt: string;
  version: string;
  createdAt: string;
  attachments: string[];
  contributors: { id: string; name: string }[];
};

export interface ApiDTO {
  ID: string;
  Title: string;
  UpdatedAt: string;
  Version: string;
  CreatedAt: string;
  Attachments: string[];
  Contributors: { ID: string; Name: string }[];
}

export const mapApiDocumentToDocument = (apiDoc: ApiDTO): Document => ({
  id: apiDoc.ID,
  title: apiDoc.Title,
  updatedAt: apiDoc.UpdatedAt,
  version: apiDoc.Version,
  createdAt: apiDoc.CreatedAt,
  attachments: apiDoc.Attachments,
  contributors: apiDoc.Contributors.map((contributor) => ({
    id: contributor.ID,
    name: contributor.Name,
  })),
});
