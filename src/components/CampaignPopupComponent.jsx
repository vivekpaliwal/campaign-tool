import React  from 'react';
import { campaignList,campaignActivePopup } from '../actions/index.js';
import { store } from '../reducers/store.jsx';
var utils = require('../utils.js');

export class CampaignPopupComponent extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      campaignName:"",
      userName:"",
      error:""
    }
  }
  handlepopup = (e) => {
    e.preventDefault();
   store.dispatch(campaignActivePopup({
      activeCampaignPopup:false
    }));
  }
  saveCampaign = (e) => {
    e.preventDefault();
    if(this.state.campaignName === "" || this.state.userName === ""){
      this.setState({error:"please fill out this field"});
      return false;
    }
    var Id = this.props.editCampaignById;
    if(Id){
          utils.saveHistoryToStore(this.props.campaignList,Id,"rename",this.state.campaignName)
    }else{
      var campaignListData = this.props.campaignList.data
      campaignListData.push({
          "campaignName":this.state.campaignName,
          "userName":this.state.userName,
          "history":[{
            "type":"create",
            "value":"created"
          }],
          "id":new Date().getTime(),
          "getTime":new Date().getTime()
      })
      store.dispatch(campaignList({
        data:campaignListData,
        selectedId:this.props.campaignList.selectedId
      }));
    }
    store.dispatch(campaignActivePopup({
      activeCampaignPopup:false,
      editCampaignById:""
    }));
    this.setState({userName:"", campaignName:"", error:""})

  }
  render(){
    return(
      <div className={"create-campaign-container "+ (this.props.activeState ? "active" : "")}>
        <div onClick={(e) => this.handlepopup(e)} className="module-overlay"></div>
        <div className="create-campaign-module">
          <h2>Create new Campaign</h2>
          <span className="label">Campaign name</span>
          <input type="text" value={this.state.campaignName} onChange={(e) => this.setState({campaignName: e.target.value})}/>
          <span className="label">User name</span>
          <input value={this.state.userName} onChange={(e) => this.setState({userName: e.target.value})} type="text"/>
          <div className="error-msg">{this.state.error}</div>
          <a href=" " onClick={(e) => this.saveCampaign(e)}   className="submit-button">save campaign</a>
        </div>
      </div>
    )
  }
}