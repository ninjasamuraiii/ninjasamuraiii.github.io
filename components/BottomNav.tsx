
import React from 'react';
import { Page } from '../types';
import { Home, Pickaxe, Users, ClipboardCheck, Gift, Wrench } from 'lucide-react';
import { hapticFeedback } from '../services/tg';

interface Props {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const BottomNav: React.FC<Props> = ({ currentPage, setCurrentPage }) => {
  // Corrected Page enum references to match types.ts definitions
  const tabs = [
    { id: Page.Exchange, label: 'Earn', icon: Home },
    { id: Page.Mine, label: 'Mine', icon: Pickaxe },
    { id: Page.Builder, label: 'Builder', icon: Wrench },
    { id: Page.Friends, label: 'Friends', icon: Users },
    { id: Page.Tasks, label: 'Tasks', icon: ClipboardCheck },
    { id: Page.Airdrop, label: 'Airdrop', icon: Gift },
  ];

  const handleTabClick = (page: Page) => {
    hapticFeedback('soft');
    setCurrentPage(page);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-zinc-900/90 backdrop-blur-md border-t border-zinc-800 pb-safe px-1 py-3 flex justify-between items-center z-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`flex flex-col items-center flex-1 transition-all duration-200 ${
            currentPage === tab.id ? 'text-yellow-500 scale-110' : 'text-zinc-500'
          }`}
        >
          <tab.icon size={currentPage === tab.id ? 24 : 20} className={currentPage === tab.id ? 'drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]' : ''} />
          <span className="text-[9px] mt-1 font-bold uppercase">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
