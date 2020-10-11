import React from 'react';
import './chat-header.css';
import Notifications from "@material-ui/icons/Notifications";
import EditLocationRounded from "@material-ui/icons/EditLocationRounded";
import PeopleAltRounded from "@material-ui/icons/PeopleAltRounded";
import SearchRounded from "@material-ui/icons/SearchRounded";
import SendRounded from "@material-ui/icons/SendRounded";
import HelpRounded from "@material-ui/icons/HelpRounded";

const ChatHeader = () => {
  return (
    <div className="chat-header">
      <div className="chat-header-left">
        <h3 className="chat-header-title">
          <span className="chat-header-hash">
            #
          </span>
          Test channel
        </h3>
      </div>

      <div className="chat-header-right">
        <Notifications />
        <EditLocationRounded />
        <PeopleAltRounded />
        <div className="chat-header-search-container">
          <input 
            type="text"
            placeholder="Search"
            className="chat-header-search-input"
          />
          <SearchRounded />
        </div>

        <SendRounded />
        <HelpRounded />
      </div>
    </div>
  );
}

export default ChatHeader;
