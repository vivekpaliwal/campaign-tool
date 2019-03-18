// import { store } from '../reducers/store';

export const campaignListData = function(state = {
  data: [],
  selectedId:''
}, action){
  switch (action.type) {
    case "CAMPAIGN_LIST_DATA":
      return {...state, data:action.payload.data, selectedId:action.payload.selectedId};
      break;
    default:
      return state;
  }
}
export const campaignActivePopup = function(state = {
  activeCampaignPopup: false,
  editCampaignById:''
}, action){
  switch (action.type) {
    case "CAMPAIGN_ACTIVE_POPUP":
      return {...state, activeCampaignPopup: action.payload.activeCampaignPopup, editCampaignById:action.payload.editCampaignById};
      break;
    default:
      return state;
  }
}