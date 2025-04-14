import React, { useState } from "react";
import axios from "axios";

const OtpVerification = ({ username }) => {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async () => {
    try {
      const res = await axios.post("http://localhost:3000/verify-mfa", {
        username,
        token,
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div>
      <h4>Enter OTP from Google Authenticator:</h4>
      <input
        type="text"
        placeholder="Enter OTP"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        style={{ padding: 10, marginRight: 10 }}
      />
      <button onClick={handleVerify} style={{ padding: 10 }}>
        Verify
      </button>
      <p style={{ marginTop: 10 }}>{message}</p>
    </div>
  );
};

export default OtpVerification;
