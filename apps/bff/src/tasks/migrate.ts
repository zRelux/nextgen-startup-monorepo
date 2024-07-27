import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from "pg";
const { Pool } = pg;

export default defineTask({
	meta: {
		name: "db:migrate",
		description: "Run database migrations",
	},
	async run() {
		const pool = new Pool({
			connectionString: process.env.DATABASE_URL,
		});

		const db = drizzle(pool);

		await migrate(db, { migrationsFolder: "drizzle" });

		await pool.end();
		return { result: "Success" };
	},
});
