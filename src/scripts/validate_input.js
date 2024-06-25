export default class Validate {
    constructor() {
        this.timeLiveMessage = 5000;
        this.successTemplate = document.querySelector('.main__success-message-template');
        this.failedTemplate = document.querySelector('.main__failed-message-template');
        this.failedMessagePhoneRetry = 'На этот номер уже выслан промокод';
    }

    deleteMessageFromDOM(container) {
        setTimeout(() => {
            if (container.parentNode) {
                container.parentNode.removeChild(container);
            }
        }, this.timeLiveMessage);
    }

    clearMessages(container) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }

    outputFailedMessage(phone, computer) {
        this.clearMessages(computer);
        const templateNode1 = this.failedTemplate.content.cloneNode(true);
        const container1 = document.createElement('div');
        container1.className = 'main__message-container';
        container1.appendChild(templateNode1);
        computer.appendChild(container1);
        this.deleteMessageFromDOM(container1);

        this.clearMessages(phone);
        const templateNode2 = this.failedTemplate.content.cloneNode(true);
        const container2 = document.createElement('div');
        container2.className = 'main__message-container';
        container2.appendChild(templateNode2);
        container2.querySelector('.info-message__text-message').textContent = this.failedMessagePhoneRetry;
        phone.appendChild(container2);
        this.deleteMessageFromDOM(container2);
    }

    outputSuccessMessage(phone, computer) {
        this.clearMessages(computer);
        const templateNode1 = this.successTemplate.content.cloneNode(true);
        const container1 = document.createElement('div');
        container1.className = 'main__message-container';
        container1.appendChild(templateNode1);
        computer.appendChild(container1);
        this.deleteMessageFromDOM(container1);

        this.clearMessages(phone);
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
            setTimeout(() => {
                submitButton.style.background = 'white';
            }, this.timeLiveMessage);
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
}

const inputTel = document.querySelector('.main__processing-personal-data-input-tel');
const computerMessagePlace = document.querySelector('.main__info-message-computers');
const phoneMessagePlace = document.querySelector('.main__info-message-phone');
const checkBox = document.querySelector('.main__processing-personal-data-agree');

const submitButton = document.querySelector('.main__processing-personal-data-submit');

submitButton.addEventListener(
    'click', function (event) {
        const validate = new Validate();
        validate.dataProcessing(event, checkBox, phoneMessagePlace, computerMessagePlace, submitButton, inputTel);
    }
);
