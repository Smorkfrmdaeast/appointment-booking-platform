import React from 'react';
import { Clock, Check, Ban } from 'lucide-react';
import { getSlotAvailability, DEFAULT_DURATION_MINUTES } from '../services/bookingService';
import { getTimezoneDetails } from '../services/timezoneService';

interface TimeSlotPickerProps {
  selectedDate: string; // YYYY-MM-DD
  selectedTime: string; // HH:mm
  onSelectTime: (time: string) => void;
  isLoading?: boolean;
  selectedTimezone?: string;
}

export const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  selectedDate,
  selectedTime,
  onSelectTime,
  isLoading = false,
  selectedTimezone = 'Africa/Lagos',
}) => {
  // Subtle Loading Skeleton State
  if (isLoading) {
    return (
      <div
        aria-busy="true"
        aria-label="Loading available time slots"
        className="w-full bg-[#0c121f] rounded-xl border border-white/[0.08] p-5 space-y-4 select-none"
      >
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <div className="h-4 w-32 bg-slate-800/80 rounded animate-pulse" />
            <div className="h-3 w-40 bg-slate-800/50 rounded animate-pulse" />
          </div>
          <div className="h-5 w-20 bg-slate-800/60 rounded animate-pulse" />
        </div>

        {/* 4 Time Slots Skeleton Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`slot-skeleton-${i}`}
              className="h-10 rounded-lg bg-slate-800/40 border border-white/[0.04] animate-pulse flex items-center px-3"
            >
              <div className="w-3.5 h-3.5 rounded-full bg-slate-700/50 mr-2" />
              <div className="h-3 w-16 bg-slate-700/40 rounded" />
            </div>
          ))}
        </div>

        {/* Footer Skeleton */}
        <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
          <div className="h-3 w-44 bg-slate-800/40 rounded animate-pulse" />
          <div className="h-3 w-14 bg-slate-800/40 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (!selectedDate) {
    return (
      <div className="w-full bg-[#0c121f] rounded-xl border border-white/[0.08] p-6 text-center text-slate-400">
        <Clock className="w-8 h-8 text-slate-600 mx-auto mb-2" />
        <p className="text-sm font-medium text-slate-300">Choose a date first</p>
        <p className="text-xs text-slate-500 mt-1">
          Select any available day on the calendar to view 45-minute consultation slots.
        </p>
      </div>
    );
  }

  const slots = getSlotAvailability(selectedDate, selectedTime);
  const openCount = slots.filter((s) => s.status === 'AVAILABLE' || s.status === 'SELECTED').length;

  return (
    <div className="w-full bg-[#0c121f] rounded-xl border border-white/[0.08] p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-white tracking-tight">Available Time Slots</h4>
          <p className="text-[11px] text-slate-400">
            {openCount} of {slots.length} consultation slots open
          </p>
        </div>

        <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-white/[0.06]">
          {DEFAULT_DURATION_MINUTES} mins each
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {slots.map((slot) => {
          const isSelected = selectedTime === slot.time;
          const isBooked = slot.status === 'BOOKED';

          if (isBooked) {
            return (
              <div
                key={slot.time}
                aria-disabled="true"
                className="flex items-center justify-between p-3 rounded-lg border border-white/[0.04] bg-slate-950/60 text-slate-500 select-none cursor-not-allowed text-xs font-mono"
              >
                <div className="flex items-center gap-2">
                  <span className="line-through">{slot.time}</span>
                  <span className="text-[10px] text-slate-500 font-sans">(Booked)</span>
                </div>
                <Ban className="w-3.5 h-3.5 text-slate-600" />
              </div>
            );
          }

          return (
            <button
              key={slot.time}
              type="button"
              onClick={() => onSelectTime(slot.time)}
              className={`flex items-center justify-between p-3 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 border-blue-500 text-white shadow-sm font-semibold'
                  : 'bg-slate-900/80 hover:bg-slate-800 border-white/[0.08] text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Clock className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                <span>{slot.time}</span>
              </div>

              {isSelected && <Check className="w-4 h-4 text-white" />}
            </button>
          );
        })}
      </div>

      {(() => {
        const tzInfo = getTimezoneDetails(selectedTimezone);
        return (
          <div className="pt-2 text-[11px] text-slate-400 border-t border-white/[0.06] flex items-center justify-between">
            <span>Times shown in {tzInfo.short}</span>
            <span className="font-mono text-slate-400">{tzInfo.offset}</span>
          </div>
        );
      })()}
    </div>
  );
};
