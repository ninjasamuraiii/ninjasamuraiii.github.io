
export const CONFIG = {
  game: {
    appName: "EGPower Clicker",
    currencyName: "EGP",
    tokenName: "EGPower",
    exchangeRate: 1, // 1 EGP
    usdRate: 0.02, // 1 EGP = 0.02$
    initialBalance: 0,
    maxEnergy: 1500,
    energyRecoveryRate: 3,
    profitPerTap: 1,
    minWithdrawal: 5000, // 5,000 EGP = 100$
    supportLink: "https://t.me/test1", 
    reactionsGroup: "https://t.me/test2", 
    botUsername: "EGPowerBot" 
  },
  coin: {
    text: "EGP",
    color: "#FFD700",
    edgeColor: "#B8860B"
  },
  wheel: {
    cooldown: 24 * 60 * 60 * 1000,
    prizes: [
      { label: "50", value: 50, type: 'coins', color: '#1a1a1a' },
      { label: "100", value: 100, type: 'coins', color: '#f0b90b' },
      { label: "500", value: 500, type: 'coins', color: '#1a1a1a' },
      { label: "1k", value: 1000, type: 'coins', color: '#f0b90b' },
      { label: "Energy", value: 1500, type: 'energy', color: '#1a1a1a' },
      { label: "JACKPOT", value: 5000, type: 'coins', color: '#ff4444' },
      { label: "250", value: 250, type: 'coins', color: '#1a1a1a' },
      { label: "150", value: 150, type: 'coins', color: '#f0b90b' },
    ]
  },
  withdrawalMethods: [
    { id: 'usdt_bep20', name: 'USDT (BEP20)', icon: '🟡' },
    { id: 'ton', name: 'TON Network', icon: '💎' },
    { id: 'trx', name: 'TRON (TRC20)', icon: '🔴' }
  ],
  upgrades: [
    { id: "1", name: "Локальный бизнес", cost: 50, profit: 0.5, description: "Франшиза кофейни в центре", image: "☕" },
    { id: "2", name: "Нефтяная вышка", cost: 300, profit: 4, description: "Добыча в Северном море", image: "🛢️" },
    { id: "3", name: "Акции IT-гигантов", cost: 1500, profit: 15, description: "Портфель акций (AAPL, TSLA, NVDA)", image: "📈" },
    { id: "4", name: "Коммерческая недвижимость", cost: 6000, profit: 65, description: "Бизнес-центр класса А", image: "🏙️" },
    { id: "5", name: "Золотой запас", cost: 20000, profit: 250, description: "Резервный фонд в слитках", image: "💰" },
  ],
  tasks: [
    { id: 't1', title: 'Подпишитесь на telegram канал', reward: 50, link: 'https://t.me/test', type: 'tg' },
    { id: 't2', title: 'Посмотрите видео', reward: 100, link: '#', type: 'video' },
    { id: 't3', title: 'Реакции на 20 постов в группе test2', reward: 250, link: 'https://t.me/test2', type: 'reactions' },
    { id: 't4', title: 'Подпишитесь на инстаграмм petlyuck300', reward: 75, link: 'https://instagram.com/petlyuck300', type: 'insta' },
    { id: 't5', title: 'Подпишитесь на X', reward: 75, link: 'https://x.com/', type: 'x' }
  ]
};
