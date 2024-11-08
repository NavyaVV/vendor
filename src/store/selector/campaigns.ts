import { State } from "@typings/State";
import { createSelector } from "reselect";

export const getCampaigns = (state: State) => state.campaign;

export const getCampaignInfo = createSelector(
  getCampaigns,
  (campaigns) => campaigns.campaignsList
);

export const getLoading = createSelector(
  getCampaigns,
  (campaigns) => campaigns.loading
);

export const getCampaignDetails = createSelector(
  getCampaigns,
  (campaigns) => campaigns.campaignsDetails
);

export const getAddedCampaignData = createSelector(
  getCampaigns,
  (campaigns) => campaigns.addedCampaignData
);
export const getCampaignSuccess = createSelector(
  getCampaigns,
  (campaigns) => campaigns?.campaignSuccess || false
);

export const getErrors = createSelector(
  getCampaigns,
  (campaigns) => campaigns.error
);

export const getCampaignProducts = createSelector(
  getCampaigns,
  (campaigns) => campaigns.campaignProducts
);

export const getCampData = createSelector(
  getCampaigns,
  (campaigns) => campaigns.newCampData
);

export const getCampaignChecklistLookup = createSelector(
  getCampaigns,
  (campaigns) => {
    const checklist = Array.isArray(campaigns.campaignChecklistLookup)
      ? campaigns.campaignChecklistLookup.map((checklist) => ({
          field_name: checklist?.name || checklist?.field_name,
          field_type: checklist?.contract?.type || checklist?.field_type,
          id: checklist.id,
          is_required: true,
          is_default: true,
        }))
      : []; // Return an empty array if campaignChecklistLookup is null or not an array
    return checklist;
  }
);
