const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const session = require('express-session');

const server = express();
server.use(cors());
server.use(express.json());
server.use(cookieParser());
server.use(session({secret: "Shh, its a secret!"}));
server.set('view engine','ejs');

server.use((req, res, next) => {
    //console.log('Time:', Date.now())
   //console.log(req.cookies)
    next()
})

const userRoutes = require('./routes/users');
const habitRoutes = require('./routes/habits');
const clientRoutes = require('./routes/clients');

server.use('/users', userRoutes)
server.use('/habits', habitRoutes)
server.use('/', clientRoutes)

const auth = require('./controller/users');

//***D:\portfolios\trackIT\client <-should be looking at this
//assets should just point at index.html, ../ or ./ does not have an effect
server.use(express.static(path.join(__dirname, '../client')))


module.exports = server
