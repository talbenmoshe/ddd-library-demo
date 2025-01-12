import { IMembership } from 'ddd-library-model';
import { useMembershipPresenterFactory } from './useMembershipPresenterFactory';

export function useMembership(membership?: IMembership) {
  const membershipPresenterFactory = useMembershipPresenterFactory();
  const presenter = membership?.selectFromFactory(membershipPresenterFactory);
  let returnValue: {name: string} | undefined = undefined;

  if (presenter) {
    returnValue = {
      name: presenter.getName()
    };
  }

  return returnValue;
}