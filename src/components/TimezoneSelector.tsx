import React from 'react';
import { Globe } from 'lucide-react';
import {
  COMMON_TIMEZONES,
  getTimezoneDetails,
  TimezoneOption,
} from '../services/timezoneService';

interface TimezoneSelectorProps {
  selectedTimezone: string;
  onSelectTimezone: (tz: string) => void;
  compact?: boolean;
}

export const TimezoneSelector: React.FC<TimezoneSelectorProps> = ({
  selectedTimezone,
  onSelectTimezone,
  compact = false,
}) => {
  const currentDetails: TimezoneOption = getTimezoneDetails(selectedTimezone);

  // Ensure current timezone is in list even if not in standard preset
  const allOptions = React.useMemo(() => {
    const exists = COMMON_TIMEZONES.some((t) => t.value === selectedTimezone);
    if (!exists) {
      return [currentDetails, ...COMMON_TIMEZONES];
    }
    return COMMON_TIMEZONES;
  }, [selectedTimezone, currentDetails]);

  return (
    <div className="relative inline-flex items-center text-xs">
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/80 border border-white/[0.08] text-slate-300 hover:text-white hover:border-white/[0.16] transition-colors">
        <Globe className="w-3.5 h-3.5 text-blue-400 shrink-0" />
        <span className="font-mono text-[11px] whitespace-nowrap">
          {compact ? currentDetails.short : currentDetails.label}
        </span>
        <select
          value={selectedTimezone}
          onChange={(e) => onSelectTimezone(e.target.value)}
          aria-label="Select booking timezone"
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer bg-slate-900 text-white"
        >
          {allOptions.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#0c121f] text-white">
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
