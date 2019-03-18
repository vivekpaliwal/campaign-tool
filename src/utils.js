import { campaignList } from './actions/index.js';
import { store } from './reducers/store.jsx';

export function saveHistoryToStore(campaignListData,Id,type,statevalue){
	debugger
    var allCampaignList = campaignListData.data.slice()
    var selectedId = campaignListData.selectedId;
    for (var i =0; i < allCampaignList.length; i++)
     if (allCampaignList[i].id === Id) {
     	switch (type) {
		    case "delete":
		    	allCampaignList.splice(i,1);
		    	selectedId = selectedId === Id ? "" : selectedId;
		    break;
		    case "comment":
		    	allCampaignList[i].history.push({
		        	"type":"comment",
		   	    	"value":statevalue
		    	})
		    break;
		    case "play-pause":
		    	allCampaignList[i].history.push({
		          "type":statevalue,
		          "value":statevalue
		        })
		    break;
		    case "rename":
		    	allCampaignList[i].history.push({
		            "type":"rename",
		            "value":statevalue,
		            "oldValue":allCampaignList[i].campaignName
		          })
		         allCampaignList[i].campaignName = statevalue
		    break;
		    default:
		      return "";
		  }
        break;
     }
    store.dispatch(campaignList({
      data:allCampaignList,
      selectedId:selectedId
    }));
}
export var CMPN = {
	localStorage:{
		setItem:function(key, value){
			var cmpn_storage = JSON.parse(localStorage.getItem('CMPN'));
			if(cmpn_storage){
					cmpn_storage[key] = value;
			}else{
					cmpn_storage = {}
					cmpn_storage[key] = value;
			}
			localStorage.setItem('CMPN', JSON.stringify(cmpn_storage));
		},
		getItem:function(key){
			var data = JSON.parse(localStorage.getItem('CMPN'));
			if(!data){
				return false;
			}else{
				if(data[key]){
					return data[key]
				}else{
					return false;
				}
			}
		},
		removeItem:function(key){
			var data = JSON.parse(localStorage.getItem('CMPN'));
			var keysArray = data ? Object.keys(data) : []; //if user wants to login from landing page
			for(var x in keysArray){
				if(keysArray[x] === key){
					delete(data[key]);
				}
			}
			localStorage.setItem('CMPN',JSON.stringify(data));
		}
	}
}