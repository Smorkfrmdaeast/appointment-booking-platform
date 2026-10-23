import React from 'react';
import { Calendar, Clock, Video, ShieldCheck, ArrowRight, Check } from 'lucide-react';

interface HeroProps {
  onSelectSlotPreview?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section className="pt-16 pb-20 px-6 max-w-7xl mx-auto border-b border-white/[0.08]">
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Natural Editorial Copy & Action */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            <span>Live Availability Scheduling</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Client Consultation Suite</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white text-balance leading-[1.12]">
            Schedule time without the back-and-forth.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
            Select an available date, choose a dedicated 45-minute consultation slot, and receive immediate confirmation with conflict protection.
          </p>

          {/* Consultation trust signals */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-lg text-xs text-slate-300">
            <div className="flex items-center gap-2 bg-[#0f172a] p-2.5 rounded-md border border-white/[0.06]">
              <Clock className="w-4 h-4 text-blue-400 shrink-0" />
              <span>45-Min Standard Session</span>
            </div>
            <div className="flex items-center gap-2 bg-[#0f172a] p-2.5 rounded-md border border-white/[0.06]">
              <Video className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Google Meet or Phone</span>
            </div>
            <div className="flex items-center gap-2 bg-[#0f172a] p-2.5 rounded-md border border-white/[0.06] col-span-2 sm:col-span-1">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Conflict Guarded</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#booking"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-sm"
            >
              <span>Book an appointment</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#booking"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 rounded-lg transition-colors"
            >
              View available times
            </a>
          </div>
        </div>

        {/* Right Column: Realistic Product UI Preview */}
        <div className="lg:col-span-5">
          <div className="rounded-xl border border-white/[0.08] bg-[#0c121f] shadow-2xl p-5 space-y-4">
            {/* Header of preview widget */}
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3.5">
              <div>
                <div className="text-xs font-semibold text-white">Consultation Booking</div>
                <div className="text-[11px] text-slate-400">Available this week · 45 mins</div>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/30 px-2 py-0.5 rounded">
                Slots Open
              </span>
            </div>

            {/* Mock interactive calendar snippet */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-300">
                <span className="font-medium">October 2026</span>
                <span className="text-[11px] text-slate-400">UTC-07:00 Pacific</span>
              </div>

              {/* Sample micro days grid */}
              <div className="grid grid-cols-7 gap-1.5 text-center text-[11px]">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                  <span key={i} className="text-slate-500 py-0.5">
                    {day}
                  </span>
                ))}
                <span className="p-1 text-slate-600">19</span>
                <span className="p-1 text-slate-600">20</span>
                <span className="p-1 text-slate-600">21</span>
                <span className="p-1 text-slate-600">22</span>
                <span className="p-1 rounded bg-blue-600 text-white font-medium">23</span>
                <span className="p-1 rounded bg-slate-800 text-slate-200">24</span>
                <span className="p-1 rounded bg-slate-800 text-slate-200">25</span>
              </div>
            </div>

            {/* Time Slot Mini-Selector */}
            <div className="pt-2 border-t border-white/[0.06] space-y-2">
              <div className="text-[11px] font-medium text-slate-300 flex justify-between">
                <span>Select a slot</span>
                <span className="text-slate-500">45 minutes</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded bg-slate-800/80 border border-blue-500/50 text-blue-300 flex items-center justify-between">
                  <span>10:00 AM</span>
                  <Check className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <div className="p-2 rounded bg-slate-900 border border-white/[0.05] text-slate-300">
                  11:00 AM
                </div>
                <div className="p-2 rounded bg-slate-950/60 border border-white/[0.03] text-slate-500 line-through">
                  02:00 PM
                </div>
                <div className="p-2 rounded bg-slate-900 border border-white/[0.05] text-slate-300">
                  03:00 PM
                </div>
              </div>
            </div>

            {/* Micro confirmation indicator */}
            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-white/[0.06]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                Instant calendar hold
              </span>
              <span className="text-slate-400">Zero duplicate booking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
