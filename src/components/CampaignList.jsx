import React  from 'react';
import { campaignList } from '../actions/index.js';
import { store } from '../reducers/store.jsx';
var utils = require('../utils.js');

export class CampaignList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      commentPopup:false,
      comment:"",
      campaignPlayPause:"play"
    }
  }
  handleDelete = (e,Id) => {
    e.stopPropagation();
    utils.saveHistoryToStore(this.props.campaignList,Id,"delete")
  }
  handleComment = (e) => {
    e.stopPropagation();
    this.setState({
      commentPopup:!this.state.commentPopup
    })
  }
  saveComment = (e,Id) => {
    e.stopPropagation();
    utils.saveHistoryToStore(this.props.campaignList,Id,"comment",this.state.comment)
    this.setState({
      commentPopup:false
    })
  }
  handlePlayPause = (e,Id) => {
    e.stopPropagation();
    if(this.state.campaignPlayPause === "play"){
      this.setState({
        campaignPlayPause:"pause"
      })
    }else{
      this.setState({
        campaignPlayPause:"play"
      })
    }
    utils.saveHistoryToStore(this.props.campaignList,Id,"play-pause",this.state.campaignPlayPause)
  }
  selectList = (e,Id) => {
    e.stopPropagation();
    var allCampaignList = this.props.campaignList.data.slice()
    store.dispatch(campaignList({
       data:allCampaignList,
      selectedId:Id
    }));
  }
  render(){
    var time = new Date(this.props.data.getTime);
    var timeStrArr = time.toLocaleTimeString().split(":");
    var Hr = timeStrArr[0];
    var Min = timeStrArr[1];
    var Mer = "";
    if(Hr >12){
      Hr = Hr - 12;
      Mer = Mer || "PM"
    }else{
      Mer = Mer || "AM"
    }
    return(
    <div>
      <div className={"comment-module "+ (this.state.commentPopup ? "active" : "")}>
        <div onClick={(e) => this.handleComment(e)} className="module-overlay"></div>
          <div className="comment-section-module">
            <textarea onChange={(e) => this.setState({comment: e.target.value})} placeholder="add comment" className="comment-section"></textarea>
            <div onClick={(e) => this.saveComment(e, this.props.data.id)} className="add-comment submit-button">add comment</div>
          </div>
      </div>
      <div className={"campaign-list-container col-md-12 "+(this.props.campaignList.selectedId === this.props.data.id ? "selected" : "")} onClick={(e)=>this.selectList(e,this.props.data.id)}>
        <div className="campaign-name col-md-7">
          <div className="count inline-block-v-middle"><span> {this.props.count + 1} </span></div><div className="inline-block-v-middle campaign-name-time"><span className="campaign-name-text">{this.props.data.campaignName}</span><div className="time">Created at {Hr}:{Min} {Mer}</div></div>
        </div>
        <div className="col-md-5 text-center action-buttons">
          <div className="" onClick={(e) => this.handlePlayPause(e, this.props.data.id)}>
            <div className={"col-md-3 col-sm-3 play-pause-img"+(this.state.campaignPlayPause === "play" ? "active": "")}><i className="fas fa-pause-circle "></i><div className="tag-name">Pause</div></div>
            <div className={"col-md-3 play-pause-img"+(this.state.campaignPlayPause === "pause" ? "active": "")}><i className="fas fa-play-circle "></i><div className="tag-name">Play</div></div>
          </div>
          <div className="col-md-3 col-sm-3"><i  onClick={(e) => this.handleComment(e)}  className="fas fa-comment"></i><div className="tag-name">Comment</div></div>
          <div className="col-md-3  col-sm-3"><i  onClick={(e) => this.props.action(e, this.props.data.id)}  className="fas fa-pencil-alt"></i><div className="tag-name">Rename</div></div>
          <div className="col-md-3 col-sm-3"><i  onClick={(e) => this.handleDelete(e, this.props.data.id)}  className="fas fa-trash"></i><div className="tag-name">Delete</div></div>
        </div>
      </div>
    </div>
    )
  }
}