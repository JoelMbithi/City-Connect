import db from '../../../utils/db.js';


export const getAllServiceTypes = async (req, res) => {
  try {
    const result = await db.query(`
  SELECT st.service_type_id, st.name, st.created_at
  FROM service_type st
  ORDER BY st.service_type_id ASC;
`);
    res.status(200).json({
      status: "success",
      message: "Fetched all service types",
      data: result.rows,
    });
  } catch (error) {
    console.error("Failed to fetch service types:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while fetching service types",
    });
  }
};
