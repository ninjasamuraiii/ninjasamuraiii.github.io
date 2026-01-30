
import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Environment, ContactShadows, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';
import { CONFIG } from './config';
import { Page, UserState, WithdrawalRequest } from './types';
import { 
  TrendingUp, 
  MousePointer2, 
  Users, 
  ClipboardCheck, 
  Wallet, 
  Zap, 
  Disc,
  Clock,
  ChevronRight,
  Send,
  History,
  Info,
  MessageCircle,
  ExternalLink,
  Copy,
  Share2,
  Rocket,
  ShieldCheck,
  Globe,
  UserCheck,
  CreditCard,
  Banknote
} from 'lucide-react';
import { hapticFeedback, tg } from './services/tg';

// --- Реалистичная 3D Монета ---
const RealCoin = ({ onClick }: { onClick: () => void }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [spring, setSpring] = useState(1);

  useFrame((state) => {
    if (meshRef.current) {
      const lerpFactor = 0.15;
      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, spring, lerpFactor);
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, spring, lerpFactor);
      meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, spring, lerpFactor);
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
    }
  });

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    setSpring(1.12);
    onClick();
    hapticFeedback('light');
    setTimeout(() => setSpring(1), 100);
  };

  return (
    <PresentationControls global rotation={[0, 0, 0]} polar={[-0.2, 0.2]} azimuth={[-0.2, 0.2]}>
      <group ref={meshRef} onPointerDown={handlePointerDown} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[2, 2, 0.4, 64]} />
          <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.201, 0]}>
          <torusGeometry args={[1.9, 0.08, 16, 100]} />
          <meshStandardMaterial color="#B8860B" metalness={1} roughness={0.05} />
        </mesh>
        <mesh position={[0, -0.201, 0]}>
          <torusGeometry args={[1.9, 0.08, 16, 100]} />
          <meshStandardMaterial color="#B8860B" metalness={1} roughness={0.05} />
        </mesh>
        <Text
          position={[0, 0.22, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.75}
          color="#8B4513"
          fontWeight="900"
          anchorX="center"
          anchorY="middle"
        >
          {CONFIG.coin.text}
        </Text>
      </group>
    </PresentationControls>
  );
};

const App: React.FC = () => {
  const [page, setPage] = useState<Page>(Page.Exchange);
  const [state, setState] = useState<UserState>(() => {
    const saved = localStorage.getItem('egp_final_v2');
    if (saved) return JSON.parse(saved);
    return {
      balance: 0,
      totalBalance: 0,
      energy: CONFIG.game.maxEnergy,
      maxEnergy: CONFIG.game.maxEnergy,
      profitPerHour: 0,
      level: 1,
      lastUpdate: Date.now(),
      lastWheelSpin: 0,
      completedTasks: [],
      ownedUpgrades: {},
      referrals: 0,
      withdrawals: []
    };
  });

  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setState(prev => {
        const now = Date.now();
        const diffSeconds = (now - prev.lastUpdate) / 1000;
        const income = (prev.profitPerHour / 3600) * Math.min(diffSeconds, 10800);
        const recovery = Math.min(prev.maxEnergy, prev.energy + CONFIG.game.energyRecoveryRate);
        return { ...prev, balance: prev.balance + income, energy: recovery, lastUpdate: now };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('egp_final_v2', JSON.stringify(state));
  }, [state]);

  const handleTap = () => {
    if (state.energy >= CONFIG.game.profitPerTap) {
      setState(prev => ({
        ...prev,
        balance: prev.balance + CONFIG.game.profitPerTap,
        energy: prev.energy - CONFIG.game.profitPerTap
      }));
    }
  };

  const renderPage = () => {
    switch(page) {
      case Page.Exchange:
        return (
          <div className="flex-1 flex flex-col items-center justify-between p-6">
            <div className="text-center w-full">
              <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">Balance</span>
              <div className="flex items-center justify-center gap-3 mt-1">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-black font-black">E</div>
                <span className="text-5xl font-black tracking-tighter">{state.balance.toFixed(2).toLocaleString()}</span>
              </div>
              <div className="mt-4 bg-zinc-900/60 border border-white/5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full">
                <Clock size={12} className="text-blue-400" />
                <span className="text-xs font-bold text-blue-400">+{state.profitPerHour.toFixed(2)}/h</span>
              </div>
            </div>
            <div className="w-full h-[48vh]">
              <Canvas camera={{ position: [0, 5, 8], fov: 35 }}>
                <Suspense fallback={null}>
                  <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                    <RealCoin onClick={handleTap} />
                  </Float>
                  <Environment preset="city" />
                  <ContactShadows opacity={0.3} scale={10} blur={3} far={4} />
                </Suspense>
              </Canvas>
            </div>
            <div className="w-full space-y-3">
              <div className="flex justify-between items-center px-1 font-black">
                <div className="flex items-center gap-2 text-yellow-500">
                  <Zap size={20} fill="currentColor" />
                  <span>{state.energy} / {state.maxEnergy}</span>
                </div>
              </div>
              <div className="h-4 bg-zinc-900 rounded-full overflow-hidden p-0.5 border border-white/5">
                <div className="h-full bg-gradient-to-r from-yellow-600 to-yellow-300 rounded-full transition-all duration-300" style={{ width: `${(state.energy / state.maxEnergy) * 100}%` }}></div>
              </div>
            </div>
          </div>
        );

      case Page.Mine:
        return (
          <div className="p-6 pb-24 space-y-4 h-full overflow-y-auto no-scrollbar">
            <h2 className="text-2xl font-black mb-6 italic uppercase">Бизнес и активы</h2>
            {CONFIG.upgrades.map(u => (
              <button 
                key={u.id}
                onClick={() => {
                   if (state.balance >= u.cost) {
                     setState(prev => ({
                       ...prev,
                       balance: prev.balance - u.cost,
                       profitPerHour: prev.profitPerHour + u.profit,
                       ownedUpgrades: { ...prev.ownedUpgrades, [u.id]: (prev.ownedUpgrades[u.id] || 0) + 1 }
                     }));
                     hapticFeedback('success');
                   } else hapticFeedback('error');
                }}
                className="w-full bg-zinc-900 border border-white/5 p-5 rounded-[2rem] flex items-center justify-between active:scale-[0.98] transition-all"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="text-4xl">{u.image}</div>
                  <div>
                    <h4 className="font-black text-sm">{u.name}</h4>
                    <p className="text-[10px] text-zinc-500">{u.description}</p>
                    <div className="text-[10px] text-green-500 font-bold mt-1">+{u.profit}/час</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-yellow-500 font-black text-sm">{u.cost.toLocaleString()}</div>
                  <div className="text-[8px] text-zinc-600 font-black uppercase">Уровень {state.ownedUpgrades[u.id] || 0}</div>
                </div>
              </button>
            ))}
          </div>
        );

      case Page.Wallet:
        return (
          <div className="p-6 pb-24 space-y-6 overflow-y-auto h-full no-scrollbar">
            <div className="bg-zinc-900 border border-white/5 p-6 rounded-[2.5rem] space-y-4 shadow-2xl">
               <div className="flex justify-between items-center text-zinc-500 font-bold uppercase text-[10px] tracking-widest">
                  <span>Ваш капитал</span>
                  <Wallet size={16} />
               </div>
               <div className="text-4xl font-black">{Math.floor(state.balance).toLocaleString()} EGP</div>
               <div className="pt-3 border-t border-white/5 flex justify-between text-[10px] font-bold text-zinc-500">
                  <span>Курс вывода: 1 EGP = {CONFIG.game.usdRate}$</span>
                  <span className="text-green-500 font-black">~ ${(state.balance * CONFIG.game.usdRate).toFixed(2)}</span>
               </div>
            </div>

            <div className="space-y-4">
               <h3 className="font-black text-xl flex items-center gap-2 uppercase italic tracking-tight"><Banknote size={18}/> Доступные методы</h3>
               <div className="grid grid-cols-2 gap-3">
                  {CONFIG.withdrawalMethods.map(m => (
                    <div key={m.id} className="bg-zinc-900/60 border border-white/5 p-5 rounded-[2rem] flex flex-col items-center gap-2 text-center">
                       <span className="text-3xl">{m.icon}</span>
                       <span className="text-[9px] font-black uppercase text-zinc-300 tracking-tighter">{m.name}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-zinc-900/40 border border-white/5 p-6 rounded-[2.5rem] space-y-5">
                <div className="flex items-center gap-3 text-yellow-500">
                    <UserCheck size={28} />
                    <h3 className="font-black text-base uppercase italic leading-none">Ручной вывод <br/><span className="text-[10px] text-zinc-500 not-italic font-medium">через оператора</span></h3>
                </div>
                <div className="space-y-2">
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                       Все транзакции проверяются отделом безопасности вручную. Это гарантирует отсутствие ошибок и защиту от взлома.
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-white font-bold bg-white/5 p-2 rounded-xl">
                        <Info size={14} className="text-blue-400" />
                        <span>Минимум: {CONFIG.game.minWithdrawal.toLocaleString()} EGP</span>
                    </div>
                </div>
                <button 
                   onClick={() => {
                       hapticFeedback('medium');
                       window.open(CONFIG.game.supportLink, '_blank');
                   }}
                   className="w-full py-5 bg-yellow-500 text-black font-black rounded-3xl shadow-xl shadow-yellow-500/10 flex items-center justify-center gap-3 active:scale-95 transition-all text-lg"
                >
                   <MessageCircle size={24} />
                   Связаться с менеджером
                </button>
            </div>

            <div className="space-y-3">
              <h3 className="font-black text-xl flex items-center gap-2 uppercase italic tracking-tight"><History size={18}/> История выплат</h3>
              <div className="text-center py-10 text-zinc-700 italic text-sm bg-zinc-900/20 border border-dashed border-white/5 rounded-[2rem]">
                История транзакций пуста
              </div>
            </div>
          </div>
        );

      case Page.Tasks:
        return (
          <div className="p-6 pb-24 space-y-4 h-full overflow-y-auto no-scrollbar">
            <h2 className="text-2xl font-black mb-6 uppercase italic">Задания для роста</h2>
            {CONFIG.tasks.map(t => (
              <div 
                key={t.id}
                onClick={() => {
                  if (t.link !== '#') window.open(t.link, '_blank');
                  hapticFeedback('medium');
                }}
                className="bg-zinc-900/60 border border-white/5 p-5 rounded-[2rem] flex items-center justify-between active:scale-[0.98] transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{t.type === 'tg' ? '📱' : t.type === 'video' ? '📺' : t.type === 'insta' ? '📸' : t.type === 'x' ? '🐦' : '🔥'}</div>
                  <div>
                    <div className="font-bold text-xs leading-tight">{t.title}</div>
                    <div className="text-yellow-500 font-black text-[10px] mt-1">+{t.reward.toLocaleString()} EGP</div>
                  </div>
                </div>
                <div className="bg-zinc-800 p-2 rounded-xl text-zinc-500"><ExternalLink size={16} /></div>
              </div>
            ))}
          </div>
        );

      case Page.Friends:
        const refLink = `https://t.me/${CONFIG.game.botUsername}?start=${tg?.initDataUnsafe?.user?.id || 'demo'}`;
        return (
          <div className="p-8 flex flex-col items-center justify-center h-full text-center space-y-8">
            <div className="w-24 h-24 bg-blue-500/10 rounded-[2.5rem] flex items-center justify-center text-blue-500 border border-blue-500/20"><Users size={48} /></div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black uppercase italic tracking-tighter">Ваша Команда</h2>
              <p className="text-zinc-500 text-sm">Получайте мгновенный бонус 500 EGP и 10% от дохода каждого друга!</p>
            </div>
            <div className="w-full space-y-3">
              <button 
                onClick={() => {
                  const url = `https://t.me/share/url?url=${encodeURIComponent(refLink)}&text=${encodeURIComponent('Привет! Давай строить бизнес вместе в EGPower Clicker! 🚀')}`;
                  window.open(url, '_blank');
                }}
                className="w-full py-5 bg-blue-600 rounded-3xl font-black text-xl flex items-center justify-center gap-3 shadow-2xl shadow-blue-600/20 active:scale-95 transition-all"
              >
                <Share2 size={24} />
                Пригласить друга
              </button>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(refLink);
                  alert('Ссылка скопирована!');
                  hapticFeedback('success');
                }}
                className="w-full py-3 bg-zinc-900 rounded-2xl font-black text-[10px] uppercase tracking-widest text-zinc-400 border border-white/5 flex items-center justify-center gap-2"
              >
                <Copy size={14} />
                Копировать ссылку
              </button>
            </div>
          </div>
        );

      case Page.Explanation:
        return (
          <div className="p-6 pb-24 space-y-8 overflow-y-auto h-full no-scrollbar">
            <div className="space-y-4">
                <h2 className="text-3xl font-black uppercase italic tracking-tight leading-none">Почему это работает?</h2>
                <p className="text-zinc-500 text-sm leading-relaxed">Разбираем магию EGPower простыми словами.</p>
            </div>
            <div className="space-y-6">
              {[
                { 
                  t: "Сила Сообщества", 
                  d: "Крипто-биржи ценят только одно — живых пользователей. Ваши тапы и задания создают 'Proof of Engagement'.", 
                  i: <Globe className="text-blue-400" size={32} /> 
                },
                { 
                  t: "Реальная Экономика", 
                  d: "Майнинг в игре — это симуляция распределения ликвидности. Доходы от партнерской рекламы формируют пул выплат.", 
                  i: <TrendingUp className="text-green-400" size={32} /> 
                },
                { 
                  t: "Листинг и Будущее", 
                  d: "Текущий курс 0.02$ — это стартовая оценка. После листинга на DEX цена будет определяться рынком.", 
                  i: <Rocket className="text-yellow-500" size={32} /> 
                },
                { 
                  t: "Гарантия Выплат", 
                  d: "Мы внедрили ручную систему заявок через оператора для 100% защиты ваших средств.", 
                  i: <ShieldCheck className="text-purple-400" size={32} /> 
                }
              ].map((step, i) => (
                <div key={i} className="flex gap-5 items-start bg-zinc-900/60 border border-white/5 p-6 rounded-[2.5rem]">
                  <div className="shrink-0 mt-1">{step.i}</div>
                  <div className="space-y-1">
                    <h3 className="font-black text-sm uppercase text-white tracking-wide">{step.t}</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed font-medium">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case Page.Wheel:
        const canSpin = (Date.now() - state.lastWheelSpin) >= CONFIG.wheel.cooldown;
        return (
          <div className="p-6 flex flex-col items-center justify-center h-full space-y-8">
            <h2 className="text-2xl font-black uppercase italic tracking-tight">Колесо удачи</h2>
            <div className="relative w-72 h-72">
               <div 
                 className="w-full h-full rounded-full border-8 border-zinc-900 transition-transform duration-[4000ms] cubic-bezier(0.15, 0, 0.15, 1) relative overflow-hidden"
                 style={{ transform: `rotate(${wheelRotation}deg)` }}
               >
                 {CONFIG.wheel.prizes.map((p, i) => (
                   <div 
                     key={i} 
                     className="absolute top-0 left-1/2 w-1/2 h-full origin-left flex items-center justify-end pr-4 text-[10px] font-black"
                     style={{ 
                       transform: `rotate(${i * (360 / CONFIG.wheel.prizes.length)}deg)`, 
                       backgroundColor: p.color,
                       clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                     }}
                   ><span className="rotate-90 text-white">{p.label}</span></div>
                 ))}
               </div>
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 z-10 text-yellow-500"><ChevronRight className="rotate-90 fill-current" size={32}/></div>
            </div>
            <button 
              onClick={() => {
                 if (!canSpin || isSpinning) return;
                 setIsSpinning(true);
                 hapticFeedback('medium');
                 const bonus = 5 + Math.random() * 5;
                 setWheelRotation(wheelRotation + bonus * 360);
                 setTimeout(() => {
                    const prize = CONFIG.wheel.prizes[Math.floor(Math.random() * CONFIG.wheel.prizes.length)];
                    setState(s => ({...s, balance: prize.type === 'coins' ? s.balance + (prize.value as number) : s.balance, lastWheelSpin: Date.now()}));
                    setIsSpinning(false);
                    hapticFeedback('success');
                    alert(`Твой выигрыш: ${prize.label}`);
                 }, 4000);
              }}
              disabled={!canSpin || isSpinning}
              className="w-full py-5 rounded-3xl bg-yellow-500 text-black font-black text-xl shadow-xl shadow-yellow-500/20 disabled:opacity-30 active:scale-95 transition-all"
            >{isSpinning ? 'Удача близко...' : 'Испытать удачу'}</button>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden font-sans selection:bg-yellow-500/30">
      <div className="px-6 py-4 flex justify-between items-center z-20 border-b border-white/5 bg-black">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-yellow-500 rounded flex items-center justify-center text-black font-black text-[10px]">EG</div>
          <span className="font-black tracking-tighter text-sm uppercase italic">Power</span>
        </div>
        <button onClick={() => setPage(Page.Explanation)} className="flex items-center gap-1.5 text-zinc-500">
          <Info size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">Инфо</span>
        </button>
      </div>

      <main className="flex-1 relative flex flex-col overflow-hidden">{renderPage()}</main>

      <nav className="p-3 pb-8 bg-zinc-950 border-t border-white/5 flex justify-around items-center z-50">
        <NavBtn icon={<MousePointer2 size={18}/>} label="Биржа" active={page === Page.Exchange} onClick={() => setPage(Page.Exchange)} />
        <NavBtn icon={<TrendingUp size={18}/>} label="Майнинг" active={page === Page.Mine} onClick={() => setPage(Page.Mine)} />
        <NavBtn icon={<Disc size={18}/>} label="Удача" active={page === Page.Wheel} onClick={() => setPage(Page.Wheel)} />
        <NavBtn icon={<Users size={18}/>} label="Друзья" active={page === Page.Friends} onClick={() => setPage(Page.Friends)} />
        <NavBtn icon={<ClipboardCheck size={18}/>} label="Задачи" active={page === Page.Tasks} onClick={() => setPage(Page.Tasks)} />
        <NavBtn icon={<Wallet size={18}/>} label="Вывод" active={page === Page.Wallet} onClick={() => setPage(Page.Wallet)} />
      </nav>
    </div>
  );
};

const NavBtn = ({ icon, label, active, onClick }: any) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all ${active ? 'text-yellow-500 scale-105' : 'text-zinc-600'}`}>
    <div className={`p-1.5 rounded-xl ${active ? 'bg-yellow-500/10' : ''}`}>{icon}</div>
    <span className="text-[8px] font-black uppercase tracking-wider">{label}</span>
  </button>
);

export default App;
