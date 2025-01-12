import { useLibraryContext } from './useLibraryContext';

export function useMembershipPresenterFactory() {
  const libraryContext = useLibraryContext();

  return libraryContext.membershipPresenter!;
}