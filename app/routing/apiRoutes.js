const path = require('path')
const { writeFile } = require('fs')
const apiRoutes = require('express').Router()

apiRoutes.get('/friends', (req, res) => {
    res.sendFile(path.join(__dirname + '/../data', 'friends.json'))
})
//Get user info & compare with friends info
apiRoutes.post('/friends', (req, res) => {
    let user = req.body   
    let friendsJSON = require("../data/friends.json")
    let match
    let matchScore = 40

    for (let i = 0; i < friendsJSON.length; i++) {
        let diff = 0
        for (let j = 0; j < 10; j++) {
            diff += Math.abs(user.scores[j] - friendsJSON[i].scores[j])
        }
        if (diff < matchScore) {
            matchScore = diff
            match = friendsJSON[i]
        }
    }
    //Add user to friends
    friendsJSON.push(user)
    writeFile(path.join(__dirname + '/../data', 'friends.json'), JSON.stringify(friendsJSON, null, 2), err => {
        if (err) throw err
    })

    res.json(match)
})

module.exports = apiRoutes
