import { useLibraryFacade } from './useLibraryFacade';
import { useReadableEventRefresher } from '@zdrbm/zdr-react';
import { useMemberWatcher } from './useMemberWatcher';

export function useMember(memberId: string) {
  const libraryFacade = useLibraryFacade();
  const loadingState = libraryFacade.loadMember(memberId);
  const [[state]] = useReadableEventRefresher(loadingState);
  const memberModel = libraryFacade.getModel().members.getItem(memberId);
  const member = useMemberWatcher(memberModel);

  return {
    state,
    member,
    memberModel
  };
}