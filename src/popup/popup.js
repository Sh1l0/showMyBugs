function setText(button, type) {
    chrome.tabs.query({ active: true, currentWindow: true }, function queryCallback(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type }, function messageCallback(response) {
            button.innerHTML = response;
        });
    });
}

function myBugsMain() {
    const button = document.getElementById('toggleMyBugs');

    console.log('here');

    setText(button, 'init');

    console.log('error');

    button.addEventListener('click', () => setText(button, 'toggle'));
}

document.addEventListener('DOMContentLoaded', myBugsMain, false);