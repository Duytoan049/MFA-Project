require("dotenv").config();
const express = require("express");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let userSecrets = {}; // Giả lập DB

app.post("/generate-mfa", async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ message: "Missing username" });

  const secret = speakeasy.generateSecret({ name: `MFA-${username}` });
  userSecrets[username] = secret.base32;

  const qrImage = await qrcode.toDataURL(secret.otpauth_url);
  res.json({ qrImage, secret: secret.base32 });
});

app.post("/verify-mfa", (req, res) => {
  const { username, token } = req.body;
  const userSecret = userSecrets[username];

  if (!userSecret) return res.status(400).json({ message: "User not found" });

  const isVerified = speakeasy.totp.verify({
    secret: userSecret,
    encoding: "base32",
    token,
    window: 1,
  });

  if (isVerified) {
    res.json({ message: "MFA verified successfully!" });
  } else {
    res.status(401).json({ message: "Invalid token" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Backend is running on port ${PORT}`));
