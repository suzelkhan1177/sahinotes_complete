import { useState, useContext, useEffect } from "react";
import ApiFunction from "../api/ApiFunction";
import AuthContext from "../context/notes/AuthContext";
import "../assets/css/mobile_verify.css";

const MobileVerify = () => {
  const { user } = useContext(AuthContext);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const api = ApiFunction();

  var obj = {};
  obj.otp = otp;
  obj.mobileNumber = mobileNumber;

  useEffect(() => {
    api.authentication();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <main className="main">
        <div className="login-page">
          <div className="form">
            <form
              className="login-form"
              onSubmit={(event) => event.preventDefault()}
            >
              <h1>Mobile Verify</h1>
              <p>
                <label htmlFor="fullname">Mobile Number</label>
                <input
                  onChange={(e) => setMobileNumber(e.target.value)}
                  type="text"
                  name="mobile"
                  placeholder="Enter Your Mobile Number"
                ></input>
              </p>
              <button
                onClick={() => {
                  api.send_otp(user.id, mobileNumber);
                }}
              >
                Send OTP
              </button>
              <p>
                <label htmlFor="fullname">Enter otp</label>
                <input
                  onChange={(e) => setOtp(e.target.value)}
                  type="password"
                  name="otp"
                  id="otp"
                  placeholder="Enter OTP"
                ></input>
              </p>
              <button
                onClick={() => {
                  api.verify_otp(user.id, obj);
                }}
              >
                Verify OTP
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default MobileVerify;
