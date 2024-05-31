import { defineConfig } from 'drizzle-kit'
import 'dotenv'
require('dotenv').config()

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/database/schema.ts',
  out: './src/database/drizzle',
  dbCredentials: {
    url: process.env.POSTGRES_URL!
  }
})
