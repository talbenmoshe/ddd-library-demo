import { ILoan, IMember } from 'ddd-library-model';
import { useLibraryFacade } from './useLibraryFacade';
import { useEventRefresher, useReadableEventRefresher } from '@zdrbm/zdr-react';
import { LoadingState } from '@zdrbm/zdr-native-tools';

export function useMemberLoans(member: IMember): {loans: ILoan[], state: LoadingState} {
  const facade = useLibraryFacade();
  useEventRefresher(member.loans.itemRemoved, member.loans.itemsAdded);
  const loans = member.loans.getOrderedItems();
  const memberLoansState = facade.ensureMemberLoansLoaded(member.getId());
  const [[state]] = useReadableEventRefresher(memberLoansState);

  return { loans, state };
}