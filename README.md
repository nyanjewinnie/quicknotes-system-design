
# QuickNotes System Design

## Project Overview

QuickNotes is a simple web-based note-taking project built to practise front-end API integration and software system design.

The front end uses HTML, CSS, and JavaScript. It connects to the JSONPlaceholder practice API to demonstrate retrieving, creating, and deleting notes.

## Features

- Load sample notes using a GET request.
- Create a note using a POST request.
- Delete a note using a DELETE request.
- Display loading, success, and error messages.
- Validate note titles and limit them to 100 characters.
- Use responsive CSS for smaller screens.
- Document the proposed API, data model, and system architecture.

**Note:** JSONPlaceholder is a testing service. Created and deleted notes are simulated and are not permanently stored on its server.

## Technologies Used

- HTML5
- CSS3
- JavaScript (Fetch API and async/await)
- REST API and JSON
- Git and GitHub
- Markdown
- SQL and system design concepts

## How to Run the Project

1. Clone or download this repository.
2. Open the project folder in Visual Studio Code.
3. Open `index.html` using the Live Server extension, or open the file in a web browser.
4. Ensure your computer has an internet connection.
5. Click **Load notes** to retrieve sample notes.
6. Enter a title and optional body to practise creating a note.
7. Click **Delete** on a note to practise deleting it.

The current front end uses:

`https://jsonplaceholder.typicode.com/posts`

## Design Documentation

- [API Design](docs/api-design.md)
- [Data Model](docs/data-model.md)
- [System Architecture](docs/architecture.md)

## What I Learned

- How to use the Fetch API with asynchronous JavaScript to make HTTP requests.
- How GET, POST, and DELETE methods support different API operations.
- How to handle loading, success, and error states using try/catch/finally.
- How to validate user input and safely display text using `textContent`.
- How relational database tables use primary keys, foreign keys, and JOIN queries.
- How caching, load balancing, read replicas, and background workers support scalability.
- How Git and GitHub help track and share project development.

## Future Improvements

- Connect the front end to a real backend and database.
- Add authentication and user-specific notes.
- Implement note editing and searching.
- Add automated tests and more robust error handling.

## Author

Winnie Nyanje
