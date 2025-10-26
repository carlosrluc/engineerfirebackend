import { Request, Response } from "express";
import { pool } from "../config/db";

export const getUsers = async (req: Request, res: Response) => {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM users");
  conn.release();
  res.json(rows);
};