class Book {
    constructor(title, author, available = true) {
        this.title = title;
        this.author = author;
        this.available = available;
    }
}

const library = {
    books: [],

    addBook(title, author) {
        const book = new Book(title, author);
        this.books.push(book);
        console.log(`Added ${book.title} by ${book.author} to the library! There are now ${this.books.length} book(s) on the shelf.`)
    },

    checkOutBook(title) {
        try {
            let found = false;
            for (let book of this.books) {
                if (book.title === title && book.available) {
                    found = true;
                    book.available = false;
                    console.log(`Checked out: ${book.title}.`);
                    break;
                } 
            }
            if (!found) {
                throw new Error(`${title} was not found or already checked out.`)
            }

            displayBooks();
        } catch(error) {
            console.log(error.message);
        } 
    },

    getAvailableBooks() {
        let bookList = [];
        for (let book of this.books) {
            if (book.available) {
                bookList.push(book.title);
            }
        }

        console.log(`There are ${bookList.length} titles currently on the shelf: ${bookList.join(", ")}.`);
        updateDisplayBooks(title);
    } 
}

const newBooks = `[
    {"title": "To Kill a Mockingbird", "author": "Harper Lee"},
    {"title": "1984", "author": "George Orwell"},
    {"title": "The Great Gatsby", "author": "F. Scott Fitzgerald"},
    {"title": "The Catcher in the Rye", "author": "J.D. Salinger"},
    {"title": "One Hundred Years of Solitude", "author": "Gabriel García Márquez"},
    {"title": "The Hobbit", "author": "J.R.R. Tolkien"},
    {"title": "Pride and Prejudice", "author": "Jane Austen"},
    {"title": "The Lord of the Rings", "author": "J.R.R. Tolkien"},
    {"title": "Brave New World", "author": "Aldous Huxley"},
    {"title": "The Chronicles of Narnia", "author": "C.S. Lewis"}
]`;

function removeBook() {
    const titleInput = document.getElementById('checkoutTitle');
    const title = titleInput.value;

    if (title) {
        library.checkOutBook(title);
        updateDisplayBooks(title)
        titleInput.value = '';
    } else {
        alert("Please enter a valid title.")
    }
}

function updateDisplayBooks(title) {
    const bookList = document.querySelector('.available-books');
    const listItemToRemove = Array.from(bookList.children).find(li => li.textContent.includes(title));

    if (listItemToRemove) {
        bookList.removeChild(listItemToRemove);
    }
}

function receiveBooks(bookData) {
    console.log("Adding new books to our shelves!");
    const booksToAdd = JSON.parse(bookData);
    for (let book of booksToAdd) {
        library.addBook(book.title, book.author);
    }
}

function displayBooks() {

    const bookList = document.querySelector('.available-books');

    bookList.innerHTML = " ";

    library.books.forEach(book => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'book-item');
        listItem.textContent = `Title: ${book.title}, Author: ${book.author}`;
        bookList.appendChild(listItem);
    });
}

const availableBooksButton = document.getElementById('available-books');
availableBooksButton.addEventListener("click", function() {
    displayBooks();
});


function addNewBook() {
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');

    const title = titleInput.value;
    const author = authorInput.value;

    if (title && author) {
        library.addBook(title, author);
        displayBooks();
        titleInput.value = '';
        authorInput.value = '';
    } else {
        alert('Please enter both title and author.')
    }
}


// TEST CODE
console.log(`There are currently ${library.books.length} books in the library's database.`);
library.addBook("Eloquent JavaScript", "Marijn Haverbeke");
receiveBooks(newBooks);
// library.checkOutBook("Eloquent JavaScript");
// library.checkOutBook("Alice in Wonderland");
// library.getAvailableBooks();