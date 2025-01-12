import { useLibraryContext } from './useLibraryContext';

export function useLibraryFacade() {
  const libraryContext = useLibraryContext();

  return libraryContext.facade!;
}