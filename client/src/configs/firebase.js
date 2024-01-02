import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyBkC9XRaIXfURi6DPT3V_SyrDLhLx7Vy2k',
    authDomain: 'classroom-project-52472.firebaseapp.com',
    projectId: 'classroom-project-52472',
    storageBucket: 'classroom-project-52472.appspot.com',
    messagingSenderId: '725972366383',
    appId: '1:725972366383:web:e3ab85575b3404505882da',
    measurementId: 'G-FM0X63F130',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
