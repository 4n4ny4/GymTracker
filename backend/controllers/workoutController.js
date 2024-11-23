// create a bunch of functions to reference in router file

const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// get all workout
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 }); // can also specify if you wanna get all obejcts with reps = 20
  res.status(200).json(workouts);
};
// get a single workout
const getWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such workout" });
    }
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ error: "No such workout" });
    }
    res.status(200).json(workout);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
// create a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  // adding document to db
  try {
    const workout = await Workout.create({ title, load, reps });
    if (!workout) {
      return res.status(400).json({ error: "can't create workout" });
    }
    res.status(200).json(workout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// delete a workout

const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "not valid id" });
    }
    const workout = await Workout.findOneAndDelete({ _id: id });

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "not valid id" });
    }
    res.status(200).json(workout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// update a workout
const updateWorkout = async (req, res) => {
    try{
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!workout) {
    return res
      .status(400)
      .json({ error: "No such workout after trying to find" });
  }
  res.status(200).json(workout);
}catch(err){
    res.status(500).json({ error: err.message });
}
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
