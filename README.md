# Vehicle Rental System

**Live URL:** [https://l-2-assignment-2-gilt.vercel.app](https://l-2-assignment-2-gilt.vercel.app)

---

## Features

- User authentication with **role-based access** (Admin & Customer)  
- Vehicle management: **add, update, delete, view vehicles**  
- Booking management: **create, update, cancel, return bookings**  
- Secure password hashing and **JWT-based authentication**  
- Admin can manage **all users, vehicles, and bookings**  

---

## Technology Stack

- **Node.js** + **TypeScript**  
- **Express.js** (Web framework)  
- **PostgreSQL** (Database)  
- **bcrypt** (Password hashing)  
- **jsonwebtoken** (JWT authentication)  

---

## Setup & Usage

1. **Clone the repository**  
   ```bash
   git clone https://github.com/ashiful2002/L2_Assignment_2
   ```

2. **Navigate to the project folder**  
   ```bash
   cd vehicle-rental-system
   ```

3. **Install dependencies**  
   ```bash
   npm install
   ```

4. **Set up environment variables**  
   - Create a `.env` file in the root directory  
   - Example variables:  
     ```
     DATABASE_URL=your_postgres_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```

5. **Run the project (development)**  
   ```bash
   npm run dev
   ```

6. **Access the application**  
   Open [http://localhost:5000](http://localhost:5000) in your browser

