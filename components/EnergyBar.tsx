
import React from 'react';
import { UserState } from '../types';
import { Zap } from 'lucide-react';

interface Props {
  user: UserState;
}

const EnergyBar: React.FC<Props> = ({ user }) => {
  const percentage = (user.energy / user.maxEnergy) * 100;

  return (
    <div className="w-full space-y-1">
      <div className="flex justify-between items-end text-sm">
        <div className="flex items-center space-x-1 font-bold text-yellow-500">
          <Zap size={16} fill="currentColor" />
          <span>{user.energy} / {user.maxEnergy}</span>
        </div>
      </div>
      <div className="h-3 w-full bg-zinc-800 rounded-full overflow-hidden border border-zinc-700/50">
        <div 
          className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-300" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default EnergyBar;
