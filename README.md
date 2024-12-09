# Books Bazar

This project was generated with [Angular CLI] version 18.2.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Overview 

Book Bazaar is an Angular application where users can create books and like it

## Features - 

**Create Books:** Users can add new books with details such as title, author, genre,image and description. - 
**Like Books:** Users can like books and view them on a dedicated "Liked Books" page.
**User Profile:** Users can view all the books they have created on their profile page. 

## Getting Started

### Installation
 1. Clone the repository(CLI): ```bash git clone https://github.com/petkolatev/Books-bazaar.git
 2. Clone the repository(Rest-Api): ```bash git clone https://github.com/petkolatev/Bazaar-Api.git
 3. npm install -  on both for dependencies
 4. create .nvm file(for Rest-Api) there have example

### Dependencies
1. Running MongoDB local instance
2. Create MongoDB Database Books with books collection
3. Make sure url is updated with the local mongodb connection string.
4. Import book-bazaar.json (the file will be located in the main directory of the API service) for a catalog of books.

### Strat
1. ng serve for Book-bazaar
2. npm start for Rest-Api