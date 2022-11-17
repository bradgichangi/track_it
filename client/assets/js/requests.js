// const url = 'https://trackit-sillicon-alley.herokuapp.com'
const url = 'http://localhost:3000'


async function getAll(category){
    try {
        const response = await fetch(`${url}/${category}`);
        const data = await response.json()
        console.log(data)
        return data;
    } catch (err) {
        console.warn(err);
    }
}

async function getItem(category, id) {
    try {
        const response = await fetch(`${url}/${category}/${id}`);
        const data = await response.json();
        console.log(data)
        return data;
    } catch (err) {
        console.warn(err);
    }
}

async function getHabit(id) {
    try {

        data = {
            habit_id: id,
            token: document.cookie.match('(^|;)\\s*' + 'access_token' + '\\s*=\\s*([^;]+)')?.pop()
        }
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }
        
        const response = await fetch(`${url}/habits/${id}`, options);
        const data = await response.json();
        console.log(data)
        return data;
    } catch (err) {
        console.warn(err);
    }
}


async function getUserHabits (id) {
    try {
        const response = await fetch(`${url}/users/${id}/habits`);
        const data = await response.json();
        console.log(data)
        return data;
    } catch (err) {
        console.log(err)
        console.warn(err);
    }
}

async function postHabit(data){

    try {
        console.log(JSON.stringify(data))
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }
        
        const response = await fetch(`${url}/habits`, options);
        const { id, err } = await response.json();
        if(err) { 
            throw Error(err) 
        } else {
            // window.location.hash = `#books/${id}`
        }
    } catch (err) {
        console.warn(err);
    }
}

async function deleteHabit(id){
    try {
        console.log(`Deleting ${id}`)
        const options = { method: 'DELETE' }
        await fetch(`${url}/habits/${id}`, options);
    } catch (err) {
        console.warn(err);
    }
}

async function update (category, data) {
    try {
        console.log(`data: ${data.name}`)
        const options = {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }
        
        const response = await fetch(`${url}/${category}/${data.id}`, options);
        console.log(response)
        const { id, err } = await response.json();
        if(err) { 
            
            throw Error(err) 
        } else {
            // window.location.hash = `#books/${id}`
        }
    } catch (err) {
        
        console.warn(err);
    }
}

// async function updateData (data, category) {
//     // e.preventDefault();
//     try {
//         const options = {
//             method: 'PATCH',
//             headers: { "Content-Type": "application/json" },
//             body: data
//         }
        
//         const response = await fetch(`${url}/${category}/${id}`, options);
//         const { id, err } = await response.json();
//         if(err) { 
//             throw Error(err) 
//         } else {
//             // window.location.hash = `#books/${id}`
//         }
//     } catch (err) {
//         console.warn(err);
//     }
// }

async function login (e) {
    e.preventDefault();
    console.log(emailInput.value);

    console.log(Object.fromEntries(new FormData(e.target)))

    let input = { email: emailInput.value,
    password: passwordInput.value
  }

    try {
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(input)
        }
        
        const response = await fetch(`${url}/users/login`, options);

        const token = await response.json();
        console.log(token);

        document.cookie = `access_token=${token.user}`;

        //client side reload and make the user go through auth
        location.reload();

        //when to path / and make the user go through auth.
        window.location.href = url;

    } catch (err) {
        console.log(err);
    }
}

//login();

async function signup (e) {
    e.preventDefault();
    emailInputSignUp.value
    passwordInputSignUp.value
    signUpForm.value

    console.log(emailInputSignUp);

    const signUpData = { 
                            name: nameInputSignUp.value,
                            password: passwordInputSignUp.value, 
                            email: emailInputSignUp.value 
                        }
    try {
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(signUpData)
        }
        
        const response = await fetch(`${url}/users/signup`, options);
        const user = await response.json();
        if(user.err) {
            console.log(user.err);
        } else {
            console.log('successful');
            console.log(user);
            window.location.href = url;
        }

    } catch (err) {
        console.log('err');
        console.warn(err);
    }
}


async function passwordCheck(id, oldPass, newPass){
    try {
        console.log('--fetch')
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({id, oldPass, newPass})
        }
        const response = await fetch(`${url}/users/passwordcheck`, options);
        // console.log('response:'+response)
        const result = await response.json()
        return result
        // console.log('r.result: '+result)
    } catch(err){
        console.log(err)
        console.warn(err)
    }
}

//signup('newUser', `password`, `444@hotmail.com`)
module.exports = { getAll, getHabit, getItem, getUserHabits, postHabit, deleteHabit, update, login, signup, passwordCheck }
