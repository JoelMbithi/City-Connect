import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pkg;

const connectionConfig = {
  connectionString: process.env.DATABASE_URL,
  ...(process.env.DATABASE_URL && {
    ssl: { 
      rejectUnauthorized: false // Required for Render PostgreSQL
    }
  }),
  ...(!process.env.DATABASE_URL && {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
  })
};

const db = new Client(connectionConfig);

// Enhanced connection handling
db.connect()
  .then(() => console.log(' Database connection established'))
  .catch(err => {
    console.error(' Database connection failed:', err.message);
    process.exit(1); // Exit process on connection failure
  });

// Graceful shutdown handling
process.on('SIGTERM', () => {
  db.end()
    .then(() => console.log('Database connection closed'))
    .catch(err => console.error('Error closing connection:', err));
});

export default db;