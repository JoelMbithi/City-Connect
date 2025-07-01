import db from '../../utils/db.js';

export const getAllType = async (req, res) => {
  try {
    const result = await db.query(`
 
  SELECT rt.*, r.*
  FROM request_types rt
  LEFT JOIN request r ON rt.request_type_id = r.request_type_id
  ORDER BY rt.request_type_id DESC
`);

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No request types found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully retrieved request types with related requests",
      data: result.rows,
    });
  } catch (error) {
    console.error("Failed to retrieve request types:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while retrieving request types",
    });
  }
};
