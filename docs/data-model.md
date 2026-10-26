
# QuickNotes Data Model

## 1. Overview

QuickNotes uses a relational database to store users, notes, and tags. Primary keys uniquely identify records, while foreign keys connect related records.

## 2. Database Tables

### Users

Stores information about registered users.

| Column | Data Type | Key | Description |
|---|---|---|---|
| id | INTEGER | Primary Key | Unique user ID |
| name | VARCHAR(100) | | User's full name |
| email | VARCHAR(255) | UNIQUE | User's email address |
| password_hash | VARCHAR(255) | | Secure password hash |
| created_at | TIMESTAMP | | Account creation time |

### Notes

Stores notes created by users.

| Column | Data Type | Key | Description |
|---|---|---|---|
| id | INTEGER | Primary Key | Unique note ID |
| user_id | INTEGER | Foreign Key | Owner of the note |
| title | VARCHAR(100) | | Note title |
| body | TEXT | | Note content |
| created_at | TIMESTAMP | | Creation time |
| updated_at | TIMESTAMP | | Last update time |

### Tags

Stores labels that users can apply to notes.

| Column | Data Type | Key | Description |
|---|---|---|---|
| id | INTEGER | Primary Key | Unique tag ID |
| user_id | INTEGER | Foreign Key | User who owns the tag |
| name | VARCHAR(50) | | Tag name |

### Note_Tags

Connects notes and tags in a many-to-many relationship.

| Column | Data Type | Key | Description |
|---|---|---|---|
| note_id | INTEGER | Composite Primary Key, Foreign Key | Linked note |
| tag_id | INTEGER | Composite Primary Key, Foreign Key | Linked tag |

## 3. Relationships

- One user can own many notes.
- One user can create many tags.
- One note can have many tags.
- One tag can be applied to many notes.
- The `note_tags` table connects notes and tags.
- Deleting a note should also remove its related `note_tags` records.

## 4. SQL Table Definitions

The following examples use PostgreSQL-compatible SQL.

```sql
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notes (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    body TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tags (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    UNIQUE (user_id, name)
);

CREATE TABLE note_tags (
    note_id INTEGER NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
    tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (note_id, tag_id)
);
```

## 5. Example SQL Queries

### Query 1: Retrieve all notes for a user

```sql
SELECT id, title, body, created_at
FROM notes
WHERE user_id = 1
ORDER BY updated_at DESC;
```

### Query 2: Retrieve a note with its owner's details

```sql
SELECT notes.id, notes.title, notes.body, users.name, users.email
FROM notes
JOIN users ON notes.user_id = users.id
WHERE notes.id = 10;
```

### Query 3: Retrieve notes and their tags

```sql
SELECT notes.title, tags.name AS tag_name
FROM notes
JOIN note_tags ON notes.id = note_tags.note_id
JOIN tags ON note_tags.tag_id = tags.id
WHERE notes.user_id = 1;
```

## 6. Indexing

Create an index on `notes.user_id` to speed up queries that retrieve notes belonging to a particular user.

```sql
CREATE INDEX idx_notes_user_id ON notes(user_id);
```

This index improves lookup performance as the number of users and notes grows.

## 7. SQL vs NoSQL

A relational SQL database such as PostgreSQL is suitable because QuickNotes has clearly defined relationships between users, notes, and tags. Foreign keys help maintain data integrity, and SQL JOINs make related information easy to retrieve.

A NoSQL database could be useful if the application needed highly flexible document structures or a different scaling strategy. However, the relational structure is a good fit for this project.
```

## Step 10: Verify your files

Your `docs` folder should now contain:

- `api-design.md`
- `data-model.md`

Save the file, then reply **next**. We’ll build the final design document, `docs/architecture.md`, including a system architecture diagram and estimates for one million users.