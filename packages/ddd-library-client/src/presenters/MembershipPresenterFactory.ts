import { IMembershipSelectorFactory } from 'ddd-library-model';
import { IMembershipPresenter } from './MembershipPresenter';
import { BasicMembershipPresenter } from './BasicMembershipPresenter';
import { PremiumMembershipPresenter } from './PremiumMembershipPresenter';
import { SuperMembershipPresenter } from './SuperMembershipPresenter';

export interface IMembershipPresenterFactory extends IMembershipSelectorFactory<IMembershipPresenter> {}

export class MembershipPresenterFactory implements IMembershipPresenterFactory {
  getBasic() {
    return new BasicMembershipPresenter();
  }
  getPremium() {
    return new PremiumMembershipPresenter();
  }
  getSuper() {
    return new SuperMembershipPresenter();
  }
}