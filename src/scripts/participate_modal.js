import { onPhoneInput, onPhoneKeyDown, onPhonePaste } from "./mask_input";
import Validate from "./validate_input";

document.addEventListener('DOMContentLoaded', () => {
    const openParticipateDialogButton = document.querySelector('.main__stocks-content-participate-button');

    openParticipateDialogButton.addEventListener('click', () => {
        const participateTemplate = document.querySelector('.main__participate');
        const participateTemplateNode = participateTemplate.content.cloneNode(true);
        const modalWindow = participateTemplateNode.querySelector('.main__participate-modal-window');
        const inputTel = modalWindow.querySelector('.main__processing-personal-data-input-tel');
        const checkbox = modalWindow.querySelector('.main__processing-personal-data-agree');
        const submitButton = modalWindow.querySelector('.main__processing-personal-data-submit');
        const closeModalButton = modalWindow.querySelector('.main__participate-close-button');
        const phonePlace = modalWindow.querySelector('.main__info-message-phone');
        const computerPlace = modalWindow.querySelector('.main__info-message-computers');

        const dialogContainer = document.createElement('div');
        dialogContainer.className = 'main__modal-container';
        const mainContainer = document.querySelector('.main__container');


        dialogContainer.appendChild(participateTemplateNode);
        mainContainer.appendChild(dialogContainer);

        modalWindow.showModal();
        document.body.style.overflow = 'hidden';

        const body = document.body;
        const bodyPaddingRight = parseInt(window.getComputedStyle(body).paddingRight, 10) || 0;
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

        console.log(`Body original padding-right: ${bodyPaddingRight}px`);
        console.log(`Scroll bar width: ${scrollBarWidth}px`);

        body.classList.add('modal-open');
        body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;

        console.log(`Body new padding-right: ${body.style.paddingRight}`);

        closeModalButton.addEventListener('click', () => {
            modalWindow.close();
            mainContainer.removeChild(dialogContainer);
            document.body.style.overflow = '';

            body.classList.remove('modal-open');
            body.style.paddingRight = `${bodyPaddingRight}px`;

            console.log('Modal closed and padding restored');
        });

        inputTel.addEventListener('input', onPhoneInput);
        inputTel.addEventListener('keydown', onPhoneKeyDown);
        inputTel.addEventListener('paste', onPhonePaste);

        submitButton.addEventListener('click', function (event) {
            const validate = new Validate();
            validate.dataProcessing(event, checkbox, phonePlace, computerPlace, submitButton, inputTel);
        });

    });
});
