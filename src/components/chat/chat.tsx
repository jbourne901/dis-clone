import React, { useEffect, useState } from 'react';
import {useSelector} from "react-redux";
import './chat.css';
import AddCircle from "@material-ui/icons/AddCircle";
import CardGiftcard from "@material-ui/icons/CardGiftcard";
import Gif from "@material-ui/icons/Gif";
import EmojiEmotions from "@material-ui/icons/EmojiEmotions";
import ChatHeader from "../chat-header";
import Message from "../message";
import {IMessage} from "../../types/message";
import { selectChannel } from '../../redux/channel';
import {db, IDocs} from "../../firebase";
import { selectUser } from '../../redux/user';

const Chat = () => {
  const user = useSelector(selectUser);
  const channel = useSelector(selectChannel);

  console.log(`Chat render channel=`)
  console.dir(channel)
  const [messages, setMessages] = useState<IMessage[]>([]);

  const loadMessages = (docs: IDocs) => {
    console.log(`start loadMessages`)
    const msgs: IMessage[] = [];
    for(let d of docs) {
      const data = d.data();
      const msg: IMessage = {
        id: d.id,
        body: data.body,
        timestamp: data.timestamp,
        displayName: data.displayName,
        email: data.email,
        photo: data.photo,
        userId: data.userId
      };
      msgs.push(msg);
    }
    setMessages(msgs);
  };

  useEffect( () => {
    console.log(`startUseEffect channel=`)
    console.dir(channel)
    if(channel) {
      db.collection("channels")
        .doc(channel.id)
        .collection("messages")
        .onSnapshot((snapshot) => loadMessages(snapshot.docs))
    }
  }, [channel]);
  
  const [input, setInput] = useState<string>("");

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();    
    if(input && channel && user) {
      const msg: IMessage = {
        body: input,
        timestamp: new Date().getTime(),
        userId: user.id,
        displayName: user.displayName,
        email: user.email,
        photo: user.photo
      };
      db.collection("channels")
        .doc(channel.id)
        .collection("messages")
        .add(msg);
      setInput("");
    }
  }

  return (
    <div className="chat">
      <ChatHeader />
      
      <div className="chat-messages">
        {messages.map(m => (<Message key={m.id} message={m} />))}
      </div>

      <div className="chat-input-container">
        <AddCircle fontSize="large" />
        <form 
          className="chat-form"
          onSubmit = { (e) => sendMessage(e) }
        >
          <input 
            type="text"
            placeholder={`Message #TESTCHANNEL`}
            className="chat-input"
            value = {input}
            onChange = {(e) => setInput(e.target.value)}
          />
          <button 
            type="submit"
            className="chat-button"
          >
            Send Message
          </button>
        </form>

        <div className="chat-input-icons">
          <CardGiftcard fontSize="large"/>
          <Gif fontSize="large"/>
          <EmojiEmotions fontSize="large"/>
        </div>        
      </div>
    </div>
  );
}

export default Chat;
