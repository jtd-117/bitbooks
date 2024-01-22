/**
 * @file script.js
 * @description Implements the BitBook logic by using the 
 *              Model-Controller-View (MVC) design pattern.
 */

/**
 * @description An enumeration for comparing 2 values.
 */
const CMPValues = Object.freeze({
    LESS: -1,
    EQUAL: 0,
    GREATER: 1,
});

/**
 * @description Holds information about a specific books
 */
class Book {

    /**
     * @description The name of the book.
     * @type {String}
     */
    #title;

    /**
     * @description The person/people who wrote the book.
     * @type {String}
     */
    #author;

    /**
     * @description The number of pages the book has.
     * @type {Number}
     */
    #pages;

    /**
     * @description Indicates if the book has been read.
     * @type {Boolean}
     */
    #hasRead;

    /**
     * @description The date & time the book was added to a library.
     * @type {Date}
     */
    #dateTimeAdded;

    /**
     * @constructor
     * @param {String}  title   The title of the book
     * @param {String}  author  The person who wrote the book  
     * @param {Number}  pages   The number of pages the book has
     * @param {Boolean} hasRead Indicates if the book has been read
     */
    constructor(title, author, pages, hasRead) {
        this.#title = title;
        this.#author = author;
        this.#pages = pages;
        this.#hasRead = hasRead;
        this.#dateTimeAdded = null;
    }

    get title() {
        return this.#title;
    }
    set title(title) {
        if (typeof title !== "string") {
            throw new TypeError("title must be of type 'string'!");
        }
        this.#title = title;
    }

    get author() {
        return this.#author;
    }
    set author(author) {
        if (typeof author !== "string") {
            throw new TypeError("author must be of type 'string'!");
        }
        this.#author = author;
    }

    get pages() {
        return this.#pages;
    }
    set pages(pages) {
        if (typeof pages !== "number") {
            throw new TypeError("pages must be of type 'number'!");
        }
        this.#pages = pages;
    }

    get hasRead() {
        return this.#hasRead;
    }
    set hasRead(hasRead) {
        if (typeof hasRead !== "boolean") {
            throw new TypeError("hasRead must be of type 'boolean'!");
        }
        this.#hasRead = hasRead;
    }

    get dateTimeAdded() {
        return this.#dateTimeAdded;
    }
    set dateTimeAdded(dateTime) {
        if (dateTime instanceof Date === false) {
            throw new TypeError("dateTime must be of type 'Date'!");
        }
        this.#dateTimeAdded = dateTime;
    }

    /**
     * @description     Compares the titles of 2 books.
     * @param   {Book}  b1 The 1st book to compare
     * @param   {Book}  b2 The 2nd book to compare
     * @returns {CMPValues} -1 if b1 < b2, 0 if b1 === b2, or 1 if b1 > b2.
     */
    static cmpTitle(b1, b2) {
        if (b1.title < b2.title) return CMPValues.LESS;
        else if (b1.title > b2.title) return CMPValues.GREATER;
        return CMPValues.EQUAL;
    }

    /**
     * @description     Compares the authors of 2 books.
     * @param   {Book}  b1 The 1st book to compare
     * @param   {Book}  b2 The 2nd book to compare
     * @returns {CMPValues} -1 if b1 < b2, 0 if b1 === b2, or 1 if b1 > b2.
     */
    static cmpAuthor(b1, b2) {
        if (b1.author < b2.author) return CMPValues.LESS;
        else if (b1.author > b2.author) return CMPValues.GREATER;
        return CMPValues.EQUAL;
    }

    /**
     * @description     Compares the pages of 2 books.
     * @param   {Book}  b1 The 1st book to compare
     * @param   {Book}  b2 The 2nd book to compare
     * @returns {CMPValues} -1 if b1 < b2, 0 if b1 === b2, or 1 if b1 > b2.
     */
    static cmpPages(b1, b2) {
        if (b1.pages < b2.pages) return CMPValues.LESS;
        else if (b1.pages > b2.pages) return CMPValues.GREATER;
        return CMPValues.EQUAL;
    }

    /**
     * @description     Compares the dateTimeAdded of 2 books.
     * @param   {Book}  b1 The 1st book to compare
     * @param   {Book}  b2 The 2nd book to compare
     * @returns {CMPValues} -1 if b1 < b2, 0 if b1 === b2, or 1 if b1 > b2.
     */
    static cmpDateTimeAdded(b1, b2) {
        if (b1.dateTimeAdded < b2.dateTimeAdded) return CMPValues.LESS;
        else if (b1.dateTimeAdded > b2.dateTimeAdded) return CMPValues.GREATER;
        return CMPValues.EQUAL;
    }
}

/**
 * @class LibraryController
 * @description Handles event listeners for buttons
 */
class LibraryController {

    static sortValues = Object.freeze({
        ADDED: "added",
        TITLE: "title",
        AUTHOR: "author",
        PAGES: "pages",
    });

    /**
     * @class LibraryModel
     */
    #libraryModel;

    constructor() {

        // STEP 1: Assign the LibraryModel
        this.#libraryModel = new LibraryModel();
        
        // STEP 2: Event for sorting books
        const sortByBtn = document.getElementById('sort-by');
        sortByBtn.addEventListener('change', () => this.#sortBooks(sortByBtn.value));

        // STEP 3: Event for dialog-modal form popup
        const addBookBtn = document.getElementById('add-book');
        addBookBtn.addEventListener('click', () => this.#openBookForm());
        
        // STEP 4: Event for form submission & cancellations
        const submitBookBtn = document.getElementById('submit-book');
        const cancelBookBtn = document.getElementById('cancel-book');
        submitBookBtn.addEventListener('click', (e) => this.#addBook(e));
        cancelBookBtn.addEventListener('click', (e) => this.#resetBookForm(e));
    }

    /**
     * @description     Calls the LibraryModel to sort the books
     * @param {String}  sortOption the method to sort the books
     */
    #sortBooks(sortOption) {

        if (sortOption === LibraryController.sortValues.ADDED) {
            this.#libraryModel.sortBooks(Book.cmpDateTimeAdded);

        } else if (sortOption === LibraryController.sortValues.TITLE) {
            this.#libraryModel.sortBooks(Book.cmpTitle);

        } else if (sortOption === LibraryController.sortValues.AUTHOR) {
            this.#libraryModel.sortBooks(Book.cmpAuthor);

        } else {
            this.#libraryModel.sortBooks(Book.cmpPages);
        }
        console.log(sortOption);
    }
    
    /**
     * @description Opens up the add book form when clicking + button
     */
    #openBookForm() {
        const addBookForm = document.getElementById('add-book-form');
        addBookForm.showModal();
    }

    /**
     * @description Resets the book form after submission/cancellation
     */
    #resetBookForm(e) {

        // STEP 1: Get the book values
        e.preventDefault();
        let bookTitle = document.getElementById('book-title');
        let bookAuthor = document.getElementById('book-author');
        let bookPages = document.getElementById('book-pages');
        let bookStatus = document.getElementById('book-status');

        // STEP 2: Reset the book values & close the modal
        bookTitle.value = '';
        bookAuthor.value = '';
        bookPages.value = '';
        bookStatus.value = 'read';
        document.getElementById('add-book-form').close();
    }

    /**
     * @description     Calls the LibraryModel to add a book
     */
    #addBook(e) {

        // STEP 1: Form validation
        const bookForm = document.querySelector('form[method="dialog"]');
        if (!bookForm.checkValidity()) return;

        // STEP 2: Get the book values
        const bookTitle = document.getElementById('book-title').value;
        const bookAuthor = document.getElementById('book-author').value;
        const bookPages = document.getElementById('book-pages').value;
        const bookStatus = document.getElementById('book-status').value;

        // STEP 3: Convert book status into a boolean
        let bookStatusBoolean = false;
        if (bookStatus === 'read') bookStatusBoolean = true;

        // STEP 4: Call the library model to add the new book
        this.#libraryModel.addBook(bookTitle, bookAuthor, bookPages, bookStatusBoolean);

        // STEP 5: Reset the form
        this.#resetBookForm(e);
    }
}

/**
 * @class LibraryModel
 * @description Stores a collection of 'Book' instances.
 */
class LibraryModel {


    /**
     * @class LibraryView
     */
    #libraryView;
    
    /**
     * @description A list of books in the user library.
     * @type {Array}
     */
    #books;

    constructor() {
        this.#libraryView = new LibraryView();
        this.#books = [];
    }

    get books() {
        return this.#books;
    }

    /**
     * @description     Adds a book into the library's list.
     * @param {String}  title   The title of the book
     * @param {String}  author  The person who wrote the book  
     * @param {Number}  pages   The number of pages the book has
     * @param {Boolean} hasRead Indicates if the book has been read
     */
    addBook(title, author, pages, hasRead) {

        // STEP 1: Do not add the book if it's title exists
        if (this.books.find(book => book.title === title)) return;

        // STEP 2: Create the new instance of the book & add it to the list
        const newBook = new Book(title, author, pages, hasRead);
        this.books.push(newBook);
        this.#libraryView.uploadBookToDOM(newBook);
    }

    /**
     * @description         Sorts the list of books by a specific property.
     * @param {Function}    cmpFn Compares the a property of 2 books
     */
    sortBooks(cmpFn) {
        this.books.sort((b1, b2) => cmpFn(b1, b2));
    }
}

/**
 * @class LibraryView
 * @description Renders any changes of the LibraryModel that were 
 *              invoked by the LibraryController.
 */
class LibraryView {

    /**
     * @description The div that stores all the books in the DOM;
     */
    #libraryDiv;

    constructor() {
        this.#libraryDiv = document.getElementById('library');
    }

    /**
     * @description Toggles a book's read status
     */
    static toggleReadStatus(e) {
        if (e.target.classList.contains('read')) {
            e.target.textContent = 'Unread';
        } else {
            e.target.textContent = 'Read';
        }
        e.target.classList.toggle('read');
    }

    /**
     * @description Uploads a book to the DOM
     * @param {Book} book 
     */
    uploadBookToDOM(book) {

        // STEP 1: Ensure book is appropriate type
        if (!book instanceof Book) return;

        // STEP 2: Create the elements
        const bookDiv = document.createElement('div');
        const titleDiv = document.createElement('div');
        const authorDiv = document.createElement('div');
        const pagesDiv = document.createElement('div');
        const statusBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');

        bookDiv.classList.add('book');
        titleDiv.classList.add('title');
        authorDiv.classList.add('author');
        pagesDiv.classList.add('pages');
        statusBtn.classList.add('status');
        deleteBtn.classList.add('delete');

        // STEP 3: Populate elements with data
        titleDiv.textContent = `${book.title}`;
        authorDiv.textContent = `${book.author}`;
        pagesDiv.textContent = `${book.pages} pages`;
        deleteBtn.textContent = `Delete`;
        
        if (book.hasRead == true) {
            statusBtn.classList.add('read');
            statusBtn.textContent = 'Read';
        } else {
            statusBtn.textContent = 'Unread';
        }

        // STEP 4: Add event listeners
        statusBtn.addEventListener('click', LibraryView.toggleReadStatus);

        // STEP 5: Add element to DOM
        bookDiv.appendChild(titleDiv);
        bookDiv.appendChild(authorDiv);
        bookDiv.appendChild(pagesDiv);
        bookDiv.appendChild(statusBtn);
        bookDiv.appendChild(deleteBtn);
        this.#libraryDiv.appendChild(bookDiv);
    }
}

// Initialise the controller to set up the model & view
const controller = new LibraryController();
