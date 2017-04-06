let followings = {
    "followings" : [
        {
            username: 'zl52',
            following: ['sep1', 'zl52test', 'follow']
        }
    ]
}

let defaultUser = 'zl52'

// PUT /following/:user
const putFollowing = (req, res) => {
    // const id = 'loginUser'
    const user = req.params.user
    followings.followings[0].following.push(user)
    res.send(followings.followings[0])
}

const deleteFollowing = (req, res) => {
    // const id = 'loginUser'
    const user = req.params.user
    const following = followings.followings[0].following
    followings.followings[0].following = following.filter(follower => follower !== user)
    res.send(followings.followings[0])
}

const getFollowing = (req, res) => {
    // default logged in user
    const id = req.params.user || defaultUser
    const result = followings.followings.filter(follower => follower.username === id)
    if (result.length >= 1) {
        res.send(result[0])
    } else {
        res.send({})
    }

}

module.exports = (app) => {
    app.delete('/following/:user', deleteFollowing)
	app.put('/following/:user', putFollowing)
	app.get('/following/:user*?', getFollowing)
}