'use strict';

///////////////////////////////////////
// Modal window
const footer = document.querySelector('.footer');
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
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const operationsContents = document.querySelectorAll('.operations__content');


const logo = document.querySelector('.nav__logo')
cookieMessage.classList.add('cookie-message');
cookieMessage.innerHTML = `we use cookies for better analytics <button class="btn btn--close--cookie">OK</button>`;


function changeOpacity(e) {
  if (!e.target.classList.contains('nav__link')) return;
  // console.log('contains')
  const closeNav = e.target.closest('.nav')
  const siblings = closeNav.querySelectorAll('.nav__link');
  const logo = closeNav.querySelector('.nav__logo');
  const elements = [...siblings, logo]
  elements.forEach((s) => {
    // if(s!=e.target) 
    if (e.target !== s) s.style.opacity = this;
  });
  // logo.style.opacity=0.5;
  // e.target.style.opacity=opacity
};



// document.querySelector('.nav').addEventListener('mouseover', e=>{
//   if (!e.target.classList.contains('nav__link')) return;

//   const closeNav = e.target.closest('.nav')
//   const siblings =closeNav.querySelectorAll('.nav__link');
//   const logo = closeNav.querySelector('.nav__logo');
//   const elements =[...siblings, logo]
//   elements.forEach((s)=>{
//     // if(s!=e.target) 
//     s.style.opacity=0.5;
//   });
//   // logo.style.opacity=0.5;
//   e.target.style.opacity=1
// });

// document.querySelector('.nav').addEventListener('mouseout', (e)=>{
//   const interestElements=[...e.target.closest('.nav').querySelectorAll('.nav__link'), e.target.closest('.nav').querySelector('.nav__logo')];
//   interestElements.forEach(el=> {el.style.opacity=1})
// })


footer.after(cookieMessage);
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
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1));
}
const generateRGB = () => {
  return `rgba(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)}, ${randomInt(0, 100) / 100})`
}


//slider:
function slider () {
  
const leftButton = document.querySelector('.slider__btn--left')
const rightButton = document.querySelector('.slider__btn--right')
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots')

const createDots = () => {
  slides.forEach((_, i) => {
    dotsContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
  })
  dotsContainer.addEventListener('click', (e)=>{
    if (!e.target.classList.contains('dots__dot')) return;
    const slideIndex = e.target.dataset.slide;
    goToSlide(slideIndex)

  })
}
let currentSlide = 0;
function goToSlide(number) {
  currentSlide = number;
  slides.forEach((elem, index) => (
    elem.style.transform = `translateX(${(index-currentSlide) * 100}%)`
  ))
  console.log(dotsContainer)
  console.log(document.querySelectorAll('.dots__dot'))
  document.querySelectorAll('.dots__dot').forEach(dot=>{dot.classList.remove('dots__dot--active')});
  document.querySelector(`.dots__dot[data-slide="${number}"]`).classList.add('dots__dot--active')
}
const nextSlide = () => {
  currentSlide++;
  currentSlide %= slides.length;
  goToSlide(currentSlide)
}
const prevSlide = () => {
  currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
  goToSlide(currentSlide)
   
}
createDots();
goToSlide(0);
leftButton.addEventListener('click', prevSlide)
rightButton.addEventListener('click', nextSlide)

}
slider();

// intersection observer API // scrolling effects:

const lazyImages = document.querySelectorAll('img[data-src]')
const lazyOptions = {
  root: null,
  threshold: 0,
  rootMargin: '-100px', // before we even reach the img, let's load it, so the user can't notice we're lazy loading
}
const lazyCallback = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  console.log(entry)
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () => { entry.target.classList.remove('lazy-img') })
  lazyObserver.unobserve(entry.target);
}
const lazyObserver = new IntersectionObserver(lazyCallback, lazyOptions)
lazyImages.forEach(li => lazyObserver.observe(li));

//sticky navbar
// window.addEventListener('scroll', (e)=>{
//   const navbar = document.querySelector('.nav')
//   // window.scrollY>100 && navbar.classList.add('sticky')
//   // window.scrollY<100 && navbar.classList.remove('sticky')
//   // e.scrollY>100 && navbar.classList.add('sticky')
//   // e.scrollY<100 && navbar.classList.remove('sticky')
//   const section1coords = section1.getBoundingClientRect();
//   // console.log(section1coords)
//   if (window.scrollY>section1coords.top) {
//     navbar.classList.add('sticky');
//     // cookieMessage.classList.add('sticky');
//   }
//   else navbar.classList.remove('sticky')
// }) 
/// or we can use intersection observer API:
const navCallback = (entries, observer) => {
  const [entry] = entries;
  const nav = document.querySelector('.nav');
  if (!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}
const navOptions = {
  root: null, //=> root=viewport
  threshold: 0,
  rootMargin: `-${document.querySelector('.nav').getBoundingClientRect().height}px` // endofheader-navbarheight
}

const navObserver = new IntersectionObserver(navCallback, navOptions);
navObserver.observe(header);

//reveal sections

document.querySelectorAll('.section').forEach(el => {
  el.classList.add('section--hidden')
})

const opaOptions = { // options needed to change the opacity
  root: null,
  threshold: 0.5
}
const opaCallBack = (entries, observer) => { // callback for changing the opacity in given sections
  const [entry] = entries
  // console.log(entry)
  // if (!entry.isIntersecting) return
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
  //  if (entry.isIntersecting) return;
  // entry.target.classList.remove('section--hidden')
  // entry.classList.remove('section--hidden')

}
const opacityObserver = new IntersectionObserver(opaCallBack, opaOptions);

document.querySelectorAll('.section').forEach(el => {
  el.classList.add('section--hidden');
  opacityObserver.observe(el)
})





document.querySelector('.nav').addEventListener('mouseover', changeOpacity.bind(0.5))
document.querySelector('.nav').addEventListener('mouseout', changeOpacity.bind(1));
tabsContainer.addEventListener('click', function (e) {
  const triggerer = e.target.classList.contains('btn') ? e.target : e.target.closest('.operations__tab')
  if (!triggerer) return;
  const index = triggerer.getAttribute('data-tab')
  console.log(index)
  tabs.forEach((tab) => { tab.classList.remove('operations__tab--active') })
  operationsContents.forEach(oc => { oc.classList.remove('operations__content--active') })
  document.querySelector(`.operations__tab--${index}`).classList.add('operations__tab--active')
  document.querySelector(`.operations__content--${index}`).classList.add('operations__content--active')

});

// document.querySelectorAll('.nav__link').forEach(el=>{
//   el.addEventListener('click', function(e){ // with arrow fn one cannot use 'this', so let's use this kind of fn
//     e.preventDefault();
//     // const id = this.href;// it returns whole link (with http://local.....etc + #section--1)
//     const id = this.getAttribute('href'); //-> it returns sth like '#section--1'. PERFECT SELECTOR. LET'S USE IT!
//     document.querySelector(id).scrollIntoView({behavior :'smooth'})
//   })
// })// here we create a lot of same functions, not the best solution. let's create one in parent element that knows
//who(which chilid of him) is the event trigger (e.target) and use function that uses particular elem in event handling:

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  const triggerer = e.target;
  // console.log(triggerer);
  if (!triggerer.classList.contains('nav__link')) return; // if it's not the kind of child we are looking for, don't continue the fn
  const dest = triggerer.getAttribute('href');
  // console.log(dest);
  document.querySelector(dest).scrollIntoView({ behavior: 'smooth' })
})



//too much pain in the ass to work with socommented ;)
// document.querySelector('.header').addEventListener('click', function(){
//   // console.log('.header')
//   setInterval(()=>{ this.style.backgroundColor=`rgba(${randomInt(0,255)}, 124, 244, ${randomInt(0,100)/100})`}, 4000)
// }, true)
// document.querySelector('.nav').addEventListener('click', function(){
//   setInterval(()=>{this.style.backgroundColor=`rgba(${randomInt(100, 120)}, ${randomInt(200, 120)}, ${randomInt(300, 120)}, ${randomInt(0,100)/100})`}, 2000)
//   // console.log('.nav')
// }, true)
// document.querySelector('.nav__logo').addEventListener('click', function(e){
//   setInterval(()=>{this.style.backgroundColor=generateRGB()}, 3500);
//   e.stopPropagation();
//   // console.log('.nav__logo')

//   e.stopPropagation(); // stops the propagation (handling event in bubbling phase where e.target!==e.currentTarget)
// })


btnScrollTo.addEventListener('click', (e) => {
  // const scrollX = window.scrollX;
  // const scrollY = window.scrollY;
  // const clientWidth = document.documentElement.clientWidth;
  // const clientHeight = document.documentElement.clientHeight;
  // const section1coords = e.target.getBoundingClientRect();
  // console.log(section1coords)
  // console.log(e.target.getBoundingClientRect())

  // window.scrollTo(section1coords.left + scrollX, section1coords.top+ scrollY) or if you want to do it smoothly, u have to pass 
  //an object with 'left', 'top', and 'behavior' properties/attributes
  // window.scrollTo({
  //   left: section1coords.left + scrollX, 
  //   top: section1coords.top+ scrollY,
  //   behavior: 'smooth',
  // })
  //or even more modern approach using method:
  section1.scrollIntoView({ behavior: 'smooth' })
})

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

//const logo = document.querySelector('.nav__logo');