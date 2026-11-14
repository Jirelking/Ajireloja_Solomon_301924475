-- Fictional sample records for Church Membership Management System.
BEGIN;
SET LOCAL standard_conforming_strings = on;
INSERT INTO portfolio."member" ("member_id", "given_name", "family_name", "email", "birth_date") VALUES (1001, 'Avery', 'Bennett', 'avery.bennett@example.test', '1988-04-12');
INSERT INTO portfolio."member" ("member_id", "given_name", "family_name", "email", "birth_date") VALUES (1002, 'Jordan', 'Rivera', 'jordan.rivera@example.test', NULL);
INSERT INTO portfolio."congregation" ("congregation_id", "name", "city", "founded_date") VALUES (2001, 'Cedar Grove', 'Portland', '1952-06-01');
INSERT INTO portfolio."congregation" ("congregation_id", "name", "city", "founded_date") VALUES (2002, 'Harbor Light', 'Salem', NULL);
INSERT INTO portfolio."membership" ("membership_id", "member_id", "congregation_id", "start_date", "end_date", "status") VALUES (3001, 1001, 2001, '2023-01-15', NULL, 'active');
INSERT INTO portfolio."membership" ("membership_id", "member_id", "congregation_id", "start_date", "end_date", "status") VALUES (3002, 1002, 2002, '2020-03-01', '2022-08-31', 'ended');
COMMIT;
