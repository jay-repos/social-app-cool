# Social App Cool
> It's a simple social app web you can interact with other users !
> Regiter an account to get start 🐶.


## Demo
Here is a working live demo :  [_here_](https://social-app-cool.web.app)

## Technologies Used
- [React](https://zh-hant.reactjs.org/) - a JavaScript library for building user interfaces.
- [Firebase](https://firebase.google.com/) - a BaaS(Backend-as-a-Service) plaform, which has services like authentication, realtime database, storage and hosting for rapid full stack web development.
- [Semantic UI React](https://react.semantic-ui.com/) - provides useful components for making site-styling easier.
- [React Router](https://reactrouter.com/) - helps implementing clint-side routing.

## Features
- Regiter, Login and Logout with email.
- Posting posts, leaving some comments under other's posts, and also liking or saving posts if you want. 
- Modifying member information like name, photo and password.
- Checking the posts you posted or saved.
- Filtering posts via topics.
- Infinite scrolling for loading new posts seamlessly.

## Screenshots

## Setup
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

## Acknowledgements
Give credit here.
- This project was inspired by...
- This project was based on [this tutorial](https://www.example.com).
- Many thanks to...
