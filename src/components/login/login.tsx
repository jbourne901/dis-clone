import React from 'react';
import './login.css';
import {auth, provider} from "../../firebase";
import Button from "@material-ui/core/Button";

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider)
        .catch( (err) => {
          console.error(err.message)
        });
  };

  return (
    <div className="login">
      <div className="login-logo-container">
        <img 
          className="login-logo"
          src="https://upload.wikimedia.org/wikipedia/ru/b/b7/Discord_logo_svg.svg" 
          alt=""
        />
        
      </div>

      <Button 
        onClick={() => signIn()}
        className="login-button"
      >
        Sign In
      </Button>
    </div>
  );
}

export default Login;
