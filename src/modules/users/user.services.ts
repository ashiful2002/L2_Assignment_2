import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

interface IUserPayload {
  name: string;
  role?: string;
  email: string;
  password: string;
  phone: number;
}
const createUser = async (payload: IUserPayload) => {
  const { name, email, password, phone, role = "customer" } = payload;
  const lowerEmail = email.toLowerCase();
  const hashedPass = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users(name, email, password, phone, role)
     VALUES($1, $2, $3, $4, $5)
     RETURNING *`,
    [name, lowerEmail, hashedPass, phone, role]
  );

  return result.rows[0];
};
 
 
const getUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

const getSingleUser = async (id: string) => {
  const result = await pool.query(`SELECT * from users WHERE id = $1`, [id]);
  return result;
};

const updateUser = async (
  id: string,
  name: string,
  email: string,
  phone: string,
  role?: string
) => {
  const result = await pool.query(
    `UPDATE users
     SET name = $1,
         email = $2,
         phone = $3,
         role = $4,
         updated_at = NOW()
     WHERE id = $5
     RETURNING id, name, email, phone, role, created_at, updated_at;`,
    [name, email.toLowerCase(), phone, role, id]
  );

  return result.rows[0];
};
const checkActiveBookings = async (userId: string): Promise<boolean> => {
  const result = await pool.query(
    `SELECT * FROM bookings WHERE user_id = $1 AND status = 'active'`,
    [userId]
  );

  return result.rows.length > 0;
};
const deleteUser = async (id: string) => {
  const result = await pool.query(
    `DELETE FROM users WHERE id = $1`,
    [id]
  );
  return result;
};

export const usersServices = {
  createUser,
 checkActiveBookings,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
