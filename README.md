# PixAI - Your Imagination, Make Visible.

## ⚙ Introduction

Welcome to **PixAI**, an innovative **AI-Powered Text-to-Image Generator Application**. This advanced **Full Stack SaaS** platform enables users to turn their creative text prompts into stunning, high-quality images using the power of the **ClipDrop API**.  

Built on the robust **MERN stack** (MongoDB, Express, React, and Node.js), PixAI offers a seamless user experience with features like a **credit-based generation system** and secure payment integration through **Razorpay**.  

With a **responsive user interface** and a scalable architecture, PixAI combines modern design with cutting-edge technology to meet the needs of creators, developers, and businesses.

---

<div align="center">
  <img src="https://drive.google.com/uc?export=view&id=1uWj3giQl89EfkU0k6x_ien1-PUqhzfYE" alt="PixAI Banner">
</div>

---

## 📋 Table of Contents

1. ⚙ [Introduction](#introduction)  
2. 🛠️ [Tech Stack](#tech-stack)  
3. 📊 [Features](#features)  
4. 🚀 [Quick Start](#quick-start)  
5. 🤝 [Contributing](#contributing)  
6. 📜 [License](#license)  
7. 💬 [Support](#support)  

---

## 🛠️ Tech Stack

PixAI is powered by the following technologies:  

<div>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white">
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white">
</div>

---

## 📊 Features

- **Modern User Interface**: A sleek, intuitive design ensuring smooth navigation across all devices.  
- **AI-Powered Text-to-Image Generation**: Generate high-quality images from text prompts using the ClipDrop API.  
- **Credit-Based System**: Start with free credits and purchase more via the Razorpay payment gateway.  
- **Secure User Authentication**: Account creation, login, and recovery options with robust data protection.  
- **Scalable Database Integration**: User profiles, credits, and transactions securely stored in MongoDB.  
- **Responsive Design**: Optimized for desktops, tablets, and mobile devices.  
- **Purchase Management**: Track credits and transaction history through a user-friendly dashboard.  
- **Efficient API Integration**: Reliable backend communication for fast and secure processing.  
- **Modular Architecture**: Scalable and maintainable codebase for long-term growth.  

---

## 🚀 Quick Start

Set up PixAI locally by following these steps:

### **Prerequisites**  
Ensure the following are installed on your system:  
- [Git](https://git-scm.com/)  
- [Node.js](https://nodejs.org/)  

### **Clone the Repository**  
Navigate to your desired directory and run:  
```bash
git clone https://github.com/its-mkarmakar/PixAI.git
```

---

### **Server Setup**  

1. Navigate to the server directory:  
   ```bash
   cd server && npm install
   ```

2. Create a `.env` file and add the following:  
   ```env
   FRONTEND_URL=http://localhost:5173
   EMAIL=YourGmailId
   EMAIL_APP_PASSWORD=YourGmailAppPassword
   MONGODB_URI=YourMongoDBURI
   JWT_SECRET=YourJWTSecretCode
   CLIPDROP_API=YourClipDropAPIKey
   CURRENCY=YourCurrency
   RAZORPAY_KEY_ID=YourRazorpayKeyId
   RAZORPAY_KEY_SECRET=YourRazorpayKeySecret
   ```

3. Start the server:  
   ```bash
   npm run server
   ```

---

### **Client Setup**  

1. Navigate to the client directory:  
   ```bash
   cd client && npm install
   ```

2. Create a `.env` file and add the following:  
   ```env
   VITE_BACKEND_URL=http://localhost:4000
   RAZORPAY_KEY_ID=YourRazorpayKeyId
   ```

3. Start the client:  
   ```bash
   npm run dev
   ```

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch:  
   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. Make your changes and commit them:  
   ```bash
   git commit -m "Add YourFeatureName"
   ```
4. Push the branch:  
   ```bash
   git push origin feature/YourFeatureName
   ```
5. Open a pull request.

---

## 💬 Support

For support or inquiries, please contact:  
- **Email**: help@pixai.com  
- **GitHub Issues**: [Report an Issue](https://github.com/its-mkarmakar/PixAI/issues)

---

Thank you for using **PixAI**! Your imagination, make visible.
