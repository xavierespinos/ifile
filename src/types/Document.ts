export type Document = {
  id: string;
  title: string;
  updatedAt: string;
  version: string;
  createdAt: string;
  attachments: string[];
  contributors: { id: string; name: string }[];
};
