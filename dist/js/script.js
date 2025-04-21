// Функция переключения активного класса в заголовке
function toggleHeaderActive() {
    const header = document.querySelector('.header');
    if (header) {
        header.classList.toggle('active');
    }
}

// Функция перемещения элементов геймпада в зависимости от положения мыши
function moveGamepadItems(e) {
    const gamepadLeft = document.querySelector('.gamepad-left');
    const gamepadRight = document.querySelector('.gamepad-right');

    if (gamepadLeft && gamepadRight && !isTouchDevice()) {
        let x = e.clientX / window.innerWidth;
        let y = e.clientY / window.innerHeight;  

        gamepadLeft.style.transform = `translate(-${x * 100}px, -${y * 60}px)`;
        gamepadRight.style.transform = `translate(-${x * 60}px, -${y * 40}px)`;
    }
}

// Функция для параллакса при прокрутке
function scrollParalax() {
    const itemEl = document.querySelectorAll('.item_el');
    const itemDrop = document.querySelectorAll('.item_drop');

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let normalizedScroll = scrollTop / (document.documentElement.scrollHeight - window.innerHeight);

    itemEl.forEach(item => {
        item.style.transform = `translateY(-${normalizedScroll * 2000}px)`;
    });
    
    itemDrop.forEach(item => {
        item.style.transform = `translateY(-${normalizedScroll * 1200}px)`;
    });
}

// Функция для трансформации при прокрутке
function scrollTransform() {
    const img = document.querySelector('.about__img');
    const about = document.querySelector('.about');
    const headphones = document.querySelector('.instruction__img');
    const instruction = document.querySelector('.instruction');
    const contactElemsUp = document.querySelectorAll('.contact__img_Up');
    const contactElemsDown = document.querySelectorAll('.contact__img_Down');
    const contact = document.querySelector('.contact');

    if (img && about) {
        let viewportHeight = window.innerHeight;
        let scrollPosition = window.scrollY;
        let aboutPosition = about.offsetTop;
        let distanceFromTop = aboutPosition - scrollPosition;
        let normalizedScroll = 1 - Math.max(0, Math.min(1, distanceFromTop / viewportHeight));

        let scaleValue = 1 + normalizedScroll * 0.8;
        let rotateValue = -45 + normalizedScroll * 45;

        img.style.transform = `scale(${scaleValue}) rotate(${rotateValue}deg)`;
    }

    if (headphones && instruction) {
        let viewportHeight = window.innerHeight;
        let scrollPosition = window.scrollY;
        let instructionPosition = instruction.offsetTop;
        let distanceFromTop = instructionPosition - scrollPosition;
        let normalizedScroll = 1 - Math.max(0, Math.min(1, distanceFromTop / viewportHeight));

        let transformValue = 10 + normalizedScroll * 300;

        headphones.style.transform = `translateY(-${transformValue}px) rotate(-15deg)`;
    }

    if (contactElemsUp && contactElemsDown && contact) {
        const viewportHeight = window.innerHeight;
        const scrollPosition = window.scrollY;
        const contactPosition = contact.offsetTop;
        const distanceFromTop = contactPosition - scrollPosition;
        const normalizedScroll = 1 - Math.max(0, Math.min(1, distanceFromTop / viewportHeight));
        let transformValue;
    
        contactElemsUp.forEach((item, i) => {
            transformValue = i === 0 ? 35 : 25;
            transformValue += normalizedScroll * 200;
            item.style.transform = `translateY(-${transformValue}px) scale(${i === 0 ? 1 : 1.3})`;
        });
    
        contactElemsDown.forEach((item, i) => {
            transformValue = i === 0 ? 50 : 25;
            transformValue += normalizedScroll * 200;
            item.style.transform = `translateY(${transformValue}px) scale(${i === 0 ? 1.15 : 1.2})`;
        });
    }
}

// Функция для проверки, является ли устройство сенсорным
const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
};

// Функция для добавления/удаления класса .hover при касании
const handleTouchHover = (selector) => {
    const cardsItems = document.querySelectorAll(selector);
   
    if (isTouchDevice()) {
        cardsItems.forEach((item) => {
            item.addEventListener('click', () => {
                item.classList.toggle('hover');
                console.log(item);
            });
        });
    }
};

handleTouchHover('.subscribe__item');

// Функция обновления длины линии в инструкции
function updateLine() {
    const LINE_HEIGHT_MAX = 85;
    const BOTTOM_THRESHOLD = 1500;
    const TOP_THRESHOLD = 300;
    const OFFSET_POINT = 450;

    const line = document.querySelector(".instruction__line");
    const section = document.querySelector(".instruction__body");

    if (line && section) {
        const sectionBottom = section.getBoundingClientRect().bottom;
        const lineHeight = 100 - (0.1 * (sectionBottom - OFFSET_POINT));

        if (sectionBottom < BOTTOM_THRESHOLD && sectionBottom > TOP_THRESHOLD && lineHeight <= LINE_HEIGHT_MAX) {
            line.style.height = lineHeight + '%';
        }
    }
}

// Функция для прокрутки лево-право
function scrollLeftRight() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const normalizedScroll = scrollTop / (document.documentElement.scrollHeight - window.innerHeight);
    const rowTop = document.querySelector('.games__row-top');
    const rowBottom = document.querySelector('.games__row-bottom');

    if (rowTop && rowBottom) {
        rowTop.style.transform = `translateX(-${normalizedScroll * 1200 - 400}px)`;
        rowBottom.style.transform = `translateX(${normalizedScroll * 1200 - 1200}px)`;
    }
}

// Функция показа слайда
function showSlide() {
    const slider = document.querySelector(".slider");
    slider.currentSlideIndex = 0;
    slider.startX = 0;
    slider.endX = 0;

    slider.showSlide = function() {
        const slides = document.querySelectorAll(".slider__item");
        this.style.transform = `translateX(-${this.currentSlideIndex * this.clientWidth}px)`;
    }

    slider.changeSlide = function(slideIndex) {
        this.currentSlideIndex = slideIndex;
        this.showSlide();
    }

    slider.nextSlide = function() {
        let newSlideIndex = this.currentSlideIndex + 1;
        const slides = document.querySelectorAll(".slider__item");
        if(newSlideIndex > slides.length - 1) {
            newSlideIndex = 0;
        }
        this.changeSlide(newSlideIndex);
    }

    slider.previousSlide = function() {
        let newSlideIndex = this.currentSlideIndex - 1;
        const slides = document.querySelectorAll(".slider__item");
        if(newSlideIndex < 0) {
            newSlideIndex = slides.length - 1;
        }
        this.changeSlide(newSlideIndex);
    }

    slider.showSlide(); 
}

function animateOnScroll() {
    const elements = document.querySelectorAll('.anim-left, .anim-right, .anim-down, .anim-show');
    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect();
      const screenHeight = window.innerHeight;

      if (elementPosition.top < screenHeight) {
        element.classList.add('anim-active');
      }
    });

    if (document.querySelectorAll('.anim-left.anim-active, .anim-right.anim-active, .anim-down.anim-active, .anim-show.anim-active').length === elements.length) {
      window.removeEventListener('scroll', animateOnScroll);
    }
  }

document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('.anchor[href^="#"]');

    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: "smooth"
                });
                if (target.id !== 'main-visual') {
                    if(isTouchDevice()) {
                        console.log('Check');
                        document.querySelector('#checkbox').checked = false;
                    }
                    toggleHeaderActive();
                }
            }
        });
    });
});

// Добавление обработчиков событий
document.querySelector('#checkbox').addEventListener('click', toggleHeaderActive);
window.addEventListener('mousemove', moveGamepadItems);
window.addEventListener('scroll', function() {
    requestAnimationFrame(updateLine);
    requestAnimationFrame(scrollParalax);
    requestAnimationFrame(scrollTransform);
    requestAnimationFrame(scrollLeftRight);
});
window.addEventListener('resize', function() {
    showSlide();
});
document.querySelector(".btn-prev").addEventListener("click", function() {
    const slider = document.querySelector(".slider");
    slider.previousSlide();
});
document.querySelector(".btn-next").addEventListener("click", function() {
    const slider = document.querySelector(".slider");
    slider.nextSlide();
});
showSlide(); 

window.addEventListener('load', () => {
    const elementsOnLoad = document.querySelectorAll('.anim-load');
    elementsOnLoad.forEach((element) => {
        element.classList.add('anim-active');
    });

    const preloader = document.getElementById('page-preloader');
    if (preloader) {
        
    setTimeout(() => {
        preloader.classList.add('done');
    }, 2000);

    setTimeout(() => {
        const elementsAfterPreload = document.querySelectorAll('.anim-after-preload');
        elementsAfterPreload.forEach((element) => {
            element.classList.add('anim-active');
        });
    },2000);

        window.addEventListener('scroll', animateOnScroll);
    }
});