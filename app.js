let selectedUser = '';

const homeScreen = document.getElementById('home-screen');
const editorScreen = document.getElementById('editor-screen');
const cloudScreen = document.getElementById('cloud-screen');

const selectedUserText = document.getElementById('selected-user');
const cloudContainer = document.getElementById('cloud-container');
const wishText = document.getElementById('wish-text');

function showScreen(screen) {

    homeScreen.classList.add('hidden');
    editorScreen.classList.add('hidden');
    cloudScreen.classList.add('hidden');

    screen.classList.remove('hidden');
}

showScreen(homeScreen);

document
    .getElementById('fernando-btn')
    .addEventListener('click', () => {

        selectedUser = 'Fernando';

        selectedUserText.textContent = selectedUser;

        showScreen(editorScreen);
    });

document
    .getElementById('debora-btn')
    .addEventListener('click', () => {

        selectedUser = 'Debora';

        selectedUserText.textContent = selectedUser;

        showScreen(editorScreen);
    });

document
    .getElementById('back-btn')
    .addEventListener('click', () => {

        showScreen(homeScreen);
    });

document
    .getElementById('next-btn')
    .addEventListener('click', () => {

        const text = wishText.value.trim();

        if (!text) {
            alert('Escribe un deseo');
            return;
        }

        const cloud = document.createElement('div');

        cloud.className = `cloud ${selectedUser.toLowerCase()}`;

        cloud.textContent = text;

        cloudContainer.appendChild(cloud);

        wishText.value = '';

        showScreen(cloudScreen);
    });