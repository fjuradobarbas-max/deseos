import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
    query
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

/* ==========================
   FIREBASE
========================== */

const firebaseConfig = {

    apiKey: "AIzaSyDZlE0HZjZPD8V6VzYn-v3bgSL-x1ATlfY",

    authDomain:
        "deseos-88665.firebaseapp.com",

    projectId:
        "deseos-88665",

    storageBucket:
        "deseos-88665.firebasestorage.app",

    messagingSenderId:
        "269637083435",

    appId:
        "1:269637083435:web:afb187f0ef899a19c9a56e"

};

const app =
    initializeApp(firebaseConfig);

const db =
    getFirestore(app);

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

const selectedUserText =
    document.getElementById('selected-user');

const selectedWish =
    document.getElementById('selected-wish');

const wishText =
    document.getElementById('wish-text');

const cloudContainer =
    document.getElementById('cloud-container');

const historyContainer =
    document.getElementById('history-container');

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

function renderWish(docId, data) {

    const cloud =
        document.createElement('div');

    cloud.className =
        data.className;

    cloud.textContent =
        data.text;

    cloud.dataset.id =
        docId;

    cloud.addEventListener('click', function () {

        selectedCloud = {
            id: docId,
            text: data.text,
            className: data.className
        };

        selectedWish.textContent =
            data.text;

        showScreen(detailScreen);

    });

    cloudContainer.appendChild(cloud);

}

function renderCompleted(docId, data) {

    const item =
        document.createElement('div');

    item.classList.add('history-item');

    const title =
        document.createElement('div');

    title.textContent =
        data.text;

    const restoreButton =
        document.createElement('button');

    restoreButton.classList.add('restore-btn');

    restoreButton.textContent =
        'Reincorporar';

    restoreButton.addEventListener(
        'click',
        async function () {

            await addDoc(
                collection(db, 'wishes'),
                {
                    text: data.text,
                    className: data.className,
                    author: data.author
                }
            );

            await deleteDoc(
                doc(
                    db,
                    'completed_wishes',
                    docId
                )
            );

        }
    );

    item.appendChild(title);
    item.appendChild(restoreButton);

    historyContainer.appendChild(item);

}

onSnapshot(

    query(
        collection(
            db,
            'wishes'
        )
    ),

    function (snapshot) {

        cloudContainer.innerHTML = '';

        snapshot.forEach(function (documento) {

            renderWish(
                documento.id,
                documento.data()
            );

        });

    }

);
showScreen(homeScreen);