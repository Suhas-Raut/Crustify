# 🍕 Crustify — Full Stack Food Ordering App

Crustify is a modern **MERN stack** food ordering web app where users can browse items, customize pizzas, manage cart, and place orders securely with authentication.

---
![MERN](https://img.shields.io/badge/Stack-MERN-green)
![React](https://img.shields.io/badge/Frontend-React-blue)
![Node](https://img.shields.io/badge/Backend-Node.js-darkgreen)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Status](https://img.shields.io/badge/Project-Active-success)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

---

## 🌐 Live Demo

[![Live Site](https://img.shields.io/badge/Visit-Live%20App-red?style=for-the-badge)](https://your-deployment-link.com)

---

## 🚀 Features

### 👤 Authentication
- User Signup & Login (JWT based)
- Password protected routes
- Auth middleware verification
- Email sending support (via Nodemailer)

### 🛒 Cart System
- Add / Update / Remove items
- Custom Pizza support
- Quantity & size based pricing
- Persistent state using Context API

### 🍕 Food Ordering
- Category based filtering
- Dynamic item cards
- Veg / Non-Veg indicators
- Custom Pizza Builder

### 📦 Orders
- Checkout system
- Orders stored in MongoDB
- Order history (My Orders)

### 🎨 UI/UX
- Bootstrap Dark Theme
- Animated cursor for Veg / Non-Veg
- Carousel offers section
- Responsive design

---

## 🏗 Tech Stack

| Frontend | Backend | Database | Other |
|----------|---------|----------|------|
| React.js | Node.js | MongoDB | JWT |
| Bootstrap | Express.js | Mongoose | Nodemailer |
| Context API | REST APIs | | |

---

## 📂 Project Structure

```bash
├── 📁 backend
│   ├── 📁 middleware
│   │   ├── 📄 fetchdetails.js
│   ├── 📁 models
│   │   ├── 📄 Orders.js
│   │   ├── 📄 User.js
│   ├── 📁 Routes
│   │   ├── 📄 Auth.js
│   │   ├── 📄 payment.js
│   ├── 📁 utils
│   │   ├── 📄 mailer.js
│   ├── 📄 .env
│   ├── 📄 db.js
│   ├── 📄 index.js
│   ├── 📄 LICENSE
│   ├── 📄 package-lock.json
│   ├── 📄 package.json
├── 📁 public
│   ├── 📄 favicon.ico
│   ├── 📄 index.html
│   ├── 📄 logo192.png
│   ├── 📄 logo512.png
│   ├── 📄 manifest.json
│   ├── 📄 robots.txt
├── 📁 src
│   ├── 📁 components
│   │   ├── 📁 Images
│   │   ├── 📄 Card.js
│   │   ├── 📄 Carousel.js
│   │   ├── 📄 ContextReducer.js
│   │   ├── 📄 FoodCarousel.js
│   │   ├── 📄 Footer.js
│   │   ├── 📄 Navbar.js
│   ├── 📁 data
│   │   ├── 📄 offers.js
│   ├── 📁 screens
│   │   ├── 📄 Cart.js
│   │   ├── 📄 Home.js
│   │   ├── 📄 Login.js
│   │   ├── 📄 MyOrder.js
│   │   ├── 📄 Signup.js
│   │   ├── 📄 VerifyEmail.js
│   ├── 📄 App.css
│   ├── 📄 App.js
│   ├── 📄 App.test.js
│   ├── 📄 index.css
│   ├── 📄 index.js
│   ├── 📄 logo.svg
│   ├── 📄 Modal.js
│   ├── 📄 reportWebVitals.js
│   ├── 📄 setupTests.js
├── 📄 .gitignore
├── 📄 package-lock.json
├── 📄 package.json
├── 📄 README.md
├── 📄 tree.txt

```
## 📂 Inside Backend Folder Create .env file
```bash
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

EMAIL=your_email@gmail.com
EMAIL_PASS=your_app_password
```