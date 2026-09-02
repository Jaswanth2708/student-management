# 🎓 Student Management System

A full-stack **Student Management System** built using **React, Node.js, Express, and MySQL**.

The application allows users to manage student information, marks, results, and attendance through a simple web interface.

## 🚀 Features

### 🔐 Authentication

* User registration
* User login
* Protected routes
* Logout functionality

### 👨‍🎓 Student Management

* Add new students
* Edit student details
* Delete students
* View student details
* Student ID generation
* Department information
* Student image support

### 📊 Student Results

* Maths marks
* Physics marks
* Computer Science marks
* Total marks calculation
* Percentage calculation
* Grade calculation
* Pass/Fail result calculation

### 🔍 Search and Filtering

* Search students by name
* Sort by name
* Sort by highest percentage
* Sort by lowest percentage
* Filter students by department

### 📅 Attendance Management

* Mark student attendance
* Present/Absent status
* View attendance records
* Change attendance status
* Delete attendance records
* Attendance summary
* Individual student attendance history
* Attendance percentage
* Good/Low attendance indicator

### 📥 Export and Reports

* Export student data to CSV
* Print individual student reports

### 🎨 UI Features

* Dark/Light mode
* Responsive student cards
* Delete confirmation popup
* Student image preview
* Simple navigation

## 🛠️ Technologies Used

### Frontend

* React
* Vite
* React Router
* CSS
* JavaScript

### Backend

* Node.js
* Express.js
* MySQL
* MySQL2
* CORS

### Database

* MySQL

## 📁 Project Structure

```text
student-management/
│
├── README.md
│
├── student-app/
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── studentCard.jsx
│   │   │
│   │   ├── context/
│   │   │   └── StudentContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── LoginItem.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Students.jsx
│   │   │   ├── StudentDetails.jsx
│   │   │   ├── Attendance.jsx
│   │   │   └── About.jsx
│   │   │
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── student-backend/
    ├── routes/
    │   ├── attendanceRoutes.js
    │   ├── authRoutes.js
    │   └── studentRoutes.js
    │
    ├── db.js
    ├── server.js
    └── package.json
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd student-management
```

### 2. Install frontend dependencies

```bash
cd student-app
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd student-management/student-backend
npm install
```

## 🗄️ Database Setup

Make sure **MySQL Server** is installed and running.

Create the database:

```sql
CREATE DATABASE student_management;
```

The backend uses MySQL to store:

* Users
* Students
* Attendance records

Update the database connection details in:

```text
student-backend/db.js
```

according to your local MySQL configuration.

## ▶️ Running the Application

### Start the backend

From the `student-backend` directory:

```bash
node server.js
```

The backend runs on:

```text
http://localhost:5000
```

### Start the frontend

Open another terminal and go to:

```bash
cd student-app
```

Run:

```bash
npm run dev
```

Vite will provide the local frontend address in the terminal.

Open that address in your browser.

## 🔗 API Routes

### Authentication

```text
POST /api/register
POST /api/login
```

### Students

```text
GET    /api/students
POST   /api/students
PUT    /api/students/:id
DELETE /api/students/:id
```

### Attendance

```text
GET    /api/attendance
POST   /api/attendance
PUT    /api/attendance/:id
DELETE /api/attendance/:id
GET    /api/attendance/summary
GET    /api/attendance/student/:studentId
```

## 📊 Application Flow

```text
User
 │
 ▼
React Frontend
 │
 │ HTTP Requests
 ▼
Node.js + Express Backend
 │
 ▼
MySQL Database
 │
 ▼
Response
 │
 ▼
React UI
```

## 🔒 Authentication Flow

```text
Register
   ↓
Backend
   ↓
MySQL
   ↓
Login
   ↓
Backend Verification
   ↓
loggedInUser stored in localStorage
   ↓
Protected Routes
```

## 🎯 Learning Outcomes

This project demonstrates practical experience with:

* React components
* React Hooks
* React Context API
* React Router
* Protected routes
* REST APIs
* Node.js
* Express.js
* MySQL database integration
* CRUD operations
* Asynchronous JavaScript
* Fetch API
* Form validation
* State management
* Data filtering and sorting
* Attendance management
* CSV generation
* Browser localStorage

## 🔮 Future Improvements

Possible future improvements include:

* JWT-based authentication
* Password hashing
* Role-based access control
* Environment variables for configuration
* Image upload using cloud storage
* Pagination
* Advanced dashboard charts
* Deployment to a cloud platform

## 👨‍💻 Author

**S Jaswanth**

Built as a full-stack web development project using React, Node.js, Express, and MySQL.
