const profiles = {
    'sep1' : {
        headline: 'headline1',
        email: 'sep1@a.com',
        zipcode: 77001,
        avatar: 'avatar1',

    },
    'sep1test' : {
        headline: 'headline2',
        email: 'sep1test@a.com',
        zipcode: 77002,
        avatar: 'avatar2',

    },
    'zl52' : {
        headline: 'headline3',
        email: 'zl52@a.com',
        zipcode: 77003,
        avatar: 'avatar3',
    }
}

const defaultUser = 'zl52'

// PUT /headline
const putHeadline = (req, res) => {
    const user = defaultUser
    profiles[user].headline = req.body.headline || 'No headline'
    if (profiles[user]) {
        res.send({
            username : defaultUser,
            headline : profiles[user].headline
        })
    }
}

// GET /headlines
const getHeadlines = (req, res) => {
    if (!req.user) req.user = defaultUser
    const users = req.params.users ? req.params.users.split(',') : [req.user]

    // this returns only one headline, but we want to send
    // an array of all the requested user's headlines

    // Implement the logic to return headlines for all requested users
    // each user has a default value.  Only the "req.user" value ever changes.
    const result = users.map((x) => {
        if (profiles[x]) {
            return {
                username : x,
                headline : profiles[x].headline
            }
        } else {
            return {
                username : x,
                headline : `this is ${x}'s headline`
            }
        }
    })
    res.send({ headlines: result })

}

// GET /email/:user?
const getEmail = (req, res) => {
    if (!req.user) req.user = defaultUser
    const user = req.params.user ? req.params.user : req.user
    if (profiles[user]) {
        res.send({
            username : user,
            email : profiles[user].email
        })
    } else {
        res.send({
            username : user,
            email : `${user}@rice.edu`
        })
    }
}

// PUT /email
const putEmail = (req, res) => {
    if (!req.user) req.user = defaultUser
    const user = req.user
    if (profiles[user]) {
        profiles[user].email = req.body.email || 'you did not supply it'
        res.send({
            username : user,
            email : profiles[user].email
        })
    }
}

// GET /zipcode/:user? 
const getZipcode = (req, res) => {
    if (!req.user) req.user = defaultUser
    const user = req.params.user ? req.params.user : req.user
    if (profiles[user]) {
        res.send({
            username : user,
            zipcode : profiles[user].zipcode
        })
    } else {
        res.send({
            username : user,
            zipcode : "00000"
        })
    }
}

// PUT /zipcode
const putZipcode = (req, res) => {
    if (!req.user) req.user = defaultUser
    const user = req.user
    if (profiles[user]) {
        profiles[user].zipcode = req.body.zipcode || '00000'
        res.send({
            username : user,
            zipcode : profiles[user].zipcode
        })
    }
}

// GET /avatars/:user? 
const getAvatars = (req, res) => {
    if (!req.user) req.user = defaultUser
    const users = req.params.user ? req.params.user.split(',') : [req.user]
    const result = users.map((x) => {
        if (profiles[x]) {
            return {
                username : x,
                avatar : profiles[x].avatar
            }
        } else {
            return {
                username : x,
                avatar : `default avatar for ${x}`
            }
        }
    })
    res.send({ avatars: result })
}
// PUT /avatar
const putAvatar = (req, res) => {
    if (!req.user) req.user = defaultUser
    const user = req.user
    if (profiles[user]) {
        profiles[user].avatar = req.body.avatar || 'you did not supply it'
        res.send({
            username : user,
            avatar : profiles[user].avatar
        })
    }
}

// GET /dob
const getDob = (req, res) => {
    if (!req.user) req.user = defaultUser
    const user = req.user
	res.send({
		username : user,
		dob : new Date().getTime()	
	})		
}

module.exports = app => {
     app.get('/headlines/:users*?', getHeadlines)
     app.put('/headline', putHeadline)
     app.get('/email/:user?', getEmail)
     app.put('/email', putEmail)
     app.get('/zipcode/:user?', getZipcode)
     app.put('/zipcode', putZipcode)
     app.get('/avatars/:user?', getAvatars)
     app.put('/avatar', putAvatar)
     app.get('/dob', getDob)
}
