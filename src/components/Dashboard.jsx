import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { logoutUser } from '../context/AuthActions';

const Dashboard = () => {
  const { user, dispatch } = useAuth();
  const [activeTab, setActiveTab] = useState('draw');
  const [selectedCards, setSelectedCards] = useState([]);
  const [previousReadings] = useState([
    { id: 1, date: '2023-11-15', cards: ['The Fool', 'The Magician', 'The High Priestess'] },
    { id: 2, date: '2023-11-10', cards: ['The Lovers', 'The Chariot'] },
    { id: 3, date: '2023-11-05', cards: ['Death', 'Temperance'] }
  ]);

  const tarotCards = [
    "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
    "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
    "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance",
    "The Devil", "The Tower", "The Star", "The Moon", "The Sun",
    "Judgement", "The World"
  ];

  const handleDrawCards = () => {
    const drawnCards = [];
    const availableCards = [...tarotCards];
    
    for (let i = 0; i < 3; i++) {
      if (availableCards.length === 0) break;
      
      const randomIndex = Math.floor(Math.random() * availableCards.length);
      drawnCards.push(availableCards[randomIndex]);
      availableCards.splice(randomIndex, 1);
    }
    
    setSelectedCards(drawnCards);
  };

  const handleLogout = () => {
    logoutUser()(dispatch);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'draw':
        return (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 shadow-lg">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">Draw Tarot Cards</h2>
            <p className="text-purple-200 mb-6">
              Focus on your question and draw three cards to reveal insights about your past, present, and future.
            </p>
            
            <button 
              onClick={handleDrawCards}
              className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
            >
              Draw Cards
            </button>
            
            {selectedCards.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-amber-300 mb-4">Your Reading:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {selectedCards.map((card, index) => (
                    <div key={index} className="bg-purple-900/50 border border-amber-400/30 rounded-xl p-4 text-center transform transition-transform hover:scale-105">
                      <div className="w-16 h-24 bg-gradient-to-br from-amber-400 to-orange-500 mx-auto mb-3 rounded-lg shadow-lg"></div>
                      <h4 className="font-bold text-lg text-amber-300">{card}</h4>
                      <p className="text-purple-200 text-sm mt-2">
                        {index === 0 ? "Past Influence" : index === 1 ? "Present Situation" : "Future Potential"}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 bg-black/20 p-6 rounded-xl border border-purple-500/20">
                  <h4 className="font-bold text-lg text-amber-300 mb-3">Interpretation:</h4>
                  <p className="text-purple-200">
                    The cards reveal a journey of transformation. {selectedCards[0]} represents the energies that have shaped your past, 
                    while {selectedCards[1]} speaks to your current situation. {selectedCards[2]} indicates the potential future 
                    outcome if you continue on your current path.
                  </p>
                </div>
              </div>
            )}
          </div>
        );
        
      case 'previous':
        return (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 shadow-lg">
            <h2 className="text-2xl font-bold text-amber-400 mb-6">Previous Readings</h2>
            
            {previousReadings.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 rounded-full bg-purple-800/50 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-purple-300">You haven't done any readings yet</p>
              </div>
            ) : (
              <div className="space-y-6">
                {previousReadings.map(reading => (
                  <div key={reading.id} className="bg-purple-900/50 border border-purple-500/30 rounded-xl p-5">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-lg text-amber-300">Reading #{reading.id}</h3>
                      <span className="text-sm text-purple-300 bg-purple-800/50 px-3 py-1 rounded-full">
                        {reading.date}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 mb-4">
                      {reading.cards.map((card, idx) => (
                        <span key={idx} className="bg-black/30 px-3 py-1 rounded-full text-sm text-amber-300 border border-amber-400/30">
                          {card}
                        </span>
                      ))}
                    </div>
                    
                    <button className="text-amber-400 hover:text-amber-300 text-sm font-medium flex items-center">
                      View Interpretation
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
        
      case 'about':
        return (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 shadow-lg">
            <h2 className="text-2xl font-bold text-amber-400 mb-6">About Tarot</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-amber-300 mb-4">The History of Tarot</h3>
                <p className="text-purple-200 mb-4">
                  Tarot cards originated in the mid-15th century in Europe as playing cards. It wasn't until the late 18th century that they began to be used for divination and spiritual guidance.
                </p>
                <p className="text-purple-200">
                  The modern tarot deck consists of 78 cards divided into the Major Arcana (22 cards representing life's karmic lessons) and the Minor Arcana (56 cards reflecting daily trials and tribulations).
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-amber-300 mb-4">How to Use This Tool</h3>
                <ul className="space-y-3 text-purple-200">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                    </div>
                    <span>Focus your mind on a specific question or area of your life before drawing cards</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                    </div>
                    <span>Interpret the cards as symbolic representations rather than literal predictions</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                    </div>
                    <span>Save your readings to track patterns and personal growth over time</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-purple-500/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-amber-300 mb-4">The Major Arcana</h3>
              <p className="text-purple-200 mb-4">
                The 22 Major Arcana cards represent significant life events and spiritual lessons. These cards often appear when something important is happening in your life that will have long-term effects.
              </p>
              <div className="flex flex-wrap gap-2">
                {tarotCards.slice(0, 10).map((card, idx) => (
                  <span key={idx} className="bg-black/30 px-3 py-1 rounded-full text-sm text-amber-300 border border-amber-400/30">
                    {card}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black flex flex-col">
      <div className="md:hidden bg-black/30 backdrop-blur-sm border-b border-purple-500/30 py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white">Celestial Tarot</h1>
        </div>
        
        <button 
          onClick={() => document.getElementById('mobile-menu').classList.toggle('hidden')}
          className="text-purple-300 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      <div className="flex flex-1">
        <div className="hidden md:flex md:w-64 bg-black/20 backdrop-blur-sm border-r border-purple-500/30 flex-col p-6">
          <div className="mb-10">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white text-center">Celestial Tarot</h1>
            {user && (
              <p className="text-center text-purple-300 mt-2">
                Welcome, <span className="text-amber-400">{user.name || 'Seeker'}</span>
              </p>
            )}
          </div>
          
          <nav className="space-y-2 flex-1">
            <button
              onClick={() => setActiveTab('draw')}
              className={`w-full text-left py-3 px-4 rounded-lg flex items-center transition-colors ${
                activeTab === 'draw' 
                  ? 'bg-gradient-to-r from-purple-700/50 to-indigo-800/50 text-amber-300 border border-purple-500/50' 
                  : 'text-purple-300 hover:bg-purple-900/30'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Draw Cards
            </button>
            
            <button
              onClick={() => setActiveTab('previous')}
              className={`w-full text-left py-3 px-4 rounded-lg flex items-center transition-colors ${
                activeTab === 'previous' 
                  ? 'bg-gradient-to-r from-purple-700/50 to-indigo-800/50 text-amber-300 border border-purple-500/50' 
                  : 'text-purple-300 hover:bg-purple-900/30'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Previous Readings
            </button>
            
            <button
              onClick={() => setActiveTab('about')}
              className={`w-full text-left py-3 px-4 rounded-lg flex items-center transition-colors ${
                activeTab === 'about' 
                  ? 'bg-gradient-to-r from-purple-700/50 to-indigo-800/50 text-amber-300 border border-purple-500/50' 
                  : 'text-purple-300 hover:bg-purple-900/30'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              About Tarot
            </button>
          </nav>
          
          <button 
            onClick={handleLogout}
            className="mt-auto py-3 px-4 rounded-lg text-white bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 flex items-center justify-center transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Log Out
          </button>
        </div>

        <div id="mobile-menu" className="hidden absolute inset-0 z-10 bg-black/80 backdrop-blur-sm md:hidden">
          <div className="flex justify-end p-6">
            <button 
              onClick={() => document.getElementById('mobile-menu').classList.add('hidden')}
              className="text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            
            {user && (
              <p className="text-center text-xl text-white mb-10">
                Welcome, <span className="text-amber-400">{user.name || 'Seeker'}</span>
              </p>
            )}
            
            <nav className="space-y-4 mb-10">
              <button
                onClick={() => {
                  setActiveTab('draw');
                  document.getElementById('mobile-menu').classList.add('hidden');
                }}
                className={`w-full text-left py-4 px-6 rounded-xl flex items-center text-lg ${
                  activeTab === 'draw' 
                    ? 'bg-gradient-to-r from-purple-700/50 to-indigo-800/50 text-amber-300' 
                    : 'bg-purple-900/50 text-white'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Draw Cards
              </button>
              
              <button
                onClick={() => {
                  setActiveTab('previous');
                  document.getElementById('mobile-menu').classList.add('hidden');
                }}
                className={`w-full text-left py-4 px-6 rounded-xl flex items-center text-lg ${
                  activeTab === 'previous' 
                    ? 'bg-gradient-to-r from-purple-700/50 to-indigo-800/50 text-amber-300' 
                    : 'bg-purple-900/50 text-white'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Previous Readings
              </button>
              
              <button
                onClick={() => {
                  setActiveTab('about');
                  document.getElementById('mobile-menu').classList.add('hidden');
                }}
                className={`w-full text-left py-4 px-6 rounded-xl flex items-center text-lg ${
                  activeTab === 'about' 
                    ? 'bg-gradient-to-r from-purple-700/50 to-indigo-800/50 text-amber-300' 
                    : 'bg-purple-900/50 text-white'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                About Tarot
              </button>
            </nav>
            
            <button 
              onClick={handleLogout}
              className="w-full py-4 px-6 rounded-xl text-white bg-gradient-to-r from-red-600 to-red-800 text-lg font-medium flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Log Out
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="md:hidden flex justify-between items-center mb-6 bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30">
            <h2 className="text-xl font-bold text-white capitalize">
              {activeTab === 'draw' && 'Draw Cards'}
              {activeTab === 'previous' && 'Previous Readings'}
              {activeTab === 'about' && 'About Tarot'}
            </h2>
            
            {user && (
              <button 
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            )}
          </div>
          
          {renderContent()}
        </div>
      </div>
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.7 + 0.3
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .animate-twinkle {
          animation: twinkle 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;