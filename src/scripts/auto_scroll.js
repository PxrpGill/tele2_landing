import { getDataWithExpirationCheck } from "./localStorageOperations";

document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopButton = document.querySelector('.main__to-scroll-up-button');

    function updateButtonVisibility() {
        if (document.body.classList.contains('modal-open')) {
            scrollToTopButton.style.display = 'none';
        } else if (window.scrollY > 500) {
            scrollToTopButton.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    }

    updateButtonVisibility();

    window.addEventListener('scroll', updateButtonVisibility);

    const observer = new MutationObserver(() => {
        updateButtonVisibility();
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    function scrollButton() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    scrollToTopButton.addEventListener('click', scrollButton);

    window.addEventListener('beforeunload', () => {
        if (!getDataWithExpirationCheck('region')) {
            window.scrollTo({
                top: 0,
                left: 0,
            });
        }
    });
});
