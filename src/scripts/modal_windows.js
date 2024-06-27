const main = document.querySelector('.main');
const header = document.querySelector('.header');
const geopositionButton = document.querySelector('.header__geoposition-button');
const mainContainer = document.querySelector('.main__container');

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
}

function getBodyPaddingRight() {
    const bodyPaddingRight = window.getComputedStyle(document.body).paddingRight;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.classList.add('modal-open');
    document.body.style.paddingRight = `${parseInt(bodyPaddingRight) + scrollBarWidth}px`;

    return bodyPaddingRight;
}

function showRegionModal() {
    const templateChangeNode = document.querySelector('.change-region');
    const modalTemplateNodeChange = templateChangeNode.content.cloneNode(true);
    const modalWindowChange = modalTemplateNodeChange.querySelector('.change-region__modal-window');
    const regionButtons = modalTemplateNodeChange.querySelectorAll('.change-region__item-button');

    main.style.opacity = 0;
    const modalContainer = generateModalContainer(modalTemplateNodeChange);

    mainContainer.appendChild(modalContainer);
    modalWindowChange.showModal();

    const bodyPaddingRight = getBodyPaddingRight();

    regionButtons.forEach(button => {
        const handleRegionButtonClick = () => {
            localStorage.setItem('region', button.textContent);
            geopositionButton.textContent = localStorage.getItem('region');
            closeRegionModal(modalContainer, bodyPaddingRight, keydownHandler);
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
    document.removeEventListener('keydown', keydownHandler);
}

function showQuestionModal() {
    const templateQuestionNode = document.querySelector('.choose-region-question');
    const modalTemplateNodeQuestion = templateQuestionNode.content.cloneNode(true);
    const modalWindowQuestion = modalTemplateNodeQuestion.querySelector('.choose-region-question__modal-window');
    const agreeButton = modalWindowQuestion.querySelector('.choose-region-question__agree-button');
    const changeRegionShowButton = modalWindowQuestion.querySelector('.choose-region-question__change-city-button');

    const modalContainer = generateModalContainer(modalTemplateNodeQuestion);
    header.appendChild(modalContainer);

    const bodyPaddingRight = getBodyPaddingRight();

    questionModalTimeoutId = setTimeout(() => {
        modalWindowQuestion.showModal();
    }, 100);

    agreeButton.addEventListener('click', function handleAgreeClick() {
        closeQuestionModal(modalContainer, bodyPaddingRight, modalWindowQuestion);
        agreeButton.removeEventListener('click', handleAgreeClick);
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
        }
    });

    geopositionButton.removeEventListener('click', showQuestionModal);
}

if (localStorage.getItem('region')) {
    geopositionButton.textContent = localStorage.getItem('region');
} else {
    showQuestionModal();
}

geopositionButton.addEventListener('click', showRegionModal);
