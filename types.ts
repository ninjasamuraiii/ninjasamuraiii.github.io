
// Types definition for the EGPower Clicker application

export enum Page {
  Exchange = 'Exchange',
  Mine = 'Mine',
  Friends = 'Friends',
  Tasks = 'Tasks',
  Wheel = 'Wheel',
  Wallet = 'Wallet',
  Explanation = 'Explanation',
  Builder = 'Builder',
  Airdrop = 'Airdrop'
}

export interface Card {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  basePrice: number;
  baseProfit: number;
}

export interface Asset {
  symbol: string;
  name: string;
  price: number;
  icon: string;
}

export interface GameConfig {
  appName: string;
  themeColor: string;
  currencyName: string;
  mainObjectEmoji: string;
  baseAssets: Asset[];
  cards: Card[];
}

export interface Task {
  id: string;
  title: string;
  reward: number;
  completed: boolean;
  link?: string;
}

export interface UserState {
  balance: number;
  totalBalance: number;
  energy: number;
  maxEnergy: number;
  profitPerHour: number;
  level: number;
  lastUpdate: number;
  lastWheelSpin: number;
  completedTasks: string[];
  ownedUpgrades: Record<string, number>;
  referrals: number;
  withdrawals: WithdrawalRequest[];
  config?: GameConfig;
}

export interface WithdrawalRequest {
  id: string;
  amount: number;
  method: string;
  address: string;
  status: 'pending' | 'completed' | 'rejected';
  date: number;
}
