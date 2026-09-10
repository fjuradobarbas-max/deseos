let selectedUser = '';
let selectedCloud = null;

let activeWishes = [];
let completedWishes = [];

const homeScreen = document.getElementById('home-screen');
const editorScreen = document.getElementById('editor-screen');
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

    localStorage.setItem(
        'activeWishes',
        JSON.stringify(activeWishes)
    );

    localStorage.setItem(
        'completedWishes',
        JSON.stringify(completedWishes)
    );

}

function loadData() {

    activeWishes =
        JSON.parse(
            localStorage.getItem('activeWishes')
        ) || [];

    completedWishes =
        JSON.parse(
            localStorage.getItem('completedWishes')
        ) || [];

    renderClouds();
    renderHistory();

}

/* ==========================
   RENDER
========================== */

function renderClouds() {

    cloudContainer.innerHTML = '';

    activeWishes.forEach(function (wish) {

        createCloud(
            wish.text,
            wish.className,
            false
        );

    });

}

function renderHistory() {

    historyContainer.innerHTML = '';

    completedWishes.forEach(function (wish) {

        createHistoryItem(
            wish.text,
            wish.className,
            false
        );

    });

}

/* ==========================
   DESEOS ACTIVOS
========================== */

function createCloud(
    text,
    className,
    save = true
) {

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

    if (save) {

        activeWishes.push({
            text,
            className
        });

        saveData();

    }

}

/* ==========================
   HISTORICO
========================== */

function createHistoryItem(
    text,
    className,
    save = true
) {

    const item =
        document.createElement('div');

    item.classList.add('history-item');

    const content =
        document.createElement('div');

    content.textContent =
        text;

    const restore =
        document.createElement('button');

    restore.classList.add('restore-btn');

    restore.textContent =
        'Reincorporar';

    restore.addEventListener('click', function () {

        createCloud(
            text,
            className,
            true
        );

        completedWishes =
            completedWishes.filter(
                wish =>
                    !(
                        wish.text === text &&
                        wish.className === className
                    )
            );

        item.remove();

        saveData();

    });

    item.appendChild(content);
    item.appendChild(restore);

    historyContainer.appendChild(item);

    if (save) {

        completedWishes.push({
            text,
            className
        });

        saveData();

    }

}

function moveToHistory(cloud) {

    const text =
        cloud.textContent;

    const className =
        cloud.className;

    activeWishes =
        activeWishes.filter(
            wish =>
                !(
                    wish.text === text &&
                    wish.className === className
                )
        );

    createHistoryItem(
        text,
        className,
        true
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

/* ==========================
   GUARDAR DESEO
========================== */

document
    .getElementById('save-btn')
    .addEventListener('click', function () {

        const text =
            wishText.value.trim();

        if (!text) {

            alert('Escribe un deseo');

            return;

        }

        createCloud(
            text,
            `cloud ${selectedUser.toLowerCase()}`
        );

        wishText.value = '';

        showScreen(homeScreen);

    });

/* ==========================
   CUMPLIDO
========================== */

document
    .getElementById('complete-btn')
    .addEventListener('click', function () {

        if (!selectedCloud) {

            return;

        }

        moveToHistory(
            selectedCloud
        );

        selectedCloud = null;

        showScreen(homeScreen);

    });