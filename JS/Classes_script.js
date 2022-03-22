/*
Website Name - Library-Book-Crawler
Name : Vanshul Kesharwani
Date : 19/03/2022
Version : 2.2.1
Email : vkvanshulkesharwani54@gmail.com
Description : This is a Web app for adding different types of books name with their author and description.
Classes_Script : This JS file take concept of Classes.
*/


// Creating class with constructor.
class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    };
};

// Creating class Display with their methods.
class Display {
    // Created method name as add. it will add data in table body.
    addBook(book) {
        showBooks();
        // taking table body from their ID.
        let tableBody = document.getElementById("tableBody");
        // Taking all local storage in this books variable.
        let books = localStorage.getItem("books");

        // taking inner text of tablebody to fix error of storage is empty while enterning value.
        let tableBodyInnerText = tableBody.innerText;

        // Checking for if localstorage is null, put empty to the Html of the tableBody. ignoring errors.
        if (books == null) {
            // Empty the value while  we insert the book to table.
            tableBody.innerHTML = ``;
        } else if (tableBodyInnerText == `Nothing to show here. Use "Add Book" section to add a books.`) {
            // Checking by whole message.
            tableBody.innerHTML = ``;
        } else if (tableBodyInnerText.includes("Add")) {
            // Check from include funcion if this message content "Add" is present in table body inner text.
            tableBody.innerHTML = ``;
        };
        let tableRow = document.getElementById("tableRow");
        // show titles while data is there.
        tableRow.style.display = "table-row";

        // Adding book to DOM
        let uiString = `
                <tr class="table-primary text-center">
                <th scope="row">New!</th>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.type}</td>
                    <td><button id="" onclick="deleteBook(this.id)" class="btn btn-dark" style="font-size: 0.5rem;">D</button></td>
                </tr>`;
        // Adding book to DOM. += because we have to add more and more books.
        tableBody.innerHTML += uiString;
        // After 15seconds it will reload the page and showing number wise books.
        setTimeout(function() {
            showBooks();
        }, 10000);
    };

    // Created method name as clear. it will empty data from inputs.
    clear() {
        // getting form ID here.
        let libraryForm = document.getElementById("libraryForm");
        // Resetting form directly.
        libraryForm.reset();
    };

    // Created method name as validate. it will validate inputs is correct or not and for correct it will return true and for incorrect it will return false.
    validate(book) {
        if (book.name.length <= 2 || book.author.length <= 2 || book.name.length > 26 || book.author.length > 26) {
            return false
        } else { return true };
    };

    show(type, message) {
        // Taken message ID here
        let messageID = document.getElementById("message");
        // Adding message to DOM
        messageID.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            <strong>Message : </strong>${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
        // Set the time for message to auto remove after 5 second.
        setTimeout(function() {
            messageID.innerHTML = ``;
        }, 5000);
    };
};


// Adding submit Event Listener to the Submit button of form id is libraryForm. running with submit event libraryFormSubmit function.
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

// Read data and fill books details in library while page refrsh or load.
showBooks();

// Creating function for performing submit action.
function libraryFormSubmit(e) {
    // taken id of both inputs.
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    // Taking ID of radio buttons of selected button.
    let fiction = document.getElementById("fiction");
    let programming = document.getElementById("programming");
    let cooking = document.getElementById("cooking");
    let other = document.getElementById("other");
    let type;
    // Checking by condiion which one is selected in radio button.
    if (fiction.checked) {
        type = fiction.value;
    } else if (programming.checked) {
        type = programming.value;
    } else if (cooking.checked) {
        type = cooking.value;
    } else if (other.checked) {
        type = other.value;
    } else { type = other.value; };


    // Creating new object from Book class.
    let book = new Book(name, author, type);

    // Creating Display object from Display function. 
    let display = new Display();

    // Adding function to check for all input parametres. If its true then only it will add book.
    if (display.validate(book)) {
        // Adding method to display function it will add book in DOM in library.
        display.addBook(book);
        // showBooks();
        // Adding method to display function it will clear fields of form in DOM.
        display.clear();
        // Showing Success message to user.
        display.show("success", "Your Book has been added successfully.");

        // Taking all local storage in this notes variable.
        let books = localStorage.getItem("books");
        let booksObj;

        // Checking for if localstorage is null.
        if (books == null) {
            booksObj = [];
        } // if localstorage has value it will parse all the value in booksObj.
        else {
            booksObj = JSON.parse(books);
        };
        // Creating objects for storing multiple values.
        let myObj = {
            name: name,
            author: author,
            type: type // name, author and type of books will store here.
        };
        // Pushing myobject value to the booksObj.
        booksObj.push(myObj);
        // Send value of booksObj to local storage with a books parameter.
        localStorage.setItem("books", JSON.stringify(booksObj));
    } else {
        // Showing warning to the user.
        display.show("danger", "Please recheck your input its invalid. Try to add between 3 to 25 characters.");
    }
    // Preventing default behaviour of submit button to reload the page.
    e.preventDefault();
};

function showBooks() {

    // Taking all local storage in this notes variable.
    let books = localStorage.getItem("books");

    // Checking for if localstorage is null, put empty to the notes obj.
    if (books == null) {
        booksObj = [];
    } // if localstorage has value it will parse all the value in notesObj.
    else {
        booksObj = JSON.parse(books);
    };

    // Creating blank variable string.
    let uiString = "";
    // taking table body from their ID.
    let tableBody = document.getElementById("tableBody");

    let tableRow = document.getElementById("tableRow");

    // Checking for if books not equal to 0 we will print all notes..
    if (booksObj.length != 0) {
        // show titles while data is there.
        tableRow.style.display = "table-row";
        // Created function to loop all books from object.
        booksObj.forEach(function(element, index) {

            // Adding book to DOM. Added uiString stringVariable to this new generated uiString stringVariable. for displaying available books.
            uiString += `
                    <tr class="table-primary text-center">
                    <th scope="row">${index + 1}</th>
                    <td>${element.name}</td>
                    <td>${element.author}</td>
                    <td>${element.type}</td>
                    <td><button id="${index}" onclick="deleteBook(this.id)" class="btn btn-dark" style="font-size: 0.5rem;">D</button></td>
                    </tr>`;
            tableBody.innerHTML = uiString;
        });
    } // Else we will show this message.
    else {

        // Hide titles while nothing is there.
        tableRow.style.display = "none";
        // If nothing in local storage we will print this message.
        tableBody.innerHTML = `<b>Nothing to show here. Use "Add Book" section to add a books.</b>`;
    };
};

// Function to delete a book.
function deleteBook(index) {
    // Taking all local storage in this books variable.
    let books = localStorage.getItem("books");

    // Checking for if localstorage is null, put empty to the notes obj.
    if (books == null) {
        booksObj = [];
    } // if localstorage has value it will parse all the value in notesObj.
    else {
        booksObj = JSON.parse(books);
    };

    // Delete object in variable.
    booksObj.splice(index, 1);
    // update value of booksObj to local storage with a books parameter.
    localStorage.setItem("books", JSON.stringify(booksObj));
    showBooks();
};