// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getDatabase, ref, onChildAdded, set } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDBBhhE_M889rvk-SZG0-wLoVGQ1H-cpL0",
    authDomain: "caht-lamo-xd.firebaseapp.com",
    projectId: "caht-lamo-xd",
    storageBucket: "caht-lamo-xd.appspot.com",
    messagingSenderId: "130013046895",
    appId: "1:130013046895:web:b2efcb202960f8a2b4859a",
    databaseURL: "https://caht-lamo-xd-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a referance to the service
const db = getDatabase(app);

// Create referance, where in the database
const chatRef = ref(db, '/chat');

// Listen to database changes
onChildAdded(chatRef, function (data) {

    // Create message element and append to list element
    console.log("testing, testing");

    const message = document.createElement("li");
    message.innerText = data.val();
    list.appendChild(message);

});

// Chat
const input = document.querySelector("input");
const list = document.querySelector("ul");

input.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {

        // Create "unique" id for message
        const messageId = Date.now();

        // Send to database
        set(ref(db, 'chat/' + messageId), input.value);
        // Clear input
        input.value = "";
    }
});