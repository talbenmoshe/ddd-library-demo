import { useLibraryFacade } from './useLibraryFacade';

export function useLibraryModel() {
  const facade = useLibraryFacade();

  return facade.getModel();
}