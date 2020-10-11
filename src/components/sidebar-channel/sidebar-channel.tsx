import React from 'react';
import './sidebar-channel.css';
import {IChannel} from "../../types/channel";
import { setChannel } from '../../redux/channel';
import { useDispatch } from 'react-redux';

interface IProps {
  channel: IChannel;
}

const SidebarChannel = (props: IProps) => {
  const dispatch = useDispatch();

  const onSelectChannel = () => {
    console.log(`onSelectChannel `)
    console.dir(props.channel)
    dispatch(setChannel(props.channel));
  };

  return (
    <div 
      className="sidebar-channel"
      onClick = {() => onSelectChannel()}
    >
      <h4 className="sidebar-channel-title">
        <span className="sidebar-channel-hash">
          #
        </span>
        {props.channel.channel}
      </h4>
    </div>
  );
}

export default SidebarChannel;
