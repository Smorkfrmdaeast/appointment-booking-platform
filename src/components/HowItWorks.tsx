import React from 'react';
import { Calendar, Clock, CheckCircle } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Choose a date',
      description: 'Browse the interactive calendar and pick any upcoming working day.',
      icon: Calendar,
    },
    {
      number: '02',
      title: 'Select an available time',
      description: 'View real-time slot availability for 10:00, 11:00, 14:00, or 15:00.',
      icon: Clock,
    },
    {
      number: '03',
      title: 'Confirm your appointment',
      description: 'Provide your contact details and receive instant calendar confirmation.',
      icon: CheckCircle,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/[0.08]">
      <div className="space-y-12">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 mb-2">
            <span>Workflow</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Three Simple Steps</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            How the booking process works
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            A frictionless, transparent scheduling workflow designed for clients and professionals alike.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-[#0c121f] rounded-xl border border-white/[0.08] p-6 space-y-4 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-blue-400 bg-blue-950/40 border border-blue-900/40 px-2 py-0.5 rounded">
                    {step.number}
                  </span>
                  <Icon className="w-5 h-5 text-slate-500" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-semibold text-white tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.description}
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
