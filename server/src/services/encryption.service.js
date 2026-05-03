const crypto = require("crypto");

const ALGORITHM = "aes-256-gcm";
const KEY_LENGTH = 32;
const IV_LENGTH = 16;
const TAG_LENGTH = 16;

function getEncryptionKey() {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) throw new Error("ENCRYPTION_KEY environment variable is not set");
  // Derive a 32-byte key from the provided key string
  return crypto.createHash("sha256").update(key).digest();
}

function encrypt(plaintext) {
  if (!plaintext) return { encryptedData: null, iv: null };

  const key = getEncryptionKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  const combined = Buffer.concat([authTag, encrypted]);

  return {
    encryptedData: combined.toString("base64"),
    iv: iv.toString("base64"),
  };
}

function decrypt(encryptedData, ivBase64) {
  if (!encryptedData || !ivBase64) return null;

  const key = getEncryptionKey();
  const iv = Buffer.from(ivBase64, "base64");
  const combined = Buffer.from(encryptedData, "base64");

  const authTag = combined.subarray(0, TAG_LENGTH);
  const encrypted = combined.subarray(TAG_LENGTH);

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}

module.exports = { encrypt, decrypt };
