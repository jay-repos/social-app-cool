# Social App Cool
> It's a simple social app web you can interact with our users !
> 
> You can Regiter an account to get start 🐶.
> Click [_here_](social-app-cool.web.app).



```
npm i semantic-ui-react semantic-ui-css --force
```
beacause the modules reqiures react@17 and we are using react@18 here,we we add "--force".
instead, "import 'semantic-ui-css/semantic.min.css' "won't work here.
we add
```
<link
    async
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
/>
```
to 'index.html' to solve this problem.
(ps. You can simply choose react@17)


Add the code below to src/utils/firebase.js
(you can get your firebaseConfig after seting your firebase project,
and paste con config in this file.)
```javascript
// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: ***,
  authDomain: ***,
  projectId: ***,
  storageBucket: ***,
  messagingSenderId: ***,
  appId: ***
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase
```
