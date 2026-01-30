
import React from 'react';
import { UserState } from '../types';
import { Users, Copy, Share2 } from 'lucide-react';
import { hapticFeedback, tg } from '../services/tg';

interface Props {
  user: UserState;
}

const FriendsPage: React.FC<Props> = ({ user }) => {
  const shareLink = `https://t.me/your_bot_name?start=ref_${tg?.initDataUnsafe?.user?.id || 'demo'}`;

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink);
    hapticFeedback('success');
    alert("Referral link copied!");
  };

  const inviteFriend = () => {
    if (tg) {
        tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(shareLink)}&text=${encodeURIComponent("Join Hamster Clicker and earn coins with me!")}`);
    }
  };

  return (
    <div className="space-y-6 pt-6 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-2">
        <Users size={40} />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-black">Invite Friends!</h2>
        <p className="text-zinc-500 text-sm">You and your friend will receive bonuses</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-left space-y-4">
        <div className="flex items-start space-x-4">
          <div className="text-2xl">🎁</div>
          <div>
            <h4 className="font-bold text-sm">Invite a friend</h4>
            <p className="text-xs text-zinc-500"><span className="text-yellow-500">+5,000</span> for you and your friend</p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <div className="text-2xl">⭐</div>
          <div>
            <h4 className="font-bold text-sm">Invite a friend with Telegram Premium</h4>
            <p className="text-xs text-zinc-500"><span className="text-yellow-500">+25,000</span> for you and your friend</p>
          </div>
        </div>
      </div>

      <div className="pt-4 flex flex-col space-y-3">
        <button 
          onClick={inviteFriend}
          className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-black text-lg flex items-center justify-center space-x-2 shadow-lg shadow-blue-900/20 active:scale-[0.98] transition-all"
        >
          <span>Invite a friend</span>
          <Share2 size={20} />
        </button>
        <button 
          onClick={copyLink}
          className="w-full bg-zinc-800 hover:bg-zinc-700 py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 border border-zinc-700 active:scale-[0.98] transition-all"
        >
          <span>Copy link</span>
          <Copy size={18} />
        </button>
      </div>

      <div className="text-left pt-6">
        <h3 className="font-black text-lg mb-4">List of your friends ({user.referrals})</h3>
        {user.referrals === 0 ? (
          <div className="bg-zinc-900/50 border border-zinc-800 border-dashed rounded-xl py-8 text-center text-zinc-500 text-sm italic">
            You haven't invited anyone yet
          </div>
        ) : (
          <div className="space-y-3">
             {[...Array(user.referrals)].map((_, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs">👤</div>
                        <span className="text-sm font-bold">User_{8423 + i}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-500 text-xs font-bold">
                        <span>+5,000</span>
                    </div>
                </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;
