import React, { useEffect, useState } from 'react';

const Nutrition = ({ addNutritionLog }) => {
  const [food, setFood] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [nutritionData, setNutritionData] = useState([]);
  const [date, setDate] = useState('');

  useEffect(() => {
    fetchNutritionData();
  }, []);

  const fetchNutritionData = async () => {
    const nutritionUrl = 'http://localhost:8080/nutrition';
    const response = await fetch(nutritionUrl);
    const result = await response.json();
    setNutritionData(result);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newLog = {
      date,
      food,
      calories: parseInt(calories), 
      protein: parseInt(protein),   
      carbs: parseInt(carbs),     
      fat: parseInt(fat)          
    };
    
    const response = await fetch('http://localhost:8080/nutrition', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLog),
    });

    if (response.ok) {
      const addedLog = await response.json();
      addNutritionLog(addedLog);
    }

    setFood('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFat('');
  };

  return (
    <div className="bodyContainer">
      <h2>Log Your Nutrition</h2>
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
        <div>
          <label htmlFor="food">Food:</label>
          <input
            className='inputDesign'
            type="text"
            id="food"
            value={food}
            onChange={(e) => setFood(e.target.value)}
            required
          />
        </div><br></br>
        <div>
          <label htmlFor="calories">Calories:</label>
          <input
            className='inputDesign'
            type="number"
            id="calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            required
          />
        </div><br></br>
        <div>
          <label htmlFor="protein">Protein (g):</label>
          <input
            className='inputDesign'
            type="number"
            id="protein"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            required
          />
        </div><br></br>
        <div>
          <label htmlFor="carbs">Carbs (g):</label>
          <input
            className='inputDesign'
            type="number"
            id="carbs"
            value={carbs}
            onChange={(e) => setCarbs(e.target.value)}
            required
          />
        </div><br></br>
        <div>
          <label htmlFor="fat">Fat (g):</label>
          <input
            className='inputDesign'
            type="number"
            id="fat"
            value={fat}
            onChange={(e) => setFat(e.target.value)}
            required
          />
        </div><br></br>
        <button className="custom-button" type="submit">Log Nutrition</button>
      </form>
    </div>
  );
};

export default Nutrition;