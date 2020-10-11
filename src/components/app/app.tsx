import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import './app.css';
import Sidebar from "../sidebar";
import Chat from "../chat";
import {selectUser, login, logout} from "../../redux/user";
import Login from "../login";
import {auth} from "../../firebase";
import {IUser} from "../../types/user";

const App = () => {
  const dispatch = useDispatch();
  useEffect( () => {
    auth.onAuthStateChanged( (authUser) => {
      if(authUser) {
        const usr: IUser = {
          id: authUser.uid,
          displayName: authUser.displayName||"",
          photo: authUser.photoURL ||undefined,
          email: authUser.email ||""         
        }
        console.log(`login usr=`)
        console.dir(usr)
        dispatch(login(usr));
      } else {
        dispatch(logout(undefined));
      }
    });
  }, [dispatch]);

  const user = useSelector(selectUser);
  let ctl;
  if(user) {
    ctl = (
      <>
        <Sidebar />
        <Chat />
      </>
    );
  } else {
    ctl = <Login />
  }
  return (
    <div className="app">
      {ctl}
    </div>
  );
}

export default App;
