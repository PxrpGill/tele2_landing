const header = document.querySelector('.header__geoposition');
const geopositionButton = document.querySelector('.header__geoposition-button');
const mainContainer = document.querySelector('.main__container');

const templateQuestionNode = document.querySelector('.choose-region-question');
const modalTemplateNodeQuestion = templateQuestionNode.content.cloneNode(true);
const modalWindow = modalTemplateNodeQuestion.querySelector('.choose-region-question__modal-window');
const agreeButton = modalWindow.querySelector('.choose-region-question__agree-button');
const changeRegionShowButton = modalWindow.querySelector('.choose-region-question__change-city-button');

const dialogTimeId = setTimeout(() => {
    const modalContainer = document.createElement('div');
    modalContainer.className = 'header__modal-container';

    modalContainer.appendChild(modalTemplateNodeQuestion);
    header.appendChild(modalContainer);

    header.style.border = 'none';
    document.body.style.overflow = 'hidden';

    modalWindow.showModal();
}, 100);

agreeButton.addEventListener('click', () => {
    document.body.style.overflow = '';
    modalWindow.close();
    
    const modalContainer = header.querySelector('.header__modal-container');
    header.removeChild(modalContainer);
});

const templateChangeNode = document.querySelector('.change-region');
const modalTemplateNodeChange = templateChangeNode.content.cloneNode(true);
const modalWindowChange = modalTemplateNodeChange.querySelector('.change-region__modal-window');
const regionButtons = modalTemplateNodeChange.querySelectorAll('.change-region__item-button');

changeRegionShowButton.addEventListener('click', () => {
    const modalContainer = header.querySelector('.header__modal-container');
    modalWindow.close();
    header.removeChild(modalContainer);

    const modalContainerChange = document.createElement('div');
    modalContainerChange.className = 'main__modal-container';
    modalContainerChange.appendChild(modalTemplateNodeChange);
    mainContainer.appendChild(modalContainerChange);
    modalWindowChange.showModal();
});

geopositionButton.addEventListener('click', () => {
    const modalContainerChange = document.createElement('div');
    modalContainerChange.className = 'main__modal-container';
    modalContainerChange.appendChild(modalTemplateNodeChange);
    mainContainer.appendChild(modalContainerChange);
    modalWindowChange.showModal();
});

regionButtons.forEach(button => {
    button.addEventListener('click', () => {
        geopositionButton.textContent = button.textContent;
        document.body.style.overflow = '';
        
        const modalContainerChange = mainContainer.querySelector(".main__modal-container");
        modalWindowChange.close();
        mainContainer.removeChild(modalContainerChange);
    });
});
