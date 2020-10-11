import React from 'react';
import './message.css';
import {IMessage} from "../../types/message";
import Avatar from "@material-ui/core/Avatar";

interface IProps {
  message: IMessage;
}

const Message = (props: IProps) => {
  console.log(`message = `)
  console.dir(props.message)
  return (
    <div className="message">
      <Avatar src={props.message.photo}/>
      <div className="message-info">
        <h4 className="message-user">
          {props.message.displayName}
          <span className="message-ts">
              {new Date(props.message.timestamp).toLocaleString()}
          </span>
        </h4>

        <p className="message-body">
          {props.message.body}
        </p>

      </div>      
    </div>
  );
}

export default Message;
