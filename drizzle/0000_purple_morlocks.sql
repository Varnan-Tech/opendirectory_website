CREATE TYPE "public"."claim_status" AS ENUM('pending', 'shipped', 'delivered', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."shirt_size" AS ENUM('S', 'M', 'L', 'XL', 'XXL');--> statement-breakpoint
CREATE TABLE "merch_claims" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"contributor_id" uuid NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"github_email" varchar(255) NOT NULL,
	"contact_email" varchar(255) NOT NULL,
	"phone" varchar(50) NOT NULL,
	"alt_phone" varchar(50),
	"address_line_1" text NOT NULL,
	"address_line_2" text,
	"city" varchar(255) NOT NULL,
	"state" varchar(255) NOT NULL,
	"pin_code" varchar(50) NOT NULL,
	"country" varchar(100) NOT NULL,
	"shirt_size" "shirt_size" NOT NULL,
	"status" "claim_status" DEFAULT 'pending' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "merged_contributors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"github_username" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"has_claimed" boolean DEFAULT false NOT NULL,
	"merged_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "merged_contributors_github_username_unique" UNIQUE("github_username")
);
--> statement-breakpoint
ALTER TABLE "merch_claims" ADD CONSTRAINT "merch_claims_contributor_id_merged_contributors_id_fk" FOREIGN KEY ("contributor_id") REFERENCES "public"."merged_contributors"("id") ON DELETE no action ON UPDATE no action;