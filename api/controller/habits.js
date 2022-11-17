const Habit = require('../models/Habit');

const displayAll = async (req, res) => {
    try {
        const habits = await Habit.all;
        res.status(200).json(habits);
    } catch (err) {
        res.status(500).send(err);
    }
}

const getHabit = async (req, res) => {
    try {
        const habit = await Habit.findHabit(parseInt(req.params.id))
        // const isUsersHabit = await habit.belongsToUser(document.cookie)

        res.status(200).json(habit)
    } catch(err){
        res.status(404).json({err})
    }
}

const create = async (req, res) => {
    try {
        console.log(req.body)
        const habit = await Habit.create(req.body)
        res.status(201).json(habit)
    } catch(err) {
        res.status(404).json({err})
    }
}

const update = async (req, res) => {
    try {
        const habit = await Habit.findHabit(parseInt(req.params.id))
        const updatedHabit = await habit.update(req.body)
        res.status(200).json(updatedHabit)
    } catch(err){
        console.log(err)
        res.status(500).json({err})
    }
}

const destroy = async (req, res) => {
    try {

        const habit = await Habit.findHabit(parseInt(req.params.id))
        const resp = await habit.delete()
        
        res.status(204).json('Habit deleted')
    } catch(err){
        console.log('Cant delete habit')
        console.log(err)
        res.status(500).json({err})
    }
}

const markComplete = async (req, res) => {
    try {

    } catch(err){
        
    }
}

const setFrequency = async (req, res) => {
    try {

    } catch(err){
        
    }
}

const setStartDate = async (req, res) => {
    try {

    } catch(err){
        
    }
}

const setLastCompleted = async (req, res) => {
    try {

    } catch(err){
        
    }
}

const setStreak = async (req, res) => {
    try {

    } catch(err){
        
    }
}

const setCompleted = async (req, res) => {
    try {

    } catch(err){
        
    }
}

module.exports = { displayAll, getHabit, create, update, destroy }
