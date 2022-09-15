// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAkXIA6YTU0YjoVfFobX9a28AgzP_4Sgmk',
  authDomain: 'cybershit.firebaseapp.com',
  projectId: 'cybershit',
  storageBucket: 'cybershit.appspot.com',
  messagingSenderId: '1055173805125',
  appId: '1:1055173805125:web:62f9f4ba8b8f96e5bc4f2c',
  measurementId: 'G-D349ZFL1EV'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
