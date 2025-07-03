import db from '../../../utils/db.js';

// create applications for a user
// controllers/Application/ApplyService/applyServiceController.js

export const applyService = async (req, res) => {
  const { type, name, IDNumber, phoneNumber, location, email, description, user_id } = req.body;

  try {
    const application = await db.query(
      `INSERT INTO application_service 
       (type, name, IDNumber, phoneNumber, location, email, description, user_id) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [type, name, IDNumber, phoneNumber, location, email, description, user_id]
    );

    res.status(201).json({
      status: "success",
      message: "Successfully applied for service",
      data: application.rows[0],
    });
  } catch (error) {
    console.error("Failed to apply for service:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while applying for service",
    });
  }
};



// Get all applications for a user
export const allAppliedServices = async (req, res) => {
    const {application_service_id} = req.params

    try {
        const getApplication = await db.query(
            `SELECT a.*
            FROM application a
            INNER JOIN application_service s ON s.application_service_id = a.application_id
            WHERE s.application_service_id = $1
`,[service_id]
        )

        res.status(200).json({
            status:"success",
            message:"Successfully retrieved all applications for service",
            data:getApplication.rows[0]
        })
    } catch (error) {
         console.error("Failed to get for service:", error);
        res.status(500).json({
            status: "error",
            message: "Server error while getting for service",
        });
    }
}

//single service

// controllers/Application/ApplyService/applyServiceController.js

export const getUserApplications = async (req, res) => {
  const { user_id } = req.params;

  try {
    const applications = await db.query(
      `SELECT * FROM application_service WHERE user_id = $1 ORDER BY created_at DESC`,
      [user_id]
    );

    res.status(200).json({
      status: "success",
      message: "Retrieved user applications successfully",
      data: applications.rows,
    });
  } catch (error) {
    console.error("Failed to retrieve user applications:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while retrieving user applications",
    });
  }
};
