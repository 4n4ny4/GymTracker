const mongoose = require("mongoose")
const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title: {
        // info about how title property should look like
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, {timestamps: true})

// builds a collection in the database for us named Workouts (note it turns plural!)
module.exports = mongoose.model('Workout', workoutSchema)

