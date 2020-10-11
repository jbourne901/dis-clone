import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import './sidebar.css';
import ExpandMore from "@material-ui/icons/ExpandMore";
import Add from "@material-ui/icons/Add";
import Mic from "@material-ui/icons/Mic";
import Headset from "@material-ui/icons/Headset";
import Settings from "@material-ui/icons/Settings";
import Call from "@material-ui/icons/Call";
import InfoOutlined from "@material-ui/icons/InfoOutlined";
import SignalCellularAlt from "@material-ui/icons/SignalCellularAlt";
import SidebarChannel from "../sidebar-channel";
import Avatar from '@material-ui/core/Avatar';
import {selectUser} from "../../redux/user";
import {auth, db, IDocs} from "../../firebase";
import {IChannel} from "../../types/channel";

const Sidebar = () => {

  const handleAdd = () => {
    const channelName = prompt("Enter channel name: ");
    if(channelName) {
      const ch: IChannel = {
        channel: channelName
      };
      db.collection("channels").add(ch);

    }
  };

  const user = useSelector(selectUser);

  const [channels, setChannels] = useState<IChannel[]>([]);

  const loadChannels = (docs: IDocs) => {
    const chs: IChannel[] = [];
    for(let d of docs) {
      const data = d.data();
      const ch: IChannel = {
        id: d.id,
        channel: data.channel
      };
      chs.push(ch);
    }
    setChannels(chs);
  };

  useEffect( () => {
    db.collection("channels")
      .orderBy("channel")
      .onSnapshot( (snapshot) => loadChannels(snapshot.docs) );
  }, []);


  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <h1>{user?.displayName}</h1>
        <ExpandMore />        
      </div>

      <div className="sidebar-channels">
        <div className="sidebar-channels-header">
          <div className="sidebar-header">
            <ExpandMore />        
            <h4>Text Channels</h4>
          </div>
          
          <Add 
            onClick={() => handleAdd()}
            className="sidebar-addchannel"
          />
        </div>      

        <div className="sidebar-channels-list">
          {channels.map(ch => <SidebarChannel channel={ch} key={ch.id}/> ) }         
        </div>

      </div>      

      <div className="sidebar-voice">
        <SignalCellularAlt 
          className="sidebar-voice-icon"
          fontSize="large"
        />
        <div className="sidebar-voice-info">
          <h3 className="sidebar-voice-connected">Voice Connected</h3>
          <p>Stream</p>
        </div>

        <div className="sidebar-voice-icons">
          <InfoOutlined />
          <Call />
        </div>
      </div>

      <div className="sidebar-profile">
        <Avatar 
          src={user?.photo}
          className="sidebar-profile-avatar"
          onClick = {() => auth.signOut()}
          />
        <div className="sidebar-profile-info">
          <h3 className="sidebar-profile-username">
            {user?.displayName}
          </h3>
            <p>{user?.id.substring(0,5)}</p>
        </div>

        <div className="sidebar-profile-icons">
          <Mic />
          <Headset />
          <Settings />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

