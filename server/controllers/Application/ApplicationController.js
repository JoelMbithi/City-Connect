import db from '../../utils/db.js';

// Get all applications for a user
export const allApplication = async (req, res) => {
    const { user_id, event_id } = req.params;

    try {
        const application = await db.query(
            `SELECT a.*
            FROM application a
            INNER JOIN users u ON u.id = a.user_id
            INNER JOIN event e ON e.id = a.event_id
            WHERE u.id = $1 AND a.event_id = $2
            `
        , [user_id, event_id]);
        if (application.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No applications found for this user and event",
            });
        }
        res.status(200).json({
            status: "success",
            message: "Successfully retrieved applications",
            data: application.rows,
        });
        

    } catch (error) {
        console.error("Failed to retrieve applications:", error);
        res.status(500).json({
            status: "error",
            message: "Server error while retrieving applications",
        }); 
    }
}