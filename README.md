npm i react-scripts react react-dom react-router-dom
npm i semantic-ui-react semantic-ui-css --force
//beacause the modules reqiures react@17 and we are using react@18 here,
//we we add "--force".
//"import 'semantic-ui-css/semantic.min.css' "won't work here.
//we add

<link
    async
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
/>
//to 'index.html' instead.
npm i firebase