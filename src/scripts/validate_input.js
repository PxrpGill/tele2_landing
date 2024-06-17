document.addEventListener('DOMContentLoaded', () => {
    const inputTel = document.querySelector('.main__processing-personal-data-input-tel');
    const submitButton = document.querySelector('.main__processing-personal-data-submit');
    const placeToAppendMessage = document.querySelector('.main__how-to-get-tariff-personal-data');

    const timeLiveMessage = 3000;

    function deleteMessageFromDOM(container) {
        setTimeout(() => {
            placeToAppendMessage.removeChild(container);
        }, timeLiveMessage);
    }

    function outputFailedMessage() {
        const template = document.querySelector('.main__failed-message-template');
        const templateNode = template.content.cloneNode(true);

        const container = document.createElement('main__message-container');
        container.appendChild(templateNode);

        placeToAppendMessage.appendChild(container);
        deleteMessageFromDOM(container);
    }

    function outputSuccessMessage() {
        const template = document.querySelector('.main__success-message-template');
        const templateNode = template.content.cloneNode(true);

        const container = document.createElement('main__message-container');
        container.appendChild(templateNode);

        placeToAppendMessage.appendChild(container);
        deleteMessageFromDOM(container);
    }

    function setNumberInLocalStorage(phoneNumber) {
        const key = new Date();
        localStorage.setItem(String(key), JSON.stringify(phoneNumber));
    }

    function phoneInLocalStorage(phoneNumber) {
        let flag = false;

        for (let key in localStorage) {
            if (localStorage.hasOwnProperty) {
                const item = JSON.parse(localStorage.getItem(key));

                if (phoneNumber == item) {
                    flag = true;
                }
            }
        }

        return flag;
    }

    function validatePhoneNumber(phoneNumber) {
        const regex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}$/;
        return regex.test(phoneNumber);
    }

    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        const phoneNumber = inputTel.value;

        if (phoneInLocalStorage(phoneNumber)) {
            outputFailedMessage();
        } else {
            if (validatePhoneNumber(phoneNumber)) {
                setNumberInLocalStorage(phoneNumber);
                outputSuccessMessage();
            } else {
                outputFailedMessage();
            }
        }
    });
});