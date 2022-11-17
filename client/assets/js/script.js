
const main = document.querySelector('main')
const toDoSection = document.querySelector('#todo-section')
const completedSection = document.querySelector('#completed-section')
const longestStreakSection = document.querySelector('#longest-streak')
const deadlinesSection = document.querySelector('#deadlines')
const addHabitForm = document.querySelector('#add-habit-form')
const addHabitBtn = document.querySelector('#add-habit')
const titleInput = document.querySelector('#title')
const descInput = document.querySelector('#desc')
const freqInput = document.querySelector('#freq')

const signUpBtn = document.querySelector('#signUpBtn');
const nameInputSignUp = document.querySelector('#nameSignUp');
const emailInputSignUp = document.querySelector('#emailSignUp');
const passwordInputSignUp = document.querySelector('#psw');

console.log(nameInputSignUp)
console.log(emailInputSignUp)
console.log(passwordInputSignUp)
console.log(signUpBtn)

signUpBtn.addEventListener('click', signup);


const user_id = 2
const habit_id = 2

// addHabitForm.addEventListener('submit', addHabit)
// addHabitBtn.addEventListener('click', showForm)


function showForm (e) {
    e.preventDefault()
    addHabitForm.style.display = 'block';
}

async function showHabitForm (e) {
    e.preventDefault()
    const data = await getItem('habits',habit_id)
    titleInput.value = data.name
    descInput.value = data.desc
    freqInput.value = data.freq
    showForm(e)

}


async function addHabit (e) {
    e.preventDefault()

    const globalUser = await getGlobal()
    console.log(globalUser.id)
    data = {
        user_id: globalUser.id,
        name: titleInput.value,
        desc: descInput.value,
        freq: freqInput.value,
        start_date: new Date()
    }
    console.log(data)
    await postHabit(data)
    location.reload()
}

async function updateHabit (e) {
    e.preventDefault()
    const data = await getItem('habits', habit_id)
    data.name = titleInput.value
    data.desc = descInput.value
    data.freq = freqInput.value
    update('habits', data)
}

async function display () {
    const userData = await getGlobal()
    const habits = await getUserHabits(userData.id)
    console.log("Client")
    console.log(await getItem('users',1))
    await checkList(habits)
    await longestStreak(habits)
    // await timeBeforeMidnight()
    // await deadlines(habits)
    
}

function timeBeforeMidnight() {
    const midnight = new Date();
    midnight.setHours(24,0,0,0);
    const now = new Date()
    const ran = new Date("2016-07-25T00:00:00Z")
    // const mnafter = ran.setHours(24,0,0,0);
    const diffInHrs = Math.round((midnight - ran) / 36e5 * 10) / 10;
    console.log(diffInHrs)
    return diffInHrs
}

async function streakCheck (habits) {
    for(let i = 0; i < habits.length; i++){
        const last_date = new Date(habits[i].last_completed)
        const midnight = last_date.setHours(24,0,0,0);
        const now = new Date()
        let timeToMidnight = Math.round((midnight - now) / 36e5 * 10) / 10;
        
        if (timeToMidnight < 0) habits[i].completed = false

        if(current_count == freq && timeToMidnight > 0 && last_date.getDate() != now.getDate()) {
            habits[i].streak ++
            habits[i].lastcompleted = today
        }
        else if (current_count < freq && timeToMidnight < 0) {
            habits[i].streak = 0
        }
    }

}

// async function resetComplete () {
//     if (current_date > (lastcompleted + 24hrs)) habit_id.complete = false
// }

// async function pseudo () {
//     const lastcompleted;
//     if (habit.last_completed) lastcompleted = habit.last_completed
//     else lastcompleted = start_date
//     if(new Date () < (lastcompleted + freq)) {
//         streak + 1
//         completed = !completed
//         lastcompleted = today
//     }
// }

// async function changeColumn (habit_id) {
//     const data = await getItem('habits', habit_id)

//     if (data.completed === false) data.last_completed = new Date()   
//     data.completed = !data.completed

//     await update('habits', data)
//     location.reload()
// }

async function checkList (data) {
    for(let i = 0; i < data.length; i++){
        const div = document.createElement('div')
        div.className = 'habit'
        div.id = data[i].id
        const name = document.createElement('p')
        name.textContent = data[i].name
        const fire_icon = document.createElement('i')
        fire_icon.className = 'fa-solid fa-fire'
        const streak = document.createElement('p')
        streak.textContent = data[i].streak
        div.append(name)
        div.append(fire_icon)
        div.append(streak)
        data[i].completed === true ? completedSection.append(div) : toDoSection.append(div)

        div.addEventListener('click', () => {goToHabit(div.id)})
    }
}

async function goToHabit (id) {
    console.log(id)
    window.location.href = `/habit/${id}`
}

async function longestStreak (data) {

    const longest = data.sort((a, b) => (a.streak < b.streak) ? 1 : -1)[0]
    console.log(longest)
    const div = document.createElement('div')
    div.className = 'habit'
    const name = document.createElement('p')
    name.textContent = longest.name
    const fire_icon = document.createElement('i')
    fire_icon.className = 'fa-solid fa-fire'
    const streak = document.createElement('p')
    streak.textContent = longest.streak
    div.append(name)
    div.append(fire_icon)
    div.append(streak)
    longestStreakSection.append(div)
}

// async function deadlines (data) {

//     for(let i = 0; i < data.length; i++){
//         const div = document.createElement('div')
//         div.className = 'habit'
//         div.id = data[i].id
//         const name = document.createElement('p')
//         name.textContent = data[i].name
//         const streak = document.createElement('p')
//         streak.textContent = new Date()
//         div.append(name)
//         div.append(streak)
//         deadlinesSection.append(div)

//         div.addEventListener('click', () => {goToHabit(div.id)})
//     }
// }


display()
console.log(timeBeforeMidnight())
