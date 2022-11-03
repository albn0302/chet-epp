// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getDatabase, ref, onChildAdded, set } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js"
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";

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
// Authentication
// -----------------------------------------------------------------
// Set variable with Bootstrap modal
const loginModal = new bootstrap.Modal('#login-modal');
loginModal.show();

// Listen for click on login button
document.querySelector("#login-button").addEventListener("click", function login() {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const auth = getAuth();

    // Sign in with Firebase
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);

            // Hide modal
            loginModal.hide();

            // Call function to init database
            initDatabase();
        })
        .catch((error) => {
            console.log(error);
        });
});

// Initialize Realtime Database and get a referance to the service
const db = getDatabase(app);
function initDatabase() {

    // Create referance, where in the database
    const chatRef = ref(db, '/chat');

    // Listen to database changes
    onChildAdded(chatRef, function (data) {

        // Create message element and append to list element
        const message = document.createElement("li");
        message.innerText = new Date(data.key).toLocaleString("fi-FI") + " : " + data.val();
        list.appendChild(message);

    });
};

// New message
const input = document.querySelector("input");
const list = document.querySelector("ul");

input.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {

        // Create "unique" id for message
        const messageId = new Date().toUTCString();

        // Send to database
        set(ref(db, 'chat/' + messageId), input.value);
        // Clear input
        input.value = "";
    }
});