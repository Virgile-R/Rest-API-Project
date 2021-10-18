const auth = require('basic-auth')
const bcrypt = require('bcrypt')
const {User} = require('../models')

//middleware for protecting routes. From the teamtreehouse workshop, thanks!
exports.authenticateUser = async (req, res, next) => {
    let message
    const credentials = auth(req)
    //check for credentials in the request
    if (credentials){
        // check if user exists
        const user = await User.findOne({where: {emailAddress: credentials.name}})
        if (user){
            //check if password matches
            const authenticated = bcrypt.compareSync(credentials.pass, user.password)
            if (authenticated){
                console.log(`Welcome back, ${user.firstName}`)
                req.currentUser = user
            } else {
               message = `Authentification failed for ${user.emailAdddress}`
            }
        } else {
            message = `Username ${credentials.name} not found.`
        }
    } else {
        message = "The authentification header was not found."
    }
    //if message is not null, something went wrong: return a 401 error, if not the user is logged in and goes to the requested route
    if (message) {
        console.warn(message)
        res.status(401).json({message : 'Access denied'})
    } else {
        next() 
    }
}