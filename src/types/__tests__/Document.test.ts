import { mapApiDocumentToDocument, ApiDTO } from '../Document';

describe('Document mapping', () => {
  describe('mapApiDocumentToDocument', () => {
    it('should correctly map API DTO to Document', () => {
      const apiDoc: ApiDTO = {
        ID: '123',
        Title: 'Test Document',
        UpdatedAt: '2023-01-01T00:00:00Z',
        Version: '1.0',
        CreatedAt: '2023-01-01T00:00:00Z',
        Attachments: ['file1.pdf', 'file2.doc'],
        Contributors: [
          { ID: 'user1', Name: 'John Doe' },
          { ID: 'user2', Name: 'Jane Smith' }
        ]
      };

      const result = mapApiDocumentToDocument(apiDoc);

      expect(result).toEqual({
        id: '123',
        title: 'Test Document',
        updatedAt: '2023-01-01T00:00:00Z',
        version: '1.0',
        createdAt: '2023-01-01T00:00:00Z',
        attachments: ['file1.pdf', 'file2.doc'],
        contributors: [
          { id: 'user1', name: 'John Doe' },
          { id: 'user2', name: 'Jane Smith' }
        ]
      });
    });

    it('should handle empty arrays', () => {
      const apiDoc: ApiDTO = {
        ID: '123',
        Title: 'Empty Document',
        UpdatedAt: '2023-01-01T00:00:00Z',
        Version: '1.0',
        CreatedAt: '2023-01-01T00:00:00Z',
        Attachments: [],
        Contributors: []
      };

      const result = mapApiDocumentToDocument(apiDoc);

      expect(result.attachments).toEqual([]);
      expect(result.contributors).toEqual([]);
    });

    it('should handle special characters in strings', () => {
      const apiDoc: ApiDTO = {
        ID: '123',
        Title: 'Document with "quotes" & symbols',
        UpdatedAt: '2023-01-01T00:00:00Z',
        Version: '2.1.0-beta',
        CreatedAt: '2023-01-01T00:00:00Z',
        Attachments: ['file with spaces.pdf'],
        Contributors: [
          { ID: 'user1', Name: 'José María' }
        ]
      };

      const result = mapApiDocumentToDocument(apiDoc);

      expect(result.title).toBe('Document with "quotes" & symbols');
      expect(result.version).toBe('2.1.0-beta');
      expect(result.attachments[0]).toBe('file with spaces.pdf');
      expect(result.contributors[0].name).toBe('José María');
    });
  });
});