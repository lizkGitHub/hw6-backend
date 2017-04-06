const md5 = require('md5')
var cookieParser = require('cookie-parser') 
var User = {users: []};

module.exports = app => {
	app.post('/login', login)
    app.put('logout', isLoggedIn, logout)
	app.post('/register', register)
    app.put('/password', putPassword)
}

var cookieKey = 'sid'
// sid -> username
const sessionUser = {}

let defaultUser = 'zl52'

const register = (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
    let email = req.body.email
    let birthdate = req.body.dob
    let zipcode = req.body.zipcode
    // in case the user already exist
    if(getUser(username)) {
        res.status(409).send(`${username} has already been registered.`)
        return    
    }
	const user = {username, email, birthdate, zipcode}
	user.salt = 'Add Salt' + Math.random().toString()
	user.hash = md5(user.salt + password);
	User.users.push(user);
	const msg = {username : username, result : "success"}	
	res.send(msg)
}

function login(req, res) {
	var username = req.body.username
	var password = req.body.password
	if (!username || !password) {
		res.sendStatus(400)
		return
	}
	var userObj = getUser(username)
	if (!userObj) {
		res.sendStatus(401)
		return
	}
	const hash = md5(userObj.salt + password)
	if (hash !== userObj.hash) {
		res.sendStatus(401)
		return
	}
    sessionUser[generateCode(userObj)] = username
	res.cookie(cookieKey, generateCode(userObj),
		{maxAge: 3600*1000, httpOnly: true})

	var msg = { username: username, result: 'success login'}
	res.send(msg)
}

function isLoggedIn(req, res, next) {
	const sid = req.cookies[cookieKey]
	if(!sid) {
		return res.sendStatus(401)
	}
	var username = sessionUser[sid]
	if(username) {
		req.username = username
		next()
	} else {
		res.sendStatus(401)
	}
}

const logout = (req, res) => {
    const username = req.username
    const key = req.cookies[cookieKey]
    delete sessionUser[key]
    res.clearCookie(cookieKey)
    res.send('OK')
}

const getUser = (username) => {
	const result = User.users.filter((user) => user.username === username)
	if (result.length === 0) {
		return
	} else {
		return result[0]
	}
}

const putPassword = (req, res) => {
	let username = req.body.username || defaultUser
    const msg = {username: username, status : "will not change"}
    res.send(msg)
}

const generateCode = (user) => {
	return md5(JSON.stringify(user))
}