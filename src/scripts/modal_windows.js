import { getDataWithExpirationCheck, saveDataWithTimestamp } from "./localStorageOperations";

const main = document.querySelector('.main');
const header = document.querySelector('.header');
const geopositionButton = document.querySelector('.header__geoposition-button');
let mainContainer = document.querySelector('.main__container');

const scrollButton = document.querySelector('.main__to-scroll-up-button');

let questionModalTimeoutId;

function generateModalContainer(toAppend) {
    const container = document.createElement('div');
    container.className = 'main__modal-container';
    container.style.position = 'absolute';
    container.appendChild(toAppend);

    return container;
}

function closeRegionModal(modalContainer, bodyPaddingRight, modalWindowChange) {
    modalWindowChange.close();
    if (mainContainer.contains(modalContainer)) {
        mainContainer.removeChild(modalContainer);
    }
    main.style.opacity = 1;
    document.body.style.overflow = '';

    document.body.classList.remove('modal-open');
    document.body.style.paddingRight = bodyPaddingRight;

    scrollButton.style.display = 'block';
}

export function getBodyPaddingRight() {
    const bodyPaddingRight = window.getComputedStyle(document.body).paddingRight;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (window.innerWidth > 992) {
        document.body.classList.add('modal-open');
        document.body.style.paddingRight = `${parseInt(bodyPaddingRight) + scrollBarWidth}px`;
    }

    return bodyPaddingRight;
}

function showRegionModal() {
    let templateChangeNode = document.querySelector('.change-region');
    let modalTemplateNodeChange = templateChangeNode.content.cloneNode(true);
    let modalWindowChange = modalTemplateNodeChange.querySelector('.change-region__modal-window');
    let regionButtons = modalTemplateNodeChange.querySelectorAll('.change-region__item-button');

    main.style.opacity = 0;
    document.body.style.overflow = 'hidden';
    let modalContainer = generateModalContainer(modalTemplateNodeChange);

    mainContainer.appendChild(modalContainer);
    modalWindowChange.showModal();

    scrollButton.style.display = 'none';

    const bodyPaddingRight = getBodyPaddingRight();

    regionButtons.forEach(button => {
        const handleRegionButtonClick = () => {
            saveDataWithTimestamp('region', button.textContent);
            geopositionButton.textContent = getDataWithExpirationCheck('region');
            closeRegionModal(modalContainer, bodyPaddingRight, modalWindowChange);
            button.removeEventListener('click', handleRegionButtonClick);
        };
        button.addEventListener('click', handleRegionButtonClick);
    });

    document.addEventListener('keydown', function handleKeydown(event) {
        if (event.key === 'Escape') {
            closeRegionModal(modalContainer, bodyPaddingRight, modalWindowChange);
            document.removeEventListener('keydown', handleKeydown);
        }
    });
    geopositionButton.removeEventListener('click', showQuestionModal);
}

function closeQuestionModal(modalContainer, bodyPaddingRight, modalWindowQuestion) {
    clearTimeout(questionModalTimeoutId);
    document.body.style.overflow = '';
    modalWindowQuestion.close();
    if (header.contains(modalContainer)) {
        header.removeChild(modalContainer);
    }

    document.body.classList.remove('modal-open');
    document.body.style.paddingRight = bodyPaddingRight;

    scrollButton.style.display = 'block';
}

function showQuestionModal() {
    let templateQuestionNode = document.querySelector('.choose-region-question');
    let modalTemplateNodeQuestion = templateQuestionNode.content.cloneNode(true);
    let modalWindowQuestion = modalTemplateNodeQuestion.querySelector('.choose-region-question__modal-window');
    let agreeButton = modalWindowQuestion.querySelector('.choose-region-question__agree-button');
    let changeRegionShowButton = modalWindowQuestion.querySelector('.choose-region-question__change-city-button');

    let modalContainer = generateModalContainer(modalTemplateNodeQuestion);
    header.appendChild(modalContainer);

    const bodyPaddingRight = getBodyPaddingRight();

    questionModalTimeoutId = setTimeout(() => {
        modalWindowQuestion.showModal();
    }, 100);

    scrollButton.style.display = 'none';

    document.body.style.overflow = 'hidden';

    agreeButton.addEventListener('click', function handleAgreeClick() {
        closeQuestionModal(modalContainer, bodyPaddingRight, modalWindowQuestion);
        agreeButton.removeEventListener('click', handleAgreeClick);

        modalContainer.remove();

        saveDataWithTimestamp('region', 'Санкт-Петербург');
        geopositionButton.textContent = getDataWithExpirationCheck('region');
    });

    changeRegionShowButton.addEventListener('click', function handleChangeRegionClick() {
        closeQuestionModal(modalContainer, bodyPaddingRight, modalWindowQuestion);
        showRegionModal();
        changeRegionShowButton.removeEventListener('click', handleChangeRegionClick);
    });

    document.addEventListener('keydown', function handleKeydown(event) {
        if (event.key === 'Escape') {
            closeQuestionModal(modalContainer, bodyPaddingRight, modalWindowQuestion);
            document.removeEventListener('keydown', handleKeydown);
            saveDataWithTimestamp('region', 'Санкт-Петербург');
            geopositionButton.textContent = getDataWithExpirationCheck('region');
        }
    });

    geopositionButton.removeEventListener('click', showQuestionModal);
}

if (getDataWithExpirationCheck('region')) {
    geopositionButton.textContent = getDataWithExpirationCheck('region');
} else {
    geopositionButton.textContent = 'Санкт-Петербург';
    showQuestionModal();
}

geopositionButton.addEventListener('click', showRegionModal);
