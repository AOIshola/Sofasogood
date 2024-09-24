# MERN Stack E-Commerce Furniture Platform

This is a full-stack e-commerce furniture platform built using the MERN stack (MongoDB, Express, React, Node.js). The platform allows users to browse products, manage their cart and wishlist, read blogs, and leave reviews. Authenticated users can complete purchases, and admins have the ability to manage products and reviews.

## Table of Contents
1. [Features](#features)
2. [Project Structure](#project-structure)
3. [Technologies](#technologies)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
6. [Running the Project](#running-the-project)
7. [Environment Variables](#environment-variables)

## Features

- User authentication (login, register, reset password)
- Browse, add to cart, and manage wishlist
- Review and rate products
- Admin management of products and reviews
- Blog section for product-related articles
- Fully responsive design

## Project Structure

The project is divided into two main directories:

## Technologies

### Backend:
- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **Bcrypt** for password encryption
  
### Frontend:
- **React.js**
- **Axios** for API calls
- **Context API** for state management
- **React Router** for navigation
- **React Toastify** for notifications

## Prerequisites

Ensure you have the following installed:

- **Node.js** (>= 14.x.x)
- **MongoDB** (Installed locally or a cloud instance like MongoDB Atlas)
- **npm** or **yarn**

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AOIshola/Sofasogood.git
   cd Sofasogood

    # Navigate to backend directory
    cd backend
    npm install

    # Navigate to frontend directory
    cd ../frontend
    npm install

    cd backend
    npm start

    # The backend should now be running on http://localhost:5000.

    cd frontend
    npm run dev

    # The frontend should now be running on http://localhost:5173.

## Environment Variables
To run the project, create a .env file in the backend directory with the following values:

# Backend environment variables
MONGO_URI=<your-mongo-db-uri>
SECRET_KEY=<your-jwt-secret>

# Email for password reset (Optional)
EMAIL_USER=<your-email-user>
EMAIL_PASS=<your-email-pass>

# Frontend environment variables
VITE_API_URL=http://127.0.0.1:5000/api/