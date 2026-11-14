-- Church Membership Management System: tables, keys and business constraints.
-- Run once in a fresh PostgreSQL database.
BEGIN;
SET LOCAL standard_conforming_strings = on;
CREATE SCHEMA portfolio;
CREATE TABLE portfolio."member" (
  "member_id" bigint NOT NULL,
  "given_name" text NOT NULL,
  "family_name" text NOT NULL,
  "email" text NOT NULL,
  "birth_date" date,
  CONSTRAINT "pk_member" PRIMARY KEY ("member_id"),
  CONSTRAINT "uq_member_0" UNIQUE ("email")
);
CREATE TABLE portfolio."congregation" (
  "congregation_id" bigint NOT NULL,
  "name" text NOT NULL,
  "city" text NOT NULL,
  "founded_date" date,
  CONSTRAINT "pk_congregation" PRIMARY KEY ("congregation_id"),
  CONSTRAINT "uq_congregation_0" UNIQUE ("name")
);
CREATE TABLE portfolio."membership" (
  "membership_id" bigint NOT NULL,
  "member_id" bigint NOT NULL,
  "congregation_id" bigint NOT NULL,
  "start_date" date NOT NULL,
  "end_date" date,
  "status" text NOT NULL,
  CONSTRAINT "pk_membership" PRIMARY KEY ("membership_id")
);
ALTER TABLE portfolio."membership" ADD CONSTRAINT "fk_membership_0" FOREIGN KEY ("member_id") REFERENCES portfolio."member" ("member_id");
ALTER TABLE portfolio."membership" ADD CONSTRAINT "fk_membership_1" FOREIGN KEY ("congregation_id") REFERENCES portfolio."congregation" ("congregation_id");
ALTER TABLE portfolio."membership" ADD CONSTRAINT "membership_dates_valid" CHECK (("end_date" IS NULL) OR ("end_date" > "start_date"));
CREATE UNIQUE INDEX "one_active_membership_per_member" ON portfolio."membership" ("member_id") WHERE ("status" = 'active');
COMMIT;
