import { onPhoneInput, onPhoneKeyDown, onPhonePaste } from "./mask_input";
import Validate from "./validate_input";

document.addEventListener('DOMContentLoaded', () => {
    const openParticipateDialogButton = document.querySelector('.main__stocks-content-participate-button');

    openParticipateDialogButton.addEventListener('click', () => {
        const participateTemplate = document.querySelector('.participate');
        const participateTemplateNode = participateTemplate.content.cloneNode(true);
        const modalWindow = participateTemplateNode.querySelector('.participate__modal-window');
        const inputTel = modalWindow.querySelector('.main__processing-personal-data-input-tel');
        const checkbox = modalWindow.querySelector('.main__processing-personal-data-agree');
        const submitButton = modalWindow.querySelector('.main__processing-personal-data-submit');
        const closeModalButton = modalWindow.querySelector('.participate__close-button');
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
        const bodyPaddingRight = window.getComputedStyle(body).paddingRight;
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

        // Apply modal-open class to body and add padding
        body.classList.add('modal-open');
        body.style.paddingRight = `${parseInt(bodyPaddingRight) + scrollBarWidth}px`;

        closeModalButton.addEventListener('click', () => {
            modalWindow.close();
            mainContainer.removeChild(dialogContainer);
            document.body.style.overflow = '';

            // Remove modal-open class and restore padding
            body.classList.remove('modal-open');
            body.style.paddingRight = bodyPaddingRight;
        });

        inputTel.addEventListener('input', onPhoneInput);
        inputTel.addEventListener('keydown', onPhoneKeyDown);
        inputTel.addEventListener('paste', onPhonePaste);

        submitButton.addEventListener('click', function (event) {
            const validate = new Validate();
            validate.dataProcessing(event, checkbox, phonePlace, computerPlace, submitButton, inputTel);
        })
    });
});
