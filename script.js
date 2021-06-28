'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const cookieMessage = document.createElement('div');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1')
const section2 = document.querySelector('#section--2')
const section3 = document.querySelector('#section--3')


cookieMessage.classList.add('cookie-message');
cookieMessage.innerHTML = `we use cookies for better analytics <button class="btn btn--close--cookie">OK</button>`;

header.before(cookieMessage);
// header.insertAdjacentHTML('beforebegin', 'we use cookies for better analytics <button class="btn btn--close--cookie">OK</button>')
document.querySelector('.btn--close--cookie').addEventListener('click', () => {
  cookieMessage.remove();
})




const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
//eventlisteners:

btnScrollTo.addEventListener('click', (e) => {
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  const clientWidth = document.documentElement.clientWidth;
  const clientHeight = document.documentElement.clientHeight;
  const section1coords = e.target.getBoundingClientRect();
  section1.getBoundingClientRect();

  // `pageXOffset: ${window.pageXOffset}` // window.scrollX  is the same as window.pageXoffset and same with Y
  // `pageYOffset: ${window.pageYOffset}`
  console.log(section1coords)
  console.log(e.target.getBoundingClientRect())

  // window.scrollTo(section1coords.left + scrollX, section1coords.top+ scrollY) or if you want to do it smoothly, u have to pass 
  //an object with 'left', 'top', and 'behavior' properties/attributes
  // window.scrollTo({
  //   left: section1coords.left + scrollX, 
  //   top: section1coords.top+ scrollY,
  //   behavior: 'smooth',
  // })
  //or even more modern approach using method:
  section1.scrollIntoView({behavior:'smooth'})
})



// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
btnsOpenModal.forEach(mod => {
  mod.addEventListener('click', openModal)
})

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//editing styles:
document.documentElement.style.setProperty('--color-primary', 'orangered');

//example below gets fontsize (e.g. '20px') from getComputedStyle, so we have to take only the number part (parseFloat)
// and then edit the number value so we can later add 'px';
cookieMessage.style.fontSize = parseFloat(getComputedStyle(cookieMessage).fontSize) + 20 + 'px';

//editing attributes:

const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);