
const express = require('express'); 
const { asyncHandler } = require("../middleware/async-handler")
const { authenticateUser } = require('../middleware/auth-user');

const { User, Course } = require('../models');
const router = express.Router()


// User routes
router.get("/users", authenticateUser, asyncHandler(async (req,res, next) => {
   
        const user = req.currentUser;
        res.json({
            firstName: user.firstName,
            lastName: user.lastName,
            emailAdress: user.emailAddress,
          
    
        })
        
   
}))

router.post('/users', asyncHandler(async (req, res, next) => {
    try {
        
        const user = await req.body
        console.log(user)
        
        await User.create(user);
        res.status(201).location('/').end()
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message)
            res.status(400).json({ errors})

        } else {
        next(error)
        }
    }
}))

//Courses Route

router.get('/courses', asyncHandler(async (req, res, next) => {
    
        const courses = await Course.findAll()
        res.status(200).json(courses)
    
}))

router.get('/courses/:id', asyncHandler(async (req, res, next) => {
   
        const course = await Course.findByPk(req.params.id)
        res.status(200).json(course)
   
}))

router.post('/courses', authenticateUser, asyncHandler(async (req, res, next) => {
    try {
        const newCourse = await req.body
        console.log(newCourse)
        await Course.create(newCourse)
        res.status(201).location('/api/courses/' + newCourse.id ).end()
        
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message)
            res.status(400).json({ errors})

        } else {
        next(error)
        }
    }
    
}))

router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res, next) => {
    try {
        const course = await Course.findByPk(req.params.id)
        await course.update(req.body)
        res.status(204).end()
    } catch (error) {
        next(error)
    }
}))

router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res, next) => {
    try {
        const course = await Course.findByPk(req.params.id)
        await course.destroy()
        res.status(204).end()
    } catch (error) {
        next(error)
    }
}))

module.exports = router 