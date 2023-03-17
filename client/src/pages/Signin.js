import { useState } from 'react';
import ApiFunction from '../api/ApiFunction';

function Signin() {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const api = ApiFunction();


    return (
        <>
        <h1>Login Page</h1>
        <form onSubmit={(event) => event.preventDefault()}>
            <input  onChange={(e) => setEmail(e.target.value)}  type='email' name='email' placeholder='Your email'></input>
            <input onChange={(e) => setPassword(e.target.value)} type='password' name='password' placeholder='Your password'></input>
            <button onClick={()=>{api.signin(email, password);}}>Sign In</button>
        </form>

        </>
    );
}

export default Signin;