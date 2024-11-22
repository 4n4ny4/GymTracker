import { useState } from "react";
const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState("");

  // async bc we reach out to api
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default action of page being refreshed

    const workout = { title, load, reps }; // create dummy wokrout object

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout), // have to pass in workout as JSON string from a javascript object
      headers: {
        "content-Type": "application/json", // to say that the content type is JSON
      },
    });

    const json = await response.json(); // parses JSON adn stores as javascript object
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      // for resetting form
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      console.log("new workout added", json);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>
      <label>Exercise Title: </label>
      <br></br>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <br></br>

      <label>Loads: </label>
      <br></br>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />
      <br></br>

      <label>Reps: </label>
      <br></br>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />
      <br></br>

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
