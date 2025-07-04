import db from '../../utils/db.js';

// create feedback
export const createFeedback = async (req, res) => {
    const { user_id, subject, category, message, type, feedback_type_id } = req.body;

    try {
        const feedback = await db.query(
            `INSERT INTO feedback (user_id, subject, category, message, type, feedback_type_id) 
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [user_id, subject, category, message, type, feedback_type_id]
        );

        return res.status(201).json({
            message: "Feedback created successfully",
            feedback: feedback.rows[0]
        });
    } catch (error) {
        console.error("Error creating feedback:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


// get feedback by user_id
    export const getFeedbackByUserId = async (req, res) => {
        const { user_id } = req.params;

        try {
            const feedback = await db.query(
                `SELECT * FROM feedback WHERE user_id = $1 ORDER BY created_at DESC`,
                [user_id]
            );

            if (feedback.rows.length === 0) {
                return res.status(404).json({ message: "No feedback found for this user" });
            }

            return res.status(200).json({
                message: "Feedback retrieved successfully",
                feedback: feedback.rows
            });
        } catch (error) {
            console.error("Error retrieving feedback:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    export const getAllFeedback = async (req, res) => {
  try {
    const feedback = await db.query(`SELECT * FROM feedback ORDER BY created_at DESC`);
    return res.status(200).json({
      message: "All feedback retrieved successfully",
      feedback: feedback.rows
    });
  } catch (error) {
    console.error("Error retrieving all feedback:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
