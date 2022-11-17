const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const server = require('../server');
const path = require('path');

const currentUser = async (req, res) => {
    // console.log(req.cookies.access_token);
    try {
    
    const user = { cookie: req.cookies.access_token,
                       id: req.id,
                    email: req.email }
        req.send(user)
    } catch (err) {
        res.send(err)
    }
}

const displayAll = async (req, res) => {
    // console.log(req.cookies.access_token);
    try {
        const users = await User.all;
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send(err);
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.getUser(parseInt(req.params.id))

        res.status(200).json(user)
    } catch(err){
        console.log(err)
        res.status(404).json({err})
    }
}

const getHabits = async (req, res) => {
    try {
        const user = await User.getHabits(parseInt(req.params.id))
        res.status(200).json(user)
    } catch(err){
        console.log(err)
        res.status(404).json({err})
    }
}

const create = async (req, res) => {
    try {
        const users = await User.create(req.body.name, req.body.email, req.body.password)
        res.status(201).json(users)
    } catch(err) {
        res.status(404).json({err})
    }
}

const update = async (req, res) => {
    try {
        console.log('c.users.update: '+req.body)
        const user = await User.getUser(parseInt(req.body.id))
        const updatedUser = await user.update(req.body)
        console.log(`user ${user} updatedUser ${updatedUser}`)
        res.status(200).json(updatedUser)
    } catch(err){
        console.log(err)
        res.status(500).json({err})
    }
}

const destroy = async (req, res) => {
    try {
        const user = await User.findById(parseInt(req.params.id))
        await user.destroy()
        res.status(204).json('User deleted')
    } catch(err){
        res.status(500).json({err})
    }
}

const login = async (req, res) => {
    //console.log(req.body)
    try {
        const token = await User.login(req.body.email, req.body.password)
        console.log('token')
        console.log(token)

        // const data = await jwt.verify(token, "some_secret")
        //     console.log('jws:data')
        //     console.log(data)
    res
    .cookie("access_token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ message: "Logged in successfully 😊 👌",
            user: token });

    } catch(err) {
        console.log('error')
        // console.log(err)
        res.status(404).json('error')
    }
}

const authorization = async (req, res, next) => {

    console.log(req.body.token)
    const token = req.cookies.access_token || req.body.token;
    
    console.log(`token`);
    // console.log(token);

    //user does not have a token -> either new user or cookie has expired
    if (!token) {

        let url = `${req.protocol}://${req.get('host')}${req.originalUrl}`

        if(url === 'http://localhost:3000/') {
            console.log('login redirect')
            return res.sendFile(path.join(__dirname, '../../client/index.html'));
        } else if (url === 'http://localhost:3000/signup') {
            console.log('sign up redirect')
            return res.sendFile(path.join(__dirname, '../../client/assets/pages/signup.html'));
        }
    }

    try {
        console.log(`verify token if it works move onto the next`)
        const data = await jwt.verify(token, "some_secret");
        //if wrong token then return the user back to homepage
        console.log('jws:data')
        console.log(data)

        // const habits = await User.getHabits(data.id)
        // console.log(habits)

        req.id = data.id;
        req.email = data.email;
        req.global = data

        // if(req.originalUrl.split()[1] == 'habit') req.habit = req.originalUrl.split('/')[2]
        // console.log(req.originalUrl.split('/')[2])

        //if a user has a token, send it to next() whatever that is but
        //but if current page is / which is landing page we need to redirect
        //the user to dashboard or whichever path the user want to to get

        console.log(`req.originalUrl`);
        console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
        
        let url = `${req.protocol}://${req.get('host')}${req.originalUrl}`
        //1. user has a token/cookie at login or sign-up page

        if(url === 'http://localhost:3000/') {
            console.log('login redirect')
            return res.redirect('http://localhost:3000/dashboard')

        } else if (url === 'http://localhost:3000/signup') {
            console.log('sign up redirect')
            return res.redirect('http://localhost:3000/dashboard')
        }

    return next();
    
    } catch (err){
        console.log(err)
        //if token is modified.
        //clear the cookie to avoid infinite redirects
        console.log('auth')
        res.clearCookie('access_token')
        return res.redirect('http://localhost:3000/');
    }
  };

  const returnGlobal = async (req, res) => {
    console.log(req.global)

    try {
        res.status(200).json(req.global);
    } catch(err){
        res.status(500).json({err})
    }
}

const habitCheck = async (req, res, next) => {
    try{
        console.log(req.id)
        const getHabits = await User.getHabits(req.id);
        // console.log(getHabits)
        const user_id = req.id
        const habit_id = req.originalUrl.split('/')[2]
        const check = getHabits.find(obj => obj.id == habit_id)
        console.log(check)
        if (check) return next()
        else res.status(200).json('This habit doesnt belong to you');
    }
    catch (err) {}
}

const signup = async (req, res) => {

    try {
        const findUser = await User.findByEmail(req.body.email);
        console.log(findUser);
        res.status(404).json({err: `${findUser.email} exists`});
        
    } catch(err) {
        console.log(`no user`)
        console.log(err)

        const newUser = await User.signup(req.body.name, req.body.password, req.body.email)
        res.status(200).json(newUser);
    }
}

const checkPassword = async (req, res) => {
    try {
        console.log('--controller')
        console.log('c.users.body.id: '+req.body.id)
        const user = await User.getUser(req.body.id)
        console.log('user id: '+user.id)
        const test = await user.passwordCheck(req.body.oldPass)
        
        const salt = await bcrypt.genSalt(12);
        const hashed = await bcrypt.hash(req.body.newPass, salt)

        const data = {
            id: req.body.id, 
            name: user.name,
            email: user.email,
            password: hashed
        }

        console.log('returns test: '+test)
        // update if true
        if(test){
            console.log('user_id: '+req.body.id)
            const updated = await user.update(data)
            console.log('updated: ')
            console.log(updated)
            console.log('password updated')
            res.status(200).json(updated)
        }
        else res.status(200).json(test);
    } catch(err){
        console.log(err)
        res.status(500).json({err})
    }
}

module.exports = { displayAll, getUser, getHabits, habitCheck, create, update, destroy, login, checkPassword, signup, authorization, currentUser, returnGlobal }
