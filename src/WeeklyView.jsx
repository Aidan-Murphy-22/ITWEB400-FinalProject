import React, { useState } from 'react';
import DatePicker from './DatePicker';

const WeeklyView = ({ nutritionData, exerciseLogs }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [nutritionSummary, setNutritionSummary] = useState(null);
  const [exerciseSummary, setExerciseSummary] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    calculateNutritionSummary(date);
    calculateExerciseSummary(date);
  };

  const calculateNutritionSummary = (date) => {
    const filteredData = nutritionData.filter(item => item.date === date);
    
    const caloriesSum = filteredData.reduce((sum, item) => sum + item.calories, 0);
    const proteinSum = filteredData.reduce((sum, item) => sum + item.protein, 0);
    const carbsSum = filteredData.reduce((sum, item) => sum + item.carbs, 0);
    const fatSum = filteredData.reduce((sum, item) => sum + item.fat, 0);

    setNutritionSummary({ calories: caloriesSum, protein: proteinSum, carbs: carbsSum, fat: fatSum });
  };

  const calculateExerciseSummary = (date) => {
    const filteredLogs = exerciseLogs.filter(log => log.date === date);
    setExerciseSummary(filteredLogs);
  };

  return (
    <div className="bodyContainer">
      <h2>Daily View</h2>
      <form>
        <DatePicker onSelectDate={handleDateSelect} className="inputDesign" />

        {selectedDate && (
          <div className='weeklyViewBox'>
            <h3>Nutrition Summary for {selectedDate}</h3>
            <p>Total Calories: {nutritionSummary?.calories}</p>
            <p>Total Protein(g): {nutritionSummary?.protein}</p>
            <p>Total Carbs(g): {nutritionSummary?.carbs}</p>
            <p>Total Fat(g): {nutritionSummary?.fat}</p>
            <h3>Exercise Summary for {selectedDate}</h3>
            {exerciseSummary && exerciseSummary.map((log, index) => (
              <div key={index}>
                {log.exercises.map((exercise, i) => (
                  <p key={i}>{exercise.type}: {exercise.duration} minutes</p>
                ))}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default WeeklyView;