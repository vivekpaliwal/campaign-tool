import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

// reducers
import * as re from '../reducers/reducers';

const reducer = combineReducers({
	campaignList: re.campaignListData,
	createCampaignPopup:re.campaignActivePopup
})

const middleWare = applyMiddleware(thunk)
export const store = createStore(reducer, middleWare);
window.store = store;
