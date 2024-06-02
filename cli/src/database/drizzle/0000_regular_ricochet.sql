CREATE TABLE IF NOT EXISTS "todo_tags" (
	"todo_tag_id" bigserial PRIMARY KEY NOT NULL,
	"todo_id" bigserial NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "todos" (
	"todo_id" bigserial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"start_time" timestamp DEFAULT NULL,
	"deadline_time" timestamp DEFAULT NULL,
	"done" boolean DEFAULT false NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"user_id" bigserial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_todos" (
	"user_todo_id" bigserial PRIMARY KEY NOT NULL,
	"user_id" bigserial NOT NULL,
	"todo_id" bigserial NOT NULL,
	"done" boolean DEFAULT false NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "todo_tags" ADD CONSTRAINT "todo_tags_todo_id_todos_todo_id_fk" FOREIGN KEY ("todo_id") REFERENCES "public"."todos"("todo_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_todos" ADD CONSTRAINT "users_todos_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_todos" ADD CONSTRAINT "users_todos_todo_id_todos_todo_id_fk" FOREIGN KEY ("todo_id") REFERENCES "public"."todos"("todo_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
