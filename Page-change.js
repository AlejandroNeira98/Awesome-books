const navBtns = document.querySelectorAll('nav > a');
const booksSection = document.querySelector('.all-books');
const formSection = document.querySelector('#form');
const contactSection = document.querySelector('#contact');

navBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const i = document.querySelector('.active');
    if (i != null) {
      i.classList -= 'active';
    }
    btn.className += 'active';
    if (btn.getAttribute('href') === '#books') {
      booksSection.classList.remove('hidden');
      formSection.classList.add('hidden');
      contactSection.classList.add('hidden');
    } else if (btn.getAttribute('href') === '#form') {
      formSection.classList.remove('hidden');
      booksSection.classList.add('hidden');
      contactSection.classList.add('hidden');
    } else {
      contactSection.classList.remove('hidden');
      formSection.classList.add('hidden');
      booksSection.classList.add('hidden');
    }
  });
});

const dt = new Date();
document.querySelector('time').innerHTML = dt;
