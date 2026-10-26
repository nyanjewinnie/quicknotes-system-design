
# QuickNotes API Design

## 1. Overview

QuickNotes uses a REST API to create, retrieve, update, and delete notes. The API exchanges JSON data over HTTP.

Base URL: `https://api.quicknotes.example.com`

Authentication: Protected endpoints require a valid bearer token.

## 2. API Endpoints

| Method | Endpoint | Description | Success Status |
|---|---|---|---|
| GET | `/notes` | Retrieve a list of notes | 200 OK |
| GET | `/notes/{id}` | Retrieve one note by ID | 200 OK |
| POST | `/notes` | Create a new note | 201 Created |
| PUT | `/notes/{id}` | Replace an existing note | 200 OK |
| PATCH | `/notes/{id}` | Partially update a note | 200 OK |
| DELETE | `/notes/{id}` | Delete a note | 204 No Content |

## 3. List Notes

### Request

`GET /notes?limit=10&offset=0`

The client requests a page of notes. The server returns notes belonging to the authenticated user.

### Example Response

Status: `200 OK`

```json
{
  "data": [
    {
      "id": 101,
      "title": "Study plan",
      "body": "Revise system design",
      "userId": 7
    },
    {
      "id": 102,
      "title": "Project tasks",
      "body": "Finish API documentation",
      "userId": 7
    }
  ],
  "pagination": {
    "limit": 10,
    "offset": 0,
    "total": 2
  }
}
```

## 4. Create a Note

### Request

`POST /notes`

Header: `Content-Type: application/json`

### Example Request Body

```json
{
  "title": "Meeting notes",
  "body": "Prepare the project presentation"
}
```

### Example Response

Status: `201 Created`

```json
{
  "data": {
    "id": 103,
    "title": "Meeting notes",
    "body": "Prepare the project presentation",
    "userId": 7
  }
}
```

## 5. Error Handling

Errors use a consistent JSON response format.

### Example Error Response

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The title field is required."
  }
}
```

| HTTP Status | Meaning | Example |
|---|---|---|
| 400 | Bad Request | A required title is missing |
| 401 | Unauthorized | The user has not authenticated |
| 403 | Forbidden | The user tries to access another user's note |
| 404 | Not Found | The requested note does not exist |
| 500 | Internal Server Error | An unexpected server error occurs |

## 6. Validation and Security

- A note title is required and must not exceed 100 characters.
- The body is optional.
- Users must authenticate before accessing private notes.
- The server checks note ownership before allowing updates or deletion.
- Input is validated on the server, even if the client also validates it.
- HTTPS protects data while it travels between client and server.

## 7. Client Implementation

The current QuickNotes front end uses the JSONPlaceholder practice API at `https://jsonplaceholder.typicode.com/posts` to practise GET, POST, and DELETE requests.

The endpoint examples in this document describe the proposed QuickNotes API. They are a design specification, not endpoints implemented by JSONPlaceholder.
