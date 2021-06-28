'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header =document.querySelector('.header');
const cookieMessage =document.createElement('div');

cookieMessage.classList.add('cookie-message');
cookieMessage.innerHTML=`we use cookies for better analytics <button class="btn btn--close--cookie">OK</button>`;

header.before(cookieMessage);
// header.insertAdjacentHTML('beforebegin', 'we use cookies for better analytics <button class="btn btn--close--cookie">OK</button>')
document.querySelector('.btn--close--cookie').addEventListener('click', ()=>{
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

