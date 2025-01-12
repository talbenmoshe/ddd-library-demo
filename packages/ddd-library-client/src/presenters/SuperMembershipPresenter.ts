import { IMembershipPresenter } from './MembershipPresenter';

export class SuperMembershipPresenter implements IMembershipPresenter {
  getName(): string {
    return 'Super';
  }
}