let selectedUser = '';

const homeScreen = document.getElementById('home-screen');
const editorScreen = document.getElementById('editor-screen');
const cloudScreen = document.getElementById('cloud-screen');

const selectedUserText = document.getElementById('selected-user');
const cloudContainer = document.getElementById('cloud-container');
const wishText = document.getElementById('wish-text');

/*
    Oculta todas las pantallas
*/
function hideAllScreens() {

    homeScreen.classList.add('hidden');
    editorScreen.classList.add('hidden');
    cloudScreen.classList.add('hidden');

}

/*
    Muestra una pantalla
*/
function showScreen(screen) {

    hideAllScreens();

    screen.classList.remove('hidden');

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

        selectedUserText.textContent = selectedUser;

        showScreen(editorScreen);

    });

/*
    Debora
*/
document
    .getElementById('debora-btn')
    .addEventListener('click', function () {

        selectedUser = 'Debora';

        selectedUserText.textContent = selectedUser;

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
    Volver desde la nube
*/
document
    .getElementById('cloud-back-btn')
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

        const cloud = document.createElement('div');

        cloud.classList.add('cloud');

        if (selectedUser === 'Fernando') {

            cloud.classList.add('fernando');

        } else {

            cloud.classList.add('debora');

        }

        cloud.textContent = text;

        cloudContainer.appendChild(cloud);

        wishText.value = '';

        showScreen(cloudScreen);

    });