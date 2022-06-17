# Social App Cool
> It's a simple social app web you can interact with other users !
> Regiter an account to get start 🐶.


## Demo
Here is a working live demo :  [_here_](https://social-app-cool.web.app)

## Technologies Used
- [React](https://zh-hant.reactjs.org/) - a JavaScript library for building user interfaces.
- [Firebase](https://firebase.google.com/) - a BaaS(Backend-as-a-Service) plaform, which has services like Authentication, Firestore database, Storage and Hosting for rapid full stack web development.
- [Semantic UI React](https://react.semantic-ui.com/) - provides useful components for making site-styling easier.
- [React Router](https://reactrouter.com/) - helps implementing clint-side routing.

## Features
- Register, Login and Logout with email.
- Posting posts, leaving some comments under other's posts, and also liking or saving posts if you want. 
- Modifying member information like name, photo and password.
- Checking the posts you posted or saved.
- Filtering posts via topics.
- Infinite scrolling for loading new posts seamlessly.

## Screenshots

## Setup for local running
1. Install node.js
2. clone the repo and install dependencies.
```
git clone https://github.com/jay-repos/social-app-cool social-app-cool
cd social-app-cool
npm install
```
beacause the semantic-ui modules reqiures react@17 and we are using react@18 here,we we add "--force".
(ps. You can simply choose react@17)
```
npm i semantic-ui-react semantic-ui-css --force
```
3. create a firebase project and enable servives include email authentication, firestore database, storage.
Add the code below to src/utils/firebase.js
(you can get your firebaseConfig after seting your firebase project,
and paste your config in this file.)
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
4. start running
```
npm start
```

## Acknowledgements
- This project was based on [this tutorial](https://www.youtube.com/watch?v=EwvFcFpZWio&list=PLddLA9QpG2T2__tPfi6nwaL8Rf_wWQaz7).
- Many thanks to [React](https://zh-hant.reactjs.org/) [Firebase](https://firebase.google.com/) [Semantic UI React](https://react.semantic-ui.com/) [React Router](https://reactrouter.com/) and people share informations on internet!
