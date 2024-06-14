const header = document.querySelector('.header__geoposition');
const mainContainer = document.querySelector('.main__container');
let statePage = {
    regionQuestion: false,
    regionChange: false
}

const templateQuestionNode = document.querySelector('.choose-region-question');
const modalTemplateNodeQuestion = templateQuestionNode.content.cloneNode(true);
const modalWindow = modalTemplateNodeQuestion.querySelector('.choose-region-question__modal-window');
const agreeButton = modalWindow.querySelector('.choose-region-question__agree-button');
const changeRegionShowButton = modalWindow.querySelector('.choose-region-question__change-city-button');


const dialogTimeId = setTimeout(() => {
    if (!statePage.regionQuestion) {
        header.appendChild(modalTemplateNodeQuestion);
        header.style.border = 'none';
        document.body.style.overflow = 'hidden';
        statePage.regionQuestion = !statePage.regionQuestion;
        modalWindow.showModal();
    }
}, 100);

agreeButton.addEventListener('click', () => {
    document.body.style.overflow = '';
    modalWindow.close();
    header.removeChild(modalTemplateNodeQuestion);
});


const templateChangeNode = document.querySelector('.change-region');
const modalTemplateNodeChange = templateChangeNode.content.cloneNode(true);
const modalWindowChange = modalTemplateNodeChange.querySelector('.change-region__modal-window');
const regionButtons = modalTemplateNodeChange.querySelectorAll('.change-region__item-button');


changeRegionShowButton.addEventListener('click', () => {
    document.body.style.overflow = '';
    modalWindow.close();
    
    mainContainer.appendChild(modalTemplateNodeChange);
    modalWindowChange.showModal();
    document.body.style.overflow = 'hidden';
});
