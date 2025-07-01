import db from '../../utils/db.js';

export const applyRequest = async (req, res) => {
  const { title, description, category } = req.body;

  console.log("🟡 Received data:", { title, description, category });

  try {
    // Step 1: Fetch request_type_id from request_types
    const typeResult = await db.query(
      `SELECT request_type_id FROM request_types WHERE name::text ILIKE $1`,
      [category]
    );

    console.log(" Matched category result:", typeResult.rows);

    if (typeResult.rows.length === 0) {
      console.log(" Invalid category!");
      return res.status(400).json({
        status: "error",
        message: `Invalid category name: ${category}`,
      });
    }

    const request_type_id = typeResult.rows[0].request_type_id;
    console.log(" Resolved request_type_id:", request_type_id);

    // Step 2: Insert the request
    const result = await db.query(
      `INSERT INTO request (title, description, request_type_id)
       VALUES ($1, $2, $3) RETURNING *`,
      [title, description, request_type_id]
    );

    console.log(" Insert result:", result.rows[0]);

    res.status(200).json({
      status: "success",
      message: "Successfully applied for request",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(" Failed to apply for request:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while applying for request",
    });
  }
};


// 2. Get single request by ID
export const singleRequest = async (req, res) => {
  const { request_id } = req.params;

  try {
    const result = await db.query(
      `SELECT * FROM request WHERE id = $1`,
      [request_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Request not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully retrieved request",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Failed to get single request:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while getting single request",
    });
  }
};

// ✅ 3. Get all requests
export const allRequest = async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM request ORDER BY request_id DESC`);

    res.status(200).json({
      status: "success",
      message: "Successfully retrieved all requests",
      data: result.rows,
    });
  } catch (error) {
    console.error("Failed to get all requests:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while getting all requests",
    });
  }
};
