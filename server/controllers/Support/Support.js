import db from "../../utils/db.js";


//send a support request

export const sendSupportRequest = async (req, res) => {
    const { name,email,message,subject,user_id} = req.body;
    try {
        const supportRequest = await db.query(
            `
            INSERT INTO support (name,email,message,subject,user_id) VALUES ($1, $2, $3, $4,$5) RETURNING *
            
            `,
            [name, email, message,subject, user_id]
        )
        if(supportRequest.rows.length > 0 ){
            return res.status(201).json({
                message: "Support request sent successfully",
                data: supportRequest.rows[0]
            });
        }else {
            return res.status(400).json({ message: "Failed to send support request" });
        }
        
    } catch (error) {
        console.error("Error sending support request:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


//get All Support Requests
export const getAllSupportRequests = async (req, res) => {
    try {
        const supportRequests = await db.query(
            `
            SELECT * FROM support
            `
        );
        if (supportRequests.rows.length > 0) {
            return res.status(200).json({
                message: "Support requests retrieved successfully",
                data: supportRequests.rows
            });
        } else {
            return res.status(404).json({ message: "No support requests found" });
        }
    } catch (error) {
        console.error("Error retrieving support requests:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}   