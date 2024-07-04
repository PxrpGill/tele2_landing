import { getBodyPaddingRight } from "./modal_windows";
import { isStartingStyleSupported } from "./starting_isSupporting";

export function openPoppup(user) {
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

    const userImage = `<img src="${user.avatar_url}" loading="lazy">`;
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

    if (isStartingStyleSupported()) {
        console.log('Имеется поддержка @starting-style');
    } else {
        modalWindow.style.transition = 'none';
        modalWindow.style.transform = 'translateY(-150%) scale(0)';
        modalWindow.style.opacity = '0';
        modalWindow.classList.add('closing');

        setTimeout(() => {
            modalWindow.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
            modalWindow.style.transform = 'translateY(0%) scale(1)';
            modalWindow.style.opacity = '1';
            modalWindow.classList.remove('closing');
        }, 100);
    }

    scrollButton.style.display = 'none';
    document.body.style.overflow = 'hidden';

    const bodyPadding = getBodyPaddingRight();

    const closeModal = () => {
        if (isStartingStyleSupported()) {
            modalWindow.classList.add('closing');
            setTimeout(() => {
                modalWindow.close();
                main.removeChild(modalContainer);
                modalWindow.classList.remove('closing');
                userContent.innerHTML = '';
            }, 500);
        } else {
            modalWindow.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
            modalWindow.style.transform = 'translateY(-150%) scale(0)';
            modalWindow.style.opacity = '0';
            modalWindow.classList.add('closing');
            setTimeout(() => {
                modalWindow.close();
                main.removeChild(modalContainer);
                modalWindow.classList.remove('closing')
                userContent.innerHTML = '';
            }, 500);
        }

        closeButton.removeEventListener('click', closeModal);
        document.removeEventListener('keydown', handleKeydown);
        document.body.style.paddingRight = bodyPadding;
        document.body.classList.remove('modal-open');
        scrollButton.style.display = 'block';
        document.body.style.overflow = '';
    };

    const handleKeydown = (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    };

    closeButton.addEventListener('click', closeModal);
    document.addEventListener('keydown', handleKeydown);
}
