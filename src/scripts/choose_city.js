const header = document.querySelector('.header__geoposition');

const templateNode = document.querySelector('.choose-region');
const contentTemplateNode = templateNode.content.cloneNode(true);
const modalWindow = contentTemplateNode.querySelector('.choose-region__modal-window');
const agreeButton = modalWindow.querySelector('.choose-region__agree-button');
const changeRegionButton = modalWindow.querySelector('.choose-region__change-city-button');

const dialogTimeId = setTimeout(() => {
    header.appendChild(contentTemplateNode);
    header.style.border = 'none';
    document.body.style.overflow = 'hidden';
    modalWindow.showModal();
    dialogTimeId = null;
}, 100);


agreeButton.addEventListener('click', function() {
    document.body.style.overflow = '';
    modalWindow.close();
    header.removeChild(contentTemplateNode);
});