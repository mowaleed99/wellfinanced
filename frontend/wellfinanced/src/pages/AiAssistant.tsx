import { useState, useRef, useEffect } from 'react';
import { useFinance } from '../context/FinanceContext';

type Message = {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  type?: 'text' | 'insight' | 'chart';
  insightData?: any;
};

export default function AiAssistant() {
  const { balance } = useFinance();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hello! I'm your Ai Assistant. I've been monitoring your business accounts and project pipelines while you were away.",
      type: 'insight',
      insightData: { label: 'REVENUE INSIGHT', value: "I've analyzed your project pipeline and you're 15% ahead of target this month. Great progress!" }
    },
    {
      id: '2',
      sender: 'user',
      text: "Can I afford to invest in that new high-end workstation this week?",
      type: 'text'
    },
    {
      id: '3',
      sender: 'ai',
      text: "Based on your current cashflow and the $2,400 pending invoice from Studio Alpha, yes. Even after a $3,500 purchase, you'll maintain a 2-month safety buffer.",
      type: 'chart'
    }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { id: crypto.randomUUID(), sender: 'user', text: input, type: 'text' }]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: crypto.randomUUID(), 
        sender: 'ai', 
        text: `With your current balance of $${balance.toLocaleString()}, you have a strong runway. Let me know if you need specific breakdowns!`,
        type: 'text'
      }]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex-1 px-container-padding flex flex-col h-[calc(100vh-80px)] bg-[#11131C] pt-6">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6 px-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/5 bg-[#1A1C29] flex items-center justify-center">
            <img alt="AI Assistant" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZLDh8-ZndmgVJ6APcmfZYG8_Z3xpAHicyJxZznYxw2SjXtTrODXEtdG6jZQaachu1sZ6WgRzkN6fY28cv8nIFst3nnFxrOvfXcukqGcXJbiYeww4IkvzlWALeFcdCyW7vHx8LhnAFLaUV9FGh9ZPB744jg9gM3Or7DpfMXljPBD5m5H61lHK_-rqbYexAg8rNDbwLd_LJu07OZXSI7B2f3TE-HOLtBxUEdiolmeESTr9dMcQJ-T9-dnKpeuHVaUOPNbG9rZSFExC2"/>
          </div>
          <h1 className="text-xl font-bold text-[#6D28D9]">Ai Assistant</h1>
        </div>
        <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
          <span className="material-symbols-outlined text-[20px]">info</span>
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 space-y-6 overflow-y-auto pb-32 hide-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
            {/* Avatars */}
            {msg.sender === 'ai' ? (
              <div className="w-8 h-8 rounded-lg bg-[#5B21B6] flex items-center justify-center shrink-0 mt-1">
                <span className="material-symbols-outlined text-[18px] text-white" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-lg bg-[#334155] flex items-center justify-center shrink-0 mt-1 border border-white/5">
                <span className="material-symbols-outlined text-[18px] text-slate-300">person</span>
              </div>
            )}
            
            {/* Bubble */}
            <div className={`max-w-[85%] rounded-[20px] p-4 ${msg.sender === 'user' ? 'bg-[#3B82F6] text-white rounded-tr-[4px] shadow-[0_4px_20px_rgba(59,130,246,0.2)]' : 'bg-[#1A1C29] text-slate-300 border border-white/5 rounded-tl-[4px] shadow-lg'}`}>
              <p className="text-[15px] leading-relaxed">{msg.text}</p>
              
              {/* Insight Component */}
              {msg.type === 'insight' && msg.insightData && (
                <div className="mt-4 p-4 rounded-xl bg-[#1E293B] border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-[#93C5FD] text-[16px]">trending_up</span>
                    <span className="text-[11px] font-bold text-[#93C5FD] uppercase tracking-wider">{msg.insightData.label}</span>
                  </div>
                  <p className="text-[13px] text-slate-300 leading-relaxed">
                    I've analyzed your project pipeline and you're <span className="text-[#D8B4FE]">15% ahead of target</span> this month. Great progress!
                  </p>
                </div>
              )}

              {/* Chart Component */}
              {msg.type === 'chart' && (
                <div className="mt-4 pt-4 border-t border-white/5">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider font-bold">Projected Runway</span>
                    <span className="text-xs font-bold text-[#D8B4FE]">92 DAYS</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden flex">
                    <div className="h-full bg-gradient-to-r from-[#3B82F6] to-[#A855F7] rounded-full w-[75%]"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Bottom Action & Input Area */}
      <div className="absolute bottom-[80px] left-0 w-full z-40 bg-[#0B0D14] border-t border-white/5 pt-4 pb-4">
        {/* Quick Actions Scrollable */}
        <div className="w-full px-6 pb-4 overflow-x-auto hide-scrollbar flex gap-3">
          <button onClick={() => setInput("Analyze my spending")} className="whitespace-nowrap px-4 py-2 rounded-full border border-white/10 bg-[#1A1C29] hover:bg-white/5 text-slate-300 flex items-center gap-2 transition-all text-[13px] font-medium">
            <span className="material-symbols-outlined text-[16px] text-[#B8C3FF]">bar_chart</span>
            Analyze my spending
          </button>
          <button onClick={() => setInput("Project my tax debt")} className="whitespace-nowrap px-4 py-2 rounded-full border border-white/10 bg-[#1A1C29] hover:bg-white/5 text-slate-300 flex items-center gap-2 transition-all text-[13px] font-medium">
            <span className="material-symbols-outlined text-[16px] text-[#FCA5A5]">account_balance</span>
            Project my tax debt
          </button>
        </div>
        
        {/* Input Bar */}
        <div className="flex items-center gap-3 px-6">
          <div className="flex-1 relative bg-[#262835] rounded-[20px] border border-white/5 flex items-center pr-3 overflow-hidden">
            <input 
              className="w-full bg-transparent border-none focus:ring-0 px-5 py-4 text-[15px] text-white placeholder-slate-500 shadow-inner" 
              placeholder="Ask anything about your finances..." 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="flex items-center gap-1 flex-shrink-0">
              <button className="p-2 text-slate-500 hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[22px]">mic</span>
              </button>
              <button className="p-2 text-slate-500 hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[22px]">attach_file</span>
              </button>
            </div>
          </div>
          <button 
            onClick={handleSend}
            className="w-[52px] h-[52px] rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] text-white flex items-center justify-center shadow-[0_4px_15px_rgba(139,92,246,0.3)] hover:brightness-110 active:scale-95 transition-all flex-shrink-0"
          >
            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
