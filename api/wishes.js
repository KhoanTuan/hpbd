import { neon } from "@neondatabase/serverless";

// Lists every wish. Only someone with ADMIN_TOKEN can call it.
const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (!process.env.ADMIN_TOKEN || req.headers.authorization !== `Bearer ${process.env.ADMIN_TOKEN}`) {
    return res.status(401).end();
  }
  const rows = await sql`SELECT id, text, created_at FROM wishes ORDER BY created_at DESC`;
  res.status(200).json(rows);
}
