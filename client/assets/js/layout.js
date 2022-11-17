console.log('layout.js');
const loginForm = document.querySelector('#login');

const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#psw');




loginForm.onsubmit = login;

// loginBtn.addEventListener('click', () => {
//     window.location.href = `${window.location.href}login` 
// })

// signUpBtn.addEventListener('click', () => {
//     window.location.href = `${window.location.href}signup` 
// })

// const connectToBackendTest = async () => {
//     let url = 'https://trackit-sillicon-alley.herokuapp.com/';
//     const testRoot = await fetch(url);
//     const data = await testRoot.text();
//     console.log(data);
//     return data;
// }

// connectToBackendTest();
