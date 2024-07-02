import React, { useState } from 'react';

const Exercise = ({ addExerciseLog }) => {
  const [date, setDate] = useState('');
  const [exercises, setExercises] = useState([{ type: '', duration: '' }]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newLog = {
      date,
      exercises: exercises.map(exercise => ({
        type: exercise.type,
        duration: parseInt(exercise.duration)
      }))
    };

    const response = await fetch('http://localhost:8080/exercise', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLog),
    });

    if (response.ok) {
      const addedLog = await response.json();
      addExerciseLog(addedLog);
      setDate('');
      setExercises([{ type: '', duration: '' }]);
    } else {
      console.error('Failed to log exercise');
    }
  };

  const handleExerciseChange = (index, field, value) => {
    const newExercises = [...exercises];
    newExercises[index][field] = value;
    setExercises(newExercises);
  };

  const addExercise = () => {
    setExercises([...exercises, { type: '', duration: '' }]);
  };

  const removeExercise = (index) => {
    const newExercises = [...exercises];
    newExercises.splice(index, 1);
    setExercises(newExercises);
  };

  return (
    <div className="bodyContainer">
      <h2>Log Your Exercise</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            className='inputDesign'
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <br />
        {exercises.map((exercise, index) => (
          <div key={index} className="exerciseEntry">
            <label htmlFor={`exerciseType${index}`}>Muscle Group Worked:</label>
            <select
              className='inputDesign'
              id={`exerciseType${index}`}
              value={exercise.type}
              onChange={(e) => handleExerciseChange(index, 'type', e.target.value)}
              required
            >
              <option value="">Select an exercise</option>
              <option value="Back">Back</option>
              <option value="Chest">Chest</option>
              <option value="Hamstrings">Hamstrings</option>
              <option value="Abs">Abs</option>
              <option value="Biceps">Biceps</option>
              <option value="Triceps">Triceps</option>
              <option value="Calves">Calves</option>
              <option value="Quads">Quads</option>
              <option value="Shoulders">Shoulders</option>
              <option value="Cardio">Cardio</option>
            </select>
            <br></br>
            <br></br>
            <label htmlFor={`duration${index}`}>Duration (minutes):</label>
            <input
              className='inputDesign'
              type="number"
              id={`duration${index}`}
              value={exercise.duration}
              onChange={(e) => handleExerciseChange(index, 'duration', e.target.value)}
              required
            />
          </div>
        ))}
        <br />
        <div>
          <button className="custom-button" type="button" onClick={addExercise}>
            Add Exercise
          </button>
          &nbsp;&nbsp;
          {exercises.length > 1 && (
            <button className="custom-button" type="button" onClick={() => removeExercise(exercises.length - 1)}>
              Remove Exercise
            </button>
          )}
          &nbsp;&nbsp;
          <button className="custom-button" type="submit">Log Exercises</button>
        </div>
      </form>
    </div>
  );
};

export default Exercise;
