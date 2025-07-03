import db from '../../utils/db.js';

// Get all applications for a user
export const allApplication = async (req, res) => {
    const { user_id } = req.params;

    try {
        const application = await db.query(
            `SELECT * FROM application 
             WHERE user_id = $1`,
            [user_id]
        );

        if (application.rows.length === 0) {
            return res.status(200).json({
                status: "success",
                message: "User has not submitted any applications",
                data: []
            });
        }

        res.status(200).json({
            status: "success",
            message: "Applications retrieved successfully",
            data: application.rows
        });

    } catch (error) {
        console.error("Failed to retrieve applications:", error);
        res.status(500).json({
            status: "error",
            message: "Server error while retrieving applications",
        });
    }
};
