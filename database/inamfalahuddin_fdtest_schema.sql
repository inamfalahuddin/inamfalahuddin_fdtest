CREATE TABLE "users" (
	"id" INTEGER NOT NULL DEFAULT 'nextval(''users_id_seq''::regclass)',
	"email" VARCHAR(255) NOT NULL,
	"password" TEXT NOT NULL,
	"is_verified" BOOLEAN NULL DEFAULT 'false',
	"created_at" TIMESTAMP NULL DEFAULT 'now()',
	"updated_at" TIMESTAMP NULL DEFAULT 'now()',
	"name" VARCHAR(255) NULL DEFAULT 'NULL::character varying',
	PRIMARY KEY ("id"),
	UNIQUE INDEX "users_email_key" ("email")
)
;
COMMENT ON COLUMN "users"."id" IS '';
COMMENT ON COLUMN "users"."email" IS '';
COMMENT ON COLUMN "users"."password" IS '';
COMMENT ON COLUMN "users"."is_verified" IS '';
COMMENT ON COLUMN "users"."created_at" IS '';
COMMENT ON COLUMN "users"."updated_at" IS '';
COMMENT ON COLUMN "users"."name" IS '';


CREATE TABLE "books" (
	"id" INTEGER NOT NULL DEFAULT 'nextval(''books_id_seq''::regclass)',
	"title" VARCHAR(255) NOT NULL,
	"author" VARCHAR(255) NOT NULL,
	"description" TEXT NULL DEFAULT NULL,
	"thumbnail_url" VARCHAR(255) NULL DEFAULT NULL,
	"rating" INTEGER NULL DEFAULT NULL,
	"created_at" TIMESTAMP NULL DEFAULT 'now()',
	"updated_at" TIMESTAMP NULL DEFAULT 'now()',
	PRIMARY KEY ("id")
)
;
COMMENT ON COLUMN "books"."id" IS '';
COMMENT ON COLUMN "books"."title" IS '';
COMMENT ON COLUMN "books"."author" IS '';
COMMENT ON COLUMN "books"."description" IS '';
COMMENT ON COLUMN "books"."thumbnail_url" IS '';
COMMENT ON COLUMN "books"."rating" IS '';
COMMENT ON COLUMN "books"."created_at" IS '';
COMMENT ON COLUMN "books"."updated_at" IS '';
