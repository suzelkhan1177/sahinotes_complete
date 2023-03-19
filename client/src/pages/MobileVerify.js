import { useState, useContext } from "react";
import ApiFunction from "../api/ApiFunction";
import AuthContext from "../context/notes/AuthContext";

const MobileVerify = () => {
  const { user } = useContext(AuthContext);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const api = ApiFunction();

  var obj = {};
  obj.otp = otp;
  obj.mobileNumber = mobileNumber;

  return (
    <>
      <h1>MobileVerify </h1>
      <form onSubmit={(event) => event.preventDefault()}>
        <input
          onChange={(e) => setMobileNumber(e.target.value)}
          type="text"
          name="mobile"
          placeholder="Enter Your Mobile Number"
        ></input>

        <button
          onClick={() => {
            api.send_otp(user.id, mobileNumber);
          }}
        >
          Send OTP
        </button>

        <input
          onChange={(e) => setOtp(e.target.value)}
          type="password"
          name="otp" id="otp" placeholder="Enter OTP"
        ></input>

        <button
          onClick={() => {
            api.verify_otp(user.id, obj);
          }}
        >
          Verify OTP
        </button>
      </form>
    </>
  );
};

export default MobileVerify;
