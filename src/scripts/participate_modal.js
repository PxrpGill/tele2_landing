import { onPhoneInput, onPhoneKeyDown, onPhonePaste } from "./mask_input";
import Validate from "./validate_input";

document.addEventListener('DOMContentLoaded', () => {
    const takeParticipateButton = document.querySelector('.main__stocks-content-participate-button');
    if (!takeParticipateButton) {
        console.error('Element .main__stocks-content-participate-button not found.');
        return;
    }

    takeParticipateButton.addEventListener('click', () => {
        const template = document.querySelector('.participate');
        if (!template) {
            console.error('Element .participate not found.');
            return;
        }

        const templateNode = template.content.cloneNode(true);
        const modalWindow = templateNode.querySelector('.participate__modal-window');
        const closeWindowButton = templateNode.querySelector('.participate__close-button');
        const inputTel = templateNode.querySelector('.main__processing-personal-data-input-tel');

        if (!modalWindow || !closeWindowButton || !inputTel) {
            console.error('Modal elements not found:', { modalWindow, closeWindowButton, inputTel });
            return;
        }

        const mainContainer = document.querySelector('.main__container');
        if (!mainContainer) {
            console.error('Element .main__container not found.');
            return;
        }

        const modalContainer = document.createElement('div');
        modalContainer.className = 'main__modal-container';

        modalContainer.appendChild(templateNode);
        mainContainer.appendChild(modalContainer);
        modalWindow.showModal();

        const computerPlace = templateNode.querySelector('.main__info-message-computers');
        const phonePlace = templateNode.querySelector('.main__info-message-phone');
        const checkbox = templateNode.querySelector('.main__processing-personal-data-agree');
        const submitButton = templateNode.querySelector('.main__processing-personal-data-submit');

        if (!computerPlace || !phonePlace || !checkbox || !submitButton) {
            console.error('Form elements not found:', { computerPlace, phonePlace, checkbox, submitButton });
            return;
        }

        submitButton.addEventListener('click', function (event) {
            const validate = new Validate();
            validate.dataProcessing(event, checkbox, phonePlace, computerPlace, submitButton);
        });

        closeWindowButton.addEventListener('click', () => {
            modalWindow.close();
            mainContainer.removeChild(modalContainer);
        });

        inputTel.addEventListener("input", onPhoneInput);
        inputTel.addEventListener('keydown', onPhoneKeyDown);
        inputTel.addEventListener('paste', onPhonePaste);
    });
});
