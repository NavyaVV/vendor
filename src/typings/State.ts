import { AuthState } from "./auth";
import { CampaignState } from "./campaigns";
import { ProfileState } from "./profile";
import { PortfolioState } from "./portfolio";
import { ServiceState } from "./service";
import { ProductState } from "./product";
import { WalletState } from "./wallet";
import { PaymentState } from "./payment";
import { CommonState } from "./common";

export interface State {
  auth: AuthState;
  campaign: CampaignState;
  profile: ProfileState;
  portfolio: PortfolioState;
  service: ServiceState;
  product: ProductState;
  wallet: WalletState;
  payment: PaymentState;
  common: CommonState;
}
