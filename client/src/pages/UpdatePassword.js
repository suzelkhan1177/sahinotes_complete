import { useState } from "react";
import ApiFunction from "../api/ApiFunction";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const api = ApiFunction();
  const url = window.location.href;
 const accessToken = url.substring(url.indexOf('=')+1, url.length);


  return (
    <>
      <h1>Update Password </h1>
      <form onSubmit={(event) => event.preventDefault()}>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="your password"
        ></input>

        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          name="confirm_password"
          placeholder="confirm your password"
        ></input>

        <button onClick={() => {api.update_password(password, confirm_password, accessToken)}}>Submit</button>
      </form>
    </>
  );
};

export default UpdatePassword;
