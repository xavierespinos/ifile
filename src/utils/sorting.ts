import { Document } from 'types/Document';

export const sortDocuments = (documents: Document[], sortBy: 'name' | 'date'): Document[] => {
  const dataCopy = [...documents];

  if (sortBy === 'name') {
    return dataCopy.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    return dataCopy.sort((a, b) => {
      const dateA = new Date(a.updatedAt).getTime();
      const dateB = new Date(b.updatedAt).getTime();
      return dateB - dateA;
    });
  }
};