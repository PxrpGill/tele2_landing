const itemsPerPage = 3;
let totalPages = 0;
let isScrolling = false;

export const inputInDOM = (data) => {
    const sliderPlace = document.querySelector('.main__slider-items');
    const sliderMarkers = document.querySelector('.main__slider-markers');

    sliderPlace.innerHTML = '';
    sliderMarkers.innerHTML = '';

    for (let i = 0; i < data.length; i += itemsPerPage) {
        const users = data.slice(i, i + itemsPerPage);
        let htmlElement = '<li class="main__slider-item">';

        users.forEach((user, index) => {
            htmlElement += `
          <a id="item-${i + index}" name="item-${i + index}">
            <img class="main__slider-image" src="${user.avatar_url}" alt="Картинка пользователя" draggable="false">
          </a>
        `;
        });

        htmlElement += '</li>';
        sliderPlace.innerHTML += htmlElement;
    }

    totalPages = Math.ceil(data.length / itemsPerPage);
    generatePaginationMarkers(1); // Generate markers for the first page initially
    addClickEventListeners();
    updateMarkersVisibility(0);
};

export const addScrollEventListener = () => {
    const sliderPlace = document.querySelector('.main__slider-items');
    sliderPlace.addEventListener('scroll', () => {
        if (!isScrolling) {
            isScrolling = true;
            setTimeout(() => {
                const index = getCurrentSlideIndex(sliderPlace);
                updateMarkersVisibility(index);
                isScrolling = false;
            }, 100);
        }
    });

    sliderPlace.addEventListener('wheel', (event) => {
        if (event.shiftKey) {
            event.preventDefault();
            const slideWidth = sliderPlace.clientWidth;
            const scrollAmount = Math.round(event.deltaY / 100) * slideWidth;

            sliderPlace.scrollTo({
                left: sliderPlace.scrollLeft + scrollAmount,
                behavior: 'smooth'
            });

            const index = getCurrentSlideIndex(sliderPlace);
            updateMarkersVisibility(index);
        }
    });
};

const getCurrentSlideIndex = (container) => {
    const slides = Array.from(container.children);
    const containerScrollLeft = container.scrollLeft + container.clientWidth / 2;

    for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        if (containerScrollLeft >= slide.offsetLeft && containerScrollLeft < slide.offsetLeft + slide.clientWidth) {
            return i;
        }
    }
    return 0;
};

const updateMarkersVisibility = (currentIndex) => {
    const sliderMarkers = document.querySelectorAll('.main__slider-marker');
    sliderMarkers.forEach((marker, index) => {
        if (index === currentIndex) {
            marker.classList.add('active');
        } else {
            marker.classList.remove('active');
        }
    });

    generatePaginationMarkers(currentIndex + 1); // Update markers based on the current index

    const prevButton = document.querySelector('.main__slider-control.prev');
    const nextButton = document.querySelector('.main__slider-control.next');

    if (currentIndex === 0) {
        prevButton.style.display = 'none';
    } else {
        prevButton.style.display = 'block';
    }

    if (currentIndex === totalPages - 1) {
        nextButton.style.display = 'none';
    } else {
        nextButton.style.display = 'block';
    }
};

const generatePaginationMarkers = (currentPage) => {
    const sliderMarkers = document.querySelector('.main__slider-markers');
    sliderMarkers.innerHTML = ''; // Clear existing markers

    // Always show the first page marker
    const firstMarker = `
    <li class="main__slider-marker">
      <a href="#" data-page="1">
        1
      </a>
    </li>
  `;

    if (currentPage != 1)
        sliderMarkers.innerHTML += firstMarker;

    if (currentPage > 3) {
        const dotsBeforeCurrent = `
      <li class="main__slider-marker">
        <span>...</span>
      </li>
    `;
        sliderMarkers.innerHTML += dotsBeforeCurrent;
    }

    if (currentPage > 2) {
        const prevMarker = `
      <li class="main__slider-marker">
        <a href="#" data-page="${currentPage - 1}">
          ${currentPage - 1}
        </a>
      </li>
    `;
        sliderMarkers.innerHTML += prevMarker;
    }

    const currentMarker = `
    <li class="main__slider-marker active">
      <a href="#" data-page="${currentPage}">
        ${currentPage}
      </a>
    </li>
  `;
    sliderMarkers.innerHTML += currentMarker;

    if (currentPage < totalPages - 1) {
        const nextMarker = `
      <li class="main__slider-marker">
        <a href="#" data-page="${currentPage + 1}">
          ${currentPage + 1}
        </a>
      </li>
    `;
        sliderMarkers.innerHTML += nextMarker;
    }

    if (currentPage < totalPages - 2) {
        const dotsAfterCurrent = `
      <li class="main__slider-marker">
        <span>...</span>
      </li>
    `;
        sliderMarkers.innerHTML += dotsAfterCurrent;
    }

    const lastMarker = `
    <li class="main__slider-marker">
      <a href="#" data-page="${totalPages}">
        ${totalPages}
      </a>
    </li>
  `;

    if (currentPage != totalPages)
        sliderMarkers.innerHTML += lastMarker;

    addClickEventListeners(); // Reattach event listeners after updating markers
};

const addClickEventListeners = () => {
    const sliderMarkers = document.querySelectorAll('.main__slider-marker a');
    sliderMarkers.forEach((marker, index) => {
        marker.addEventListener('click', (event) => {
            event.preventDefault();
            const page = parseInt(event.target.closest('a').getAttribute('data-page'));
            scrollToPage(page);
        });
    });

    const prevButton = document.querySelector('.main__slider-control.prev');
    const nextButton = document.querySelector('.main__slider-control.next');

    prevButton.addEventListener('click', () => {
        const currentIndex = getCurrentSlideIndex(document.querySelector('.main__slider-items'));
        if (currentIndex > 0) {
            scrollToPage(currentIndex);
        }
    });

    nextButton.addEventListener('click', () => {
        const currentIndex = getCurrentSlideIndex(document.querySelector('.main__slider-items'));
        if (currentIndex < totalPages - 1) {
            scrollToPage(currentIndex + 2);
        }
    });
};

const scrollToPage = (page) => {
    const sliderPlace = document.querySelector('.main__slider-items');
    const slideWidth = sliderPlace.clientWidth;
    const scrollPosition = (page - 1) * slideWidth;
    sliderPlace.scrollTo({ left: scrollPosition, behavior: 'smooth' });
};