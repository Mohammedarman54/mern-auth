import express from 'express';
import {
  isAuthenticated,
  login,
  logout,
  register,
  resetPassword,
  sendResetOtp,
  verifyResetOtp, // ✅ added for OTP verification
  sendVerifyotp,
  verifyEmail
} from '../controllers/authController.js';
import userauth from '../middleware/userauth.js';

const authRouter = express.Router();

// Auth routes
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

// Email verification routes
authRouter.post('/send-verify-otp', userauth, sendVerifyotp);
authRouter.post('/verify-account', userauth, verifyEmail);

// Auth check route
authRouter.get('/is-auth', userauth, isAuthenticated);

// Password reset routes
authRouter.post('/send-reset-otp', sendResetOtp);       // Step 1: send OTP
authRouter.post('/verify-reset-otp', verifyResetOtp);   // Step 2: verify OTP
authRouter.post('/reset-password', resetPassword);     // Step 3: reset password

export default authRouter;
