import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
  connectionString: config.CONNECTION_STRING,
});

export const initDb = async () => {
  // users table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      phone VARCHAR(15),
      role VARCHAR(150) DEFAULT 'customer',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);

  // vehicles table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS vehicles(
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      vehicle_name TEXT NOT NULL,
      type TEXT NOT NULL CHECK (type IN ('CAR','BIKE','SEDAN','SUV')),
      registration_number TEXT NOT NULL UNIQUE,
      daily_rent_price NUMERIC(10,2) NOT NULL CHECK (daily_rent_price > 0),
      availability_status TEXT NOT NULL CHECK (availability_status IN ('available','booked')),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  // bookings table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings(
      id SERIAL PRIMARY KEY,
      customer_id INT REFERENCES users(id) ON DELETE CASCADE,
      vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
      rent_start_date DATE NOT NULL,
      rent_end_date DATE NOT NULL,
      total_price NUMERIC(12,2) NOT NULL CHECK (total_price >= 0),
      status TEXT NOT NULL CHECK (status IN ('active', 'cancelled','returned')),
      created_at TIMESTAMP DEFAULT NOW(),
      CHECK (rent_end_date > rent_start_date)
    );
  `);
};
