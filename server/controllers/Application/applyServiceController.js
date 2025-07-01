import db from '../../utils/db.js';

// create applications for a user
export const applyService = async (req, res) => {
    const {type,name,IDNumber,phoneNumber,location,email,description} = req.body;
   

    try {
        const application = await db.query(
            `INSERT INTO application_service (type, name, IDNumber, phoneNumber, location, email, description)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [type, name, IDNumber, phoneNumber, location, email, description]
        )
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
}


// Get all applications for a user
export const allAppliedServices = async (req, res) => {
    const {application_service_id} = req.params

    try {
        const getApplication = await db.query(
            `SELECT a.*
            FROM application a
            INNER JOIN application_service s ON s.id = a.application_id
            WHERE s.id = $1
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

export const singleService = async (req,res) => {
    const {application_service_id} = req.params
    try {
        const getService = await db.query(
            `  SELECT * FROM application_service s
            INNER JOIN application_service s ON s.id = a.application_id
             WHERE application_service_id = $1`,
            [application_service_id]

        )
        res.status(200).json({
            status:"success",
            message:"successful retrieved a service",
            data:getService.rows[0]
        })
    } catch (error) {
         console.error("Failed to get for service:", error);
        res.status(500).json({
            status: "error",
            message: "Server error while getting for service",
        });
    }
} 