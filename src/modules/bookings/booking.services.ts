import { pool } from "../../config/db";

interface IVehiclePayload {
  user_id: number;
  vehicle_name: string;
  type: "CAR" | "BIKE" | "SEDAN" | "SUV";
  registration_number: string;
  daily_rent_price: number;
  availability_status?: "available" | "booked";
}

const createBooking = async (payload: IVehiclePayload) => {
  const {
    user_id,
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status = "available",
  } = payload;

  const result = await pool.query(
    `
    INSERT INTO vehicles(
      user_id,
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status
    )
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `,
    [
      user_id,
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );

  return result.rows[0];
};

const getBooking = async () => {
  const result = await pool.query(`
        SELECT * FROM vehicles ORDER BY id DESC
        `);
  return result.rows;
};

const getSingleBooking = async (id: string) => {
  const result = await pool.query(
    `
            SELECT * from vehicles WHERE id = $1        
        `,
    [id]
  );
  return result;
};

const updateBooking = async (
  id: string,
  vehicle_name: string,
  type: string,
  registration_number: string,
  daily_rent_price: string,
  availability_status: string
) => {
  const result = await pool.query(
    `
  UPDATE vehicles
  SET 
    vehicle_name = COALESCE($1, vehicle_name),
    type = COALESCE($2, type),
    registration_number = COALESCE($3, registration_number),
    daily_rent_price = COALESCE($4, daily_rent_price),
    availability_status = COALESCE($5, availability_status)
  WHERE id = $6
  RETURNING id, vehicle_name, type, registration_number, daily_rent_price, availability_status;
  `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      id,
    ]
  );

  return result.rows[0] || null;
};

const deleteBooking = async (id: string) => {
  const result = await pool.query(`DELETE FROM booking WHERE id = $1`, [id]);
  return result;
};
export const bookingServices = {
  createBooking,
  getBooking,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};
