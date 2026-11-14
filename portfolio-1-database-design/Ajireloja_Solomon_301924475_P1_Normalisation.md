# Church Membership Management System — normalisation

The example uses the saved sample records. The full set of fields is in the design and schema.

## Starting grouped records

| member_id | membership records (list) |
| --- | --- |
| 1001 | [3001] |
| 1002 | [3002] |


The record IDs are grouped in a list. In 1NF, each record has its own row and each cell holds one value.

## 1NF: one value per cell

| membership.membership_id | membership.member_id | membership.congregation_id | membership.status | member.member_id | member.given_name | congregation.congregation_id | congregation.name |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 3001 | 1001 | 2001 | active | 1001 | Avery | 2001 | Cedar Grove |
| 3002 | 1002 | 2002 | ended | 1002 | Jordan | 2002 | Harbor Light |

Key: membership_id.

## 2NF: depend on the whole key

The declared candidate keys do not introduce a partial dependency here, so the 1NF rows stay unchanged at this step.

## membership_example

| membership.membership_id | membership.member_id | membership.congregation_id | membership.status | member.member_id | member.given_name | congregation.congregation_id | congregation.name |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 3001 | 1001 | 2001 | active | 1001 | Avery | 2001 | Cedar Grove |
| 3002 | 1002 | 2002 | ended | 1002 | Jordan | 2002 | Harbor Light |

## 3NF: store each entity’s details once

The entity keys determine their own descriptions. Related records keep foreign keys rather than repeating those descriptions.

## member

| member_id | given_name | family_name | email | birth_date |
| --- | --- | --- | --- | --- |
| 1001 | Avery | Bennett | avery.bennett@example.test | 1988-04-12 |
| 1002 | Jordan | Rivera | jordan.rivera@example.test | NULL |

## congregation

| congregation_id | name | city | founded_date |
| --- | --- | --- | --- |
| 2001 | Cedar Grove | Portland | 1952-06-01 |
| 2002 | Harbor Light | Salem | NULL |

## membership

| membership_id | member_id | congregation_id | start_date | end_date | status |
| --- | --- | --- | --- | --- | --- |
| 3001 | 1001 | 2001 | 2023-01-15 | NULL | active |
| 3002 | 1002 | 2002 | 2020-03-01 | 2022-08-31 | ended |

## Dependencies

- member: (member_id) → given_name, family_name, email, birth_date
- congregation: (congregation_id) → name, city, founded_date
- membership: (membership_id) → member_id, congregation_id, start_date, end_date, status

Joining the decomposed sample tables reproduces the original 2 example rows. The design assumes the declared keys describe the relevant business dependencies.
