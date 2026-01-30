
import React, { useState } from 'react';
import { UserState, Card } from '../types';
import { hapticFeedback } from '../services/tg';
import { Coins } from 'lucide-react';

interface Props {
  user: UserState;
  updateBalance: (amount: number, profitInc: number) => void;
}

const MinePage: React.FC<Props> = ({ user, updateBalance }) => {
  const config = user.config!;
  const [activeTab, setActiveTab] = useState<string>('All');
  const categories = ['All', 'PR', 'Markets', 'Legal', 'Team', 'Specials'];

  const filteredCards = activeTab === 'All' 
    ? config.cards 
    : config.cards.filter(c => c.category === activeTab);

  const buyCard = (card: Card) => {
    if (user.balance >= card.basePrice) {
      hapticFeedback('success');
      updateBalance(-card.basePrice, card.baseProfit);
    } else {
      hapticFeedback('error');
    }
  };

  return (
    <div className="space-y-4 pt-4">
      <div className="flex space-x-2 overflow-x-auto pb-2 -mx-1 px-1 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${
              activeTab === cat 
                ? 'bg-zinc-100 border-white text-black shadow-lg' 
                : 'bg-zinc-900 border-zinc-800 text-zinc-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filteredCards.map(card => (
          <div 
            key={card.id}
            onClick={() => buyCard(card)}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3 flex flex-col justify-between space-y-3 active:scale-95 transition-transform"
          >
            <div className="flex justify-between items-start">
              <div className="text-3xl">{card.image}</div>
              <div className="bg-zinc-800 px-2 py-0.5 rounded-full text-[8px] font-black uppercase text-zinc-400">
                Lvl 0
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold leading-tight">{card.name}</h3>
              <p className="text-[10px] text-zinc-500 mt-1 line-clamp-2">{card.description}</p>
            </div>
            <div className="pt-2 border-t border-zinc-800">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                        <Coins size={10} style={{ color: config.themeColor }} />
                        <span className="text-xs font-black" style={{ color: config.themeColor }}>{card.basePrice.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-0.5 text-[9px] text-blue-400 font-bold">
                        <span>+{card.baseProfit}</span>
                    </div>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MinePage;
