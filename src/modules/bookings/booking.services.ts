import { pool } from "../../config/db";

interface IBookingPayload {
  customer_id: number; // user placing the booking
  vehicle_id: number; // vehicle being booked
  rent_start_date: string;
  rent_end_date: string;
  total_price: number;
  status?: "active" | "cancelled" | "returned";
}

const createBooking = async (payload: IBookingPayload) => {
  const {
    customer_id,
    vehicle_id,
    rent_start_date,
    rent_end_date,
    total_price,
    status = "active",
  } = payload;

  const result = await pool.query(
    `
    INSERT INTO bookings(
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      status
    )
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      status,
    ]
  );

  return result.rows[0];
};

const getBooking = async () => {
  const result = await pool.query(`
        SELECT * FROM vehicles ORDER BY id DESC
        `);
  return result.rows[0];
};

const getSingleBooking = async (id: string) => {
  const result = await pool.query(`SELECT * from bookings WHERE id = $1`, [id]);
  return result.rows[0];
};

const updateBooking = async (
  id: string,
  rent_start_date?: string,
  rent_end_date?: string,
  total_price?: number,
  status?: "active" | "cancelled" | "returned"
) => {
  const result = await pool.query(
    `
    UPDATE bookings
    SET 
      rent_start_date = COALESCE($1, rent_start_date),
      rent_end_date = COALESCE($2, rent_end_date),
      total_price = COALESCE($3, total_price),
      status = COALESCE($4, status)
    WHERE id = $5
    RETURNING id, customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status;
    `,
    [rent_start_date, rent_end_date, total_price, status, id]
  );

  return result.rows[0] || null;
};

const deleteBooking = async (id: string) => {
  const result = await pool.query(`DELETE FROM bookings WHERE id = $1`, [id]);
  return result;
};
export const bookingServices = {
  createBooking,
  getBooking,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};
