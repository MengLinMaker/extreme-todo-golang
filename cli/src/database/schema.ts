import { sql } from 'drizzle-orm'
import {
  text,
  timestamp,
  pgTable,
  bigserial,
  boolean
} from 'drizzle-orm/pg-core'

const _bigserial = (key: string) => bigserial(key, { mode: 'number' })

export const Users_Table = pgTable('Users', {
  user_id: _bigserial('user_id').primaryKey(),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  created_time: timestamp('created_time').defaultNow().notNull(),
  updated_time: timestamp('updated_time').defaultNow().notNull()
})

export const Todo_Table = pgTable('Todo', {
  todo_id: _bigserial('todo_id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  start_time: timestamp('start_time').default(sql`NULL`),
  deadline_time: timestamp('deadline_time').default(sql`NULL`),
  done: boolean('done').notNull().default(false),
  created_time: timestamp('created_time').defaultNow().notNull(),
  updated_time: timestamp('updated_time').defaultNow().notNull()
})

export const Users_Todo_Table = pgTable('Users_Todo', {
  users_todo_id: _bigserial('users_todo_id').primaryKey(),
  user_id: _bigserial('user_id').references(() => Users_Table.user_id),
  todo_id: _bigserial('todo_id').references(() => Todo_Table.todo_id),
  can_edit: boolean('done').notNull().default(false),
  created_time: timestamp('created_time').defaultNow().notNull(),
  updated_time: timestamp('updated_time').defaultNow().notNull()
})

export const Todo_Tag_Table = pgTable('Todo_Tag', {
  todo_tag_id: _bigserial('todo_tag_id').primaryKey(),
  todo_id: _bigserial('todo_id').references(() => Todo_Table.todo_id),
  title: text('title').notNull(),
  description: text('description'),
  created_time: timestamp('created_time').defaultNow().notNull(),
  updated_time: timestamp('updated_time').defaultNow().notNull()
})
