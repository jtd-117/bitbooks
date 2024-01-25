# BITBOOKS

## Contents:
1. [Live Showcase](#live-showcase)
2. [About](#about)
3. [Design Pattern](#design-pattern)
3. [3rd Party Technologies Used](#3rd-party-technologies-used)
4. [Notes](#notes)

## Live Showcase:
A live showcase can be found by [clicking here]().

## About:
BitBooks is a web program that helps users track a list of books they have or intend to read. The app is fully responsive & allows users to sort books by the time they were added, by title, by author & by the number of pages the book has.

## Design Pattern:
BitBooks uses the [Model-View-Controller (MVC)](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) design pattern to assign clear responsibilities for each class. The LibraryModel class keeps track of book information within an array, the LibraryModel class handles events that manipulate the DOM & the LibraryController class handles the any UI that causes events to manipulate both the LibraryModel & the LibraryController.

## 3rd Party Technologies Used:
- [Sass](https://sass-lang.com/)
- [SCSS Reset](https://www.npmjs.com/package/scss-reset)

## Notes:
This project is based on [project 8 (Library)](https://www.theodinproject.com/lessons/node-path-javascript-library) of the Full Stack JavaScript course offered by [The Odin Project](https://www.theodinproject.com/dashboard) under the Javascript course.
