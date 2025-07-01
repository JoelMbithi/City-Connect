

import db from '../../utils/db.js';

export const addEvent = async (req, res) => {
  const { user_id } = req.params;

  try {
    const event = await db.query(
      `
      SELECT e.*
      FROM event e
      INNER JOIN application a ON e.id = a.event_id
      INNER JOIN users u ON u.id = a.user_id
      WHERE u.id = $1
      `,
      [user_id]
    );

    res.status(200).json({
      status: "success",
      data: event.rows,
    });
  } catch (error) {
    console.log("Failed to retrieve events: ", error);
    res.status(500).json({
      status: "error",
      message: "Error when retrieving events for user",
    });
  }
};
