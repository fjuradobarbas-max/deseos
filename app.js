let selectedUser = '';
let selectedCloud = null;

const homeScreen = document.getElementById('home-screen');
const editorScreen = document.getElementById('editor-screen');
const cloudScreen = document.getElementById('cloud-screen');
const detailScreen = document.getElementById('detail-screen');
const historyScreen = document.getElementById('history-screen');

const selectedUserText = document.getElementById('selected-user');
const selectedWish = document.getElementById('selected-wish');

const wishText = document.getElementById('wish-text');

const cloudContainer = document.getElementById('cloud-container');
const historyContainer = document.getElementById('history-container');

/* ==========================
   PANTALLAS
========================== */

function hideAllScreens() {

    homeScreen.classList.add('hidden');
    editorScreen.classList.add('hidden');
    cloudScreen.classList.add('hidden');
    detailScreen.classList.add('hidden');
    historyScreen.classList.add('hidden');

}

function showScreen(screen) {

    hideAllScreens();

    screen.classList.remove('hidden');

}

/* ==========================
   LOCAL STORAGE
========================== */

function saveData() {

    const clouds = [];
    const history = [];

    document
        .querySelectorAll('#cloud-container .cloud')
        .forEach(function (cloud) {

            clouds.push({
                text: cloud.textContent,
                className: cloud.className
            });

        });

    document
        .querySelectorAll('.history-item')
        .forEach(function (item) {

            history.push({
                text: item.dataset.text,
                className: item.dataset.classname
            });

        });

    localStorage.setItem(
        'deseos_clouds',
        JSON.stringify(clouds)
    );

    localStorage.setItem(
        'deseos_history',
        JSON.stringify(history)
    );

}

function loadData() {

    const clouds =
        JSON.parse(
            localStorage.getItem('deseos_clouds')
        ) || [];

    const history =
        JSON.parse(
            localStorage.getItem('deseos_history')
        ) || [];

    clouds.forEach(function (cloud) {

        createCloud(
            cloud.text,
            cloud.className
        );

    });

    history.forEach(function (item) {

        createHistoryItem(
            item.text,
            item.className
        );

    });

}

/* ==========================
   DESEOS ACTIVOS
========================== */

function createCloud(text, className) {

    const cloud =
        document.createElement('div');

    cloud.className = className;

    cloud.textContent = text;

    cloud.addEventListener('click', function () {

        selectedCloud = cloud;

        selectedWish.textContent =
            cloud.textContent;

        showScreen(detailScreen);

    });

    cloudContainer.appendChild(cloud);

    return cloud;

}

/* ==========================
   HISTORICO
========================== */

function createHistoryItem(text, className) {

    const item =
        document.createElement('div');

    item.classList.add('history-item');

    item.dataset.text = text;
    item.dataset.classname = className;

    const content =
        document.createElement('div');

    content.textContent = text;

    const restoreButton =
        document.createElement('button');

    restoreButton.classList.add('restore-btn');

    restoreButton.textContent =
        'Reincorporar';

    restoreButton.addEventListener('click', function () {

        createCloud(
            text,
            className
        );

        item.remove();

        saveData();

    });

    item.appendChild(content);
    item.appendChild(restoreButton);

    historyContainer.appendChild(item);

}

function moveToHistory(cloud) {

    createHistoryItem(
        cloud.textContent,
        cloud.className
    );

    cloud.remove();

    saveData();

}

/* ==========================
   INICIO
========================== */

showScreen(homeScreen);

loadData();

/* ==========================
   USUARIOS
========================== */

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

/* ==========================
   NAVEGACION
========================== */

document
    .getElementById('back-btn')
    .addEventListener('click', function () {

        showScreen(homeScreen);

    });

document
    .getElementById('cloud-back-btn')
    .addEventListener('click', function () {

        showScreen(editorScreen);

    });

document
    .getElementById('detail-back-btn')
    .addEventListener('click', function () {

        showScreen(cloudScreen);

    });

document
    .getElementById('history-btn')
    .addEventListener('click', function () {

        showScreen(historyScreen);

    });

document
    .getElementById('history-back-btn')
    .addEventListener('click', function () {

        showScreen(editorScreen);

    });

/* ==========================
   CREAR DESEO
========================== */

document
    .getElementById('next-btn')
    .addEventListener('click', function () {

        const text =
            wishText.value.trim();

        if (text === '') {

            alert('Escribe un deseo');

            return;
        }

        createCloud(
            text,
            `cloud ${selectedUser.toLowerCase()}`
        );

        wishText.value = '';

        saveData();

        showScreen(cloudScreen);

    });

/* ==========================
   CUMPLIDO
========================== */

document
    .getElementById('complete-btn')
    .addEventListener('click', function () {

        if (selectedCloud) {

            moveToHistory(selectedCloud);

            selectedCloud = null;

        }

        showScreen(cloudScreen);

    });