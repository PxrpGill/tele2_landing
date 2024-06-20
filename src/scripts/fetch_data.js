const url = 'https://api.github.com/users';

const inputInDOM = (data) => {
  const sliderPlace = document.querySelector('.main__slider');
  for (let key in data) {
    const htmlElement = `
    <article class="main__slider-element">
      <h3 class="main__slider-title--visually-hidden">Элемент слайдера</h3>
      <img class="main__slider-image" src="${data[key].avatar_url}" alt="Картинка пользователя">
    </article>
    `;
    sliderPlace.innerHTML += htmlElement;
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
