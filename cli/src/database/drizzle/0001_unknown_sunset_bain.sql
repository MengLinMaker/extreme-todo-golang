CREATE INDEX IF NOT EXISTS "todo_tags_title_index" ON "todo_tags" ("title");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "todos_title_index" ON "todos" ("title");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_first_name_index" ON "users" ("first_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_last_name_index" ON "users" ("last_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_email_index" ON "users" ("email");