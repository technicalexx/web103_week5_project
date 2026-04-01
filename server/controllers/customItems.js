import { pool } from "../config/database.js"

const getCustomItems = async (req, res) => {
  try {
    const results = await pool.query(
      "SELECT * FROM customitems ORDER BY id ASC",
    )
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getCustomItemById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const results = await pool.query(
      "SELECT * FROM customitems WHERE id = $1",
      [id],
    )
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createCustomItem = async (req, res) => {
  try {
    const { name, bread, protein, cheese, sauce, totalprice } = req.body

    if (protein === "Veggie" && cheese === "Cheddar") {
      return res.status(400).json({
        error: "Veggie sandwiches cannot be combined with Cheddar cheese.",
      })
    }

    const results = await pool.query(
      `INSERT INTO customitems (name, bread, protein, cheese, sauce, totalprice)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, bread, protein, cheese, sauce, totalprice],
    )

    res.status(201).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const updateCustomItem = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { name, bread, protein, cheese, sauce, totalprice } = req.body

    if (protein === "Veggie" && cheese === "Cheddar") {
      return res.status(400).json({
        error: "Veggie sandwiches cannot be combined with Cheddar cheese.",
      })
    }

    const results = await pool.query(
      `UPDATE customitems
       SET name = $1, bread = $2, protein = $3, cheese = $4, sauce = $5, totalprice = $6
       WHERE id = $7
       RETURNING *`,
      [name, bread, protein, cheese, sauce, totalprice, id],
    )

    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const deleteCustomItem = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const results = await pool.query(
      "DELETE FROM customitems WHERE id = $1 RETURNING *",
      [id],
    )

    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export default {
  getCustomItems,
  getCustomItemById,
  createCustomItem,
  updateCustomItem,
  deleteCustomItem,
}
