import { useState } from "react";
import ApiFunction from "../api/ApiFunction";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const api = ApiFunction();
  const url = window.location.href;
  const accessToken = url.substring(url.indexOf("=") + 1, url.length);

  return (
    <>
      <main className="main">
        <div className="login-page">
          <div className="form">
            <form onSubmit={(event) => event.preventDefault()}>
              <h1>Update Password</h1>
              <p>
                <label htmlFor="fullname">Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  placeholder="your password"
                ></input>
              </p>
              <p>
                <label htmlFor="fullname">Confirm Password</label>
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  name="confirm_password"
                  placeholder="confirm your password"
                ></input>
              </p>
              <button
                onClick={() => {
                  api.update_password(password, confirm_password, accessToken);
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default UpdatePassword;
