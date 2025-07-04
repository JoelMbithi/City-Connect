    import db from '../../utils/db.js';

    //get all feedback types
    export const getFeedbackTypes = async (req, res) => {
        try {
          const feedbackTypes = await db.query(`
  SELECT 
    ft.feedback_type_id AS feedback_type_id,
    ft.name AS feedback_type_name,
    f.feedback_id,
    f.subject,
    f.type,
    f.message,
    f.message_id,
    f.created_at
  FROM feedback_type ft
  LEFT JOIN feedback f ON ft.feedback_type_id = f.feedback_type_id
  ORDER BY ft.feedback_type_id DESC
`);

            return res.status(200).json({
                message: "Feedback types retrieved successfully",
                feedbackTypes: feedbackTypes.rows
            });
        } catch (error) {
            console.error("Error retrieving feedback types:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }