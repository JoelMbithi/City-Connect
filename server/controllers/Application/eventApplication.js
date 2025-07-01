import db from '../../utils/db.js'

//apply for service 
export const applyEvent = async (req, res) => {
    const {title, date,location} = req.body;
   // const {application_id} = req.params;

    try {
        const appEvent = await db.query(
                `INSERT INTO application_events (title,date,location) WHERE ($1, $2, $3) RETURNING *`,
            [title, date, location]
        )
        res.status(201).json({
            status: "success",
            message: "Successfully applied for event",
            data: appEvent.rows[0],
        }
    )
    } catch (error) {
        console.error("Failed to apply for event:", error);
        res.status(500).json({
            status: "error",
            message: "Server error while applying for event",
        });
    }
}

//get single event application
export const singleEventApplication = async (req, res) => {
    const {application_event_id} = req.params;
    try {
        const singleEvent = await db.query(
            `SELECT  ae *
            FROM application a
            INNER JOIN application_events ae ON ae.id = a.application_event_id
            WHERE ae.id = $1,
            
            `,[application_event_id]
        )
        res.status(200).json({
            status:"success",
            message:"Successful retrieved event",
            data:singleEvent.rows[0]
        })

    } catch (error) {
        console.error("Failed to retrieve event application:", error);
        res.status(500).json({
            status: "error",
            message: "Server error while retrieving event application",
        });
    }
}

//get all event applications
export const allEventApplications = async (req, res) => {
    try {
        const allEvents = await db.query(
            `SELECT * FROM application_events`
        )
        res.status(200).json({
            status: "success",
            message: "Successfully retrieved all event applications",
            data: allEvents.rows
        })
    } catch (error) {
        console.error("Failed to retrieve all event applications:", error);
        res.status(500).json({
            status: "error",
            message: "Server error while retrieving all event applications",
        });
    }
}