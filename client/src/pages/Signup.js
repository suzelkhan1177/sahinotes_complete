import { useState } from 'react';
import ApiFunction from '../api/ApiFunction';

function Signin() {
     const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const api = ApiFunction();


    return (
        <>
        <h1>Create Account Page</h1>
        <form onSubmit={(event) => event.preventDefault()}>
            <input  onChange={(e) => setName(e.target.value)}  type='text' name='name' placeholder='Your Name'></input>
            <input  onChange={(e) => setEmail(e.target.value)}  type='email' name='email' placeholder='Your email'></input>
            <input onChange={(e) => setPassword(e.target.value)} type='password' name='password' placeholder='Your password'></input>
            <input onChange={(e) => setConfirmPassword(e.target.value)} type='password' name='confirm_password' placeholder='Your Confirm  password'></input>
           
            <button onClick={()=>{api.signup(name , email, password, confirm_password);}}>Sign In</button>
        </form>

        </>
    );
}

export default Signin;