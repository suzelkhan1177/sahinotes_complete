import { useState } from "react";
import ApiFunction from "../api/ApiFunction";
import { GoogleLogin } from "react-google-login";
import ApiUrl from "../api/ApiUrl";
import "../assets/css/signin.css";
import { Link } from "react-router-dom";

function Signin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
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
              <h1>Registration</h1>
              <div className="social-container">
                <GoogleLogin
                  clientId={url.clientId()}
                  buttonText="Google"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={"single_host_origin"}
                  isSignedIn={true}
                />
              </div>
              <span>or use your account</span>
              <p>
                <label htmlFor="fullname">Full Name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  name="name"
                  placeholder="Your Name"
                ></input>
              </p>
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
              <p>
                <label htmlFor="fullname">Confirm Password</label>
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  name="confirm_password"
                  placeholder="Your Confirm  password"
                ></input>
              </p>
              <Link to="/forget_password">Forgot your password?</Link>
              <button
                onClick={() => {
                  api.signup(name, email, password, confirm_password);
                }}
              >
                Registration
              </button>
            </form>
            <footer className="signup-footer">
              <p>
                Already have an Account? <Link to="/signin">LogIn</Link>
              </p>
            </footer>
          </div>
        </div>
      </main>
    </>
  );
}

export default Signin;
