import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";
interface IUserPayload {
  name: string;
  role?: string;
  email: string;
  password: string;
  phone: number;
}
const signUp = async (payload: IUserPayload) => {
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

const signin = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  if (result.rows.length === 0) {
    return null;
  }
  const user = result.rows[0];
  const match = await bcrypt.compare(password, user?.password);
  if (!match) {
    return false;
  }
  const secret = config.jwt_secret as string;
  const token = jwt.sign(
    { name: user.name, email: user.email, roel: user.role },
    secret,
    {
      expiresIn: "7d",
    }
  );
  return { token, user };
};

export const authServices = {
  signUp,
  signin,
};
