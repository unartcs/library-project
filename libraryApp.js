const libraryShelf = document.querySelector('.book-shelf-container > ul')
const submitBookButton = document.querySelector('.add-book-form > button')
const openFormButton = document.querySelector('.button-container')
const formContainer = document.querySelector('.form-container')
const plusButton = document.querySelector('.plus-button')
myLibrary = [];
let formContainerOpen = false;
let bookId = 0;

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

openFormButton.addEventListener('click', function () {
    if (formContainerOpen === true) {
        formContainer.style.display = 'none';
        plusButton.style.transform = "rotate(0deg)";
        formContainerOpen = false;
    }
    else {
        formContainer.style.display = 'block';
        plusButton.style.transform = "rotate(45deg)";
        formContainerOpen = true;
    }
})

submitBookButton.addEventListener('click', function (e) {
    let title = document.forms['book-form']['book-title'].value;
    let author = document.forms['book-form']['book-author'].value;
    let pages = document.forms['book-form']['book-pages'].value;
    let read = document.forms['book-form']['book-read'].checked;
    if (title != '' && author != '') {
        e.preventDefault();
        bookId++;
        const newBook = new Book(title, author, pages, read, bookId);
        myLibrary.push(newBook);
        updateLibrary();
        formContainer.style.display = 'none';
        plusButton.style.transform = "rotate(0deg)";
        formContainerOpen = false;
    }

})


function updateLibrary() {
    const bookGrids = document.querySelectorAll('.book-shelf-container > ul > div')
    bookGrids.forEach((book) => {
        book.remove()
    })
    for (let i = 0; i < myLibrary.length; i++) { //Cycle through my library array
        addBookToLibrary(myLibrary[i]);
    }
}

function addBookToLibrary(book) {
    const newBookGrid = document.createElement('div')
    const title = document.createElement('h1')
    const author = document.createElement('h2')
    const pages = document.createElement('h3')
    // const read = document.createElement('h4')
    const deleteBook = document.createElement('button')
    const containerForToggleAndLabel = document.createElement('div')
    const toggleRead = document.createElement('input')
    const toggleReadLabel = document.createElement('label')

    libraryShelf.appendChild(newBookGrid)
    newBookGrid.classList.add('book')
    containerForToggleAndLabel.classList.add('toggle-label-container')

    newBookGrid.appendChild(title)
    newBookGrid.appendChild(author)
    newBookGrid.appendChild(pages)
    // newBookGrid.appendChild(read)
    newBookGrid.appendChild(containerForToggleAndLabel)
    containerForToggleAndLabel.appendChild(toggleReadLabel)
    containerForToggleAndLabel.appendChild(toggleRead)
    newBookGrid.appendChild(deleteBook)
    toggleRead.setAttribute('type', 'checkbox');
    toggleRead.setAttribute('name', 'toggle-read');
    toggleReadLabel.setAttribute('for', 'toggle-read');
    title.textContent = book.title;
    author.textContent = 'By: ' + book.author;
    if (book.pages) { pages.textContent = 'Pages: ' + book.pages; }
    toggleReadLabel.textContent = 'Read: '
    if (book.read === true) {
        toggleRead.setAttribute('checked', '')
        newBookGrid.style.boxShadow = '0px 0px 5px 2px rgba(133, 212, 102, 0.71) inset'
    } else {
        newBookGrid.style.boxShadow = '0px 0px 5px 2px rgba(212, 102, 102, 0.71) inset'
    }
    deleteBook.textContent = 'Delete';
    deleteBook.addEventListener('click', function () {
        // newBookGrid.remove(); Not sure if I should use this, or just go back to update library(?)
        const index = myLibrary.map(book => book.id).indexOf(book.id)
        console.log(index)
        myLibrary.splice(index, 1);
        updateLibrary()
    })
    toggleRead.addEventListener('click', function () {
        if (book.read === true) {
            newBookGrid.style.boxShadow = '0px 0px 5px 2px rgba(212, 102, 102, 0.71) inset'
            const index = myLibrary.map(book => book.id).indexOf(book.id)
            myLibrary[index].read = false;
            console.log(book.read)

        } else if (book.read === false) {
            newBookGrid.style.boxShadow = '0px 0px 5px 2px rgba(133, 212, 102, 0.71) inset'
            const index = myLibrary.map(book => book.id).indexOf(book.id)
            myLibrary[index].read = true;
            console.log(book.read)

        }
    })
}
