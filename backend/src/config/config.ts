import mssql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

export const sqlConfig = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PWD as string,
  database: process.env.DB_NAME as string,
  server: process.env.DB_SERVER as string,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
}

const testConnection = async () => {
  const pool = await mssql.connect(sqlConfig);

  if (pool.connected) {
    console.log("Database connection was successfull ...");
  } else {
    console.log("Error connecting to database");
  }
}

testConnection();