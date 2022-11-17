const editBtn = document.querySelector('#edit-btn');
const settingsBtn = document.querySelector('#settings-btn');

const editProfSection = document.querySelector('#edit-profile');
const settingsSection = document.querySelector('#settings');

// edit profile & settings btns
const editSubmitBtn = document.querySelector('#edit-profile > #submit-name');
const saveEmailBtn = document.querySelector('#settings > #save-email'); 
const savePassBtn = document.querySelector('#settings > #save');

// cancel buttons
const cancelEditBtn = document.querySelector('#edit-profile > #edit-cancel');
const cancelSettBtn = document.querySelector('#settings > #pass-cancel');

// edit profile & settings var
const nameInput = document.querySelector('#edit-name');
const eEmailInput = document.querySelector('#edit-email');
const oldPassInput = document.querySelector('#oldPass');
const newPassInput = document.querySelector('#newPass');
const samePassInput = document.querySelector('#samePass');

editBtn.addEventListener('click', showProfileForm);
settingsBtn.addEventListener('click', showSettings);

editSubmitBtn.addEventListener('click', updateProfile);
saveEmailBtn.addEventListener('click', updateEmail);
savePassBtn.addEventListener('click', addNewSettings);

cancelEditBtn.addEventListener('click', (e) => {
    editProfSection.style.display = 'none';
    displayMsg(1, false, 'pos');
});
cancelSettBtn.addEventListener('click', (e) => {
    settingsSection.style.display = 'none';
    resetMsg();
});

const userId = 6;

function editProfile(e){
    e.preventDefault()
    editProfSection.style.display = 'block';
}

async function showProfileForm(e){
    const data = await getItem('users', userId)
    nameInput.value = data.name
    editProfile(e)
}

// when submit pressed update name only
async function updateProfile (e) {
    e.preventDefault()
    const data = await getItem('users', userId);
    data.name = nameInput.value;
    // console.log(`id: ${data.id} n: ${data.name}, e: ${data.email}, p: ${data.password}`);
    update('users', data); 
    displayMsg(1, true, 'pos');
}

function settings(e){
    e.preventDefault()
    settingsSection.style.display = 'block';
}

async function showSettings(e){
    const data = await getItem('users', userId);
    eEmailInput.value = data.email;
    settings(e);
}

// need to add compare email not same as someone elses
async function updateEmail(e){
    e.preventDefault()
    const data = await getItem('users', userId);

    // compare email to all users
    const allUsers = await getAll('users');
    let sameEmail = isSameEmail(allUsers)
    // console.log('sameEmail: '+sameEmail)

    if(!sameEmail) {
        displayMsg(1, sameEmail, 'err');
        data.email = eEmailInput.value;
        // console.log(`n: ${data.name}, e: ${data.email}, p: ${data.password}`);
        await update('users', data);
        console.log('email updated')
        displayMsg(2, true, 'pos')
    } else displayMsg(1, sameEmail, 'err')
}

function isSameEmail(users){
    return users.find(d => eEmailInput.value === d.email) 
}

//to test original pass is sam / a
//email sam3@gmail.com
async function addNewSettings(e){
    e.preventDefault()
    let stop = false

    // repeat passes not same then...
    if(samePassInput.value !== newPassInput.value) stop = displayMsg(3, true, 'err')
    else stop = displayMsg(3, false, 'err')

    if(!stop){
        const isPassed = await passwordCheck(userId, oldPassInput.value, newPassInput.value)
        // console.log('p.isPassed: '+ isPassed.toString()) 
        if(!isPassed) return displayMsg(2, true, 'err')
        displayMsg(2, false, 'err')
        displayMsg(3, true, 'pos')
        resetPassFields();
    }
}

function displayMsg(id, bool, type){
    const htmlTag = document.querySelector(`#${type}-msg-${id}`);
    if(bool) htmlTag.style.display = 'block';
    else htmlTag.style.display = 'none';
    return bool;
}

function resetMsg(){
    let index = 0;
    let type = ['err', 'pos']
    while(index < 2){
        for(let id=1; id <= 3; id++){
            let htmlTag = document.querySelector(`#${type[index]}-msg-${id}`);
            htmlTag.style.display = 'none';
        }
        index++;
    }
    return index; // use this to test reset
}

function resetPassFields(){
    oldPassInput.value = null
    newPassInput.value = null
    samePassInput.value = null
}

async function display(){
    const name = document.querySelector('#profile-name');
    const email = document.querySelector('#email');
    const habits = document.querySelector('#habits');

    // gets user name, email and pass
    const userData = await getItem('users', userId);

    name.textContent = userData.name;
    email.textContent = userData.email;

    const userHabits = await getUserHabits(userId);
    habits.textContent = "Habits: " + userHabits.length;
}

display();
