import { useState } from "react";
import ApiFunction from "../api/ApiFunction";
import { GoogleLogin } from "react-google-login";
import ApiUrl from "../api/ApiUrl";
import "../assets/css/signin.css";
import { Link } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const api = ApiFunction();
  const url = ApiUrl();

  const onSuccess = async (res) => {
    api.onSuccessFunc(res);
  };
  const onFailure = (res) => {
    console.log("login failed: " + res);
  };

  return (
    <>
      <main className="main">
        <div className="login-page">
          <div className="form">
            <form
              className="login-form"
              onSubmit={(event) => event.preventDefault()}
            >
              <h1>Log In</h1>
              <div className="social-container">
                <GoogleLogin
                  clientId={url.clientId()}
                  buttonText="Google Login"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={"single_host_origin"}
                  isSignedIn={true}
                />
              </div>
              <span>or use your account</span>
              <p>
                <label htmlFor="fullname">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  placeholder="Your email"
                ></input>
              </p>
              <p>
                <label htmlFor="fullname">Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  placeholder="Your password"
                ></input>
              </p>
              <Link to="/forget_password">Forgot your password?</Link>
              <button
                onClick={() => {
                  api.signin(email, password);
                }}
              >
                Log In
              </button>
            </form>

            <footer className="signup-footer">
              <p>
                Create New Account?
                <Link to="/signup">SignUp</Link>
              </p>
            </footer>
          </div>
        </div>
      </main>
    </>
  );
}

export default Signin;
