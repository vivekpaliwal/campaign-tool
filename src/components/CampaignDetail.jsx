import React, { Component } from 'react';
import { connect } from 'react-redux';
import { campaignList,campaignActivePopup } from '../actions/index.js';
import { store } from '../reducers/store.jsx';
import {CampaignList} from './CampaignList.jsx';
import {CampaignPopupComponent} from './CampaignPopupComponent.jsx';
var utils = require('../utils.js');

var _ = require('lodash');
class CampaignDetail extends Component{

  componentWillMount(){
    var getDataFromLocal = utils.CMPN.localStorage.getItem('campaign_list');
    if(getDataFromLocal){
       store.dispatch(campaignList({
        data:getDataFromLocal.data,
        selectedId:getDataFromLocal.selectedId
      }));
    }
  }
  handlepopup = (e) => {
    e.preventDefault();
    store.dispatch(campaignActivePopup({
      activeCampaignPopup:!this.props.activeCampaignPopup
    }));
  }
  handleEdit = (e,Id) => {
   e.stopPropagation();
    store.dispatch(campaignActivePopup({
      activeCampaignPopup:!this.props.activeCampaignPopup,
      editCampaignById:Id
    }));
  }
  render(){
    var allCampaignList = _.map(this.props.data, (i,d)=>{
      return(
        <CampaignList action={this.handleEdit}  campaignList={this.props} data={i} count={d} key={d}/>
      )
    })
    var findHistoryById = ""
    if(this.props.selectedId){
      var findHistory = _.find(this.props.data,{id:this.props.selectedId}) ;
      findHistoryById =  typeof(findHistory)  == 'undefined' ? "" : findHistory
    }
    return(
      <div>
          <div className="grid">
            <div className="row">
              <div className="col campaign-container">
                <CampaignPopupComponent activeState={this.props.activeCampaignPopup}  editCampaignById={this.props.editCampaignById}  campaignList={this.props}/>
                <div className="campaign-tag"><i className="fas fa-envelope"></i>All Campaigns</div>
                <div className="campaign-list-tag">
                    <div className="lines inline-block-v-middle"><span></span><span></span><span></span></div>
                    <div className="inline-block-v-middle">Campaign List</div>
                    <div onClick={(e) => this.handlepopup(e)} className="create-new-button inline-block-v-middle"> + Create new</div>
                </div>
                <div className="scrollbar-style campaign-list-detail col-md-8">
                   {allCampaignList}
                </div>
                <div className={"history-container scrollbar-style col-md-4 "+(this.props.selectedId ? "" : "hide")}> 
                  <p className="history-tag"><i className="fas fa-history"></i> History</p>
                    <HistoryComponent data={findHistoryById}/>
                </div>
              </div>
            </div>
          </div>        
      </div>
    )
  }
}
const mapStateToProps = state => ({
  data: state.campaignList.data,
  selectedId:state.campaignList.selectedId,
  activeCampaignPopup:state.createCampaignPopup.activeCampaignPopup,
  editCampaignById:state.createCampaignPopup.editCampaignById
})
export default connect(mapStateToProps)(CampaignDetail);

class HistoryComponent extends React.Component{
  
  render(){
    var historyData = [];
    for(var i in this.props.data.history ){
        switch (this.props.data.history[i].type) {
          case "create":
            historyData.push(<div className="history-detail top-inline-container"><div ><i className="fas fa-plus"></i></div><div className="history-content">Campaign <span className="creat bold">{this.props.data.history[i].value}</span> <div>by <span className="name">{this.props.data.userName}</span></div></div></div> )
            break;
          case "comment":
            historyData.push(<div className="history-detail top-inline-container"><div><i className="fas fa-comment"></i></div><div className="history-content"><span className="bold">Comment </span><span>Added</span><div>by <span className="name">{this.props.data.userName}</span></div><div className="bold comment">{this.props.data.history[i].value}</div></div></div> )
          break;
          case "play":
            historyData.push(<div className="history-detail top-inline-container"><div><i className="fas fa-play-circle "></i></div><div className="history-content">Campaign <span className="bold play-text">{this.props.data.history[i].value}</span><div>by <span className="name">{this.props.data.userName}</span></div></div></div>)
          break;
          case "pause":
            historyData.push(<div className="history-detail top-inline-container"><div><i className="col-md-3 fas fa-pause-circle "></i></div><div className="history-content">Campaign <span className="bold play-text">{this.props.data.history[i].value}</span><div>by <span className="name">{this.props.data.userName}</span></div></div></div>)
          break;
          case "rename":
            historyData.push(<div className="history-detail top-inline-container"><div><i className="fas fa-pencil-alt"></i></div><div className="history-content"><span className="">Campaign </span><span className="bold">Renamed</span><div>by <span className="name">{this.props.data.userName}</span></div><div className="bold comment"><strike>{this.props.data.history[i].oldValue}</strike> <span>{this.props.data.history[i].value}</span></div></div></div> )
          break;
          default:
            return ;
        }
     }

    return(
      <div className="history-detail-container"> 
        <p className="campaign-name">{this.props.data.campaignName}</p>
       {historyData}
      </div>
    )
  }
}

