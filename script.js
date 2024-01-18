/**
 * @file script.js
 * @description A file for implementing the BitBooks logic
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
     * @param {String}  title 
     * @param {String}  author 
     * @param {Number}  pages 
     * @param {Boolean} hasRead 
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
 * @description Stores a collection of 'Book' instances.
 */
class Library {
    
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
     * @param {String}  title 
     * @param {String}  author 
     * @param {Number}  pages 
     * @param {Boolean} hasRead 
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
