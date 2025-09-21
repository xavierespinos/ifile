import { sortDocuments } from '../sorting';
import { Document } from 'types/Document';

describe('sortDocuments', () => {
  const mockDocuments: Document[] = [
    {
      id: '1',
      title: 'Zebra Document',
      updatedAt: '2023-01-01T00:00:00Z',
      version: '1.0',
      createdAt: '2023-01-01T00:00:00Z',
      attachments: [],
      contributors: []
    },
    {
      id: '2',
      title: 'Alpha Document',
      updatedAt: '2023-01-03T00:00:00Z',
      version: '1.0',
      createdAt: '2023-01-01T00:00:00Z',
      attachments: [],
      contributors: []
    },
    {
      id: '3',
      title: 'Beta Document',
      updatedAt: '2023-01-02T00:00:00Z',
      version: '1.0',
      createdAt: '2023-01-01T00:00:00Z',
      attachments: [],
      contributors: []
    }
  ];

  describe('name sorting', () => {
    it('should sort documents alphabetically by title', () => {
      const result = sortDocuments(mockDocuments, 'name');

      expect(result.map(doc => doc.title)).toEqual([
        'Alpha Document',
        'Beta Document',
        'Zebra Document'
      ]);
    });

    it('should handle case-insensitive sorting', () => {
      const documentsWithCases: Document[] = [
        { ...mockDocuments[0], title: 'zebra document' },
        { ...mockDocuments[1], title: 'ALPHA DOCUMENT' },
        { ...mockDocuments[2], title: 'Beta Document' }
      ];

      const result = sortDocuments(documentsWithCases, 'name');

      expect(result.map(doc => doc.title)).toEqual([
        'ALPHA DOCUMENT',
        'Beta Document',
        'zebra document'
      ]);
    });

    it('should handle special characters and numbers', () => {
      const specialDocs: Document[] = [
        { ...mockDocuments[0], title: '3. Final Report' },
        { ...mockDocuments[1], title: '1. Introduction' },
        { ...mockDocuments[2], title: '2. Analysis & Results' }
      ];

      const result = sortDocuments(specialDocs, 'name');

      expect(result.map(doc => doc.title)).toEqual([
        '1. Introduction',
        '2. Analysis & Results',
        '3. Final Report'
      ]);
    });
  });

  describe('date sorting', () => {
    it('should sort documents by updatedAt date (newest first)', () => {
      const result = sortDocuments(mockDocuments, 'date');

      expect(result.map(doc => doc.id)).toEqual(['2', '3', '1']);
    });

    it('should handle invalid dates', () => {
      const documentsWithInvalidDate: Document[] = [
        { ...mockDocuments[0], updatedAt: 'invalid-date' },
        { ...mockDocuments[1], updatedAt: '2023-01-03T00:00:00Z' }
      ];

      const result = sortDocuments(documentsWithInvalidDate, 'date');

      expect(result).toHaveLength(2);
      // Invalid dates (NaN) remain in original position when compared
      expect(result[0].updatedAt).toBe('invalid-date');
      expect(result[1].updatedAt).toBe('2023-01-03T00:00:00Z');
    });

    it('should handle same dates', () => {
      const sameDate = '2023-01-01T00:00:00Z';
      const documentsWithSameDate: Document[] = [
        { ...mockDocuments[0], updatedAt: sameDate, title: 'Z Document' },
        { ...mockDocuments[1], updatedAt: sameDate, title: 'A Document' }
      ];

      const result = sortDocuments(documentsWithSameDate, 'date');

      expect(result).toHaveLength(2);
    });
  });

  describe('immutability', () => {
    it('should not modify the original array', () => {
      const originalDocs = [...mockDocuments];

      sortDocuments(mockDocuments, 'name');

      expect(mockDocuments).toEqual(originalDocs);
    });

    it('should return a new array', () => {
      const result = sortDocuments(mockDocuments, 'name');

      expect(result).not.toBe(mockDocuments);
    });
  });

  describe('edge cases', () => {
    it('should handle empty array', () => {
      const result = sortDocuments([], 'name');

      expect(result).toEqual([]);
    });

    it('should handle single document', () => {
      const singleDoc = [mockDocuments[0]];
      const result = sortDocuments(singleDoc, 'name');

      expect(result).toEqual(singleDoc);
      expect(result).not.toBe(singleDoc);
    });
  });
});