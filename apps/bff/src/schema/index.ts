import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { sessionTable, userTable } from "./session";

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, {
	schema: {
		userTable,
		sessionTable,
	},
});

export default db;
