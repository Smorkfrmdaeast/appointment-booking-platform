import React, { useState } from 'react';
import { Check, Copy, CheckCheck, Calendar, Clock, User, Mail, Video, X } from 'lucide-react';
import { Booking } from '../types';
import { getTimezoneDetails } from '../services/timezoneService';

interface ConfirmationModalProps {
  booking: Booking | null;
  onClose: () => void;
  onBookAnother: () => void;
  onViewList: () => void;
  selectedTimezone?: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  booking,
  onClose,
  onBookAnother,
  onViewList,
  selectedTimezone = 'Africa/Lagos',
}) => {
  const [copied, setCopied] = useState(false);

  if (!booking) return null;

  // Formatted date
  const parts = booking.date.split('-');
  const dateObj = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  const humanDate = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const tzDetails = getTimezoneDetails(selectedTimezone);

  const handleCopy = () => {
    const details = `Appointment Confirmed\nWith: ${booking.name}\nDate: ${humanDate}\nTime: ${booking.time} (${tzDetails.short}, ${tzDetails.offset}) · ${booking.durationMinutes} mins\nEmail: ${booking.email}\nReference: ${booking.id}`;
    navigator.clipboard.writeText(details).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-[#0c121f] rounded-xl border border-white/[0.1] shadow-2xl p-6 relative space-y-5">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close confirmation dialog"
          className="absolute top-4 right-4 p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Calm Success Icon */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-900/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <Check className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white tracking-tight">
              Appointment confirmed
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Ref: {booking.id}
            </p>
          </div>
        </div>

        {/* Appointment Details Box */}
        <div className="rounded-lg bg-slate-900/80 border border-white/[0.06] p-4 space-y-3 text-xs">
          <div className="flex items-start gap-2.5 text-slate-200">
            <Calendar className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-slate-400 text-[11px]">Date</div>
              <div className="font-medium text-white">{humanDate}</div>
            </div>
          </div>

          <div className="flex items-start gap-2.5 text-slate-200">
            <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-slate-400 text-[11px]">Time & Duration</div>
              <div className="font-medium text-white">
                {booking.time} ({tzDetails.short}) · {booking.durationMinutes} Minutes (1-on-1 Consultation)
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5 text-slate-200">
            <User className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-slate-400 text-[11px]">Attendee</div>
              <div className="font-medium text-white">{booking.name}</div>
            </div>
          </div>

          <div className="flex items-start gap-2.5 text-slate-200">
            <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-slate-400 text-[11px]">Contact & Meeting Link</div>
              <div className="font-medium text-white">{booking.email}</div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                <Video className="w-3 h-3 text-slate-500" />
                <span>Google Meet link sent to your email</span>
              </div>
            </div>
          </div>

          {booking.notes && (
            <div className="pt-2 border-t border-white/[0.04] text-[11px] text-slate-400">
              <span className="font-medium text-slate-300">Brief: </span>
              {booking.notes}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            type="button"
            onClick={handleCopy}
            className="w-full py-2.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors flex items-center justify-center gap-2 border border-white/[0.06] cursor-pointer"
          >
            {copied ? (
              <>
                <CheckCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Details copied to clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-400" />
                <span>Copy appointment details</span>
              </>
            )}
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={onBookAnother}
              className="py-2.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Book another
            </button>
            <button
              type="button"
              onClick={onViewList}
              className="py-2.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-white/[0.08] transition-colors cursor-pointer"
            >
              View bookings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
