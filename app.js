"use strict";

const slider_field = document.querySelector(".slider_field");
const slider_container = document.querySelector(".slider_container");
const slides = document.querySelectorAll(".slide");
const modal = document.querySelector(".modal");
const modalImage = document.querySelector(".modal-content");
const closeBtn = document.querySelector(".close");
let activeOrder = 0;

init();

function init() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].dataset.order = i;
    /* Высота контейнера минус высота слайда и деленная на 2
    координата центра всех слайдов по вертикали */
    /* slides[i].style.transform = "translateY(60px)"; */
    slides[i].addEventListener("click", clickHandler);
  }

  activeOrder = Math.floor(slides.length / 2);

  update();
  bigPhoto();
}

function update() {
  const widthCard = slides[activeOrder].getBoundingClientRect().width / 2;
  /* Получим ширину контейнера для слайдов */

  const { width } = slider_container.getBoundingClientRect();
  /* Координата центра центрального слайда по горизонтале относительно контейнера слайдера */
  const centr = width / 2 - widthCard;
  /* Расстояние между центрами слайдов */
  const delta = widthCard;
  console.log(widthCard);

  for (let i = 0; i < slides.length; i++) {
    const leftslide = document.querySelector(
      `.slide[data-order="${activeOrder - i}"]`
    );

    if (leftslide) {
      leftslide.style.left = `${centr - delta * i}px`;
      leftslide.style.zIndex = slides.length - i;
      leftslide.style.opacity = 1 - (i * 0.8) / slides.length;
      leftslide.style.transform = `translate3D(0px, 60px, ${-i * 100}px)`;
    }

    const rightslide = document.querySelector(
      `.slide[data-order="${activeOrder + i}"]`
    );

    if (rightslide) {
      rightslide.style.left = `${centr + delta * i}px`;
      rightslide.style.zIndex = slides.length - i;
      rightslide.style.opacity = 1 - (i * 0.8) / slides.length;
      /* Добавляет эффект перспективы(чем дальше картинка дальше от
        центральной, тем дальше она от пользователя в глубину экрана) */
      rightslide.style.transform = `translate3D(0px, 60px, ${-i * 100}px)`;
    }
  }
}

console.log(window.innerWidth);
function clickHandler() {
  /* ключевое слово this содержит ссылку на элемент, на котором
  сработало событие click*/
  const order = +this.dataset.order;
  activeOrder = order;
  update();
}

function bigPhoto() {
  slides.forEach((el) => {
    el.addEventListener("click", (event) => {
      modalImage.src = event.target.dataset.src;
      modal.style.display = "block";
    });
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  });
}
