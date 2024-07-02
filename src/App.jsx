import React, { useEffect, useState } from 'react';

import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Home from './Home.jsx';
import Nutrition from './Nutrition.jsx';
import Exercise from './Exercise.jsx';
import WeeklyView from './WeeklyView.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentView, setCurrentView] = useState('home');
  const [nutritionData, setNutritionData] = useState([]);
  const [exerciseLogs, setExerciseLogs] = useState([]);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      fetchNutritionData();
      fetchExerciseData();
    }
  }, [isLoggedIn]);

  const fetchNutritionData = async () => {
    const nutritionUrl = 'http://localhost:8080/nutrition';
    const response = await fetch(nutritionUrl);
    const result = await response.json();
    setNutritionData(result);
  };

  const fetchExerciseData = async () => {
    const exerciseUrl = 'http://localhost:8080/exercise';
    const response = await fetch(exerciseUrl);
    const result = await response.json();
    setExerciseLogs(result);
  };

  const handleLogin = async () => {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    if (result.success) {
      setIsLoggedIn(true);
    } else {
      alert(result.message || 'Invalid username or password');
    }
  };

  const handleRegister = async () => {
    const response = await fetch('http://localhost:8080/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    if (result.success) {
      alert(result.message);
      setIsRegistering(false); 
    } else {
      alert(result.message || 'Registration failed');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setCurrentView('home'); 
  };

  const addNutritionLog = (log) => {
    setNutritionData([...nutritionData, log]);
  };

  const addExerciseLog = (log) => {
    setExerciseLogs([...exerciseLogs, log]);
  };

  const renderContent = () => {
    if (isLoggedIn) {
      return renderCurrentView();
    } else {
      return isRegistering ? (
        <Register
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          onRegister={handleRegister}
        />
      ) : (
        <Login
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          onLogin={handleLogin}
          onRegister={() => setIsRegistering(true)}
        />
      );
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'nutrition':
        return <Nutrition addNutritionLog={addNutritionLog} />;
      case 'exercise':
        return <Exercise addExerciseLog={addExerciseLog} />;
      case 'weeklyView':
        return <WeeklyView nutritionData={nutritionData} exerciseLogs={exerciseLogs} />;
      default:
        return <Home />;
    }
  };

  const setActiveComponent = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} setActiveComponent={setActiveComponent} handleLogout={handleLogout} />
      <div className="content">
        {renderContent()}
      </div>
      <Footer />
    </div>
  );
}

export default App;
