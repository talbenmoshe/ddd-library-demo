import { useReadableEventRefresher } from '@zdrbm/zdr-react';
import { useLibraryFacade } from './useLibraryFacade';
import { useLibraryModel } from './useLibraryModel';
import { useEffect } from 'react';

export function useBooksList() {
  const facade = useLibraryFacade();
  const model = useLibraryModel();
  const [[state]] = useReadableEventRefresher(facade.booksLoadingState, model.books.order);

  useEffect(() => {
    facade.ensureBooksLoaded();
  }, [facade]);

  return { books: model.books.getAllItems(), state };
}
