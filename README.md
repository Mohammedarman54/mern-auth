🚀 MERN Authentication System
📌 Overview

This project is a full-stack authentication system built using the MERN stack (MongoDB, Express.js, React.js with Vite, Node.js).

It provides a secure and production-ready authentication flow, including:

User registration & login

Account verification via OTP

Password reset functionality

JWT-based session management

The backend is deployed on Render and fully tested via Postman. The frontend is currently running locally and will be deployed on Vercel soon.

✨ Features

🔐 User Registration & Login with input validation

📧 Email Verification (OTP) to activate accounts

🔄 Password Reset via OTP for forgotten credentials

🔑 JWT Authentication for secure session handling

🔒 Password Hashing (bcrypt) for strong security

🛡️ Protected Routes with middleware

⚡ React + Vite Frontend for fast builds & dev environment

☁️ Cloud Deployment (Backend live on Render, Frontend upcoming on Vercel)

🛠️ Tech Stack

Frontend

React.js (Vite)

Tailwind CSS (if used for styling)

Fetch API / Axios

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT (JSON Web Tokens)

bcrypt (password hashing)

Nodemailer (for OTP emails)

Deployment

Render → Backend (Live)

Vercel → Frontend (Pending)

⚙️ Installation
1️⃣ Clone the repository
git clone https://github.com/your-username/MERN-Auth.git
cd MERN-Auth

2️⃣ Setup Backend
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

3️⃣ Setup Frontend
cd client
npm install


Create a .env file inside the client/ folder:

VITE_API_BASE_URL=https://your-backend-url.onrender.com


Run the frontend:

npm run dev

▶️ Usage

Open the frontend (http://localhost:5173 or Vercel link after deployment).

Register a new account with email & password.

Verify your account using the OTP sent to email.

Log in with verified credentials.

Access protected resources securely.

Reset password using OTP if forgotten.

🚧 Future Enhancements

🌐 OAuth (Google / GitHub login)

🛡️ Role-based access (Admin/User)

👤 Profile management (update details, profile picture)

🔐 Two-Factor Authentication (2FA)

📊 User activity logs (login & reset history)

🚀 Full frontend deployment on Vercel

👨‍💻 Author

Mohammed Arman Ali

🌍 GitHub

💼 LinkedIn
