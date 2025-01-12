import { IMembershipPresenter } from './MembershipPresenter';

export class PremiumMembershipPresenter implements IMembershipPresenter {
  getName(): string {
    return 'Premium';
  }
}