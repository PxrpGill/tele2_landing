import { onPhoneInput, onPhoneKeyDown, onPhonePaste } from "./mask_input";
import { getBodyPaddingRight } from "./modal_windows";
import Validate from "./validate_input";

const openParticipateDialogButton = document.querySelector('.main__stocks-content-participate-button');

openParticipateDialogButton.addEventListener('click', () => {
    let participateTemplate = document.querySelector('.main__participate');
    let participateTemplateNode = participateTemplate.content.cloneNode(true);
    let modalWindow = participateTemplateNode.querySelector('.main__participate-modal-window');
    let inputTel = modalWindow.querySelector('.main__processing-personal-data-input-tel');
    let checkbox = modalWindow.querySelector('.main__processing-personal-data-agree');
    let submitButton = modalWindow.querySelector('.main__processing-personal-data-submit');
    let closeModalButton = modalWindow.querySelector('.main__participate-close-button');
    let phonePlace = modalWindow.querySelector('.main__info-message-phone');
    let computerPlace = modalWindow.querySelector('.main__info-message-computers');

    let dialogContainer = document.createElement('div');
    dialogContainer.className = 'main__modal-container';
    const mainContainer = document.querySelector('.main__container');

    dialogContainer.appendChild(participateTemplateNode);
    mainContainer.appendChild(dialogContainer);

    modalWindow.showModal();
    document.body.style.overflow = 'hidden';

    const bodyPaddingRight = getBodyPaddingRight();

    const closeModal = () => {
        modalWindow.close();
        mainContainer.removeChild(dialogContainer);
        document.body.style.overflow = '';

        document.body.classList.remove('modal-open');
        document.body.style.paddingRight = bodyPaddingRight;

        closeModalButton.removeEventListener('click', closeModal);
        document.removeEventListener('keydown', handleKeydown);
        inputTel.removeEventListener('input', onPhoneInput);
        inputTel.removeEventListener('keydown', onPhoneKeyDown);
        inputTel.removeEventListener('paste', onPhonePaste);
        submitButton.removeEventListener('click', handleSubmit);
    };

    const handleKeydown = (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    };

    const handleSubmit = (event) => {
        const validate = new Validate();
        validate.dataProcessing(event, checkbox, phonePlace, computerPlace, submitButton, inputTel);
    };


    const checkFormValidity = () => {
        if (inputTel.value.trim() == '' || !checkbox.checked) {
            submitButton.style.pointerEvents = 'none';
            submitButton.style.background = 'gray';
        } else {
            submitButton.style.pointerEvents = '';
            submitButton.style.background = 'white';
        }
    }

    inputTel.addEventListener('input', checkFormValidity);
    checkbox.addEventListener('change', checkFormValidity);

    submitButton.style.pointerEvents = 'none';

    closeModalButton.addEventListener('click', closeModal);
    document.addEventListener('keydown', handleKeydown);
    inputTel.addEventListener('input', onPhoneInput);
    inputTel.addEventListener('keydown', onPhoneKeyDown);
    inputTel.addEventListener('paste', onPhonePaste);
    submitButton.addEventListener('click', handleSubmit);

    checkFormValidity();
});
