document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopButton = document.querySelector('.main__to-scroll-up-button');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { 
            scrollToTopButton.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });

    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    });

    window.onload = function () {
        window.scrollTo(0, 0);
    }
});
