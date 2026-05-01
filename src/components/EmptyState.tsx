import React from 'react';

interface EmptyStateProps {
  icon?: string;
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon = 'inbox', 
  title, 
  message, 
  action 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center glass-card rounded-3xl border border-white/5 shadow-sm">
      <div className="w-16 h-16 bg-surface-container-low/50 text-slate-500 rounded-full flex items-center justify-center mb-5 ring-1 ring-white/10">
        <span className="material-symbols-outlined text-[32px]">{icon}</span>
      </div>
      <h3 className="text-lg font-bold text-white mb-2 tracking-wide">{title}</h3>
      <p className="text-sm text-slate-400 max-w-sm leading-relaxed mb-6">
        {message}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary font-bold rounded-xl transition-all border border-primary/20 hover:border-primary/40 text-sm"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
