import { fetchDocuments, uploadDocument } from '../api';
import { ApiDTO } from 'types/Document';

global.fetch = jest.fn();

describe('API functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('fetchDocuments', () => {
    it('should fetch and map documents correctly', async () => {
      const mockApiResponse: ApiDTO[] = [
        {
          ID: '1',
          Title: 'Test Document',
          UpdatedAt: '2023-01-01T00:00:00Z',
          Version: '1.0',
          CreatedAt: '2023-01-01T00:00:00Z',
          Attachments: ['file1.pdf'],
          Contributors: [{ ID: 'user1', Name: 'John Doe' }]
        }
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve(mockApiResponse)
      });

      const resultPromise = fetchDocuments();

      // Fast-forward time to complete the setTimeout
      await jest.advanceTimersByTimeAsync(1000);

      const result = await resultPromise;

      expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/documents');
      expect(result).toEqual([
        {
          id: '1',
          title: 'Test Document',
          updatedAt: '2023-01-01T00:00:00Z',
          version: '1.0',
          createdAt: '2023-01-01T00:00:00Z',
          attachments: ['file1.pdf'],
          contributors: [{ id: 'user1', name: 'John Doe' }]
        }
      ]);
    });

    it('should handle fetch errors', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      await expect(fetchDocuments()).rejects.toThrow('Network error');
    });

    it('should handle invalid JSON response', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.reject(new Error('Invalid JSON'))
      });

      await expect(fetchDocuments()).rejects.toThrow('Invalid JSON');
    });

    it('should handle empty response', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve([])
      });

      const resultPromise = fetchDocuments();

      await jest.advanceTimersByTimeAsync(1000);

      const result = await resultPromise;

      expect(result).toEqual([]);
    });
  });

  describe('uploadDocument', () => {
    it('should complete upload after simulated delay', async () => {
      const resultPromise = uploadDocument('Test Doc', '1.0', new File([], 'test.pdf'));

      await jest.advanceTimersByTimeAsync(2500);

      await expect(resultPromise).resolves.toBeUndefined();
    });

    it('should handle different file types', async () => {
      const mockFile = { name: 'test.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' };

      const resultPromise = uploadDocument('Word Doc', '2.0', mockFile);

      await jest.advanceTimersByTimeAsync(2500);

      await expect(resultPromise).resolves.toBeUndefined();
    });

    it('should handle special characters in document name', async () => {
      const resultPromise = uploadDocument('Résumé & CV (2024)', '1.5', new File([], 'resume.pdf'));

      await jest.advanceTimersByTimeAsync(2500);

      await expect(resultPromise).resolves.toBeUndefined();
    });

    it('should handle version strings with different formats', async () => {
      const testCases = ['1.0.0', 'v2.1', '3.0-beta', '1.0.0-rc.1'];

      for (const version of testCases) {
        const resultPromise = uploadDocument('Test', version, new File([], 'test.pdf'));

        await jest.advanceTimersByTimeAsync(2500);

        await expect(resultPromise).resolves.toBeUndefined();
      }
    });
  });
});