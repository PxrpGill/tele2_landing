document.addEventListener('DOMContentLoaded', () => {
    const inputTel = document.querySelector('.main__processing-personal-data-input-tel');
    const submitButton = document.querySelector('.main__processing-personal-data-submit');
    const placeToAppendMessage = document.querySelector('.main__info-message-computers');
    const checkBox = document.querySelector('.main__processing-personal-data-agree');
    const phoneMessagePlace = document.querySelector('.main__info-message-phone');

    const timeLiveMessage = 3000;

    function deleteMessageFromDOM(container) {
        setTimeout(() => {
            if (container.parentNode) {
                container.parentNode.removeChild(container);
            }
        }, timeLiveMessage);
    }

    function clearMessages(container) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }

    function outputFailedMessage() {
        const template = document.querySelector('.main__failed-message-template');

        clearMessages(placeToAppendMessage);
        const templateNode1 = template.content.cloneNode(true);
        const container1 = document.createElement('div');
        container1.className = 'main__message-container';
        container1.appendChild(templateNode1);
        placeToAppendMessage.appendChild(container1);
        deleteMessageFromDOM(container1);

        clearMessages(phoneMessagePlace);
        const templateNode2 = template.content.cloneNode(true);
        const container2 = document.createElement('div');
        container2.className = 'main__message-container';
        container2.appendChild(templateNode2);
        phoneMessagePlace.appendChild(container2);
        deleteMessageFromDOM(container2);
    }

    function outputSuccessMessage() {
        const template = document.querySelector('.main__success-message-template');

        clearMessages(placeToAppendMessage);
        const templateNode1 = template.content.cloneNode(true);
        const container1 = document.createElement('div');
        container1.className = 'main__message-container';
        container1.appendChild(templateNode1);
        placeToAppendMessage.appendChild(container1);
        deleteMessageFromDOM(container1);

        clearMessages(phoneMessagePlace);
        const templateNode2 = template.content.cloneNode(true);
        const container2 = document.createElement('div');
        container2.className = 'main__message-container';
        container2.appendChild(templateNode2);
        phoneMessagePlace.appendChild(container2);
        deleteMessageFromDOM(container2);
    }

    function setNumberInLocalStorage(phoneNumber) {
        const key = new Date();
        localStorage.setItem(String(key), phoneNumber);
    }

    function phoneInLocalStorage(phoneNumber) {
        let flag = false;

        for (let key in localStorage) {
            if (localStorage.hasOwnProperty && key != 'region') {
                const item = localStorage.getItem(key);

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