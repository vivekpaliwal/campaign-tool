import { store } from '../reducers/store';
var utils = require('../utils.js');

export function campaignList(data){
  return function(dispatch) {
    dispatch({
      type: 'CAMPAIGN_LIST_DATA',
      payload: data
    })
    utils.CMPN.localStorage.setItem('campaign_list', data);
  }
}

export function campaignActivePopup(data){
  return function(dispatch) {
    dispatch({
      type: 'CAMPAIGN_ACTIVE_POPUP',
      payload: data
    })
  }
}
