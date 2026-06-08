import { Pool, PoolConfig } from "pg";

const connectionString = process.env.DATABASE_URL;

const poolConfig: PoolConfig = connectionString
  ? { connectionString }
  : {
      host: process.env.PGHOST || "localhost",
      port: parseInt(process.env.PGPORT || "5432"),
      user: process.env.PGUSER || "postgres",
      password: process.env.PGPASSWORD || "akdanadmin123",
      database: process.env.PGDATABASE || "akdandesigns",
    };

// Dynamic SSL support: if we are connecting to a remote host (not localhost or 127.0.0.1), enable SSL.
const isLocal =
  (connectionString && (connectionString.includes("localhost") || connectionString.includes("127.0.0.1"))) ||
  (!connectionString && (poolConfig.host === "localhost" || poolConfig.host === "127.0.0.1"));

if (!isLocal) {
  poolConfig.ssl = {
    rejectUnauthorized: false,
  };
}

const pool = new Pool(poolConfig);

/**
 * Global helper to execute a SQL query
 */
export async function query(text: string, params?: any[]) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    return res;
  } catch (error) {
    console.error("Database query failed:", { text, error });
    throw error;
  }
}

export default pool;
