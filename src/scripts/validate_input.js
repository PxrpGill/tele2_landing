export default class Validate {
    constructor() {
        this.timeLiveMessage = 5000;
        this.successTemplate = document.querySelector('.main__success-message-template');
        this.failedTemplate = document.querySelector('.main__failed-message-template');
        this.failedMessagePhoneRetry = 'На этот номер уже выслан промокод';
        this.timers = [];
    }

    deleteMessageFromDOM(container) {
        const timer = setTimeout(() => {
            if (container.parentNode) {
                container.parentNode.removeChild(container);
            }
        }, this.timeLiveMessage);
        this.timers.push(timer);
    }

    clearMessages(container) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }

    outputFailedMessage(phone, computer) {
        this.cleanupMessages();

        const templateNode1 = this.failedTemplate.content.cloneNode(true);
        const container1 = document.createElement('div');
        container1.className = 'main__message-container';
        container1.appendChild(templateNode1);
        computer.appendChild(container1);
        this.deleteMessageFromDOM(container1);

        const templateNode2 = this.failedTemplate.content.cloneNode(true);
        const container2 = document.createElement('div');
        container2.className = 'main__message-container';
        container2.appendChild(templateNode2);
        container2.querySelector(
            '.main__info-message-text-message'
        ).textContent = this.failedMessagePhoneRetry;
        phone.appendChild(container2);
        this.deleteMessageFromDOM(container2);
    }

    outputSuccessMessage(phone, computer) {
        this.cleanupMessages();

        const templateNode1 = this.successTemplate.content.cloneNode(true);
        const container1 = document.createElement('div');
        container1.className = 'main__message-container';
        container1.appendChild(templateNode1);
        computer.appendChild(container1);
        this.deleteMessageFromDOM(container1);


        const templateNode2 = this.successTemplate.content.cloneNode(true);
        const container2 = document.createElement('div');
        container2.className = 'main__message-container';
        container2.appendChild(templateNode2);
        phone.appendChild(container2);
        this.deleteMessageFromDOM(container2);
    }

    setNumberInLocalStorage(phoneNumber) {
        const key = new Date();
        localStorage.setItem(String(key), phoneNumber);
    }

    phoneInLocalStorage(phoneNumber) {
        let flag = false;

        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key) && key != 'region') {
                const item = localStorage.getItem(key);

                if (phoneNumber == item) {
                    flag = true;
                }
            }
        }

        return flag;
    }

    validatePhoneNumber(phoneNumber) {
        const regex = /(\+7|[0-689])\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}/;
        return regex.test(phoneNumber);
    }

    dataProcessing(event, checkbox, phone, computer, submitButton, inputTel) {
        event.preventDefault();
        const phoneNumber = inputTel.value;

        if (!checkbox.checked || phoneNumber == '') {
            submitButton.style.background = 'gray';
            const timer = setTimeout(() => {
                submitButton.style.background = 'white';
            }, this.timeLiveMessage);
            this.timers.push(timer);
        } else {
            if (this.validatePhoneNumber(phoneNumber)) {
                if (this.phoneInLocalStorage(phoneNumber)) {
                    this.outputFailedMessage(phone, computer);
                } else {
                    this.setNumberInLocalStorage(phoneNumber);
                    this.outputSuccessMessage(phone, computer);
                }
            } else {
                this.outputFailedMessage(phone, computer);
            }
        }
    }

    clearTimers() {
        this.timers.forEach(timer => clearTimeout(timer));
        this.timers = [];
    }

    cleanupMessages() {
        const containers = document.querySelectorAll('.main__message-container');
        containers.forEach(container => {
            if (container.parentNode) {
                container.parentNode.removeChild(container);
            }
        });
        this.clearTimers();
    }
}

const inputTel = document.querySelector('.main__processing-personal-data-input-tel');
const computerMessagePlace = document.querySelector('.main__info-message-computers');
const phoneMessagePlace = document.querySelector('.main__info-message-phone');
const checkBox = document.querySelector('.main__processing-personal-data-agree');
const submitButton = document.querySelector('.main__processing-personal-data-submit');

const validate = new Validate();

function handleSubmit(event) {
    event.preventDefault();
    validate.dataProcessing(event, checkBox, phoneMessagePlace, computerMessagePlace, submitButton, inputTel);
}

function checkFormValidity() {
    if (inputTel.value.trim() == '' || !checkBox.checked) {
        submitButton.style.pointerEvents = 'none';
        submitButton.style.background = 'gray';
    } else {
        submitButton.style.pointerEvents = '';
        submitButton.style.background = 'white';
    }
}

inputTel.addEventListener('input', checkFormValidity);
checkBox.addEventListener('change', checkFormValidity);

submitButton.style.pointerEvents = 'none';
submitButton.addEventListener('click', handleSubmit);

checkFormValidity();
