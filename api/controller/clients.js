const path = require('path');

const landingPage = async (req, res) => {

    console.log(path.join(__dirname, '../../client/newlogin.html'))
    try {

        res.sendFile(path.join(__dirname, '../../client/index.html'))
        
        } catch (err) {
        res.send(err)
        }
    }


const signUpPage = async (req, res) => {

    console.log(path.join(__dirname, '../../client/assets/pages/signup.html'))
    try {
        res.sendFile(path.join(__dirname, '../../client/assets/pages/signup.html'))
        
        } catch (err) {
        res.send(err)
    }
}

const dashboardPage = async (req, res) => {

    console.log(path.join(__dirname, '../../client/assets/pages/dashboard.html'))
    try {
        res.sendFile(path.join(__dirname, '../../client/assets/pages/dashboard.html'))
        
        } catch (err) {
        res.send(err)
    }
}

const profilePage = async (req, res) => {

    console.log(path.join(__dirname, '../../client/assets/pages/profile.html'))
    try {
        res.sendFile(path.join(__dirname, '../../client/assets/pages/profile.html'))
        
        } catch (err) {
        res.send(err)
    }
}

const habitPage = async (req, res) => {

    console.log(path.join(__dirname, '../../client/assets/pages/habit.html'))
    try {
        res.sendFile(path.join(__dirname, '../../client/assets/pages/habit.html'))
        
        } catch (err) {
        res.send(err)
    }
}


const testPage = async (req, res) => {

    //console.log(path.join(__dirname, '../../client/assets/pages/habit.html'))
    try {
        res.render('index')
        
        } catch (err) {
        res.send(err)
    }
}

const loginPage = async (req, res) => {

    console.log(path.join(__dirname, '../../client/assets/pages/newlogin.html'))
    try {
        res.sendFile(path.join(__dirname, '../../client/assets/pages/newlogin.html'))
        } catch (err) {
        res.send(err)
        }
    }

module.exports = { landingPage, 
    loginPage, 
    signUpPage, 
    dashboardPage,
    habitPage,
    profilePage,
    testPage }
