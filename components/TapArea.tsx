
import React, { useState } from 'react';
import { GameConfig } from '../types';

interface Props {
  onTap: (x: number, y: number) => boolean;
  config: GameConfig;
}

const TapArea: React.FC<Props> = ({ onTap, config }) => {
  const [popups, setPopups] = useState<{id: number, x: number, y: number}[]>([]);
  
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const success = onTap(e.clientX, e.clientY);
    if (!success) return;

    const newPopup = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY
    };
    
    setPopups(prev => [...prev, newPopup]);
    setTimeout(() => {
      setPopups(prev => prev.filter(p => p.id !== newPopup.id));
    }, 800);
  };

  return (
    <div 
      className="relative flex justify-center items-center py-8"
      onPointerDown={handlePointerDown}
    >
      <div 
        className="w-64 h-64 rounded-full p-4 tap-bounce cursor-pointer flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${config.themeColor}, #000)`, boxShadow: `0 0 50px ${config.themeColor}44` }}
      >
        <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center border-4 border-white/5">
             <div className="text-[120px] select-none pointer-events-none drop-shadow-2xl animate-pulse">
                {config.mainObjectEmoji}
             </div>
        </div>
      </div>

      {popups.map(p => (
        <div 
          key={p.id} 
          className="coin-popup text-2xl" 
          style={{ left: p.x - 20, top: p.y - 40, color: config.themeColor }}
        >
          +1
        </div>
      ))}
    </div>
  );
};

export default TapArea;
