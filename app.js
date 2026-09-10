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