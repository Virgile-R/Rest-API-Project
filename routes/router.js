const express = require('express');
const { asyncHandler } = require('./middleware/async-handler');
const { User, Course } = require('./models');
const router = express.Router()

// User routes
router.get("/users", asyncHandler(async (req,res, next) => {
    try {
        const user = req.currentUser;
        res.json({
            firstName: user.firstName,
            lastName: user.lastName,
            emailAdress: user.emailAdress,
            password: user.password
    
        })
        
    } catch (error) {
        next(error)
    }   
}))

router.post('/users', asyncHandler(async (req, res, next) => {
    try {
        await User.create(req.body);
        res.status(201).location('/')
    } catch (error) {
        next(error)
    }
}))

//Courses Route

router.get('/courses', asyncHandler(async (req, res, next) => {
    try {
        const courses = Course.findAll()
        res.status(200).json(courses)
    } catch (error) {
        next(error)
    }
}))

router.get('/courses/:id', asyncHandler(async (req, res, next) => {
    try {
        const course = Course.findByPk(req.params.id)
        res.status(200).json(course)
    } catch (error) {
        next(error)
    }
}))

router.post('/courses', asyncHandler(async (req, res, next) => {
    try {
        const newCourse = Course.create(req.body)
        res.status(201).location('/api/courses/' + newCourse.id )
        
    } catch (error) {
        next(error)
    }
    
}))

router.put('/courses/:id', asyncHandler(async (req, res, next) => {
    try {
        const course = await Course.findByPk(req.params.id)
        await course.update(req.body)
        res.status(204).end()
    } catch (error) {
        next(error)
    }
}))

router.delete('/courses/:id', asyncHandler(async (req, res, next) => {
    try {
        const course = await Course.findByPk(req.params.id)
        await course.destroy()
        res.status(204).end()
    } catch (error) {
        next(error)
    }
}))