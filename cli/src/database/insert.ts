import { PgTransaction } from "drizzle-orm/pg-core";
import { PostgresJsQueryResultHKT } from "drizzle-orm/postgres-js";
import { ExtractTablesWithRelations } from "drizzle-orm";
import { faker } from '@faker-js/faker';
import { Todos_Table, Todo_Tags_Table, Users_Table, Users_Todos_Table } from "./schema";
import { db } from "./db";

type Transaction = PgTransaction<PostgresJsQueryResultHKT, Record<string, never>, ExtractTablesWithRelations<Record<string, never>>> | typeof db

export const insertDummyUser = async (tx: Transaction) => {
  const Users = await tx.insert(Users_Table).values({
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email()
  }).returning()
  return Users[0].user_id
}

export const insertDummyTodo = async (tx: Transaction, user_id: number) => {
  const Todo = await tx.insert(Todos_Table).values({
    title: faker.person.fullName(),
    description: faker.lorem.paragraphs({ min: 0, max: 3 })
  }).returning()
  await tx.insert(Users_Todos_Table).values({
    user_id: user_id,
    todo_id: Todo[0].todo_id,
    can_edit: true
  }).returning({
    todo_id: Todos_Table.todo_id
  })
  return Todo[0].todo_id
}

export const insertDummyTodoTag = async (tx: Transaction, todo_id: number) => {
  const Todo_Tag = await tx.insert(Todo_Tags_Table).values({
    todo_id: todo_id,
    title: faker.color.human(),
    description: faker.lorem.paragraphs({ min: 0, max: 3 })
  }).returning()
  return Todo_Tag[0].todo_tag_id
}
