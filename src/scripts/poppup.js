import { getBodyPaddingRight } from "./modal_windows";

export function openPoppup(user) {
    let timerId = null;

    const main = document.querySelector('.main__container');
    const scrollButton = document.querySelector('.main__to-scroll-up-button');

    const modalContainer = document.createElement('div');
    modalContainer.className = 'main__modal-container';
    modalContainer.style.position = 'absolute';

    const template = document.querySelector('.user-poppup');
    const templateNode = template.content.cloneNode(true);
    const modalWindow = templateNode.querySelector('.user-poppup__modal-window');
    const closeButton = templateNode.querySelector('.user-poppup__close-button');
    const userContent = templateNode.querySelector('.user-poppup__user-content');

    const userImage = `<img src="${user.avatar_url}" loading="lazy">`
    const username = `<h4 class="user-poppup__username">${user.login}</h4>`;
    const userLinkGit = `
    <p class="user-poppup__information">
        Ссылка на github: <a href="${user.html_url}" class="user-poppup__github-link" target="_blank">
            Перейти
        </a>
    </p>`;

    userContent.innerHTML += username;
    userContent.innerHTML += userImage;
    userContent.innerHTML += userLinkGit;

    modalContainer.appendChild(templateNode);
    main.appendChild(modalContainer);
    modalWindow.showModal();

    modalWindow.classList.remove('closing');
    modalWindow.classList.remove('close-modal');

    scrollButton.style.display = 'none';

    const bodyPadding = getBodyPaddingRight();
    document.body.style.overflow = 'hidden';

    const closeModal = () => {
        modalWindow.classList.add('closing');
        modalWindow.classList.add('close-modal');

        setTimeout(() => {
            modalWindow.close();
            modalWindow.classList.remove('closing');
            modalWindow.classList.remove('close-modal');
            main.removeChild(modalContainer);
        }, 490); 

        clearTimeout(timerId);
        closeButton.removeEventListener('click', closeModal);
        document.removeEventListener('keydown', handleKeydown);
        document.body.classList.remove('modal-open');
        document.body.style.paddingRight = bodyPadding;

        scrollButton.style.display = 'block';
        document.body.style.overflow = '';
    };

    const handleKeydown = (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    };

    document.addEventListener('keydown', handleKeydown);
    closeButton.addEventListener('click', closeModal);
}
