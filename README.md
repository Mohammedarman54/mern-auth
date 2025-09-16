MERN Authentication System
Overview

This project implements a secure and scalable authentication system using the MERN stack (MongoDB, Express.js, React.js with Vite, Node.js). It provides all the essential authentication features such as user registration, login, account verification via OTP, and password reset.

The backend is already deployed on Render, while the frontend will be deployed on Vercel for production-ready hosting. The project emphasizes modern authentication best practices, clean architecture, and real-world deployment.

Features

User Registration & Login – Secure signup and login with proper input validation.

Email Verification (OTP) – Accounts are verified using a one-time password sent to the registered email.

Password Reset (via OTP) – Users can reset forgotten passwords using an OTP sent via email.

JWT-based Authentication – JSON Web Tokens used to handle session management securely.

Password Hashing with bcrypt – All passwords are encrypted before storage for maximum security.

Protected API Routes – Middleware ensures that only authorized users can access certain resources.

Environment-based Configurations – Sensitive keys are stored in .env for secure handling.

Frontend with React + Vite – Fast and optimized development setup for building UI.

Backend Deployment on Render – Fully deployed and tested with Postman.

(Pending) Frontend Deployment on Vercel – To be hosted for production use.

Technologies Used

Frontend

React.js (with Vite)

Tailwind CSS (if you styled with it)

Fetch API / Axios for API requests

Backend

Node.js

Express.js

MongoDB with Mongoose

JWT (authentication & authorization)

bcrypt (password hashing)

Nodemailer (for sending OTPs)

Deployment

Render (Backend – live)

Vercel (Frontend – upcoming)

Installation
1. Clone the repository
git clone https://github.com/your-username/MERN-Auth.git
cd MERN-Auth

2. Setup Backend
cd server
npm install


Create a .env file inside the server/ folder:

PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password


Run the backend:

npm start

3. Setup Frontend
cd client
npm install


Create a .env file inside the client/ folder:

VITE_API_BASE_URL=https://your-backend-url.onrender.com


Run the frontend:

npm run dev

Usage

Open the frontend (http://localhost:5173 during development, Vercel link once deployed).

Register as a new user with your email and password.

Check your email for an OTP to verify your account.

Log in using your credentials.

Access protected resources using authenticated routes.

If you forget your password, request a reset OTP and create a new password.

Future Enhancements

🌐 OAuth Integration – Google / GitHub sign-in.

🛡️ Role-Based Access Control – Different permissions for Admin/User.

👤 User Profile Management – Update profile details and upload profile pictures.

🔐 Two-Factor Authentication (2FA) – Extra security for logins.

📊 Activity Logs – Track user login history and password reset attempts.

🚀 Frontend Deployment on Vercel – To make the app fully live and accessible.

Author

👤 Mohammed Arman Ali

GitHub

LinkedIn
