document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopButton = document.querySelector('.main__to-scroll-up-button');

    if (window.scrollY > 500) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopButton.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });

    window.addEventListener('beforeunload', function (event) {
        if (!localStorage.getItem('region')) {
            this.window.scrollTo({
                top: 0,
                left: 0,
            });
        }
    });

    function scrollButton() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    scrollToTopButton.addEventListener('click', scrollButton);

    console.log('Текущая прокрутка сверху: ' + window.pageYOffset);
    console.log('Текущая прокрутка слева: ' + window.pageXOffset);
});
