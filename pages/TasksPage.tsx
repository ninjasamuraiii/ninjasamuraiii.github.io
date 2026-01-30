
import React, { useState } from 'react';
import { UserState, Task } from '../types';
import { hapticFeedback } from '../services/tg';
import { CheckCircle2, Circle, Coins, ArrowUpRight } from 'lucide-react';

interface Props {
  user: UserState;
  updateBalance: (amount: number) => void;
}

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Follow our Telegram channel', reward: 5000, completed: false, link: 'https://t.me/test' },
  { id: '2', title: 'Follow our X (Twitter)', reward: 5000, completed: false, link: 'https://x.com/test' },
  { id: '3', title: 'Join our Discord', reward: 10000, completed: false, link: 'https://discord.gg/test' },
  { id: '4', title: 'Watch daily video', reward: 25000, completed: false },
  { id: '5', title: 'Like & RT pinned post', reward: 15000, completed: false },
];

const TasksPage: React.FC<Props> = ({ user, updateBalance }) => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const completeTask = (task: Task) => {
    if (task.completed) return;
    
    hapticFeedback('success');
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, completed: true } : t));
    updateBalance(task.reward);
    
    if (task.link) {
        window.open(task.link, '_blank');
    }
  };

  return (
    <div className="space-y-6 pt-6">
      <div className="flex items-center space-x-3 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
         <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500">
            📅
         </div>
         <div>
            <h3 className="font-black text-sm">Daily Reward</h3>
            <p className="text-[10px] text-zinc-500 uppercase font-bold">Claim 5,000 coins every day!</p>
         </div>
         <button className="ml-auto bg-yellow-500 text-black px-4 py-2 rounded-xl text-xs font-black">
            Claim
         </button>
      </div>

      <div className="space-y-3">
        <h3 className="font-black text-lg px-1">Tasks List</h3>
        {tasks.map(task => (
            <div 
              key={task.id}
              onClick={() => completeTask(task)}
              className={`bg-zinc-900 border rounded-2xl p-4 flex items-center justify-between transition-all ${
                task.completed ? 'border-green-500/30 opacity-60' : 'border-zinc-800 active:scale-[0.98]'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${task.completed ? 'bg-green-500/20 text-green-400' : 'bg-zinc-800 text-zinc-500'}`}>
                  {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                </div>
                <div>
                  <h4 className="font-bold text-sm">{task.title}</h4>
                  <div className="flex items-center space-x-1 text-yellow-500 text-xs font-bold mt-0.5">
                    <Coins size={12} />
                    <span>+{task.reward.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              {!task.completed && <ArrowUpRight size={20} className="text-zinc-600" />}
            </div>
        ))}
      </div>
    </div>
  );
};

export default TasksPage;
