import { parse } from 'qs';
import { useLocation } from 'react-router-dom';

export function useRouteQueryParams<T>(): T {
  const location = useLocation();
  const params = parse(location.search, { ignoreQueryPrefix: true });

  return params as T;
}
