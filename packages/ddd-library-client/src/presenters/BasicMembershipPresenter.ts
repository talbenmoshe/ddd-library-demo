import { IMembershipPresenter } from './MembershipPresenter';

export class BasicMembershipPresenter implements IMembershipPresenter {
  getName(): string {
    return 'Basic';
  }
}