import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyCFgUANX2ugW4p2HyifreVZMEztVKeZyEI',
    authDomain: 'seoul-spice-app.firebaseapp.com',
    projectId: 'seoul-spice-app',
    storageBucket: 'seoul-spice-app.appspot.com',
    messagingSenderId: '111443962367',
    appId: '1:111443962367:web:8c3347c12b8bdb15065fca',
    measurementId: 'G-HSK67D3X5P'
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account'
});

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    const name = result.user.displayName;

    localStorage.setItem('name', name!);
  }).catch((error) => {
    console.log(error);
  });
};