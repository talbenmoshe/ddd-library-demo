import { OptionalViolations } from '@zdrbm/zdr-interfaces';
import { useEventRefresher } from '@zdrbm/zdr-react';
import { IMember, IMembership } from 'ddd-library-model';

export function useMemberWatcher(member: IMember | undefined) {
  useEventRefresher(member?.age, member?.name, member?.idChanged, member?.membership);
  let returnValue: {
    id: string,
    age: number,
    name: string,
    membership: IMembership,
    ageViolations: OptionalViolations<string>,
    nameViolations: OptionalViolations<string>,
  } | undefined = undefined;

  if (member) {
    returnValue = {
      id: member.getId(),
      age: member.age.get(),
      name: member.name.get(),
      membership: member.membership.get(),
      ageViolations: member.age.getViolations(),
      nameViolations: member.name.getViolations()
    };
  }

  return returnValue;
}