import db from '../../utils/db.js';

export const applyRequest = async (req, res) => {
  const { title, description, category,user_id } = req.body;

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
  `INSERT INTO request (title, description, request_type_id, user_id)
   VALUES ($1, $2, $3, $4) RETURNING *`,
  [title, description, request_type_id, user_id]
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
//  2. Get all requests by user ID
export const singleRequest = async (req, res) => {
  const { user_id } = req.params;

  try {
    const result = await db.query(
      `SELECT r.*, rt.name AS category
       FROM request r
       INNER JOIN request_types rt ON r.request_type_id = rt.request_type_id
       WHERE r.user_id = $1
       ORDER BY r.created_at DESC`,
      [user_id]
    );

    if (result.rows.length === 0) {
      return res.status(200).json({
        status: "success",
        message: "No requests found for this user",
        data: [], // Return empty array if none
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully retrieved user requests",
      data: result.rows, // ✅ Return all user requests
    });
  } catch (error) {
    console.error("Failed to get user requests:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while getting user requests",
    });
  }
};


//  3. Get all requests
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
