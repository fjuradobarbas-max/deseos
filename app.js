let selectedUser = '';

const homeScreen = document.getElementById('home-screen');
const editorScreen = document.getElementById('editor-screen');
const cloudScreen = document.getElementById('cloud-screen');
const detailScreen = document.getElementById('detail-screen');
const historyScreen = document.getElementById('history-screen');

let selectedCloud = null;

const selectedWish = document.getElementById('selected-wish');

const selectedUserText = document.getElementById('selected-user');
const cloudContainer = document.getElementById('cloud-container');
const historyContainer = document.getElementById('history-container');
const wishText = document.getElementById('wish-text');

/*
    Oculta todas las pantallas
*/
function hideAllScreens() {

    homeScreen.classList.add('hidden');
    editorScreen.classList.add('hidden');
    cloudScreen.classList.add('hidden');
    detailScreen.classList.add('hidden');
    historyScreen.classList.add('hidden');

}

/*
    Muestra una pantalla
*/
function showScreen(screen) {

    hideAllScreens();

    screen.classList.remove('hidden');

}

/*
    Envía un deseo al histórico
*/
function moveToHistory(cloud) {

    const item = document.createElement('div');

    item.classList.add('history-item');

    const text = document.createElement('div');

    text.textContent = cloud.textContent;

    const restoreButton =
        document.createElement('button');

    restoreButton.classList.add('restore-btn');

    restoreButton.textContent =
        'Reincorporar';

    restoreButton.addEventListener('click', function () {

        const restored =
            document.createElement('div');

        restored.className =
            cloud.className;

        restored.textContent =
            cloud.textContent;

        restored.addEventListener('click', function () {

            selectedCloud = restored;

            selectedWish.textContent =
                restored.textContent;

            showScreen(detailScreen);

        });

        cloudContainer.appendChild(restored);

        item.remove();

    });

    item.appendChild(text);

    item.appendChild(restoreButton);

    historyContainer.appendChild(item);

    cloud.remove();

}

/*
    Arranque
*/
showScreen(homeScreen);

/*
    Fernando
*/
document
    .getElementById('fernando-btn')
    .addEventListener('click', function () {

        selectedUser = 'Fernando';

        selectedUserText.textContent =
            selectedUser;

        showScreen(editorScreen);

    });

/*
    Debora
*/
document
    .getElementById('debora-btn')
    .addEventListener('click', function () {

        selectedUser = 'Debora';

        selectedUserText.textContent =
            selectedUser;

        showScreen(editorScreen);

    });

/*
    Volver a inicio
*/
document
    .getElementById('back-btn')
    .addEventListener('click', function () {

        showScreen(homeScreen);

    });

/*
    Volver desde nube
*/
document
    .getElementById('cloud-back-btn')
    .addEventListener('click', function () {

        showScreen(editorScreen);

    });

/*
    Abrir histórico
*/
document
    .getElementById('history-btn')
    .addEventListener('click', function () {

        showScreen(historyScreen);

    });

/*
    Volver del histórico
*/
document
    .getElementById('history-back-btn')
    .addEventListener('click', function () {

        showScreen(editorScreen);

    });

/*
    Crear deseo
*/
document
    .getElementById('next-btn')
    .addEventListener('click', function () {

        const text = wishText.value.trim();

        if (text === '') {

            alert('Escribe un deseo');

            return;

        }

        const cloud =
            document.createElement('div');

        cloud.classList.add('cloud');

        if (selectedUser === 'Fernando') {

            cloud.classList.add('fernando');

        } else {

            cloud.classList.add('debora');

        }

        cloud.textContent = text;

        cloud.addEventListener('click', function () {

            selectedCloud = cloud;

            selectedWish.textContent =
                cloud.textContent;

            showScreen(detailScreen);

        });

        cloudContainer.appendChild(cloud);

        wishText.value = '';

        showScreen(cloudScreen);

    });

/*
    Volver detalle
*/
document
    .getElementById('detail-back-btn')
    .addEventListener('click', function () {

        showScreen(cloudScreen);

    });

/*
    Cumplido
*/
document
    .getElementById('complete-btn')
    .addEventListener('click', function () {

        if (selectedCloud) {

            moveToHistory(selectedCloud);

            selectedCloud = null;

        }

        showScreen(cloudScreen);

    });