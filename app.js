"use strict";

const slider_field = document.querySelector(".slider_field");
const slider_container = document.querySelector(".slider_container");
const slides = document.querySelectorAll(".slide");
let activeOrder = 0;

init();

function init() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].dataset.order = i;
    /* Высота контейнера минус высота слайда и деленная на 2
    координата центра всех слайдов по вертикали */
    slides[i].style.transform = "translateY(60px)";
    slides[i].addEventListener("click", clickHandler);
  }

  activeOrder = Math.floor(slides.length / 2);

  update();
}

function update() {
  /* Получим ширину контейнера для слайдов */

  const { width } = slider_container.getBoundingClientRect();
  /* Координата центра центрального слайда по горизонтале относительно контейнера слайдера */
  const centr = width / 2 - 120;
  /* Расстояние между центрами слайдов */
  const delta = 125;
  console.log(activeOrder);

  for (let i = 0; i < slides.length; i++) {
    const leftslide = document.querySelector(
      `.slide[data-order="${activeOrder - i}"]`
    );

    if (leftslide) {
      leftslide.style.left = `${centr - delta * i}px`;
      leftslide.style.zIndex = slides.length - i;
      leftslide.style.opacity = 1 - (i * 0.8) / slides.length;
    }

    const rightslide = document.querySelector(
      `.slide[data-order="${activeOrder + i}"]`
      /* ff */
    );

    if (rightslide) {
      rightslide.style.left = `${centr + delta * i}px`;
      rightslide.style.zIndex = slides.length - i;
      rightslide.style.opacity = 1 - (i * 0.8) / slides.length;
    }
  }
}

function clickHandler() {
  /* ключевое слово this содержит ссылку на элемент, на котором
  сработало событие click*/
  const order = +this.dataset.order;
  activeOrder = order;
  update();
}
