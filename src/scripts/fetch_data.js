const url = 'https://api.github.com/users';

const inputInDOM = (data) => {
  const sliderPlace = document.querySelector('.main__slider-items');
  const sliderMarkers = document.querySelector('.main__slider-markers');
  sliderPlace.innerHTML = ''; // Очистка содержимого перед добавлением новых элементов
  sliderMarkers.innerHTML = ''; // Очистка содержимого перед добавлением новых маркеров

  data.forEach((user, index) => {
    const htmlElement = `
      <li class="main__slider-item">
        <a name="item-${index}">
          <img class="main__slider-image" src="${user.avatar_url}" alt="Картинка пользователя" draggable="false">
        </a>
      </li>
    `;
    const sliderMarker = `
      <li class="main__slider-marker">
        <a href="#item-${index}">
          <span class="main__marker">Photo ${index + 1}</span>

        </a>
      </li>
    `;
    sliderPlace.innerHTML += htmlElement;
    sliderMarkers.innerHTML += sliderMarker;
  });
  
  updateMarkersVisibility(0); // Инициализация видимости маркеров
};

const fetchData = async () => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const json = await response.json();
      inputInDOM(json);
      addScrollEventListener(); // Добавляем обработчик событий прокрутки после загрузки данных
    } else {
      console.error("Ошибка HTTP: " + response.status);
    }
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
};

const addScrollEventListener = () => {
  const sliderPlace = document.querySelector('.main__slider-items');
  sliderPlace.addEventListener('scroll', () => {
    const index = getCurrentSlideIndex(sliderPlace);
    updateMarkersVisibility(index);
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
    if (index >= currentIndex - 1 && index <= currentIndex + 1) {
      marker.style.display = 'block';
    } else {
      marker.style.display = 'none';
    }
  });
};

fetchData();
