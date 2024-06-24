document.addEventListener('DOMContentLoaded', () => {
    const mainHeader = document.querySelector('.header');
    const main = document.querySelector('.main');

    const header = document.querySelector('.header__geoposition');
    const geopositionButton = document.querySelector('.header__geoposition-button');
    const mainContainer = document.querySelector('.main__container');

    const templateQuestionNode = document.querySelector('.choose-region-question');
    const modalTemplateNodeQuestion = templateQuestionNode.content.cloneNode(true);
    const modalWindowQuestion = modalTemplateNodeQuestion.querySelector('.choose-region-question__modal-window');
    const agreeButton = modalWindowQuestion.querySelector('.choose-region-question__agree-button');
    const changeRegionShowButton = modalWindowQuestion.querySelector('.choose-region-question__change-city-button');

    const showRegionModal = () => {
        main.style.opacity = 0;

        const templateChangeNode = document.querySelector('.change-region');
        const modalTemplateNodeChange = templateChangeNode.content.cloneNode(true);
        const modalWindowChange = modalTemplateNodeChange.querySelector('.change-region__modal-window');
        const regionButtons = modalTemplateNodeChange.querySelectorAll('.change-region__item-button');

        const modalContainer = document.createElement('div');
        modalContainer.className = 'main__modal-container';

        modalContainer.appendChild(modalTemplateNodeChange);
        mainContainer.appendChild(modalContainer);
        modalWindowChange.showModal();

        // Save the current padding-right of the body
        const body = document.body;
        const bodyPaddingRight = window.getComputedStyle(body).paddingRight;
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

        // Apply modal-open class to body and add padding
        body.classList.add('modal-open');
        body.style.paddingRight = `${parseInt(bodyPaddingRight) + scrollBarWidth}px`;

        regionButtons.forEach(button => {
            button.addEventListener('click', () => {
                localStorage.setItem('region', button.textContent);
                geopositionButton.textContent = localStorage.getItem('region');
                modalWindowChange.close();
                mainContainer.removeChild(modalContainer);
                main.style.opacity = 1;
                mainHeader.style.position = '';

                // Remove modal-open class and restore padding
                body.classList.remove('modal-open');
                body.style.paddingRight = bodyPaddingRight;
            });
        });
    };

    const showModalQuestion = () => {
        const modalContainer = document.createElement('div');
        modalContainer.className = 'main__dialog-container';
        modalContainer.appendChild(modalTemplateNodeQuestion);
        header.appendChild(modalContainer);

        // Save the current padding-right of the body
        const body = document.body;
        const bodyPaddingRight = window.getComputedStyle(body).paddingRight;
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

        setTimeout(() => {
            document.body.style.overflow = 'hidden';
            body.style.paddingRight = `${parseInt(bodyPaddingRight) + scrollBarWidth}px`;
            modalWindowQuestion.showModal();
        }, 100);

        agreeButton.addEventListener('click', () => {
            document.body.style.overflow = '';
            modalWindowQuestion.close();
            header.removeChild(modalContainer);

            // Remove modal-open class and restore padding
            body.classList.remove('modal-open');
            body.style.paddingRight = bodyPaddingRight;
        });

        changeRegionShowButton.addEventListener('click', () => {
            modalWindowQuestion.close();
            header.removeChild(modalContainer);

            // Remove modal-open class and restore padding
            body.classList.remove('modal-open');
            body.style.paddingRight = bodyPaddingRight;

            showRegionModal();
        });
    };

    if (localStorage.getItem('region')) {
        geopositionButton.textContent = localStorage.getItem('region');
    } else {
        showModalQuestion();
    }

    geopositionButton.addEventListener('click', showRegionModal);
});
