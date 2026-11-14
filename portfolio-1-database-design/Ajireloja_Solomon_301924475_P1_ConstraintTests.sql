-- Run these deliberately invalid statements one at a time, outside a transaction.
-- Each should fail at the named constraint; the sample rows should remain unchanged.

-- 1. member duplicate pk. Expected: pk_member, SQLSTATE 23505.
INSERT INTO portfolio."member" ("member_id", "given_name", "family_name", "email", "birth_date")
VALUES (1001, 'Casey', 'Morgan', 'casey.pk@example.test', NULL);

-- 2. member duplicate email. Expected: uq_member_0, SQLSTATE 23505.
INSERT INTO portfolio."member" ("member_id", "given_name", "family_name", "email", "birth_date")
VALUES (9001, 'Casey', 'Morgan', 'avery.bennett@example.test', NULL);

-- 3. member null id. Expected: member_id, SQLSTATE 23502.
INSERT INTO portfolio."member" ("member_id", "given_name", "family_name", "email", "birth_date")
VALUES (NULL, 'Casey', 'Morgan', 'casey.nullid@example.test', NULL);

-- 4. member null given name. Expected: given_name, SQLSTATE 23502.
INSERT INTO portfolio."member" ("member_id", "given_name", "family_name", "email", "birth_date")
VALUES (9002, NULL, 'Morgan', 'casey.nullgiven@example.test', NULL);

-- 5. member null family name. Expected: family_name, SQLSTATE 23502.
INSERT INTO portfolio."member" ("member_id", "given_name", "family_name", "email", "birth_date")
VALUES (9003, 'Casey', NULL, 'casey.nullfamily@example.test', NULL);

-- 6. member null email. Expected: email, SQLSTATE 23502.
INSERT INTO portfolio."member" ("member_id", "given_name", "family_name", "email", "birth_date")
VALUES (9004, 'Casey', 'Morgan', NULL, NULL);

-- 7. congregation duplicate pk. Expected: pk_congregation, SQLSTATE 23505.
INSERT INTO portfolio."congregation" ("congregation_id", "name", "city", "founded_date")
VALUES (2001, 'Maple Ridge', 'Eugene', NULL);

-- 8. congregation duplicate name. Expected: uq_congregation_0, SQLSTATE 23505.
INSERT INTO portfolio."congregation" ("congregation_id", "name", "city", "founded_date")
VALUES (9005, 'Cedar Grove', 'Eugene', NULL);

-- 9. congregation null id. Expected: congregation_id, SQLSTATE 23502.
INSERT INTO portfolio."congregation" ("congregation_id", "name", "city", "founded_date")
VALUES (NULL, 'Maple Ridge', 'Eugene', NULL);

-- 10. congregation null name. Expected: name, SQLSTATE 23502.
INSERT INTO portfolio."congregation" ("congregation_id", "name", "city", "founded_date")
VALUES (9006, NULL, 'Eugene', NULL);

-- 11. congregation null city. Expected: city, SQLSTATE 23502.
INSERT INTO portfolio."congregation" ("congregation_id", "name", "city", "founded_date")
VALUES (9007, 'Maple Ridge', NULL, NULL);

-- 12. membership duplicate pk. Expected: pk_membership, SQLSTATE 23505.
INSERT INTO portfolio."membership" ("membership_id", "member_id", "congregation_id", "start_date", "end_date", "status")
VALUES (3001, 1002, 2002, '2024-01-01', '2024-02-01', 'ended');

-- 13. membership invalid member fk. Expected: fk_membership_0, SQLSTATE 23503.
INSERT INTO portfolio."membership" ("membership_id", "member_id", "congregation_id", "start_date", "end_date", "status")
VALUES (9008, 99991, 2001, '2024-01-01', '2024-02-01', 'ended');

-- 14. membership invalid congregation fk. Expected: fk_membership_1, SQLSTATE 23503.
INSERT INTO portfolio."membership" ("membership_id", "member_id", "congregation_id", "start_date", "end_date", "status")
VALUES (9009, 1002, 99992, '2024-01-01', '2024-02-01', 'ended');

-- 15. membership null id. Expected: membership_id, SQLSTATE 23502.
INSERT INTO portfolio."membership" ("membership_id", "member_id", "congregation_id", "start_date", "end_date", "status")
VALUES (NULL, 1002, 2002, '2024-01-01', NULL, 'ended');

-- 16. membership null member id. Expected: member_id, SQLSTATE 23502.
INSERT INTO portfolio."membership" ("membership_id", "member_id", "congregation_id", "start_date", "end_date", "status")
VALUES (9010, NULL, 2002, '2024-01-01', NULL, 'ended');

-- 17. membership null congregation id. Expected: congregation_id, SQLSTATE 23502.
INSERT INTO portfolio."membership" ("membership_id", "member_id", "congregation_id", "start_date", "end_date", "status")
VALUES (9011, 1002, NULL, '2024-01-01', NULL, 'ended');

-- 18. membership null start date. Expected: start_date, SQLSTATE 23502.
INSERT INTO portfolio."membership" ("membership_id", "member_id", "congregation_id", "start_date", "end_date", "status")
VALUES (9012, 1002, 2002, NULL, NULL, 'ended');

-- 19. membership null status. Expected: status, SQLSTATE 23502.
INSERT INTO portfolio."membership" ("membership_id", "member_id", "congregation_id", "start_date", "end_date", "status")
VALUES (9013, 1002, 2002, '2024-01-01', NULL, NULL);

-- 20. membership invalid dates. Expected: membership_dates_valid, SQLSTATE 23514.
INSERT INTO portfolio."membership" ("membership_id", "member_id", "congregation_id", "start_date", "end_date", "status")
VALUES (9014, 1002, 2002, '2024-03-01', '2024-02-01', 'ended');

-- 21. membership duplicate active member. Expected: one_active_membership_per_member, SQLSTATE 23505.
INSERT INTO portfolio."membership" ("membership_id", "member_id", "congregation_id", "start_date", "end_date", "status")
VALUES (9015, 1001, 2002, '2024-01-01', NULL, 'active');
