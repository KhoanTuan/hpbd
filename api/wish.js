import { neon } from "@neondatabase/serverless";

// Receives a wish from the page and stores it in Postgres
const sql = neon(process.env.DATABASE_URL);
let ready;

function setup() {
  ready ??= sql`CREATE TABLE IF NOT EXISTS wishes (
    id serial PRIMARY KEY,
    text text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
  )`;
  return ready;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const text = String(req.body?.text ?? "").trim().slice(0, 80);
  if (!text) return res.status(400).json({ ok: false });
  await setup();
  await sql`INSERT INTO wishes (text) VALUES (${text})`;
  res.status(200).json({ ok: true });
}
