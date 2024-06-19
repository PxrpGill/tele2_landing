document.addEventListener('DOMContentLoaded', () => {
    const inputTel = document.querySelector('.main__processing-personal-data-input-tel');
    const submitButton = document.querySelector('.main__processing-personal-data-submit');
    const placeToAppendMessage = document.querySelector('.main__how-to-get-tariff-personal-data');
    const checkBox = document.querySelector('.main__processing-personal-data-agree');

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
        const regex = /(\+7|[0-689])\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}/;
        return regex.test(phoneNumber);
    }

    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        const phoneNumber = inputTel.value;

        if (!checkBox.checked || phoneNumber == '') {
            submitButton.style.background = 'gray';
            setTimeout(() => {
                submitButton.style.background = 'white';
            }, timeLiveMessage);
        } else {
            if (validatePhoneNumber(phoneNumber)) {
                if (phoneInLocalStorage(phoneNumber)) {
                    outputFailedMessage();
                } else {
                    setNumberInLocalStorage(phoneNumber);
                    outputSuccessMessage();
                }
            } else {
                outputFailedMessage();
            }
        }

        console.log(phoneNumber);
    });
});