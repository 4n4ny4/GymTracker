const express = require ('express') // creates node_modules when we npm install express
// dotenv is a package that loads env variables into process object variable so we should require the package
require('dotenv').config()

// require mongoose package to access database
mongoose = require('mongoose')

const app = express() // creates express app and stores it in app
// requiring routes that we create in workouts.js
const workoutRoutes = require('./routes/workouts')

// middleware - code that executes between us sending a request and recieving response

// middleware - any request that comes in if we're sending some data to server (like for post and patch requests), it adds it to req object
// can now access this data sent to server using req.body
app.use(express.json())



// have to invoke next when we're finished so it goes to next middleware; allows us 
app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

// if we have get handler in route this would be same as saying app.get()
// when we fire request/user goes to /api/workouts, then use workoutRoutes
app.use("/api/workouts",workoutRoutes)


// connect to mongoose
mongoose.connect(process.env.URI)
    .then(
    app.listen(process.env.PORT, () => {
    console.log('connected to db & listening on port', process.env.PORT)}))
    .catch(err => console.log(err))






// listen to certain port number
// we want to store the port number in env variable

