# 🎥 Vidly

Vidly is a video rental service simulation built using the node, express and mongo. It showcases backend development with user authentication, protected routes, and admin-level operations for managing genres, movies, and customers.

![Last Commit](https://img.shields.io/github/last-commit/OmarTemsah99/vidly)
![Stack](https://img.shields.io/badge/stack-MERN-blue)

---

## 🛠 Built with:

- 🌐 **MongoDB** – NoSQL database
- ⚙️ **Express.js** – Backend framework
- 🔐 **JWT** – Secure authentication
- 🛠 **Node.js** – Runtime environment

---

## 📚 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [License](#license)

---

## 📝 Overview

**Vidly** is a fictional movie rental platform that includes user login, registration, movie listing, and admin functions. The project is divided into client and server components.

> ⚠️ This project is not deployed. It must be run locally on your machine.

---

## ✨ Features

- 🧾 JWT-based authentication and protected routes
- 👤 User registration/login with role-based access
- 🎬 CRUD operations for movies, genres, rentals
- 📄 Form validation and pagination
- 🧠 Backend with RESTful APIs

---

## ⚙️ Installation

### 1. Clone the repository:

```bash
git clone https://github.com/OmarTemsah99/vidly.git
cd vidly
```

### 2. Setup Backend (`vidly-api-node` folder):

```bash
cd vidly-api-node
npm install
```

Create a `.env` file and add:

```env
VIDLY_JWT_PRIVATE_KEY=your_jwt_key
```

Start the server:

```bash
node index.js
```


## 💻 Usage

- Visit: `http://localhost:3000`
- Register or login
- Navigate to movies and perform admin operations (if logged in as admin)

---

## 🧰 Tech Stack

- **Backend:** Node.js, Express.js, MongoDB, JWT
- **Validation:** Joi
- **Authentication:** Custom middleware & JWT

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📬 Contact

For any issues or collaboration:
- **Email:** omartemsah99@gmail.com
- **GitHub:** [github.com/OmarTemsah99](https://github.com/OmarTemsah99)
