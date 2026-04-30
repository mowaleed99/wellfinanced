import { Link } from 'react-router-dom';

export default function PriorityPayments() {
  const payments = [
    { id: 1, name: 'Chase Credit Card', amount: 120.00, due: 'Today', urgency: 'Critical', color: 'error' },
    { id: 2, name: 'AWS Hosting', amount: 45.00, due: 'In 3 Days', urgency: 'High', color: 'yellow-500' },
    { id: 3, name: 'Adobe CC', amount: 54.99, due: 'In 12 Days', urgency: 'Normal', color: 'primary' }
  ];

  return (
    <div className="px-container-padding space-y-stack-lg pb-24 pt-4">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="text-white hover:text-primary transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="text-display-lg font-display-lg text-white">Priority Payments</h1>
        </div>
      </header>

      <div className="bg-error/10 border border-error/20 p-4 rounded-2xl mb-6">
        <h3 className="text-error font-bold text-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px]">warning</span> Action Required
        </h3>
        <p className="text-xs text-error/80 mt-1">You have 1 critical payment due today. Please ensure funds are available.</p>
      </div>

      <div className="space-y-4">
        {payments.map((payment) => (
          <div key={payment.id} className="glass-card p-5 rounded-3xl border-white/5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className={`text-[10px] uppercase font-bold tracking-wider text-${payment.color}`}>
                  {payment.urgency} Priority
                </span>
                <h3 className="text-white font-bold text-lg mt-1">{payment.name}</h3>
                <p className="text-xs text-outline mt-1">Due: {payment.due}</p>
              </div>
              <span className="font-data-mono font-bold text-white text-xl">${payment.amount.toFixed(2)}</span>
            </div>
            <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-bold text-sm transition-colors active:scale-95">
              Pay Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
