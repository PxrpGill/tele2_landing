import { inputInDOM, addScrollEventListener } from "./slider_scroll";

const url = 'https://api.github.com/users?per_page=99';

const fetchData = async () => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const fetchedData = await response.json();
      inputInDOM(fetchedData);
      addScrollEventListener();
    } else {
      console.error("Ошибка HTTP: " + response.status);
    }
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
};

fetchData();
