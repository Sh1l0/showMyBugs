const closeModal = () => {
    const modal = document.querySelector('.myBugs-overlay');

    if (modal) {
        document.body.removeChild(modal);
    }
};

const switchElementsByType = (type, bugData) => {
    if (type === 'add') {
        document.getElementById('myBugsBugSelector').value = bugData.path;
        return;
    }
    if (type === 'read') {
        const { jiraNumber, title, description, cssSelector } = bugData;
        document.getElementById('myBugsBugNumber').disabled = true;
        document.getElementById('myBugsBugNumber').value = jiraNumber;
        document.getElementById('myBugsBugTitle').disabled = true;
        document.getElementById('myBugsBugTitle').value = title;
        document.getElementById('myBugsBugDescription').disabled = true;
        document.getElementById('myBugsBugDescription').value = description;
        document.getElementById('myBugsBugSelector').disabled = true;
        document.getElementById('myBugsBugSelector').value = cssSelector;
        document.getElementById('myBugsAdd').disabled = true;
        document.getElementById('myBugsCancel').disabled = true;
    }
};

const addBug = () => {
    const jiraNumber = document.getElementById('myBugsBugNumber').value;
    const title = document.getElementById('myBugsBugTitle').value;
    const description = document.getElementById('myBugsBugDescription').value;
    const selector = document.getElementById('myBugsBugSelector').value;
    const payload = { jiraNumber, title, description, selector };

    document.getElementById('myBugsAdd').disabled = true;
    document.getElementById('myBugsCancel').disabled = true;
    document.getElementById('myBugsLoaderArea').innerHTML = 'Загрузка...';

    console.log(payload);
    new Promise((res) => setTimeout(() => res('ok'), 500)).then(() => {
        document.getElementById('myBugsSuccessArea').innerHTML = 'Баг успешно добавлен';
    }, () => {
        document.getElementById('myBugsAdd').disabled = false;
        document.getElementById('myBugsCancel').disabled = false;
        document.getElementById('myBugsErrorArea').innerHTML = 'Ошибка!';
    }).finally(() => document.getElementById('myBugsLoaderArea').innerHTML = '');
};

const getCss = (element) => {
    const innerCss = (element, path) => {
        const parent = element.parentElement;

        if (parent === document.documentElement) {
            return path.join(' > ');
        }

        let index = [...parent.children].reduce((acc, child, ind) => child === element ? ind + 1 : acc, null);
        return innerCss(parent, [`${element.tagName.toLowerCase()}:nth-child(${index})`,  ...path]);
    };

    return innerCss(element, []);
};

const renderPopup = (bugData, type) => {
    const popup = document.createElement('div');
    const handleClose = (e) => e.target.classList.contains('myBugs-overlay') && closeModal();

    popup.className = 'myBugs-overlay';
    popup.onclick = handleClose;
    popup.innerHTML =
        `<div class="myBugs-modal">
             <div class="myBugs-bugHeader">
                 <div class="myBugs-bugTitle">Введите информацию о баге</div>
                 <button class="myBugs-bugClose">Закрыть</button>
             </div>
             <div class="myBugs-bugFormField">
                 <label for="myBugsBugNumber">Номер задачи в JIRA<label>
                 <input id="myBugsBugNumber" class="myBugs-bugNumber" type="text" />
             </div>
             <div class="myBugs-bugFormField">
                 <label for="myBugsBugTitle">Название бага<label>
                 <input id="myBugsBugTitle" class="myBugs-bugTitle" type="text" />
             </div>
             <div class="myBugs-bugFormField">
                 <span>Описание бага<label>
                 <textarea id="myBugsBugDescription" class="myBugs-bugDescription"></textarea>
             </div>
             <div class="myBugs-bugFormField">
                 <label for="myBugsBugSelector">CSS селектор<label>
                 <input id="myBugsBugSelector" class="myBugs-bugSelector" type="text" />
             </div>
             <div id="myBugsLoaderArea" class="myBugs-loader"></div>
             <div id="myBugsErrorArea" class="myBugs-error"></div>
             <div id="myBugsSuccessArea" class="myBugs-success"></div>
             <div class="myBugs-bugButtonsWrapper">
                 <button id="myBugsAdd" class="myBugs-buttonPrimary">Создать</button>
                 <button id="myBugsCancel" class="myBugs-buttonSecondary">Отмена</button>
             </div>
         </div>`;


    popup.children[0].children[0].children[1].onclick = closeModal;
    popup.children[0].lastElementChild.children[1].onclick = closeModal;
    popup.children[0].lastElementChild.children[0].onclick = addBug;

    document.body.appendChild(popup);
    switchElementsByType(type, bugData);
};

const addModalListener = (e) => {
    e.preventDefault();
    renderPopup({ path: getCss(e.target) }, 'add');
};

function selectElement(e) {
    if (document.querySelector('.myBugs-overlay')) {
        return;
    }

    e.stopPropagation();
    blurElement();

    if (getFieldStore('prevElement')) {
        dispatch({ type: 'blurElement' });
    }

    if (e.target.classList.contains('myBugs-badge')) {
        return;
    }

    e.target.addEventListener('contextmenu', addModalListener);

    dispatch({ type: 'setPrevActive', element: e.target, color: e.target.style.backgroundColor });
    setBackgroundColor(e, 'blue');
}

function blurElement() {
    if (document.querySelector('.myBugs-overlay')) {
        return;
    }

    const prevElement = getFieldStore('prevElement');

    if (prevElement) {
        prevElement.removeEventListener('contextmenu', addModalListener);
        dispatch({ type: 'blurElement' });
    }
}