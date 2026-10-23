import React from 'react';
import { Calendar, User, AlertCircle, ArrowRight, Loader2, CheckCircle, Globe } from 'lucide-react';
import { BookingFormData } from '../types';
import { DEFAULT_DURATION_MINUTES } from '../services/bookingService';
import { getTimezoneDetails } from '../services/timezoneService';
import { TimezoneSelector } from './TimezoneSelector';

interface BookingSummaryProps {
  formData: BookingFormData;
  isSubmitting: boolean;
  submissionError: string | null;
  onConfirm: () => void;
  selectedTimezone: string;
  onSelectTimezone: (tz: string) => void;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  formData,
  isSubmitting,
  submissionError,
  onConfirm,
  selectedTimezone,
  onSelectTimezone,
}) => {
  const isReady =
    formData.name.trim().length > 0 &&
    formData.email.trim().length > 0 &&
    Boolean(formData.date) &&
    Boolean(formData.time);

  const tzDetails = getTimezoneDetails(selectedTimezone);

  // Human-readable date formatter
  const formattedDate = React.useMemo(() => {
    if (!formData.date) return 'No date selected';
    const parts = formData.date.split('-');
    if (parts.length === 3) {
      const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      return d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
    return formData.date;
  }, [formData.date]);

  return (
    <div className="bg-[#0c121f] rounded-xl border border-white/[0.08] p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Booking Summary
        </h4>
        <span className="text-[11px] font-mono text-slate-400">
          {DEFAULT_DURATION_MINUTES} min session
        </span>
      </div>

      {/* Snapshot items */}
      <div className="space-y-2.5 text-xs">
        {/* Date & Time */}
        <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-900/60 border border-white/[0.04]">
          <Calendar className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <div className="w-full">
            <div className="text-slate-400 text-[11px]">Date &amp; Time</div>
            <div className="font-medium text-white flex items-center justify-between gap-1 flex-wrap">
              <span>
                {formattedDate} {formData.time ? `at ${formData.time}` : '— Select a slot'}
              </span>
              {formData.time && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-900/40">
                  {tzDetails.offset}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Timezone Selector row */}
        <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-white/[0.04]">
          <div className="flex items-center gap-2 text-slate-400">
            <Globe className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="text-[11px]">Client Timezone</span>
          </div>
          <TimezoneSelector
            selectedTimezone={selectedTimezone}
            onSelectTimezone={onSelectTimezone}
            compact
          />
        </div>

        {/* Client details */}
        <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-900/60 border border-white/[0.04]">
          <User className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <div className="w-full">
            <div className="text-slate-400 text-[11px]">Attendee</div>
            <div className="font-medium text-white truncate max-w-[240px]">
              {formData.name.trim() || '— Enter name'}
            </div>
            {formData.email.trim() && (
              <div className="text-[11px] text-slate-400 truncate max-w-[240px]">
                {formData.email.trim()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Conflict / Submission Error display */}
      {submissionError && (
        <div
          role="alert"
          className="p-3 rounded-lg bg-red-950/40 border border-red-800/40 text-red-300 text-xs flex items-start gap-2"
        >
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Scheduling Error: </span>
            <span>{submissionError}</span>
          </div>
        </div>
      )}

      {/* Confirmation Action */}
      <button
        type="button"
        disabled={!isReady || isSubmitting}
        onClick={onConfirm}
        className="w-full py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Confirming appointment...</span>
          </>
        ) : (
          <>
            <span>Confirm appointment</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <div className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
        <CheckCircle className="w-3.5 h-3.5 text-slate-600" />
        <span>Instant calendar confirmation with conflict protection</span>
      </div>
    </div>
  );
};
