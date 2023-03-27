import { useEffect, useState } from 'react';
import ApiFunction from '../api/ApiFunction';
import {GoogleLogin} from  'react-google-login';
import {gapi} from 'gapi-script';
const clientId = "1011703805644-0bd3gm5uo9unqsvk3aaepqehr8nntunk.apps.googleusercontent.com";
const clientSecret ="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";


function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const api = ApiFunction();

    const onSuccess = async (res) => {
        api.onSuccessFunc(res);
    }
    const onFailure = (res) => {
        console.log("login failed: "+res);
    }

    useEffect(() => {
        function start(){
             gapi.client.init({
                clientId : clientId,
                clientSecret : clientSecret,
               scope: ""
             });
        }
        gapi.load('client:auth2', start);
    });

    return (
        <>
        <h1>Login Page</h1>
        <form onSubmit={(event) => event.preventDefault()}>
            <input  onChange={(e) => setEmail(e.target.value)}  type='email' name='email' placeholder='Your email'></input>
            <input onChange={(e) => setPassword(e.target.value)} type='password' name='password' placeholder='Your password'></input>
            <button onClick={()=>{api.signin(email, password);}}>Sign In</button>
        </form>

        <GoogleLogin
       clientId={clientId}
       buttonText="Google Login"
       onSuccess={onSuccess}
       onFailure={onFailure}
       cookiePolicy={'single_host_origin'}
       isSignedIn={true}
        />

        </>
    );
}

export default Signin;