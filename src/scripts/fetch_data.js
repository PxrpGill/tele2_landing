const url = 'https://api.github.com/users';

const inputInDOM = (data) => {
  const sliderPlace = document.querySelector('.main__slider-items');
  const sliderMarkers = document.querySelector('.main__slider-markers');
  for (let key in data) {
    let index = 0;
    const htmlElement = `
    <li class="main__slider-item">
      <a name="item-${index}">
        <img class="main__slider-image" src="${data[key].avatar_url}" alt="Картинка пользователя" draggable="false">
      </a>
    </li>
    `;
    const sliderMarker = `
    <li class="main__slider-marker>
      <a href="#item-${index}">
        <span class="main__marker">Photo 1</span>
      </a>
    </li>
    `;
    sliderPlace.innerHTML += htmlElement;
    sliderMarkers.innerHTML += sliderMarker;
  }
}

const fetchData = async () => {
  try {
    const response = await fetch(url, {

    });

    if (response.ok) {
      const json = await response.json();
      inputInDOM(json);
    } else {
      console.error("Ошибка HTTP: " + response.status);
    }
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
};

fetchData();
