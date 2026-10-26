import { neon } from "@neondatabase/serverless";

// Lists every wish. Only someone with ADMIN_TOKEN can call it.
const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (!process.env.ADMIN_TOKEN || req.headers.authorization !== `Bearer ${process.env.ADMIN_TOKEN}`) {
    return res.status(401).end();
  }
  // the table is created on the first wish, so it may not exist yet
  await sql`CREATE TABLE IF NOT EXISTS wishes (
    id serial PRIMARY KEY,
    text text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
  )`;
  const rows = await sql`SELECT id, text, created_at FROM wishes ORDER BY created_at DESC`;
  res.status(200).json(rows);
}
