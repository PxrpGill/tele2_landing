document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.main__slider');
    const scrollSpeed = 500; // Увеличьте это значение для большей скорости

    slider.addEventListener('wheel', (event) => {
        event.preventDefault(); // предотвращает стандартное поведение прокрутки страницы
        if (event.deltaY < 0) {
            // Прокрутка вверх - листаем влево
            slider.scrollBy({ left: -scrollSpeed, behavior: 'smooth' });
        } else {
            // Прокрутка вниз - листаем вправо
            slider.scrollBy({ left: scrollSpeed, behavior: 'smooth' });
        }
    });
});