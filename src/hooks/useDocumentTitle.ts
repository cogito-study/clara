import { useEffect } from 'react';

export const useDocumentTitle = (title: string | undefined | null) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  });
};
