
const API_URL = "https://jsonplaceholder.typicode.com/posts";

const loadButton = document.getElementById("load-btn");
const statusMessage = document.getElementById("status");
const notesList = document.getElementById("notes-list");

async function request(path = "", options = {}) {
    const response = await fetch(`${API_URL}${path}`, options);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    return data;
}

function showStatus(message, type = "") {
    statusMessage.textContent = message;
    statusMessage.className = type;
}

function displayNotes(notes) {
    notesList.replaceChildren();

    if (notes.length === 0) {
        showStatus("No notes found.");
        return;
    }

    notes.forEach((note) => {
        const item = document.createElement("li");
        item.className = "note";

        const title = document.createElement("h3");
        title.textContent = note.title;

        const body = document.createElement("p");
        body.textContent = note.body;
        
        
const deleteButton = document.createElement("button");
deleteButton.textContent = "Delete";
deleteButton.type = "button";

deleteButton.addEventListener("click", () => {
    deleteNote(note.id, item, deleteButton);
});

item.append(title, body, deleteButton);
notesList.appendChild(item);

    });
}

async function loadNotes() {
    loadButton.disabled = true;
    showStatus("Loading notes...");

    try {
        const notes = await request("?_limit=10");
        displayNotes(notes);
        showStatus(`${notes.length} notes loaded successfully.`, "success");
    } catch (error) {
        showStatus("Could not load notes. Check your internet connection and try again.", "error");
        console.error(error);
    } finally {
        loadButton.disabled = false;
    }
}

loadButton.addEventListener("click", loadNotes);


const noteForm = document.getElementById("note-form");
const titleInput = document.getElementById("title-input");
const bodyInput = document.getElementById("body-input");
const submitButton = document.getElementById("submit-btn");

noteForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    if (!title) {
        showStatus("Please enter a note title.", "error");
        titleInput.focus();
        return;
    }

    if (title.length > 100) {
        showStatus("The title must be 100 characters or fewer.", "error");
        return;
    }

    loadButton.disabled = true;
    submitButton.disabled = true;
    showStatus("Creating note...");

    try {
        const newNote = await request("", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                body: body,
                userId: 1
            })
        });

        const item = document.createElement("li");
        item.className = "note";

        const heading = document.createElement("h3");
        heading.textContent = newNote.title;

        const paragraph = document.createElement("p");
        paragraph.textContent = newNote.body || "No body provided.";

        item.append(heading, paragraph);
        notesList.prepend(item);

        noteForm.reset();
        showStatus("Note created successfully.", "success");
    } catch (error) {
        showStatus("Could not create the note. Please try again.", "error");
        console.error(error);
    } finally {
        loadButton.disabled = false;
        submitButton.disabled = false;
    }
});


async function deleteNote(noteId, noteElement, deleteButton) {
    loadButton.disabled = true;
    submitButton.disabled = true;
    deleteButton.disabled = true;

    showStatus("Deleting note...");

    try {
        await request(`/${noteId}`, {
            method: "DELETE"
        });

        noteElement.remove();
        showStatus("Note deleted successfully.", "success");
    } catch (error) {
        showStatus("Could not delete the note. Please try again.", "error");
        console.error(error);
    } finally {
        loadButton.disabled = false;
        submitButton.disabled = false;
        deleteButton.disabled = false;
    }
}

