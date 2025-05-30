import React, { useState } from 'react';

const CTASection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-16">
      <div className="absolute inset-0 overflow-hidden -z-10 flex items-center justify-center">
        <div className={`absolute w-72 h-72 rounded-full bg-gradient-to-r from-amber-400/10 to-orange-500/10 filter blur-3xl transition-all duration-1000 ${isHovered ? 'opacity-40 scale-125' : 'opacity-20 scale-100'}`}></div>
        {[...Array(12)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-amber-400 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: Math.random() * 0.6 + 0.2
            }}
          />
        ))}
      </div>
      
      <div className="flex flex-col items-center">
        <button 
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative px-10 py-5 rounded-full text-xl md:text-2xl font-bold text-white shadow-2xl transform transition-all duration-500 group ${
            isClicked 
              ? 'scale-90 opacity-0' 
              : 'hover:scale-105 hover:shadow-amber-500/30'
          }`}
          disabled={isClicked}
        >
          <span className={`relative z-20 tracking-wide transition-all ${
            isHovered ? 'group-hover:tracking-widest' : ''
          }`}>
            {isClicked ? "Your Journey Begins..." : "Login to Begin Your Reading"}
          </span>

          <span className="absolute inset-0 bg-gradient-to-r from-amber-500 via-amber-400 to-orange-600 rounded-full z-10"></span>

          <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full opacity-70 filter blur-xl animate-glow-gold transition-opacity group-hover:opacity-90"></span>

          <span className={`absolute top-0 left-1/4 w-1/2 h-1/3 bg-white/20 rounded-full transform rotate-12 transition-all ${
            isHovered ? 'left-1/3 opacity-80' : 'opacity-40'
          }`}></span>
        </button>
        <p className={`mt-8 text-lg md:text-xl italic text-amber-100 text-center max-w-md leading-relaxed transition-all duration-500 ${
          isHovered ? 'hover:text-amber-50 hover:scale-105' : ''
        }`}>
          "What question burns in your heart today?"
        </p>

        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent my-8 rounded-full"></div>

        <div className="flex items-center justify-center space-x-6">
          {[...Array(3)].map((_, i) => (
            <div 
              key={`symbol-${i}`} 
              className={`text-amber-400 transition-all ${
                isHovered ? 'opacity-100 scale-110' : 'opacity-70 scale-100'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CTASection;