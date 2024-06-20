document.addEventListener('DOMContentLoaded', () => {
    const takeParticipateButton = document.querySelector('.main__stocks-content-participate-button');

    takeParticipateButton.addEventListener('click', () => {
        const template = document.querySelector('.participate');
        const templateNode = template.content.cloneNode(true);
        const modalWindow = templateNode.querySelector('.participate__modal-window');
        const closeWindowButton = templateNode.querySelector('.participate__close-button');

        const mainContainer = document.querySelector('.main__container');

        const modalContainer = document.createElement('div');
        modalContainer.className = 'main__modal-container';

        modalContainer.appendChild(templateNode);
        mainContainer.appendChild(modalContainer);
        modalWindow.showModal();

        closeWindowButton.addEventListener('click', () => {
            modalWindow.close();
            mainContainer.removeChild(modalContainer);
        });
    })
}); 