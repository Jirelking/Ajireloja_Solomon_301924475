# Church Membership Management System — SQL queries

## 1. Show related membership, member, congregation records (up to 20).

```sql
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
```

| membership_membership_id | membership_start_date | member_member_id | member_given_name | congregation_congregation_id | congregation_name |
| --- | --- | --- | --- | --- | --- |
| 3001 | 2023-01-15 | 1001 | Avery | 2001 | Cedar Grove |
| 3002 | 2020-03-01 | 1002 | Jordan | 2002 | Harbor Light |

## 2. Find membership records where status matches "active" (up to 20).

```sql
SELECT * FROM portfolio."membership"
WHERE "status" IS NOT DISTINCT FROM 'active'
ORDER BY "membership_id"
LIMIT 20;
```

| membership_id | member_id | congregation_id | start_date | end_date | status |
| --- | --- | --- | --- | --- | --- |
| 3001 | 1001 | 2001 | 2023-01-15 | NULL | active |

## 3. Count membership records for each member_id (up to 20 groups).

```sql
SELECT "member_id", count(*) AS record_count
FROM portfolio."membership"
GROUP BY "member_id"
ORDER BY record_count DESC, "member_id" NULLS LAST
LIMIT 20;
```

| member_id | record_count |
| --- | --- |
| 1001 | 1 |
| 1002 | 1 |


## Index comparison

| Phase | Median (ms) | Three runs (ms) | Plan nodes | Buffer hits |
| --- | --- | --- | --- | --- |
| Before index | 1.054 | 1.033, 1.077, 1.054 | Sort → Seq Scan | 131 |
| After index | 0.171 | 0.18, 0.171, 0.165 | Sort → Bitmap Heap Scan → Bitmap Index Scan | 25 |

The median execution time changed from 1.054 ms to 0.171 ms. The measured plan used p2_filter_idx. The results matched in both phases. An index adds storage and write-maintenance costs; timings depend on the selected lookup and environment.

## Execution plans

### Before index, run 1

```text
Sort (actual time=1.009..1.011 rows=20 loops=1)
  Seq Scan on membership (actual time=0.014..0.978 rows=20 loops=1)
Planning Time: 0.339 ms
Execution Time: 1.033 ms
```

### Before index, run 2

```text
Sort (actual time=1.052..1.054 rows=20 loops=1)
  Seq Scan on membership (actual time=0.014..1.021 rows=20 loops=1)
Planning Time: 0.374 ms
Execution Time: 1.077 ms
```

### Before index, run 3

```text
Sort (actual time=1.03..1.031 rows=20 loops=1)
  Seq Scan on membership (actual time=0.013..0.998 rows=20 loops=1)
Planning Time: 0.38 ms
Execution Time: 1.054 ms
```

### After index, run 1

```text
Sort (actual time=0.128..0.129 rows=20 loops=1)
  Bitmap Heap Scan on membership (actual time=0.033..0.093 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.02..0.02 rows=20 loops=1)
Planning Time: 0.544 ms
Execution Time: 0.18 ms
```

### After index, run 2

```text
Sort (actual time=0.121..0.123 rows=20 loops=1)
  Bitmap Heap Scan on membership (actual time=0.031..0.087 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.019..0.019 rows=20 loops=1)
Planning Time: 0.618 ms
Execution Time: 0.171 ms
```

### After index, run 3

```text
Sort (actual time=0.115..0.117 rows=20 loops=1)
  Bitmap Heap Scan on membership (actual time=0.029..0.082 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.018..0.018 rows=20 loops=1)
Planning Time: 0.524 ms
Execution Time: 0.165 ms
```

## Reproduce

Use a fresh database with the Portfolio 1 schema and sample data. Run Ajireloja_Solomon_301924475_P2_Queries.sql, then Ajireloja_Solomon_301924475_P2_Optimisation.sql. The optimisation script creates a separate performance table and runs EXPLAIN (ANALYZE, BUFFERS).

[Query screenshot](screenshots/Ajireloja_Solomon_301924475_P2_QueryResults.png) · [Index comparison](screenshots/Ajireloja_Solomon_301924475_P2_IndexComparison.png)

## References

- [PostgreSQL — EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html)

