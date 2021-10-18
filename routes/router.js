
const express = require('express'); 
//import middleware
const { asyncHandler } = require("../middleware/async-handler")
const { authenticateUser } = require('../middleware/auth-user');
//import models
const { User, Course } = require('../models');
const router = express.Router()


// User routes
router.get("/users", authenticateUser, asyncHandler(async (req,res, next) => {
   
        const user = await User.findOne({where: {id: req.currentUser.id}, attributes: ['firstName', 'lastName', 'emailAddress']});
        res.json({user})
        
   
}))

router.post('/users', asyncHandler(async (req, res, next) => {
    try {
        
        const user = await req.body  
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
    
        const courses = await Course.findAll({attributes: ['id', 'title', 'description', 'estimatedTime', 'materialsNeeded', 'userId']})
        res.status(200).json(courses)
    
}))

router.get('/courses/:id', asyncHandler(async (req, res, next) => {
   
        const course = await Course.findByPk(req.params.id, {attributes: ['id', 'title', 'description', 'estimatedTime', 'materialsNeeded', 'userId']})
        res.status(200).json(course)
   
}))

router.post('/courses', authenticateUser, asyncHandler(async (req, res, next) => {
    try {
        
        const course = await req.body
        course.userId = await req.currentUser.id

        await Course.create(course)
        res.status(201).location('/api/courses/' + course.id ).end()
        
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
        //users can't edit others' courses
        if (course.userId === req.currentUser.id){
            req.body.userId = req.currentUser.id
            await course.update(req.body)
            res.status(204).end()
        } else {
            res.status(403).json({message : 'Access denied: you don\'t have permission to edit this course.'})
        }
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message)
            res.status(400).json({ errors})

        } else {
        next(error)
        }
    }
}))

router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res, next) => {
    try {
        const course = await Course.findByPk(req.params.id)
        //users can't delete others' course
        if (course.userId === req.currentUser.id){
            await course.destroy()
            res.status(204).end()
        }  else {
            res.status(403).json({message : 'Access denied: you don\'t have permission to delete this course.'})
        }
    } catch (error) {
        next(error)
    }
}))

module.exports = router 