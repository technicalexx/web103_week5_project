import { pool } from "./database.js"

const createTable = async () => {
  try {
    await pool.query(`
      DROP TABLE IF EXISTS customitems;

      CREATE TABLE customitems (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        bread VARCHAR(50) NOT NULL,
        protein VARCHAR(50) NOT NULL,
        cheese VARCHAR(50) NOT NULL,
        sauce VARCHAR(50) NOT NULL,
        totalprice DECIMAL(10,2) NOT NULL
      );
    `)

    console.log("customitems table created successfully")
  } catch (error) {
    console.error("Error creating table:", error)
  } finally {
    await pool.end()
  }
}

createTable()
