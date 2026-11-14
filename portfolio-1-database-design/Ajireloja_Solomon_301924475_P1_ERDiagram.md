# Church Membership Management System — ER diagram

```mermaid
erDiagram
    direction LR
    member {
        bigint member_id PK
        text given_name
        text family_name
        text email UK
        date birth_date "Optional"
    }
    congregation {
        bigint congregation_id PK
        text name UK
        text city
        date founded_date "Optional"
    }
    membership {
        bigint membership_id PK
        bigint member_id FK
        bigint congregation_id FK
        date start_date
        date end_date "Optional"
        text status
    }
    member ||--o{ membership : "member_id"
    congregation ||--o{ membership : "congregation_id"
```

PK identifies a record; FK links to another table; UK marks a single-field unique value. The relationship ends show exactly one, zero or one, or zero or many records. Composite unique keys and conditional rules are listed in the schema and design.

[Diagram image](../images/Ajireloja_Solomon_301924475_ERDiagram.png)
