export function slideSlider(sliderElements) {
    const buttonPrev = document.querySelector('.main__button-prev');
    const buttonNext = document.querySelector('.main__button-next');
    let indexElement = 0;

    // Показать первый слайд по умолчанию
    sliderElements[indexElement].style.display = 'block';

    buttonNext.addEventListener('click', () => {
        // Скрыть текущий слайд
        sliderElements[indexElement].style.display = 'none';

        // Увеличить индекс
        indexElement = (indexElement + 1) % sliderElements.length;

        // Показать следующий слайд
        sliderElements[indexElement].style.display = 'block';
    });

    buttonPrev.addEventListener('click', () => {
        // Скрыть текущий слайд
        sliderElements[indexElement].style.display = 'none';

        // Уменьшить индекс, если он равен 0, то сделать индекс последним
        indexElement = (indexElement - 1 + sliderElements.length) % sliderElements.length;

        // Показать предыдущий слайд
        sliderElements[indexElement].style.display = 'block';
    });
}