/*
Website Name - Library-Book-Crawler
Name : Vanshul Kesharwani
Date : 19/03/2022
Version : 1.0.0
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
    add(book) {
        // taking table body from their ID.
        let tableBody = document.getElementById("tableBody");
        // Adding book to DOM
        let uiString = `
        <tr class="table-primary text-center">
            <th scope="row">*</th>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.type}</td>
        </tr>`;
        tableBody.innerHTML += uiString;
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
        if (book.name.length <= 2 || book.author.length <= 2 || book.name.length > 25 || book.author.length > 20) {
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
        display.add(book);
        // Adding method to display function it will clear fields of form in DOM.
        display.clear();
        // Showing Success message to user.
        display.show("success", "Your Book has been added successfully.");
    } else {
        // Showing warning to the user.
        display.show("danger", "Please recheck your input its invalid.");
    }
    // Preventing default behaviour of submit button to reload the page.
    e.preventDefault();
};