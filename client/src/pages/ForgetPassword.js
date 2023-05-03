import { useState } from "react";
import ApiFunction from "../api/ApiFunction";
import "../assets/css/signin.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const api = ApiFunction();

  return (
    <>
      <main className="main">
        <div className="login-page">
          <div className="form">
            <form onSubmit={(event) => event.preventDefault()}>
              <h1>Forgot Password</h1>
              <p>
                <label htmlFor="fullname">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  placeholder="your email"
                ></input>
              </p>
              <button
                onClick={() => {
                  api.forget_password(email);
                }}
              >
                Send Email
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default ForgetPassword;
