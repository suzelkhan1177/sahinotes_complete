import { useState } from "react";
import ApiFunction from "../api/ApiFunction";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const api = ApiFunction();

  return (
    <>
      <h1>Forget Password </h1>
      <form onSubmit={(event) => event.preventDefault()}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          placeholder="your email"
        ></input>

        <button
          onClick={() => {
            api.forget_password(email);
          }}
        >
          Send Email
        </button>
      </form>
    </>
  );
};

export default ForgetPassword;
