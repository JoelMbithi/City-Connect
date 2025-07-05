import db from "../../utils/db.js"


//send email
export const subscribeToNewsLetter = async (req, res) => {
    const {email,user_id} = req.body;
    try {
        const subscribe = await db.query(
            "INSERT INTO newsletter (email, user_id) VALUES ($1, $2) RETURNING *",
            [email, user_id]
        )
        if (subscribe.rowCount === 0) {
            return res.status(400).json({ message: "Subscription failed" });
        }
        return res.status(200).json({
            message: "Subscription successful", 
            data: subscribe.rows[0]
        });
    } catch (error) {
        console.error("Error subscribing to newsletter:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//get all emails
export const getAllSubscribers = async (req, res) => {
    try {
        const subscribers = await db.query("SELECT * FROM newsletter");
        if (subscribers.rowCount === 0) {
            return res.status(404).json({ message: "No subscribers found" });
        }
        return res.status(200).json({
            message: "Subscribers retrieved successfully",
            data: subscribers.rows
        });
    } catch (error) {
        console.error("Error retrieving subscribers:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}