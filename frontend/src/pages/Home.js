import {useEffect, useState} from 'react'

// componenets
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
const Home = () => {
  const[workouts, setWorkouts] = useState(null)
  useEffect(() => {
    // want to use async keyword but can't make function in useEffect async so put another one in it
    const fetchWorkouts = async() => {
      const response = await fetch('/api/workouts')
      const json = await response.json() // parses json - array of workout objects (workouts)

      if(response.ok){
        setWorkouts(json)
      }
    }

    fetchWorkouts()
  }, []) // dependency array is empty so will only fire once


  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout = {workout}/>
        ))}
      </div>
      <WorkoutForm/>
    </div>
  );
};
export default Home;
