# Adjunct 🚀  
**The AI assistant that sends your emails — so you don’t have to.**

Adjunct is an AI-powered personal assistant that helps you write and send professional emails effortlessly.  
Just type your intent — Adjunct generates, refines, and sends it via Gmail for you.

---
Live :- [https://adjunct-flax.vercel.app/]

## ✨ Features

- ✅ AI-Powered Email Writing  
- 📩 Gmail API Integration  
- 🔐 Secure OAuth Authentication  
- 💬 User-Friendly Chat Interface  

---

## 🧠 Tech Stack

- **Frontend:** React.js  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **AI Model:** Gemini API  
- **Integrations:** Gmail API  

---

## ⚙️ Installation

### Prerequisites

- Node.js (v18+)
- MongoDB
- Gemini AI API Key
- Gmail API (enabled in Google Cloud Console)

### Clone the Project

```bash
git clone https://github.com/praneeth4040/Adjunct.git
cd Adjunct

Backend Setup

cd server
npm install

Create a .env file in the server folder:

PORT=3000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

Then start the server:
npm start

Frontend Setup

cd client
npm install

Then start the Frontend:
npm run dev
