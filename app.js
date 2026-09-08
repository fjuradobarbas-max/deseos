let selectedUser = '';

const homeScreen = document.getElementById('home-screen');
const editorScreen = document.getElementById('editor-screen');
const cloudScreen = document.getElementById('cloud-screen');

const selectedUserText =
    document.getElementById('selected-user');

const cloudContainer =
    document.getElementById('cloud-container');

document
    .getElementById('fernando-btn')
    .addEventListener('click', () => {

        selectedUser = 'Fernando';

        selectedUserText.textContent =
            selectedUser;

        homeScreen.classList.add('hidden');
        editorScreen.classList.remove('hidden');
    });

document
    .getElementById('debora-btn')
    .addEventListener('click', () => {

        selectedUser = 'Debora';

        selectedUserText.textContent =
            selectedUser;

        homeScreen.classList.add('hidden');
        editorScreen.classList.remove('hidden');
    });

document
    .getElementById('back-btn')
    .addEventListener('click', () => {

        editorScreen.classList.add('hidden');
        homeScreen.classList.remove('hidden');
    });

document
    .getElementById('next-btn')
    .addEventListener('click', () => {

        const text =
            document.getElementById('wish-text').value;

        if (!text.trim()) {

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

        cloudContainer.appendChild(cloud);

        document.getElementById('wish-text').value = '';

        editorScreen.classList.add('hidden');
        cloudScreen.classList.remove('hidden');
    });