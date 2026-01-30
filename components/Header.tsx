
import React from 'react';
import { UserState } from '../types';
import { Coins, Zap, Clock } from 'lucide-react';

interface Props {
  user: UserState;
}

const Header: React.FC<Props> = ({ user }) => {
  const config = user.config!;

  return (
    <div className="pt-6 pb-4 px-4 bg-gradient-to-b from-zinc-900 to-black space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 bg-zinc-800/50 rounded-full px-3 py-1 border border-zinc-700">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-xs"
            style={{ backgroundColor: config.themeColor }}
          >
            CEO
          </div>
          <span className="text-xs font-semibold">{config.appName} Lvl {user.level}</span>
        </div>
        
        <div className="flex space-x-2">
            <button className="bg-indigo-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-lg shadow-indigo-900/20">
              Connect Wallet
            </button>
        </div>
      </div>

      <div className="flex justify-around items-center bg-zinc-800/40 rounded-2xl py-3 border border-zinc-700/50">
        <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-zinc-400 text-[10px] uppercase font-bold">
                <Zap size={10} style={{ color: config.themeColor }} />
                <span>per tap</span>
            </div>
            <div className="text-sm font-bold" style={{ color: config.themeColor }}>+{user.level}</div>
        </div>
        <div className="w-px h-8 bg-zinc-700"></div>
        <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-zinc-400 text-[10px] uppercase font-bold">
                <Clock size={10} className="text-blue-400" />
                <span>per hour</span>
            </div>
            <div className="text-sm font-bold text-blue-400">+{user.profitPerHour}</div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex items-center space-x-3">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
            style={{ backgroundColor: config.themeColor, boxShadow: `0 0 20px ${config.themeColor}66` }}
          >
             <Coins className="text-black" size={28} />
          </div>
          <span className="text-4xl font-black tracking-tight">{Math.floor(user.balance).toLocaleString()}</span>
        </div>
        <p className="text-[10px] text-zinc-500 font-black uppercase mt-1 tracking-[0.2em]">{config.currencyName}</p>
      </div>
    </div>
  );
};

export default Header;
