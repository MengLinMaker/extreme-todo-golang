import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
require('dotenv').config()
import { exec } from 'child_process'
import { sql } from 'drizzle-orm'

exec('pnpm run migrate')

const queryClient = postgres(process.env.POSTGRES_URL!)
export const db = drizzle(queryClient)

  ; (async () => {
    try {
      // Create "query_performance" view from "pg_stat_statements" for performance monitoring
      await db.execute(sql`CREATE EXTENSION IF NOT EXISTS pg_stat_statements`)
      await db.execute(sql`CREATE VIEW query_performance AS
      SELECT
        query,
        ROUND(total_exec_time::NUMERIC) AS total_exec_time,
        ROUND(
          100 * total_exec_time::NUMERIC / SUM(total_exec_time::NUMERIC) OVER (),
          2
        ) AS percentage_exec_calls,
        calls,
        ROUND(min_exec_time::NUMERIC, 3) AS min_exec_time,
        ROUND(mean_exec_time::NUMERIC, 3) AS mean_exec_time,
        ROUND(max_exec_time::NUMERIC, 3) AS max_exec_time,
        ROUND(stddev_exec_time::NUMERIC, 3) AS stddev_exec_time,
        rows
      FROM pg_stat_statements
      ORDER BY total_exec_time DESC
      LIMIT 20;
    `)
    }
    catch { }
  })()

