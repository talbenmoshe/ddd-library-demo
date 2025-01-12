import { useReadableEventRefresher } from '@zdrbm/zdr-react';
import { useLibraryFacade } from './useLibraryFacade';
import { useLibraryModel } from './useLibraryModel';
import { useCallback, useEffect } from 'react';

export function useMembersList() {
  const facade = useLibraryFacade();
  const model = useLibraryModel();
  const [[state]] = useReadableEventRefresher(facade.membersLoadingState, model.members.order);
  useEffect(() => {
    facade.ensureMembersLoaded();
  }, [facade]);

  const createMember = useCallback(() => {
    facade.startCreateMember();
  }, [facade]);

  return { members: model.members.getAllItems(), state, createMember };
}