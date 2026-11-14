-- Show related membership, member, congregation records (up to 20).
SELECT t0."membership_id" AS "membership_membership_id",
       t0."start_date" AS "membership_start_date",
       t1."member_id" AS "member_member_id",
       t1."given_name" AS "member_given_name",
       t2."congregation_id" AS "congregation_congregation_id",
       t2."name" AS "congregation_name"
FROM portfolio."membership" t0
JOIN portfolio."member" t1 ON t0."member_id" = t1."member_id"
JOIN portfolio."congregation" t2 ON t0."congregation_id" = t2."congregation_id"
ORDER BY t0."membership_id", t1."member_id", t2."congregation_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT t0."membership_id" AS "membership_membership_id",
       t0."start_date" AS "membership_start_date",
       t1."member_id" AS "member_member_id",
       t1."given_name" AS "member_given_name",
       t2."congregation_id" AS "congregation_congregation_id",
       t2."name" AS "congregation_name"
FROM portfolio."membership" t0
JOIN portfolio."member" t1 ON t0."member_id" = t1."member_id"
JOIN portfolio."congregation" t2 ON t0."congregation_id" = t2."congregation_id"
ORDER BY t0."membership_id", t1."member_id", t2."congregation_id"
LIMIT 20;

-- Find membership records where status matches "active" (up to 20).
SELECT * FROM portfolio."membership"
WHERE "status" IS NOT DISTINCT FROM 'active'
ORDER BY "membership_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT * FROM portfolio."membership"
WHERE "status" IS NOT DISTINCT FROM 'active'
ORDER BY "membership_id"
LIMIT 20;

-- Count membership records for each member_id (up to 20 groups).
SELECT "member_id", count(*) AS record_count
FROM portfolio."membership"
GROUP BY "member_id"
ORDER BY record_count DESC, "member_id" NULLS LAST
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT "member_id", count(*) AS record_count
FROM portfolio."membership"
GROUP BY "member_id"
ORDER BY record_count DESC, "member_id" NULLS LAST
LIMIT 20;
