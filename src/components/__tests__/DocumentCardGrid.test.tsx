import React from 'react';
import { render } from '@testing-library/react-native';
import DocumentCardGrid from '../DocumentCardGrid';
import { Document } from 'types/Document';

const mockDocument: Document = {
  id: '1',
  title: 'Sample Document',
  updatedAt: '2023-01-01T00:00:00Z',
  version: '1.0',
  createdAt: '2023-01-01T00:00:00Z',
  attachments: ['file1.pdf'],
  contributors: [{ id: 'user1', name: 'John Doe' }]
};

describe('DocumentCardGrid', () => {
  it('displays document title', () => {
    const { getByText } = render(<DocumentCardGrid document={mockDocument} />);

    expect(getByText('Sample Document')).toBeTruthy();
  });

  it('displays document version with v prefix', () => {
    const { getByText } = render(<DocumentCardGrid document={mockDocument} />);

    expect(getByText('v1.0')).toBeTruthy();
  });

  it('displays long titles correctly', () => {
    const longTitleDocument: Document = {
      ...mockDocument,
      title: 'This is a very long document title that should wrap to multiple lines in the grid view'
    };

    const { getByText } = render(<DocumentCardGrid document={longTitleDocument} />);

    expect(getByText('This is a very long document title that should wrap to multiple lines in the grid view')).toBeTruthy();
  });

  it('displays short titles correctly', () => {
    const shortTitleDocument: Document = {
      ...mockDocument,
      title: 'Doc'
    };

    const { getByText } = render(<DocumentCardGrid document={shortTitleDocument} />);

    expect(getByText('Doc')).toBeTruthy();
    expect(getByText('v1.0')).toBeTruthy();
  });

  it('handles different version formats', () => {
    const versionDocument: Document = {
      ...mockDocument,
      version: '2.1.0-beta'
    };

    const { getByText } = render(<DocumentCardGrid document={versionDocument} />);

    expect(getByText('Sample Document')).toBeTruthy();
    expect(getByText('v2.1.0-beta')).toBeTruthy();
  });

  it('handles version with special characters', () => {
    const specialVersionDocument: Document = {
      ...mockDocument,
      version: '3.0.0-rc.1'
    };

    const { getByText } = render(<DocumentCardGrid document={specialVersionDocument} />);

    expect(getByText('v3.0.0-rc.1')).toBeTruthy();
  });
});