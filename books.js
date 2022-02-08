const titleInput = document.getElementById('title-input');
const authorInput = document.getElementById('author-input');
const submitButton = document.getElementById('submit-button');

class methods {
  constructor() {

    this.removeBook = function (book) {
      books = books.filter((element) => JSON.stringify(element) !== JSON.stringify(book));
      localStorage.setItem('books', JSON.stringify(books));
    };

    this.removeBtnEventListener = function (element, title, author) {
      const book = { title, author };
      this.removeBook(book);
      element.parentElement.remove();
    };

    this.addBookToDocument = function (book) {
      const booksDiv = document.getElementById('books');
      const bookDiv = document.createElement('div');
      const title = document.createElement('p');
      title.classList.add('title');
      const author = document.createElement('p');
      author.classList.add('author');
      const remove = document.createElement('button');
      remove.classList.add('remove-btn');

      title.innerText = book.title;
      author.innerText = book.author;
      remove.innerText = 'Remove';

      bookDiv.append(title, author, remove);
      booksDiv.append(bookDiv);
      remove.addEventListener('click', () => {
        this.removeBtnEventListener(remove, book.title, book.author);
      });
    };

    this.addBookToLocalStorage = function (book) {
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
      this.addBookToDocument(book);
    };

  }
}

const method = new methods;

window.addEventListener('load', () => {
  if (JSON.parse(localStorage.getItem('books')) !== null) {
    books = JSON.parse(localStorage.getItem('books'));
    books.forEach((element) => {
      method.addBookToDocument(element);
    });
  }

  submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    const author = authorInput.value;
    const title = titleInput.value;
    const book = { title, author };
    method.addBookToLocalStorage(book);
    authorInput.value = null;
    titleInput.value = null;
  });
 });