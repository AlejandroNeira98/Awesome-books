const titleInput = document.getElementById('title-input');
const authorInput = document.getElementById('author-input');
const submitButton = document.getElementById('submit-button');

class methods {
  constructor() {

    this.books = [];

    this.init = function () {
      if (JSON.parse(localStorage.getItem('books')) !== null) {
        this.books = JSON.parse(localStorage.getItem('books'));
        this.books.forEach((element) => {
          method.addBookToDocument(element);
        });
      }
    }

    this.removeBook = function (time) {
      this.books = this.books.filter((book) => book.time !== time);
      localStorage.setItem('books', JSON.stringify(this.books));
    };

    this.removeBtnEventListener = function (element, time) {
      this.removeBook(time);
      element.parentElement.remove();
    };

    this.addBookToDocument = function (book) {
      const booksDiv = document.getElementById('books');
      
      const bookDiv = document.createElement('div');
      bookDiv.setAttribute('data-time', book.time);
      
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
        this.removeBtnEventListener(remove, book.time);
      });
    };

    this.addBookToLocalStorage = function (title, author) {
      const d = new Date();
      const time = d.getTime();
      this.books.push({
        'title': title,
        'author': author,
        'time': time
      });
      localStorage.setItem('books', JSON.stringify(this.books));
      this.addBookToDocument({
        'title': title,
        'author': author,
        'time': time
      });
    };

  }
}

const method = new methods;

window.addEventListener('load', () => {
  
  method.init();

  submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    const author = authorInput.value;
    const title = titleInput.value;
    method.addBookToLocalStorage(title, author);
    authorInput.value = null;
    titleInput.value = null;
  });
 });