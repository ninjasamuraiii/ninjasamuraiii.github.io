
import React from 'react';
import { UserState } from '../types';
import { Wallet, CheckCircle2, Clock } from 'lucide-react';

interface Props {
  user: UserState;
}

const AirdropPage: React.FC<Props> = ({ user }) => {
  const steps = [
    { title: 'Telegram Wallet connected', status: 'pending' },
    { title: 'Level 5 reached', status: user.level >= 5 ? 'done' : 'pending' },
    { title: 'Mining profit > 10,000/hr', status: user.profitPerHour >= 10000 ? 'done' : 'pending' },
    { title: 'At least 5 friends invited', status: user.referrals >= 5 ? 'done' : 'pending' },
  ];

  return (
    <div className="space-y-6 pt-10 text-center">
      <div className="relative inline-block">
        <div className="w-24 h-24 rounded-[2.5rem] bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-[0_0_40px_rgba(139,92,246,0.3)]">
            <Wallet size={48} />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-zinc-900 rounded-full p-1.5 border border-zinc-800">
            <Clock size={20} className="text-yellow-500" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-black">Airdrop Tasks</h2>
        <p className="text-zinc-500 text-sm max-w-[280px] mx-auto">Complete the checklist to become eligible for the $HAMSTER token distribution.</p>
      </div>

      <div className="text-left bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden divide-y divide-zinc-800">
        {steps.map((step, i) => (
          <div key={i} className="p-4 flex items-center justify-between">
            <span className={`text-sm font-bold ${step.status === 'done' ? 'text-zinc-100' : 'text-zinc-500'}`}>
                {step.title}
            </span>
            {step.status === 'done' ? (
                <CheckCircle2 size={20} className="text-green-500" />
            ) : (
                <div className="w-5 h-5 rounded-full border-2 border-zinc-700"></div>
            )}
          </div>
        ))}
      </div>

      <div className="pt-4 pb-10">
        <button className="w-full bg-indigo-600 hover:bg-indigo-500 py-4 rounded-2xl font-black text-lg shadow-lg shadow-indigo-900/20 transition-all active:scale-[0.98]">
            Connect Wallet
        </button>
        <p className="text-[10px] text-zinc-600 mt-3 font-bold uppercase tracking-widest">Listing coming soon in Q3 2024</p>
      </div>
    </div>
  );
};

export default AirdropPage;
