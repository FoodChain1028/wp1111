import AppTitle from '../components/Title';
import LogIn from "../components/Login";
import { useChat } from "./hooks/useChat";
import { useEffect } from 'react';

const SignIn = () => {

    const { me, setMe, setSignedIn, sendLoginData, sendSignUpData, displayStatus, password, setPassword} = useChat();

    const handleSignIn = (name) => {
        if (!name){
            displayStatus({type: "error", msg: "missing user name"});
            return;
        }
        else setSignedIn(true);
    }

    const handleLogin = (name, password) => {
        console.log("pass", password);
         if (!name){
            displayStatus({type: "error", msg: "missing user name"});
            return;
         }

         if (!password){
            displayStatus({type: "error", msg: "missing password"});
            return;
         }

        sendLoginData(name, password);
        // else setSignedIn(true);
    }

    const handleSignUp = (name, password) => {
        if (!name){
            displayStatus({type: "error", msg: "missing user name"});
            return;
        }
        if (!password){
            displayStatus({type: "error", msg: "missing password"});
            return;
        }
        sendSignUpData(name, password);
    }
        

    return (
        <>
            <AppTitle />
            <LogIn me={me} setName={setMe} onLogin={handleLogin} onSignUp={handleSignUp} password={password} setPassword={setPassword} handleSignIn={handleSignIn}/>
        </>
    );
}

export default SignIn;