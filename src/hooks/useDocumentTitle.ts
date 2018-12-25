import { useEffect } from 'react';

export const useDocumentTitle = (title?: string) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  });
};
