import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    deleteDoc,
    doc,
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

/* ==========================
   VARIABLES
========================== */

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

const activeCount =
    document.getElementById('active-count');

const completedCount =
    document.getElementById('completed-count');

const emptyHistory =
    document.getElementById('empty-history');

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

showScreen(homeScreen);

/* ==========================
   RENDER DESEOS
========================== */

function renderWish(docId, data) {

    const cloud =
        document.createElement('div');

    cloud.className =
        data.className;
    cloud.style.animationDuration =
    (8 + Math.random() * 8) + 's';

    cloud.style.animationDelay =
    (Math.random() * 4) + 's';

    cloud.textContent =
        data.text;

    cloud.dataset.id =
        docId;
        const columns = 4;

const columnWidth = 250;

const rowHeight = 120;

cloud.style.left =
    (data.posX * columnWidth) + 'px';

cloud.style.top =
    (data.posY * rowHeight) + 'px';

const maxX =
    window.innerWidth - 350;

const maxY = 550;

cloud.style.left =
    Math.floor(
        Math.random() * maxX
    ) + 'px';

cloud.style.top =
    Math.floor(
        Math.random() * maxY
    ) + 'px';

    cloud.addEventListener('click', function () {

        selectedCloud = {
            id: docId,
            text: data.text,
            className: data.className,
            author: data.author
        };

        selectedWish.textContent =
            data.text;

        showScreen(detailScreen);

    });

    cloudContainer.appendChild(cloud);

}

/* ==========================
   RENDER HISTORICO
========================== */

function renderCompleted(docId, data) {

    const item =
        document.createElement('div');

    item.classList.add(
        'history-item'
    );

    const title =
        document.createElement('div');

    title.textContent =
        data.text;
    const completedDate =
    document.createElement('div');

completedDate.style.fontSize =
    '12px';

completedDate.style.color =
    '#777';

completedDate.style.marginTop =
    '8px';

completedDate.textContent =
    'Cumplido: ' +
    new Date(
        data.completedAt
    ).toLocaleString();

    const restoreButton =
        document.createElement('button');

    restoreButton.classList.add(
        'restore-btn'
    );

    restoreButton.textContent =
        'Reincorporar';

    restoreButton.addEventListener(
        'click',
        async function () {

await addDoc(
    collection(db, 'wishes'),
    {
        text: text,
        author: selectedUser,
        className:
            `cloud ${selectedUser.toLowerCase()}`,

        posX:
            Math.floor(Math.random() * 4),

        posY:
            Math.floor(Math.random() * 6),

        createdAt:
            Date.now()
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

    item.appendChild(completedDate);

    item.appendChild(
        restoreButton
    );

    historyContainer.appendChild(
        item
    );

}

/* ==========================
   FIRESTORE TIEMPO REAL
========================== */

onSnapshot(

    query(
        collection(
            db,
            'wishes'
        )
    ),

    function (snapshot) {

        cloudContainer.innerHTML = '';
        
        activeCount.textContent =
        `💙 Activos: ${snapshot.size}`;

        snapshot.forEach(
            function (documento) {

                renderWish(
                    documento.id,
                    documento.data()
                );

            }
        );

    }

);

onSnapshot(

    query(
        collection(
            db,
            'completed_wishes'
        )
    ),

    function (snapshot) {

        historyContainer.innerHTML = '';

        completedCount.textContent =
    `⭐ Cumplidos: ${snapshot.size}`;

if (snapshot.size === 0) {

    emptyHistory.style.display =
        'block';

} else {

    emptyHistory.style.display =
        'none';

}

        snapshot.forEach(
            function (documento) {

                renderCompleted(
                    documento.id,
                    documento.data()
                );

            }
        );

    }

);

/* ==========================
   USUARIOS
========================== */

document
    .getElementById(
        'fernando-btn'
    )
    .addEventListener(
        'click',
        function () {

            selectedUser =
                'Fernando';

            selectedUserText.textContent =
                selectedUser;

            showScreen(
                editorScreen
            );

        }
    );

document
    .getElementById(
        'debora-btn'
    )
    .addEventListener(
        'click',
        function () {

            selectedUser =
                'Debora';

            selectedUserText.textContent =
                selectedUser;

            showScreen(
                editorScreen
            );

        }
    );

/* ==========================
   NAVEGACION
========================== */

document
    .getElementById(
        'back-btn'
    )
    .addEventListener(
        'click',
        function () {

            showScreen(
                homeScreen
            );

        }
    );

document
    .getElementById(
        'detail-back-btn'
    )
    .addEventListener(
        'click',
        function () {

            showScreen(
                homeScreen
            );

        }
    );
    
    completedCount.addEventListener(
    'click',
    function () {

        showScreen(
            historyScreen
        );

    }
);


document
    .getElementById(
        'history-back-btn'
    )
    .addEventListener(
        'click',
        function () {

            showScreen(
                homeScreen
            );

        }
    );

/* ==========================
   GUARDAR DESEO
========================== */

document
    .getElementById(
        'save-btn'
    )
    .addEventListener(
        'click',
        async function () {

            const text =
                wishText.value.trim();

            if (!text) {

                alert(
                    'Escribe un deseo'
                );

                return;

            }

            await addDoc(
                collection(
                    db,
                    'wishes'
                ),
                {
                    text: text,
                    author:
                        selectedUser,
                    className:
                        `cloud ${selectedUser.toLowerCase()}`,
                    createdAt:
                        Date.now()
                }
            );

            wishText.value = '';

            showScreen(
                homeScreen
            );

        }
    );

/* ==========================
   CUMPLIDO
========================== */

document
    .getElementById(
        'complete-btn'
    )
    .addEventListener(
        'click',
        async function () {

            if (
                !selectedCloud
            ) {
                return;
            }

            await addDoc(
                collection(
                    db,
                    'completed_wishes'
                ),
                {
                    text:
                        selectedCloud.text,

                    className:
                        selectedCloud.className,

                    author:
                        selectedCloud.author,

                    completedAt:
                        Date.now()
                }
            );

            await deleteDoc(
                doc(
                    db,
                    'wishes',
                    selectedCloud.id
                )
            );

            selectedCloud =
                null;

            showScreen(
                homeScreen
            );

        }
    );