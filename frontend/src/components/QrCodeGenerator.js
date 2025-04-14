import React from "react";
import axios from "axios";

const QrCodeGenerator = ({ username, setQrImage }) => {
  const handleGenerate = async () => {
    try {
      const res = await axios.post("http://localhost:3000/generate-mfa", {
        username,
      });
      setQrImage(res.data.qrImage);
    } catch (err) {
      alert("Failed to generate QR Code");
    }
  };

  return (
    <button onClick={handleGenerate} style={{ padding: 10 }}>
      Generate QR Code
    </button>
  );
};

export default QrCodeGenerator;
