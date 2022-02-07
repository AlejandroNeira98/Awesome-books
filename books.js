const titleInput = document.getElementById('title-input');
const authorInput = document.getElementById('author-input');
const submitButton = document.getElementById('submit-button');
let books = [];
var removeBtns = document.querySelectorAll(".remove-btn");

window.addEventListener('load', () => {
  if (JSON.parse(localStorage.getItem('books')) !== null){
    books = JSON.parse(localStorage.getItem('books'));
    books.forEach(element => {
      addBookToDocument(element);
    })
  }

  submitButton.addEventListener('click', function(e){
    e.preventDefault();
    let author = authorInput.value;
    let title = titleInput.value;
    let book = {'title': title, 'author': author}
    addBookToLocalStorage(book);
  })
});

function addBookToLocalStorage(book) {
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
  addBookToDocument(book);
}

function addBookToDocument(book){
  let booksDiv = document.getElementById('books');
  let bookDiv = document.createElement('div');
  let title = document.createElement('p');
  title.classList.add("title")
  let author = document.createElement('p');
  author.classList.add("author")
  let remove = document.createElement('button');
  remove.classList.add("remove-btn");

  title.innerText = book.title;
  author.innerText = book.author;
  remove.innerText = "Remove";

  bookDiv.append(title, author, remove);
  booksDiv.append(bookDiv);   
  remove.addEventListener('click', function (e) {
    removeBtnEventListener(remove, book.title, book.author);
  }); 
}

function removeBook(book){
  books = books.filter(element => element.title !== book.title);
  localStorage.setItem('books', JSON.stringify(books));
}

function removeBtnEventListener(element, title, author) {
  let book = {'title': title, 'author': author};
  removeBook(book);
  element.parentElement.remove();
}
