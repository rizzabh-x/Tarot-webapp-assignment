import { useState, useEffect} from 'react';
import fool from "../../assets/the-fool.png";
import magician from "../../assets/magician.png";
import priestess from "../../assets/high-preistess.png"

const HeroSection = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [wisdom, setWisdom] = useState('');
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    const body = document.body;
    body.classList.remove('bg-gradient-light', 'bg-gradient-dark', 'bg-gradient-mystical');
    
    if(theme === 'light') body.classList.add('bg-gradient-light');
    else if(theme === 'dark') body.classList.add('bg-gradient-dark');
    else body.classList.add('bg-gradient-mystical');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      if(prev === 'light') return 'dark';
      if(prev === 'dark') return 'mystical';
      return 'light';
    });
  };

  const themeIcons = {
    light: '☀️',
    dark: '🌙',
    mystical: '🔮'
  };

  const cardWisdom = {
    fool: "Embrace new beginnings with an open heart and a spirit of adventure.",
    magician: "Harness your inner resources and creativity to manifest your desires.",
    priestess: "Trust your intuition and look beyond the surface to uncover hidden truths."
  };

  const handleCardClick = (card) => {
    setActiveCard(card);
    setWisdom(cardWisdom[card]);
    
    setTimeout(() => {
      setActiveCard(null);
      setWisdom('');
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center mt-6 lg:mt-10">
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="fixed top-4 right-4 md:top-6 md:right-6 z-50 p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <span className="text-xl">{themeIcons[theme]}</span>
      </button>

      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        Ancient Wisdom Meets
        {" "}
        <span className="bg-gradient-to-r from-pink-500 to-violet-800 text-transparent bg-clip-text">Modern Insight</span>
      </h1>
      <p className="mt-10 text-lg text-white-500 max-w-4xl text-center">
        Unlock personalized guidance from the universe. Discover what your soul already knows.
      </p>

      <div className="mt-8 mb-4 p-5 rounded-xl border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg shadow-gray-900/50 backdrop-blur-sm transition-all duration-300 hover:shadow-indigo-900/30 animate-pulse">
        <div className="text-lg text-center font-medium text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-indigo-200 to-cyan-200">
          {wisdom || "Quick Insight: Tap a card"}
        </div>
      </div>

      <div className="relative w-full max-w-4xl h-80 md:h-96 mt-6 md:mt-10 flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div 
              key={`fool-particle-${i}`}
              className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full animate-particle"
              style={{
                top: '50%',
                left: '30%',
                animationDelay: `${i * 0.2}s`,
                opacity: 0.6 - (i * 0.05)
              }}
            />
          ))}

          {[...Array(8)].map((_, i) => (
            <div 
              key={`magician-particle-${i}`}
              className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full animate-particle"
              style={{
                top: '45%',
                left: '50%',
                animationDelay: `${0.1 + (i * 0.2)}s`,
                opacity: 0.6 - (i * 0.05)
              }}
            />
          ))}

          {[...Array(8)].map((_, i) => (
            <div 
              key={`priestess-particle-${i}`}
              className="absolute w-1.5 h-1.5 bg-purple-400 rounded-full animate-particle"
              style={{
                top: '50%',
                left: '70%',
                animationDelay: `${0.2 + (i * 0.2)}s`,
                opacity: 0.6 - (i * 0.05)
              }}
            />
          ))}
        </div>

        <div 
          className={`absolute left-[10%] md:left-[20%] w-28 h-44 md:w-40 md:h-64 rounded-xl shadow-xl border-2 border-yellow-300 transform -rotate-6 animate-float-1 overflow-hidden cursor-pointer transition-all duration-300 ${activeCard === 'fool' ? 'z-50 scale-110 rotate-0' : 'z-0'}`}
          onClick={() => handleCardClick('fool')}
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${fool})` }}/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-2 text-center">
            <div className="text-yellow-100 font-bold text-center text-sm md:text-base">The Fool</div>
          </div>
          <div className="absolute inset-0 rounded-xl shadow-[0_0_25px_-5px_rgba(234,179,8,0.7)] animate-glow-yellow" />
        </div>

        <div 
          className={`relative z-10 w-32 h-48 md:w-44 md:h-68 rounded-xl shadow-xl border-2 border-blue-300 transform rotate-0 animate-float-2 overflow-hidden cursor-pointer transition-all duration-300 ${activeCard === 'magician' ? 'z-50 scale-110' : 'z-10'}`}
          onClick={() => handleCardClick('magician')}
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${magician})` }}/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-2 text-center">
            <div className="text-blue-100 font-bold text-center text-sm md:text-base">The Magician</div>
          </div>
          <div className="absolute inset-0 rounded-xl shadow-[0_0_25px_-5px_rgba(59,130,246,0.7)] animate-glow-blue" />
        </div>

        <div 
          className={`absolute right-[10%] md:right-[20%] w-28 h-44 md:w-40 md:h-64 rounded-xl shadow-xl border-2 border-purple-300 transform rotate-6 animate-float-3 overflow-hidden cursor-pointer transition-all duration-300 ${activeCard === 'priestess' ? 'z-50 scale-110 rotate-0' : 'z-0'}`}
          onClick={() => handleCardClick('priestess')}
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${priestess})` }}/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-2 text-center">
            <div className="text-purple-100 font-bold text-center text-sm md:text-base">The High Priestess</div>
          </div>
          <div className="absolute inset-0 rounded-xl shadow-[0_0_25px_-5px_rgba(139,92,246,0.7)] animate-glow-purple" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;