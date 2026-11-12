# 📱 To-Do – Full Stack Mobile Task Management Application

A full-stack mobile task management application developed using **React Native, Expo, Django REST Framework, and PostgreSQL**. The application helps users organize daily activities, manage tasks efficiently, and track their progress through a simple, intuitive mobile interface.

The project demonstrates mobile application development, RESTful API integration, backend development, and relational database management.

## 🚀 Features

- **Task Creation:** Add new tasks to organize daily activities.
- **View Tasks:** Access and manage existing tasks.
- **Update Tasks:** Edit task information when needed.
- **Delete Tasks:** Remove tasks that are no longer required.
- **Task Status Management:** Track pending and completed tasks.
- **REST API Integration:** Communicate between the mobile application and backend services.
- **Database Integration:** Store and retrieve task information using PostgreSQL.
- **Mobile-Friendly UI:** Interactive interface developed using React Native and Expo.

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Mobile Frontend | React Native, Expo |
| Programming Languages | JavaScript, Python |
| Backend | Django, Django REST Framework |
| Database | PostgreSQL |
| API Architecture | RESTful APIs |
| Development Tools | VS Code, Git, GitHub |

## 📂 Project Structure

```text
TO-DO/
│
├── backend/             # Django REST Framework backend
│   ├── ...              # Django project and application files
│   └── ...
│
├── mobile/              # React Native + Expo application
│   ├── ...              # Mobile screens and components
│   └── ...
│
└── .gitignore           # Git ignored files
```

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd TO-DO
```

### 2. Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment on Windows:

```bash
venv\Scripts\activate
```

Install dependencies using the project's requirements file, if available:

```bash
pip install -r requirements.txt
```

Configure the PostgreSQL database connection in the Django settings or environment variables.

Run database migrations:

```bash
python manage.py migrate
```

Start the backend server:

```bash
python manage.py runserver 0.0.0.0:8000
```

### 3. Mobile Application Setup

Open a new terminal and navigate to the mobile folder:

```bash
cd mobile
```

Install dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npx expo start
```

Open the application using Expo Go on a compatible mobile device or an Android emulator.

**Important:** When testing on a physical phone, configure the API base URL using your computer's local network IP address instead of `localhost`. The phone and backend must be able to communicate over the network.

## 🔄 Application Workflow

1. The user opens the mobile application.
2. React Native displays the task management interface.
3. The user creates, updates, views, or deletes a task.
4. The mobile application sends an HTTP request to the Django REST API.
5. Django processes the request and interacts with PostgreSQL.
6. The backend returns a response to the mobile application.
7. The interface displays the updated task information.

## 🏗️ System Architecture

```text
React Native + Expo
        |
        | HTTP / REST API
        v
Django REST Framework
        |
        | Database Operations
        v
     PostgreSQL
        |
        | API Response
        v
React Native Mobile UI
```

## 📱 Application Screenshots

Screenshots of the mobile application can be added here to demonstrate the user interface and task management functionality.

## 🎯 Project Objectives

- Develop a functional mobile task management application.
- Implement CRUD operations using RESTful APIs.
- Connect a React Native frontend with a Django backend.
- Use PostgreSQL for persistent task data storage.
- Gain practical experience in full-stack mobile application development.

## 🔮 Future Enhancements

- User authentication and personalized task management.
- Task priority levels and due dates.
- Push notifications and task reminders.
- Task categories and advanced filtering.
- Offline task management and synchronization.
- Application deployment and distribution.

## 👩‍💻 Developer

**Kavya Pandian**

Full Stack Developer | React Native | Python | Django REST Framework
