
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { GameConfig } from '../types';
import { Bot, Sparkles, Code, Terminal, Play, CheckCircle } from 'lucide-react';
import { hapticFeedback } from '../services/tg';

interface Props {
  onApply: (config: GameConfig) => void;
}

const BuilderPage: React.FC<Props> = ({ onApply }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{config: GameConfig, guide: string} | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    hapticFeedback('medium');

    try {
      // Create a new GoogleGenAI instance right before making an API call
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: `Act as TG Invest Platform Builder Pro. Create a trading asset and clicker game configuration based on this idea: "${prompt}". 
        Include 5 realistic assets (cryptocurrencies or tokens) that fit this theme.
        Also include 4 mining upgrade cards.
        JSON must follow: { 
          config: {
            appName: string, 
            themeColor: string (hex), 
            currencyName: string,
            mainObjectEmoji: string,
            baseAssets: Array<{ symbol: string, name: string, price: number, icon: string emoji }>,
            cards: Array<{ id: string, name: string, description: string, category: string, image: string emoji, basePrice: number, baseProfit: number }>
          },
          guide: string 
        }. 
        Provide a short trading strategy guide as well.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              config: {
                type: Type.OBJECT,
                properties: {
                  appName: { type: Type.STRING },
                  themeColor: { type: Type.STRING },
                  currencyName: { type: Type.STRING },
                  mainObjectEmoji: { type: Type.STRING },
                  baseAssets: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        symbol: { type: Type.STRING },
                        name: { type: Type.STRING },
                        price: { type: Type.NUMBER },
                        icon: { type: Type.STRING }
                      }
                    }
                  },
                  cards: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        name: { type: Type.STRING },
                        description: { type: Type.STRING },
                        category: { type: Type.STRING },
                        image: { type: Type.STRING },
                        basePrice: { type: Type.NUMBER },
                        baseProfit: { type: Type.NUMBER }
                      }
                    }
                  }
                },
                required: ["appName", "themeColor", "baseAssets", "cards", "currencyName", "mainObjectEmoji"]
              },
              guide: { type: Type.STRING }
            }
          }
        }
      });

      const data = JSON.parse(response.text);
      setResult(data);
    } catch (error) {
      console.error("Generation failed", error);
      alert("AI Generation failed. Check API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pt-6 pb-10 px-4">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg">
          <Bot className="text-white" size={28} />
        </div>
        <div>
          <h2 className="text-xl font-black uppercase">AI Market Builder</h2>
          <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Generate Custom Trading Sets</p>
        </div>
      </div>

      <div className="bg-[#1e2329] border border-gray-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <label className="text-xs font-black text-gray-500 uppercase block ml-1 tracking-widest">Market Theme (e.g., Meme coins, Tech stocks)</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. 2024 AI Boom or Mars Colonization Tokens..."
          className="w-full bg-black border border-gray-800 rounded-2xl p-4 text-sm focus:border-binance-yellow outline-none transition-all h-32 resize-none"
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !prompt}
          className="w-full bg-binance-yellow text-black disabled:opacity-50 py-4 rounded-2xl font-black text-lg flex items-center justify-center space-x-2 active:scale-95 transition-all"
        >
          {loading ? <Terminal className="animate-spin" size={20} /> : <><span>Generate Markets</span><Sparkles size={20} /></>}
        </button>
      </div>

      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-[#1e2329] border border-green-500/30 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-green-400 flex items-center space-x-2">
                <CheckCircle size={18} />
                <span className="uppercase text-sm tracking-widest">Strategy Ready</span>
              </h3>
              <button 
                onClick={() => onApply(result.config)}
                className="bg-green-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center space-x-2"
              >
                <Play size={14} />
                <span>Apply Markets</span>
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {result.config.baseAssets.map(a => (
                <div key={a.symbol} className="bg-black/40 p-3 rounded-xl border border-gray-800">
                    <div className="text-xl">{a.icon}</div>
                    <div className="font-black text-[10px] mt-1 uppercase">{a.symbol}</div>
                    <div className="text-[10px] text-gray-500">${a.price}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1e2329] border border-gray-800 rounded-3xl p-6">
             <div className="flex items-center space-x-2 text-gray-400 mb-2">
                <Code size={18} />
                <h4 className="font-black text-xs uppercase tracking-widest">Trading Guide</h4>
             </div>
             <div className="text-[11px] font-medium text-gray-400 leading-relaxed italic">
                {result.guide}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuilderPage;
