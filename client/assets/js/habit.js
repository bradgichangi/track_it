const main = document.querySelector('main')
const editHabitForm = document.querySelector('#edit-habit-form')
const editHabitBtn = document.querySelector('#edit-habit')
const exitBtn = document.querySelector('#exit')
const titleInput = document.querySelector('#title-input')
const descInput = document.querySelector('#desc-input')
const freqInput = document.querySelector('#freq-input')
const deleteHabitBtn = document.querySelector('#delete-btn')
const updateBtn = document.querySelector('#update-btn')
const addBtn = document.querySelector('#add-btn')
const minusBtn = document.querySelector('#minus-btn')
const title = document.querySelector('#title')
const desc = document.querySelector('#desc')
const freq = document.querySelector('#freq')
const deadline = document.querySelector('#next-deadline')
const streak = document.querySelector('#streak')
const progress = document.querySelector('#progress')
const bar = document.querySelector('#bar')
const startDate = document.querySelector('#start_datetime')

const user_id = 2
console.log(window.location.href.split('/')[4])
const habit_id = window.location.href.split('/')[4]

editHabitBtn.addEventListener('click', showHabitForm)
exitBtn.addEventListener('click', showHabitForm)
updateBtn.addEventListener('click', updateHabit)
deleteHabitBtn.addEventListener('click', destroy)
addBtn.addEventListener('click', changeCount)
minusBtn.addEventListener('click', changeCount)

async function showHabitForm (e) {
    e.preventDefault()
    const data = await getItem('habits', habit_id)
    titleInput.value = data.name
    descInput.value = data.desc
    freqInput.value = data.freq
    if (editHabitForm.style.display == 'block') editHabitForm.style.display = 'none'
    else editHabitForm.style.display = 'block'

}

async function destroy (e) {
    e.preventDefault()
    await deleteHabit(habit_id)
    location.reload()
}


async function updateHabit (e) {
    e.preventDefault()
    const data = await getItem('habits', habit_id)
    data.name = titleInput.value
    data.desc = descInput.value
    data.freq = freqInput.value
    await update('habits', data)
    location.reload()
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

// async function nextDeadline (date) {
//     console.log(date)
//     console.log(addDays(new Date(), 5))
//     if(addDays(new Date(), 4) < addDays(new Date(), 1909840)) console.log('Its before')
//     else console.log('Fail')
// }

function formatDate (date) {
    let year = date.getFullYear().toString()
    let month = (date.getMonth() + 1).toString()
    let day = date.getDate().toString()
    let hour = date.getHours().toString()
    let minute = date.getMinutes().toString()
 
    return `${hour}:${minute} ${day}/${month}/${year}`
}

async function changeCount (e) {
    const habit = await getItem('habits', habit_id)
    console.log(habit)
    if (e.target.id === 'add-btn') {
        if(habit.current_count < habit.freq) {console.log(habit.current_count); habit.current_count ++; console.log(habit.current_count); }
        else console.log ('Reached Max')
    }
    else {
        if(habit.current_count > 0) habit.current_count --
        else console.log ('Cannot reduce')
    }
    if(habit.current_count == habit.freq) {habit.completed = true; habit.last_completed = new Date()}
    else habit.completed = false
    await update('habits', habit)
    location.reload()
}

async function updateProgress () {
    const habit = await getItem('habits', habit_id)
    const percentage = habit.current_count / habit.freq * 100
    bar.style.width = `${percentage}%`
}

async function display () {
    const habit = await getItem('habits',habit_id)
    console.log("Client")
    title.textContent = habit.name
    desc.textContent = habit.desc
    freq.textContent = habit.freq
    deadline.textContent = habit.current_count
    streak.textContent = habit.streak
    startDate.textContent = habit.start_date
    updateProgress()
    // nextDeadline()
    // nextDeadline.textContent = habit.start_date

}

getHabit(1)

display()
