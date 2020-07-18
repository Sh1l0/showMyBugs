const getElements = () => [
    {
        jiraNumber: 'PFT-2222',
        title: 'Не грузится картинка',
        description: 'При загрузке страницы не грузится картинка, потом ждём ждём ждём и нихуя!',
        cssSelector: 'div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)',
    },
    {
        jiraNumber: 'PFT-2000',
        title: 'Кнопка жёлтая',
        description: 'Да тут все кнопки жёлтые! И как пользователь должен их отличать?',
        cssSelector: 'div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > form:nth-child(1) > div:nth-child(2) > div:nth-child(2) > button:nth-child(1) > span:nth-child(1)',
    },
];

const ifElementFound = (elementPath, func, ...rest) =>
    document.querySelector(elementPath) && func(document.querySelector(elementPath), ...rest);

function getCoords(elem) {
    let box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}

const appendChild = (elem, badge) => {
    const { top, left } = getCoords(elem);
    badge.style.cssText = `top: ${top - 20}px; left: ${left - 20}px`;
    document.body.appendChild(badge)
};

const createBadge = (badgeData) => {
        const badge = document.createElement('div');
        badge.className = 'myBugs-badge';
        badge.onclick = () => renderPopup(badgeData, 'read');
        ifElementFound(badgeData.cssSelector, appendChild, badge);
};

const updateElements = () => {
    const elements = getElements();
    elements.forEach(createBadge);
};



const removeBadges = () => {
    const element = document.querySelector('.myBugs-badge');
    if (element) {
        document.body.removeChild(element);
        removeBadges();
    }
};
