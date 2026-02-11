# 🍕 Crustify — Full-Stack Pizza Delivery Platform

Crustify is a production-style full stack pizza ordering web application built completely from scratch using the MERN stack.  
Users can create customized pizzas, securely place orders, and track order status in real time, while the admin manages inventory and order workflow from a dedicated dashboard.

This project was developed by Me from Scratch for My internship at **Oasis Infobyte**.




# 🧑‍💻 About The Project
I designed and developed the entire application myself — including UI layout, backend architecture, authentication system, database schema, and order lifecycle logic.  
The objective was to simulate a real restaurant ordering ecosystem instead of a basic CRUD food app.

---

## 🧩 Tech Stack

### Core Technologies
![React](https://img.shields.io/badge/Frontend-React-61DBFB?logo=react&logoColor=white)
![Node](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/API-Express.js-black?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-4EA94B?logo=mongodb&logoColor=white)

### Other Tools & Services
![JWT](https://img.shields.io/badge/Auth-JWT-orange?logo=jsonwebtokens&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Emails-Nodemailer-0A66C2?logo=gmail&logoColor=white)
![Bootstrap](https://img.shields.io/badge/UI-Bootstrap-7952B3?logo=bootstrap&logoColor=white)
![Razorpay](https://img.shields.io/badge/Payments-Razorpay-02042B?logo=razorpay&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

### Hosting
![API Hosted On](https://img.shields.io/badge/API%20Hosted%20On-Render-46E3B7?logo=render&logoColor=white)
![Frontend Hosted On](https://img.shields.io/badge/Frontend%20Hosted%20On-Vercel-000000?logo=vercel&logoColor=white)



---

## 🌐 Live Demo
[![Live Site](https://img.shields.io/badge/Visit-Live%20Application-red?style=for-the-badge)](https://crustify-one.vercel.app/)

---

## 🚀 Features

### 👤 Authentication
- User Signup & Login
- Admin Login
- JWT Authentication
- Protected Routes
- Email Verification
- Forgot Password System
- Secure Middleware Authorization

---

### 🍕 Custom Pizza Builder
Users can create their own pizza step-by-step:
1. Choose Pizza Base (5 options)
2. Select Sauce (5 options)
3. Select Cheese
4. Choose Veggies
5. Add Meat (optional)

Dynamic pricing updates automatically based on selections.

---

### 🛒 Ordering System
- Browse Pizza Menu Dashboard
- Category Filtering
- Add / Remove / Update Cart
- Quantity & Size Based Pricing
- Persistent Cart using Context API
- Checkout & Order Placement

---

### 💳 Payment
- Razorpay Payment Gateway (Test Mode)
- Dummy Account Integration
- On Payment Success → Order Automatically Confirmed

---

### 📦 Order Workflow
Admin controls order status:

Order Received → In Kitchen → Out for Delivery → Delivered

Every status change is reflected instantly in the user dashboard.

---

### 🧑‍🍳 Admin Dashboard (Inventory System)
Admin can manage stock of:
- Pizza Base
- Sauce
- Cheese
- Veggies
- Meat

After each order, stock automatically updates.

---

### 📧 Smart Notifications
Automated email alerts:
If stock falls below a threshold (e.g., Pizza Base < 20), the admin receives an email notification.

---

## 🎨 UI / UX
- Fully Responsive Design
- Dark Theme UI
- Animated Veg / Non-Veg Indicators
- Carousel Offers Section
- Clean Modern Layout

---


## 🏗 Tech Stack


| Category | Technologies |
|---------|------------|
| **Frontend** | ![React](https://img.shields.io/badge/React-61DBFB?logo=react&logoColor=white) ![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=white) ![Context API](https://img.shields.io/badge/Context%20API-000000?logo=react&logoColor=white) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white) ![REST API](https://img.shields.io/badge/REST%20API-ff6f00?logo=fastapi&logoColor=white) |
| **Database** | ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white) ![Mongoose](https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=white) |
| **Authentication & Services** | ![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white) ![Nodemailer](https://img.shields.io/badge/Nodemailer-0A66C2?logo=gmail&logoColor=white) ![Razorpay](https://img.shields.io/badge/Razorpay-02042B?logo=razorpay&logoColor=white) |
| **Deployment** | ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?logo=netlify&logoColor=white) ![Render](https://img.shields.io/badge/Render-46E3B7?logo=render&logoColor=white) |


---

## 📂 Project Structure

```bash
├── 📁 backend
│   ├── 📁 middleware
│   │   ├── 📄 fetchdetails.js
│   │   ├── 📄 isAdmin.js
│   ├── 📁 models
│   │   ├── 📄 Inventory.js
│   │   ├── 📄 Orders.js
│   │   ├── 📄 User.js
│   ├── 📁 Routes
│   │   ├── 📄 admin.js
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
│   ├── 📁 admin
│   │   ├── 📁 components
│   │   ├── 📁 pages
│   │   ├── 📄 AdminRoutes.js
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

---
## ⚙️ Setup & Running the Project
> [!NOTE]
> Make sure you have **Node.js** and **npm** installed.

### 1️⃣ Install Dependencies
You must install packages for both frontend and backend before running.

```bash
# install frontend dependencies (root folder)
npm install

# install backend dependencies
cd backend
npm install
```

### 2️⃣ Start Backend Server
```bash
cd backend
npm start
```
### 3️⃣ Start Frontend
```bash
npm start

```

## 📚 What I Learned
- REST API design
- JWT Authentication & Authorization
- Payment Gateway Integration
- Email Automation with Nodemailer
- Context API State Management
- Inventory Management Logic
- Full Stack Deployment

---

## 📜 License
MIT License

---

---

## 👨‍💻 Author

**Suhas Raut**  
🚀 Full Stack MERN Developer

I love building real-world web applications with clean UI, scalable backend architecture, and meaningful user experience.  
Crustify was designed to simulate an actual restaurant ordering workflow — from custom pizza creation to inventory management and live order tracking.

If you found this project interesting or helpful, consider giving it a ⭐ — it really supports my work and motivates me to build more!

---

### 📬 Connect With Me
[![GitHub](https://img.shields.io/badge/GitHub-Profile-181717?logo=github&logoColor=white)](https://github.com/Suhas-Raut)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?logo=linkedin&logoColor=white)](https://linkedin.com/in/suhas-raut)
[![Email](https://img.shields.io/badge/Email-Contact-D14836?logo=gmail&logoColor=white)](mailto:suhasraut24@gmail.com)


---