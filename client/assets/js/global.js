console.log('global')
// const ul = document.querySelector('#habitContainer')


let globalObject

async function getGlobal() {
    console.log('getGlobal')
    try {

        let token = document.cookie.match('(^|;)\\s*' + 'access_token' + '\\s*=\\s*([^;]+)')?.pop()
        console.log(JSON.stringify(token))

        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({token})
        }
        
        const response = await fetch(`http://localhost:3000/auth`, options);
        const data = await response.json();
        console.log(data)
        globalObject = data;

        // displayHabits(data)

        return data;
    } catch (err) {
        console.warn(err);
    }
}

async function displayHabits(data) {
    console.log(data.habits)
    console.log(data.habits.forEach(data => {

        console.log(data)

        const li = document.createElement('li');
        const completed = document.createElement('p');
        const desc = document.createElement('p');
        const freq = document.createElement('p');
        const id = document.createElement('p');
        const link = document.createElement('a');
        const name = document.createElement('p');
        const start_Date = document.createElement('p');
        const streak = document.createElement('p');       

        completed.textContent = `completed: ${data.completed}`
        desc.textContent = `desc: ${data.desc}`
        freq.textContent = `frequency: ${data.freq}`
        id.textContent = `habbit id: ${data.id}`
        link.href = `http://localhost:3000/habit/${data.id}`
        link.textContent = `go here`
        name.textContent = `name: ${data.name}`
        start_Date.textContent = `start date: ${data.start_Date}`
        streak.textContent = `streak: ${data.streak}`

        li.append(completed, desc, freq, id, name, start_Date, streak, link);
        li.classList.add("eachHabit")
        console.log(li)

        ul.append(li);


    }))

}


getGlobal();
