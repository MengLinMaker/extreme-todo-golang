import { sql } from 'drizzle-orm'
import {
  text,
  timestamp,
  pgTable,
  bigserial,
  boolean
} from 'drizzle-orm/pg-core'

const _bigserial = (key: string) => bigserial(key, { mode: 'number' })

export const Users_Table = pgTable('users', {
  user_id: _bigserial('user_id').primaryKey(),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  created_time: timestamp('created_time').defaultNow().notNull(),
  updated_time: timestamp('updated_time').defaultNow().notNull()
})

export const Todos_Table = pgTable('todos', {
  todo_id: _bigserial('todo_id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  start_time: timestamp('start_time').default(sql`NULL`),
  deadline_time: timestamp('deadline_time').default(sql`NULL`),
  done: boolean('done').notNull().default(false),
  created_time: timestamp('created_time').defaultNow().notNull(),
  updated_time: timestamp('updated_time').defaultNow().notNull()
})

export const Users_Todos_Table = pgTable('users_todos', {
  user_todo_id: _bigserial('user_todo_id').primaryKey(),
  user_id: _bigserial('user_id').references(() => Users_Table.user_id),
  todo_id: _bigserial('todo_id').references(() => Todos_Table.todo_id),
  can_edit: boolean('done').notNull().default(false),
  created_time: timestamp('created_time').defaultNow().notNull(),
  updated_time: timestamp('updated_time').defaultNow().notNull()
})

export const Todo_Tags_Table = pgTable('todo_tags', {
  todo_tag_id: _bigserial('todo_tag_id').primaryKey(),
  todo_id: _bigserial('todo_id').references(() => Todos_Table.todo_id),
  title: text('title').notNull(),
  description: text('description'),
  created_time: timestamp('created_time').defaultNow().notNull(),
  updated_time: timestamp('updated_time').defaultNow().notNull()
})
