# 📝 MERN To-Do App

This is a full-stack To-Do List application built with the **MERN** stack:  
**MongoDB**, **Express.js**, **React.js**, and **Node.js**.

---

## 🚀 Features

- 🧑‍💼 **User Authentication**
  - Register, login, logout
  - Secure password hashing (with `bcrypt`)
  - JWT-based authentication
  - View and edit profile

- ✅ **To-Do Management**
  - Create, update, delete tasks
  - Fields: title, description, status, created date
  - Mark tasks as completed or pending
  - Filter tasks by status (completed/pending)
  - Search tasks by title

---

## 🧱 Tech Stack

- **Frontend**: React.js + Axios 
- **Backend**: Node.js + Express.js + JWT + Mongoose
- **Database**: MongoDB
- **Authentication**: JWT + bcrypt

---

## 🛠️ Local Setup Instructions

### ✅ Prerequisites

- Node.js (v18 or later)
- MongoDB running locally or using MongoDB Atlas
- npm 

---
### 🧪 1. Set Up the Backend

### 📦 1. Clone the Repository

```bash
git clone https://github.com/Rewan-Adel/Todo-App.git
cd Todo-App
cd backend
npm install
```

### ➕ 2. Create .env file inside backend
```bash
DB_CONNECTION ='mongodb://localhost:27017'
PORT = 8000
JWT_SECRET = 'secret'
```


### 3.▶️ Run the server:
```bash
npm run dev
```
Server will run at: http://localhost:8000

### 💻 2. Set Up the Frontend
```bash
cd ../frontend
npm install
```
## Run the frontend:
```bash
npm run dev
```
React app will run at: http://localhost:5173


