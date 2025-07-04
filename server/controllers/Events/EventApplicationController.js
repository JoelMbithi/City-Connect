import db from '../../utils/db.js';

// Create an event application with proper date handling
export const createEventApplication = async (req, res) => {
    const { title, date, location, user_id } = req.body;
    
    try {
        // Convert the date to a proper DATE format (without time)
        const formattedDate = new Date(date).toISOString().split('T')[0];
        
        const newEvent = await db.query(
            `INSERT INTO events (title, date, location, user_id) 
             VALUES ($1, $2::DATE, $3, $4) 
             RETURNING *`,
            [title, formattedDate, location, user_id]    
        );
        
        // Format the response date
        const responseEvent = {
            ...newEvent.rows[0],
            date: formattedDate
        };
        
        return res.status(201).json({
            message: 'Event application created successfully',
            event: responseEvent
        });
    } catch (error) {
        console.error('Error creating event application:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

// Get only recent (today and future) events with clean date format
export const getAllEvents = async (req, res) => {
  try {
    const events = await db.query(`
      SELECT 
        event_id,
        title,
        TO_CHAR(date, 'YYYY-MM-DD') as date,  -- Format as clean date string
        location,
        user_id,
        created_at
      FROM events
      WHERE date >= CURRENT_DATE
      ORDER BY date ASC
    `);
    
    return res.status(200).json(events.rows);
  } catch (error) {
    console.error('Error fetching recent events:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};