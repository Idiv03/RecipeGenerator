import React, { useState, useEffect } from 'react';
import './App.css';
import RecipeGenerator from './components/RecipeGenerator';

function App() {
  const [activeTab, setActiveTab] = useState('culinary-wizard');
  const [darkMode, setDarkMode] = useState(false);
  const [chefHatSpin, setChefHatSpin] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
    setChefHatSpin(true);
    setTimeout(() => setChefHatSpin(false), 1000);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Fun cooking-related names for your tabs
  const tabNames = {
    'culinary-wizard': '🧙‍♂️ Culinary Wizard',
    'flavor-lab': '🧪 Flavor Lab'
  };

  return (
    <div className="App">
      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        {chefHatSpin && <span className="chef-hat-spin">👨‍🍳</span>}
      </button>

      <div className="tabs">
        <button 
          className={activeTab === 'culinary-wizard' ? 'active' : ''} 
          onClick={() => handleTabChange('culinary-wizard')}
        >
          {tabNames['culinary-wizard']}
        </button>
        <button 
          className={activeTab === 'flavor-lab' ? 'active' : ''} 
          onClick={() => handleTabChange('flavor-lab')}
        >
          {tabNames['flavor-lab']}
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'culinary-wizard' && (
          <>
            <h2 className="fun-title">
              <span className="cooking-emoji">🍳</span> Let's Get Cooking! 
              <span className="cooking-emoji">🥘</span>
            </h2>
            <RecipeGenerator />
          </>
        )}
        {activeTab === 'flavor-lab' && (
          <div className="lab-message">
            <h3>🧫 Experiment Station Coming Soon!</h3>
            <p>Our mad scientists are brewing up something delicious...</p>
          </div>
        )}
        <div className="bon-appetit">
          <span className="fork">🍴</span> Bon Appétit! <span className="knife">🔪</span>
        </div>
      </div>
    </div>
  );
}

export default App;