import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
require('dotenv').config()
import { exec } from 'child_process'
import { sql } from 'drizzle-orm'

exec('pnpm run migrate')

const queryClient = postgres(process.env.POSTGRES_URL!)
export const db = drizzle(queryClient)

  ; (async () => {
    await db.execute(sql`CREATE EXTENSION IF NOT EXISTS pg_stat_statements`)
  })()
