CREATE TABLE IF NOT EXISTS "Todo" (
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
CREATE TABLE IF NOT EXISTS "Todo_Tag" (
	"todo_tag_id" bigserial PRIMARY KEY NOT NULL,
	"todo_id" bigserial NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Users" (
	"user_id" bigserial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Users_Todo" (
	"users_todo_id" bigserial PRIMARY KEY NOT NULL,
	"user_id" bigserial NOT NULL,
	"todo_id" bigserial NOT NULL,
	"done" boolean DEFAULT false NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Todo_Tag" ADD CONSTRAINT "Todo_Tag_todo_id_Todo_todo_id_fk" FOREIGN KEY ("todo_id") REFERENCES "public"."Todo"("todo_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Users_Todo" ADD CONSTRAINT "Users_Todo_user_id_Users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Users_Todo" ADD CONSTRAINT "Users_Todo_todo_id_Todo_todo_id_fk" FOREIGN KEY ("todo_id") REFERENCES "public"."Todo"("todo_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
