// search

let searchIcon = document.querySelector('.header__search-icon');
let search = document.querySelector('.header__search');

searchIcon.addEventListener('click', () => {
    searchIcon.classList.add('header__search-icon--active')
    search.classList.add('header__search--active');
})

document.querySelector('.search__btn-exit').addEventListener('click', () => {
    searchIcon.classList.remove('header__search-icon--active')
    search.classList.remove('header__search--active');
})

// burger

let burger = document.querySelector('.header__burger'),
    menu = document.querySelector('.header__nav'),
    menuLink = document.querySelectorAll('.header__nav .nav__link');

burger.addEventListener('click', () => {
    burger.classList.toggle('burger--active');
    menu.classList.toggle('header__nav--active');
    document.body.classList.toggle('stop-scroll');
})

menuLink.forEach(e => {
    e.addEventListener('click', () => {
        burger.classList.remove('burger--active');
        menu.classList.remove('header__nav--active');
        document.body.classList.remove('stop-scroll');
    })
})

//swiper

new Swiper('.swiper', {
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    },
});

// stages

let tabsButtoms = document.querySelectorAll('.stages__btn')
let tabsItems = document.querySelectorAll('.stages-tabs__item')

tabsButtoms.forEach(elem => {
    elem.addEventListener('click', (e) => {
        tabsButtoms.forEach(link => {
            link.classList.remove('stages__btn--active')
        })
        e.currentTarget.classList.add('stages__btn--active')

        tabsItems.forEach(item => {
            item.classList.remove('stages-tabs__item--active')
        })
        document.querySelector(`.stages-tabs__item[data-tab="${e.currentTarget.dataset.tab}"]`).classList.add('stages-tabs__item--active')
    })
})

// accordion

new Accordion('.accordion', {
    elementClass: 'accordion__item',
    triggerClass: 'accordion__trigger',
    panelClass: 'accordion__content',
    activeClass: 'accordion--active',
    duration: '300'
});

// lazyload

lazyload();