import React from 'react';
import { CalendarRange, ShieldCheck, CheckCheck, Smartphone } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      title: 'Smart Scheduling',
      description: 'Availability updates automatically as appointments are booked, reflecting live state across sessions.',
      icon: CalendarRange,
    },
    {
      title: 'Conflict Protection',
      description: 'Deterministic double-booking prevention guards every slot, rejecting overlapping appointment requests.',
      icon: ShieldCheck,
    },
    {
      title: 'Instant Confirmation',
      description: 'Clients receive an immediate booking confirmation receipt with complete reference details and actions.',
      icon: CheckCheck,
    },
    {
      title: 'Responsive Architecture',
      description: 'Engineered mobile-first for touch targets while scaling to a balanced two-column desktop command view.',
      icon: Smartphone,
    },
  ];

  return (
    <section id="features" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/[0.08]">
      <div className="space-y-12">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 mb-2">
            <span>Capabilities</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Platform Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Practical features for real-world scheduling
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Designed for reliability, clear interaction feedback, and zero scheduling friction.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="bg-[#0c121f] rounded-xl border border-white/[0.08] p-6 space-y-4 hover:border-white/[0.14] transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-950/40 border border-blue-900/40 flex items-center justify-center text-blue-400">
                  <Icon className="w-4 h-4" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-sm font-semibold text-white tracking-tight">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
