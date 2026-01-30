
import React from 'react';
import { UserState } from '../types';
import TapArea from '../components/TapArea';
import EnergyBar from '../components/EnergyBar';

interface Props {
  user: UserState;
  onTap: (x: number, y: number) => boolean;
}

const MainPage: React.FC<Props> = ({ user, onTap }) => {
  return (
    <div className="space-y-6 pt-4">
      <TapArea onTap={onTap} config={user.config!} />
      <EnergyBar user={user} />
      
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
            🏆
          </div>
          <div>
            <p className="text-[10px] text-zinc-500 uppercase font-bold">Rank</p>
            <p className="text-sm font-bold">#1,000</p>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400">
            📊
          </div>
          <div>
            <p className="text-[10px] text-zinc-500 uppercase font-bold">Total Mined</p>
            <p className="text-sm font-bold">{Math.floor(user.totalBalance).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
