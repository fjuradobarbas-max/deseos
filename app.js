let selectedUser = '';
let selectedCloud = null;

const homeScreen =
    document.getElementById('home-screen');

const editorScreen =
    document.getElementById('editor-screen');

const detailScreen =
    document.getElementById('detail-screen');

const historyScreen =
    document.getElementById('history-screen');

const cloudContainer =
    document.getElementById('cloud-container');

const historyContainer =
    document.getElementById('history-container');

const selectedWish =
    document.getElementById('selected-wish');

const selectedUserText =
    document.getElementById('selected-user');

const wishText =
    document.getElementById('wish-text');

function hideAllScreens() {

    homeScreen.classList.add('hidden');
    editorScreen.classList.add('hidden');
    detailScreen.classList.add('hidden');
    historyScreen.classList.add('hidden');

}

function showScreen(screen) {

    hideAllScreens();

    screen.classList.remove('hidden');

}

function createCloud(text, className) {

    const cloud =
        document.createElement('div');

    cloud.className =
        className;

    cloud.textContent =
        text;

    cloud.addEventListener('click', function () {

        selectedCloud = cloud;

        selectedWish.textContent =
            cloud.textContent;

        showScreen(detailScreen);

    });

    cloudContainer.appendChild(cloud);

}

function createHistoryItem(text, className) {

    const item =
        document.createElement('div');

    item.classList.add('history-item');

    const title =
        document.createElement('div');

    title.textContent =
        text;

    const restore =
        document.createElement('button');

    restore.classList.add('restore-btn');

    restore.textContent =
        'Reincorporar';

    restore.addEventListener('click', function () {

        createCloud(
            text,
            className
        );

        item.remove();

        saveData();

    });

    item.appendChild(title);
    item.appendChild(restore);

    historyContainer.appendChild(item);

}

function saveData() {

    localStorage.setItem(
        'clouds',
        cloudContainer.innerHTML
    );

    localStorage.setItem(
        'history',
        historyContainer.innerHTML
    );
}

document
.getElementById('fernando-btn')
.addEventListener('click', function () {

    selectedUser = 'Fernando';

    selectedUserText.textContent =
        selectedUser;

    showScreen(editorScreen);

});

document
.getElementById('debora-btn')
.addEventListener('click', function () {

    selectedUser = 'Debora';

    selectedUserText.textContent =
        selectedUser;

    showScreen(editorScreen);

});

document
.getElementById('back-btn')
.addEventListener('click', function () {

    showScreen(homeScreen);

});

document
.getElementById('save-btn')
.addEventListener('click', function () {

    const text = wishText.value.trim();

    if (!text) return;

    createCloud(
        text,
        `cloud ${selectedUser.toLowerCase()}`
    );

    wishText.value = '';

    showScreen(homeScreen);

});

document
.getElementById('detail-back-btn')
.addEventListener('click', function () {

    showScreen(homeScreen);

});

document
.getElementById('history-btn')
.addEventListener('click', function () {

    showScreen(historyScreen);

});

document
.getElementById('history-back-btn')
.addEventListener('click', function () {

    showScreen(homeScreen);

});

document
.getElementById('complete-btn')
.addEventListener('click', function () {

    if (!selectedCloud) return;

    createHistoryItem(
        selectedCloud.textContent,
        selectedCloud.className
    );

    selectedCloud.remove();

    showScreen(homeScreen);

});