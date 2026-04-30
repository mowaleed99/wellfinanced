import { Link } from 'react-router-dom';

export default function TransactionDetails() {
  return (
    <div className="px-container-padding pb-24 pt-4">
      <header className="flex items-center gap-3 mb-6">
        <Link to="/history" className="text-white hover:text-primary transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <span className="text-white font-semibold">Transaction Details</span>
      </header>

      {/* Hero Amount */}
      <section className="text-center py-6 space-y-3">
        <div className="inline-flex items-center justify-center p-4 bg-primary-container/10 rounded-full mb-2">
          <span className="material-symbols-outlined text-primary text-4xl">account_balance_wallet</span>
        </div>
        <h1 className="font-data-mono text-display-lg text-primary-container tracking-tighter">$2,400.00</h1>
        <p className="text-label-sm text-on-surface-variant uppercase tracking-widest">Payment Received</p>
        <div className="flex justify-center gap-2 mt-2">
          <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-[10px] font-bold uppercase">Cleared</span>
          <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant border border-white/10 rounded-full text-[10px] font-bold uppercase">Business Income</span>
        </div>
      </section>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="glass-card rounded-xl p-4 flex flex-col space-y-1">
          <span className="text-on-surface-variant text-[10px] font-bold uppercase">Source</span>
          <span className="font-bold text-white">Stellar Agency</span>
        </div>
        <div className="glass-card rounded-xl p-4 flex flex-col space-y-1">
          <span className="text-on-surface-variant text-[10px] font-bold uppercase">Date</span>
          <span className="font-bold text-white">Oct 24, 2023</span>
        </div>
        <div className="glass-card rounded-xl p-4 flex flex-col space-y-1 col-span-2">
          <span className="text-on-surface-variant text-[10px] font-bold uppercase">Transaction ID</span>
          <span className="font-data-mono text-label-sm text-on-surface">TXN-9482-BR9-021</span>
        </div>
      </div>

      {/* AI Insight Card */}
      <section className="rounded-2xl p-6 relative overflow-hidden mb-6" style={{background: 'linear-gradient(135deg, #7701d0 0%, #2e5bff 100%)', boxShadow: '0 8px 32px rgba(46,91,255,0.2)'}}>
        <div className="absolute -right-8 -top-8 opacity-20">
          <span className="material-symbols-outlined text-white text-[120px]">psychology</span>
        </div>
        <div className="relative z-10 flex flex-col space-y-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-white">bolt</span>
            <h2 className="text-white font-bold">AI Runway Insight</h2>
          </div>
          <p className="text-on-primary-container text-sm font-medium">
            This income boosts your runway by <span className="font-bold text-white">18 days</span>. Based on your current burn rate, you are now set for the next 4.5 months of operation.
          </p>
          <div className="bg-black/20 rounded-xl p-3 flex items-center justify-between border border-white/10">
            <div>
              <span className="text-[10px] text-white/70 uppercase block">New Runway</span>
              <span className="text-white font-data-mono font-bold">134 Days</span>
            </div>
            <div className="h-8 w-px bg-white/20"></div>
            <div className="text-right">
              <span className="text-[10px] text-white/70 uppercase block">Tax Reserve</span>
              <span className="text-white font-data-mono font-bold">$720.00</span>
            </div>
          </div>
        </div>
      </section>

      {/* Related Invoice */}
      <section className="space-y-3 mb-6">
        <h3 className="text-label-sm text-on-surface-variant uppercase tracking-widest pl-1">Related Invoices</h3>
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center border border-white/10">
                <span className="material-symbols-outlined text-primary text-xl">description</span>
              </div>
              <div>
                <span className="font-bold text-white block">INV-2023-089</span>
                <span className="text-label-sm text-on-surface-variant">Q3 Creative Strategy</span>
              </div>
            </div>
            <div className="text-right">
              <span className="block font-data-mono text-white">$2,400.00</span>
              <span className="text-[10px] text-green-400 font-bold uppercase">Paid</span>
            </div>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button className="flex-1 bg-surface-container-high border border-white/10 text-white py-4 rounded-xl font-semibold hover:bg-white/5 active:scale-95 flex items-center justify-center gap-2 transition-all">
          <span className="material-symbols-outlined text-xl">edit</span> Edit
        </button>
        <button className="flex-1 bg-primary-container text-white py-4 rounded-xl font-semibold shadow-lg active:scale-95 flex items-center justify-center gap-2 transition-all">
          <span className="material-symbols-outlined text-xl">file_download</span> Export
        </button>
      </div>
    </div>
  );
}
