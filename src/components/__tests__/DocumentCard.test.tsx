import React from 'react';
import { render } from '@testing-library/react-native';
import DocumentCard from '../DocumentCard';
import { Document } from 'types/Document';

const mockDocument: Document = {
  id: '1',
  title: 'Sample Document',
  updatedAt: '2023-01-01T00:00:00Z',
  version: '1.0',
  createdAt: '2023-01-01T00:00:00Z',
  attachments: ['file1.pdf', 'file2.doc'],
  contributors: [
    { id: 'user1', name: 'John Doe' },
    { id: 'user2', name: 'Jane Smith' }
  ]
};

describe('DocumentCard', () => {
  it('displays document title', () => {
    const { getByText } = render(<DocumentCard document={mockDocument} />);

    expect(getByText('Sample Document')).toBeTruthy();
  });

  it('displays document version', () => {
    const { getByText } = render(<DocumentCard document={mockDocument} />);

    expect(getByText('Version 1.0')).toBeTruthy();
  });

  it('displays contributors', () => {
    const { getByText } = render(<DocumentCard document={mockDocument} />);

    expect(getByText('Contributors')).toBeTruthy();
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('Jane Smith')).toBeTruthy();
  });

  it('displays attachments', () => {
    const { getByText } = render(<DocumentCard document={mockDocument} />);

    expect(getByText('Attachments')).toBeTruthy();
    expect(getByText('file1.pdf')).toBeTruthy();
    expect(getByText('file2.doc')).toBeTruthy();
  });

  it('handles empty attachments and contributors', () => {
    const emptyDocument: Document = {
      ...mockDocument,
      attachments: [],
      contributors: []
    };

    const { getByText, queryByText } = render(<DocumentCard document={emptyDocument} />);

    expect(getByText('Sample Document')).toBeTruthy();
    expect(getByText('Contributors')).toBeTruthy();
    expect(getByText('Attachments')).toBeTruthy();
    // No individual items should be present for empty arrays
    expect(queryByText('John Doe')).toBeNull();
    expect(queryByText('file1.pdf')).toBeNull();
  });

  it('displays long titles correctly', () => {
    const longTitleDocument: Document = {
      ...mockDocument,
      title: 'This is a very long document title that might need to wrap to multiple lines'
    };

    const { getByText } = render(<DocumentCard document={longTitleDocument} />);

    expect(getByText('This is a very long document title that might need to wrap to multiple lines')).toBeTruthy();
  });

  it('handles multiple attachments and contributors', () => {
    const fullDocument: Document = {
      ...mockDocument,
      attachments: ['file1.pdf', 'file2.doc', 'file3.xlsx', 'file4.png'],
      contributors: [
        { id: 'user1', name: 'John Doe' },
        { id: 'user2', name: 'Jane Smith' },
        { id: 'user3', name: 'Bob Johnson' }
      ]
    };

    const { getByText } = render(<DocumentCard document={fullDocument} />);

    expect(getByText('Contributors')).toBeTruthy();
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('Jane Smith')).toBeTruthy();
    expect(getByText('Bob Johnson')).toBeTruthy();

    expect(getByText('Attachments')).toBeTruthy();
    expect(getByText('file1.pdf')).toBeTruthy();
    expect(getByText('file2.doc')).toBeTruthy();
    expect(getByText('file3.xlsx')).toBeTruthy();
    expect(getByText('file4.png')).toBeTruthy();
  });
});