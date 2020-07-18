(function main() {
    function myBugsExtensionOn() {
        updateElements();
        document.addEventListener('dblclick', selectElement);
        document.addEventListener('click', blurElement);
    }

    function myBugsExtensionOff() {
        removeBadges();
        closeModal();
        blurElement();
        document.removeEventListener('dblclick', selectElement);
        document.removeEventListener('click', blurElement);
    }

    function myBugsToggle(sendResponse) {
        dispatch({ type: 'toggle' });
        const turnedOn = getFieldStore('turnedOn');

        if (turnedOn) {
            myBugsExtensionOn();
        } else {
            myBugsExtensionOff();
        }

        sendResponse(MY_BUGS_BUTTON_MAP[turnedOn]);
    }

    function myBugsInit(sendResponse) {
        sendResponse(MY_BUGS_BUTTON_MAP[getFieldStore('turnedOn')]);
    }

    const messagesReducerMap = {
        toggle: myBugsToggle,
        init: myBugsInit,
    };

    function messagesReducer({ type }, __, sendResponse) {
        messagesReducerMap[type](sendResponse);
    }

    chrome.runtime.onMessage.addListener(messagesReducer);
}());