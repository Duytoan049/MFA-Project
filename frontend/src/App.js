import React, { useState } from "react";
import QrCodeGenerator from "./components/QrCodeGenerator";
import OtpVerification from "./components/OtpVerification";

function App() {
  const [username, setUsername] = useState("");
  const [qrImage, setQrImage] = useState(null);

  return (
    <div style={{ padding: 30 }}>
      <h2>🔐 Multi-Factor Authentication (MFA)</h2>

      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: 10, marginRight: 10 }}
      />

      <QrCodeGenerator username={username} setQrImage={setQrImage} />

      {qrImage && (
        <div style={{ marginTop: 20 }}>
          <h4>Scan this QR Code with Google Authenticator:</h4>
          <img src={qrImage} alt="QR Code" width="200" />
        </div>
      )}

      <hr style={{ margin: "30px 0" }} />

      <OtpVerification username={username} />
    </div>
  );
}

export default App;
