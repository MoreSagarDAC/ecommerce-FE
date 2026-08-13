import CryptoJS from "crypto-js";

const SECRET_KEY =
  import.meta.env.VITE_ENCRYPTION_KEY ||
  "default-secret-key-change-in-production";

export const encryptEmail = (email) => {
  try {
    return CryptoJS.AES.encrypt(email, SECRET_KEY).toString();
  } catch (error) {
    console.error("Email encryption error:", error);
    return email;
  }
  
};

export const encryptPassword = (password) => {
  try {
    return CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
  } catch (error) {
    console.error("Password encryption error:", error);
    return password;
  }
};
