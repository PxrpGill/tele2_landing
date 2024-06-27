import { throttle } from "./throttle";

export default class Slider {
    constructor() {
        this.itemsInPage = 3;
        this.totalPages = 0;
        this.isScrolling = false;
        this.sliderPlace = document.querySelector('.main__slider-items');
        this.sliderMarkersPlace = document.querySelector('.main__slider-markers');
        this.prevButton = document.querySelector('.main__slider-control.prev');
        this.nextButton = document.querySelector('.main__slider-control.next');
        this.dots = `
            <li class="main__slider-marker">
                <span>...</span>
            </li>`;
        this.firstMarker = `
            <li class="main__slider-marker">
                <a href="#" data-page="1">
                    1
                </a>
            </li>`;
        this.addScrollEventListener();
        this.addClickEventListeners();
    }

    generateLastMarker() {
        return `
            <li class="main__slider-marker">
                <a href="#" data-page="${this.totalPages}">
                    ${this.totalPages}
                </a>
            </li>`;
    }

    generateNextMarker(currentPage) {
        return `
            <li class="main__slider-marker">
                <a href="#" data-page="${currentPage + 1}">
                    ${currentPage + 1}
                </a>
            </li>`;
    }

    generateCurrentMarker(currentPage) {
        return `
            <li class="main__slider-marker active">
                <a href="#" data-page="${currentPage}">
                    ${currentPage}
                </a>
            </li>`;
    }

    generatePrevMarker(currentPage) {
        return `
            <li class="main__slider-marker">
                <a href="#" data-page="${currentPage - 1}">
                    ${currentPage - 1}
                </a>
            </li>`;
    }

    generateSliderElement(i, index, user) {
        return `
            <a id="item-${i + index}">
                <img class="main__slider-image" src="${user.avatar_url}" alt="Картинка пользователя" draggable="false">
            </a>`;
    }

    inputInDOM(data) {
        this.sliderPlace.innerHTML = '';
        this.sliderMarkersPlace.innerHTML = '';

        for (let i = 0; i < data.length; i += this.itemsInPage) {
            const users = data.slice(i, i + this.itemsInPage);
            let sliderElement = '<li class="main__slider-item">';

            users.forEach((user, index) => {
                sliderElement += this.generateSliderElement(i, index, user);
            });

            sliderElement += '</li>';
            this.sliderPlace.innerHTML += sliderElement;
        }

        this.totalPages = Math.ceil(data.length / this.itemsInPage);
        this.generatePaginationMarkers(1);
        this.addClickEventListeners();
        this.updateMarkersVisibility(0);
    }

    addScrollEventListener() {
        this.sliderPlace.addEventListener('scroll', () => {
            if (!this.isScrolling) {
                this.isScrolling = true;
                setTimeout(() => {
                    const index = this.getCurrentSlideIndex(this.sliderPlace);
                    this.updateMarkersVisibility(index);
                    this.isScrolling = false;
                }, 750);
            }
        });

        this.sliderPlace.addEventListener('wheel', (event) => {
            if (event.shiftKey) {
                event.preventDefault();
                const slideWidth = this.sliderPlace.clientWidth;
                const scrollAmount = Math.round(event.deltaY / 100) * slideWidth;

                this.sliderPlace.scrollTo({
                    left: this.sliderPlace.scrollLeft + scrollAmount,
                    behavior: 'smooth'
                });

                const index = this.getCurrentSlideIndex(this.sliderPlace);
                this.updateMarkersVisibility(index);
            }
        });
    }

    getCurrentSlideIndex(container) {
        const slides = Array.from(container.children);
        const containerScrollLeft = container.scrollLeft + container.clientWidth / 2;

        for (let i = 0; i < slides.length; i++) {
            const slide = slides[i];
            if (containerScrollLeft >= slide.offsetLeft && containerScrollLeft < slide.offsetLeft + slide.clientWidth) {
                return i;
            }
        }
        return 0;
    }

    updateMarkersVisibility(currentIndex) {
        const sliderMarkers = document.querySelectorAll('.main__slider-marker');
        sliderMarkers.forEach((marker, index) => {
            if (index === currentIndex) {
                marker.classList.add('active');
            } else {
                marker.classList.remove('active');
            }
        });

        if (currentIndex === 0) {
            this.prevButton.style.display = 'none';
        } else {
            this.prevButton.style.display = 'block';
        }

        if (currentIndex === this.totalPages - 1) {
            this.nextButton.style.display = 'none';
        } else {
            this.nextButton.style.display = 'block';
        }

        this.generatePaginationMarkers(currentIndex + 1);
    }

    generatePaginationMarkers(currentPage) {
        this.sliderMarkersPlace.innerHTML = '';

        if (currentPage != 1)
            this.sliderMarkersPlace.innerHTML += this.firstMarker;

        if (currentPage > 3) {
            this.sliderMarkersPlace.innerHTML += this.dots;
        }

        if (currentPage > 2) {
            this.sliderMarkersPlace.innerHTML += this.generatePrevMarker(currentPage);
        }

        this.sliderMarkersPlace.innerHTML += this.generateCurrentMarker(currentPage);

        if (currentPage < this.totalPages - 1) {
            this.sliderMarkersPlace.innerHTML += this.generateNextMarker(currentPage);
        }

        if (currentPage < this.totalPages - 2) {
            this.sliderMarkersPlace.innerHTML += this.dots;
        }

        if (currentPage != this.totalPages)
            this.sliderMarkersPlace.innerHTML += this.generateLastMarker();

        this.addClickEventListeners();
    }

    addClickEventListeners() {
        const sliderMarkersAelements = document.querySelectorAll('.main__slider-marker a');
        sliderMarkersAelements.forEach((marker) => {
            marker.addEventListener('click', (event) => {
                event.preventDefault();
                const page = parseInt(event.target.closest('a').getAttribute('data-page'));
                this.scrollToPage(page);
            });
        });

        this.prevButton.removeEventListener('click', this.throttledPrevClick);
        this.nextButton.removeEventListener('click', this.throttledNextClick);

        this.throttledPrevClick = throttle(() => {
            const currentIndex = this.getCurrentSlideIndex(this.sliderPlace);
            if (currentIndex > 0) {
                this.scrollToPage(currentIndex);
            }
        }, 10000);

        this.throttledNextClick = throttle(() => {
            const currentIndex = this.getCurrentSlideIndex(this.sliderPlace);
            if (currentIndex < this.totalPages - 1) {
                this.scrollToPage(currentIndex + 2);
            }
        }, 10000);

        // Добавляем троттленные версии функций как слушатели событий
        this.prevButton.addEventListener('click', this.throttledPrevClick);
        this.nextButton.addEventListener('click', this.throttledNextClick);
    }

    scrollToPage(page) {
        const slideWidth = this.sliderPlace.clientWidth;
        const scrollPosition = (page - 1) * slideWidth;
        this.sliderPlace.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
}
