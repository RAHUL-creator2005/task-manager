# Task Manager Web Application

A full-stack MERN application that helps users organize, manage, and track their daily tasks efficiently. The application provides secure authentication, task management features, and a modern responsive user interface built with Material UI.

---

## Features

### Authentication

* User Registration
* User Login
* JWT-based Authentication
* Protected Routes

### Task Management

* Create Tasks
* View Tasks
* Update Tasks
* Delete Tasks
* Mark Tasks as Completed
* Manage Personal Tasks

### User Experience

* Responsive Design
* Modern Material UI Components
* Intuitive Interface
* Real-Time Task Updates

---

## Tech Stack

### Frontend

* React.js
* Material UI (MUI)
* React Router DOM
* Axios
* Vite

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt.js

### Database

* MongoDB Atlas
* Mongoose

### Deployment

* Vercel (Frontend)
* Render (Backend)

---

## Architecture

```text
Frontend (React + MUI)
        │
        ▼
Backend (Node.js + Express)
        │
        ▼
MongoDB Atlas
```

---

## Project Structure

```text
task-manager/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone the Repository

```bash
git clone <repository-url>
cd task-manager
```

---

## Backend Setup

Navigate to the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm start
```

---

## Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

---

## API Endpoints

### Authentication

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register User |
| POST   | /api/auth/login    | Login User    |

### Tasks

| Method | Endpoint       | Description   |
| ------ | -------------- | ------------- |
| GET    | /api/tasks     | Get All Tasks |
| POST   | /api/tasks     | Create Task   |
| PUT    | /api/tasks/:id | Update Task   |
| DELETE | /api/tasks/:id | Delete Task   |

---

## Deployment

### Frontend Deployment

* Platform: Vercel

### Backend Deployment

* Platform: Render

### Database Hosting

* MongoDB Atlas

---

## Screenshots

Add screenshots of:

* Login Page
* Registration Page
* Dashboard
* Task Management Screen

Example:

```markdown
![Login Page](screenshots/login.png)
![Dashboard](screenshots/dashboard.png)
```

---

## Future Enhancements

* Task Categories
* Task Priorities
* Due Dates
* Task Search and Filtering
* Dark Mode
* Email Notifications
* Team Collaboration
* WebSocket-Based Real-Time Updates
* Mobile Application Version

---

## Learning Outcomes

This project helped me gain practical experience in:

* Full-Stack MERN Development
* REST API Development
* Authentication and Authorization
* MongoDB Database Design
* Material UI Component Development
* Frontend and Backend Integration
* Cloud Deployment
* Environment Variable Management
* Git and GitHub Workflow

---

## Author

Rahul

---

## License

This project is intended for educational, learning, and portfolio purposes.

