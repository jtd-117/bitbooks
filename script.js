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
 * @class LibraryModel
 * @description Stores a collection of 'Book' instances.
 */
class LibraryModel {
    
    /**
     * @description A list of books in the user library.
     * @type {Array}
     */
    #list

    constructor() {
        this.#list = [];
    }

    get list() {
        return this.#list;
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
        if (this.list.find(book => book.title === title)) return;

        // STEP 2: Create the new instance of the book & add it to the list
        const newBook = new Book(title, author, pages, hasRead);
        this.list.push(newBook);
    }

    /**
     * @description         Sorts the list of books by a specific property.
     * @param {Function}    cmpFn Compares the a property of 2 books
     */
    sortBooks(cmpFn) {
        this.list.sort((b1, b2) => cmpFn(b1, b2));
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
     * @description An instance of the library model the controller will manipulate
     */
    #libraryModel;

    constructor(libraryModel) {

        // STEP 1: Assign the LibraryModel
        this.#libraryModel = libraryModel
        
        // STEP 2: Event for sorting books
        const sortByBtn = document.getElementById('sort-by');
        sortByBtn.addEventListener('change', () => this.#sortBooks(sortByBtn.value));

        // STEP 3: Event for adding books
        const addBookBtn = document.getElementById('add-book');
        //addBookBtn.addEventListener('click', );
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
     * @description     Calls the LibraryModel to add a book
     * @param {String}  title   The title of the book
     * @param {String}  author  The person who wrote the book  
     * @param {Number}  pages   The number of pages the book has
     * @param {Boolean} hasRead Indicates if the book has been read
     */
    #addBook(title, author, pages, hasRead) {

    }
}

/**
 * @class LibraryView
 * @description Renders any changes of the LibraryModel that were 
 *              invoked by the LibraryController.
 */
class LibraryView {

    constructor() {

    }
}

// Set up the model, viewer & controller
const model = new LibraryModel();
const controller = new LibraryController(model);
