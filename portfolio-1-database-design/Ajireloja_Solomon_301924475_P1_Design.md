# Church Membership Management System — database design

My case study records member, congregation, membership.

## Users

- Membership administrators maintaining member and congregation records
- Congregation leaders reviewing membership totals

## Main operations

- Register members and congregations, then record membership periods and status.
- Review active memberships and historical membership periods.
- Join membership to member and congregation to prepare membership listings.
- Filter active memberships and aggregate active membership counts by congregation.
- Separate benchmark plan: generate 20000 synthetic membership rows, run the same status-filter query before and after adding a B-tree index on membership.status, and compare measurements without assuming an outcome.

## Entities

| Entity | Information stored |
| --- | --- |
| member | Stores a person's basic identity and contact information. |
| congregation | Stores congregations that members may join. |
| membership | Records a member's membership period and status in a congregation. |

## member

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| member_id | BIGINT | PK | Yes |
| given_name | TEXT |  | Yes |
| family_name | TEXT |  | Yes |
| email | TEXT | Unique | Yes |
| birth_date | DATE |  | No |
- Unique key: (email).

## congregation

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| congregation_id | BIGINT | PK | Yes |
| name | TEXT | Unique | Yes |
| city | TEXT |  | Yes |
| founded_date | DATE |  | No |
- Unique key: (name).

## membership

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| membership_id | BIGINT | PK | Yes |
| member_id | BIGINT | FK | Yes |
| congregation_id | BIGINT | FK | Yes |
| start_date | DATE |  | Yes |
| end_date | DATE |  | No |
| status | TEXT |  | Yes |
- member_id → member.member_id
- congregation_id → congregation.congregation_id

## Relationships and business rules

- Each member record must have a distinct email address.
- Each congregation must have a distinct name.
- Every membership must reference an existing member through membership.member_id.
- Every membership must reference an existing congregation through membership.congregation_id.
- A membership end date, when present, must be on or after its start date.
- At most one membership per member may have status active; enforce this with a partial unique constraint on member_id for rows whose status is active.

## Assumptions

- Each membership period connects exactly one member to one congregation.
- A member may have historical membership periods but at most one active membership across all congregations at a time.
- An active membership has no end date; a non-null end date must not precede its start date.
- Synthetic UUID values are used for entity identifiers and are globally distinct across the three entity types.
- The MongoDB model records membership lifecycle events and embeds member and congregation data as compact event-context snapshots.

