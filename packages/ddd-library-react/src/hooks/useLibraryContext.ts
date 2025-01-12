import { useContext } from 'react';
import { LibraryContext } from '../context/LibraryContextProvider';

export function useLibraryContext() {
  return useContext(LibraryContext);
}
