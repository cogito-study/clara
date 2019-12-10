import { useTitle } from 'react-use';

export const useDocumentTitle = (title?: string) => useTitle(`${title ?? ''} | cogito`);
