import React from 'react';
import { Layers, ShieldCheck, Terminal, Cpu, Layout, Eye } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const competencies = [
    {
      title: 'Form Systems & Validation',
      tag: 'CONTROLLED INPUTS',
      description: 'Robust field-level validations, custom inline error handlers, sanitization, and disabled state orchestration.',
      icon: Layers,
    },
    {
      title: 'Scheduling Logic & Conflict Prevention',
      tag: 'DETERMINISTIC GUARD',
      description: 'Dynamic date-time matrix verification preventing double-booking race conditions with immediate status feedback.',
      icon: ShieldCheck,
    },
    {
      title: 'State Architecture',
      tag: 'REACTIVE STORES',
      description: 'Predictable state management syncing in-memory queues with browser persistence and immediate UI re-rendering.',
      icon: Terminal,
    },
    {
      title: 'Responsive & Touch Design',
      tag: 'MOBILE FIRST',
      description: 'Engineered for touch targets (>=44px), zero horizontal overflow, and fluid two-column desktop adaptation.',
      icon: Layout,
    },
    {
      title: 'Accessibility & Semantics',
      tag: 'WCAG AA COMPLIANT',
      description: 'Semantic landmarks, accessible labels, visible focus indicators, and screen-reader navigable calendar grids.',
      icon: Eye,
    },
    {
      title: 'Modern React & TypeScript',
      tag: 'STRICT TYPES',
      description: 'Strict type safety with comprehensive interfaces, reusable functional components, and clean separation of concerns.',
      icon: Cpu,
    },
  ];

  return (
    <section id="skills" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/[0.08]">
      <div className="space-y-12">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 mb-2">
            <span>Senior Portfolio Artifact</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Engineering Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Frontend engineering skills demonstrated
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Technical competencies applied to solve authentic booking workflows, state synchronization, and human interaction.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {competencies.map((comp) => {
            const Icon = comp.icon;
            return (
              <div
                key={comp.title}
                className="bg-[#0c121f] rounded-xl border border-white/[0.08] p-6 space-y-3.5 hover:border-white/[0.14] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/[0.06] flex items-center justify-center text-blue-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono tracking-wider text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-white/[0.04]">
                    {comp.tag}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-sm font-semibold text-white tracking-tight">
                    {comp.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {comp.description}
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
