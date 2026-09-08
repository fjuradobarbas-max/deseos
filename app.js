let selectedUser = '';

const homeScreen = document.getElementById('home-screen');
const editorScreen = document.getElementById('editor-screen');

const selectedUserText = document.getElementById('selected-user');

// Prueba temporal
alert('app.js cargado');

document
    .getElementById('fernando-btn')
    .addEventListener('click', () => {

        selectedUser = 'Fernando';

        selectedUserText.textContent = selectedUser;

        homeScreen.classList.add('hidden');
        editorScreen.classList.remove('hidden');
    });

document
    .getElementById('debora-btn')
    .addEventListener('click', () => {

        selectedUser = 'Debora';

        selectedUserText.textContent = selectedUser;

        homeScreen.classList.add('hidden');
        editorScreen.classList.remove('hidden');
    });

document
    .getElementById('back-btn')
    .addEventListener('click', () => {

        editorScreen.classList.add('hidden');
        homeScreen.classList.remove('hidden');
    });