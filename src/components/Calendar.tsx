import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDateKey, getBookedSlotsForDate } from '../services/bookingService';

interface CalendarProps {
  selectedDate: string; // YYYY-MM-DD
  onSelectDate: (date: string) => void;
  isLoading?: boolean;
}

export const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onSelectDate,
  isLoading = false,
}) => {
  // Initialize view date to selectedDate or current date
  const [viewDate, setViewDate] = useState(() => {
    if (selectedDate) {
      const parts = selectedDate.split('-');
      if (parts.length === 3) {
        return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, 1);
      }
    }
    return new Date();
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();

  // Navigation handlers
  const handlePrevMonth = () => {
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // Prevent navigating to previous months before current month
  const isCurrentMonthOrFuture = () => {
    const startOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfViewMonth = new Date(currentYear, currentMonth, 1);
    return startOfViewMonth > startOfCurrentMonth;
  };

  // Generate calendar grid
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sunday

  const days: { date: Date; dateKey: string; isCurrentMonth: boolean }[] = [];

  for (let d = 1; d <= daysInMonth; d++) {
    const dayDate = new Date(currentYear, currentMonth, d);
    days.push({
      date: dayDate,
      dateKey: formatDateKey(dayDate),
      isCurrentMonth: true,
    });
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  // Subtle Loading Skeleton State
  if (isLoading) {
    return (
      <div
        aria-busy="true"
        aria-label="Loading calendar availability"
        className="w-full bg-[#0c121f] rounded-xl border border-white/[0.08] p-5 select-none"
      >
        {/* Month Header Skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1.5">
            <div className="h-4 w-28 bg-slate-800/80 rounded animate-pulse" />
            <div className="h-3 w-36 bg-slate-800/50 rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-7 h-7 rounded-md bg-slate-800/60 animate-pulse" />
            <div className="w-7 h-7 rounded-md bg-slate-800/60 animate-pulse" />
          </div>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((weekday) => (
            <span key={weekday} className="text-[11px] font-medium text-slate-600 py-1">
              {weekday}
            </span>
          ))}
        </div>

        {/* Calendar Days Skeleton Grid (matching exact 7x5 aspect ratio) */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={`cal-skeleton-${i}`}
              className="w-full aspect-square rounded-lg bg-slate-800/40 border border-white/[0.02] animate-pulse"
            />
          ))}
        </div>

        {/* Legend Skeleton */}
        <div className="flex items-center justify-between text-[11px] pt-4 mt-3 border-t border-white/[0.06]">
          <div className="h-3 w-16 bg-slate-800/60 rounded animate-pulse" />
          <div className="h-3 w-24 bg-slate-800/60 rounded animate-pulse" />
          <div className="h-3 w-12 bg-slate-800/60 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#0c121f] rounded-xl border border-white/[0.08] p-5 select-none">
      {/* Month Header and Navigation */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-white tracking-tight">
            {monthNames[currentMonth]} {currentYear}
          </h3>
          <p className="text-[11px] text-slate-400">Select an appointment day</p>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handlePrevMonth}
            disabled={!isCurrentMonthOrFuture()}
            aria-label="Previous month"
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            aria-label="Next month"
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((weekday) => (
          <span
            key={weekday}
            className="text-[11px] font-medium text-slate-500 py-1"
          >
            {weekday}
          </span>
        ))}
      </div>

      {/* Calendar Grid Days */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {/* Leading empty slots for day offset */}
        {Array.from({ length: firstDayIndex }).map((_, index) => (
          <div key={`offset-${index}`} className="p-2" aria-hidden="true" />
        ))}

        {days.map((dayItem) => {
          const dayDate = dayItem.date;
          dayDate.setHours(0, 0, 0, 0);

          const isPast = dayDate < today;
          const isToday = dayDate.getTime() === today.getTime();
          const isSelected = selectedDate === dayItem.dateKey;
          const bookedSlots = getBookedSlotsForDate(dayItem.dateKey);
          const hasBookings = bookedSlots.length > 0;
          const isAllBooked = bookedSlots.length >= 4;

          let buttonClasses = 'w-full aspect-square rounded-lg flex flex-col items-center justify-center relative font-mono transition-colors ';

          if (isPast) {
            buttonClasses += 'text-slate-600 cursor-not-allowed';
          } else if (isSelected) {
            buttonClasses += 'bg-blue-600 text-white font-semibold shadow-sm';
          } else if (isAllBooked) {
            buttonClasses += 'bg-slate-900/60 text-slate-500 line-through cursor-not-allowed';
          } else {
            buttonClasses += 'text-slate-200 hover:bg-slate-800/80 hover:text-white cursor-pointer';
          }

          if (isToday && !isSelected) {
            buttonClasses += ' ring-1 ring-blue-400/50';
          }

          return (
            <button
              key={dayItem.dateKey}
              type="button"
              disabled={isPast || isAllBooked}
              onClick={() => onSelectDate(dayItem.dateKey)}
              aria-label={`${monthNames[currentMonth]} ${dayItem.date.getDate()}, ${currentYear}${isSelected ? ' (Selected)' : ''}${isToday ? ' (Today)' : ''}`}
              className={buttonClasses}
            >
              <span>{dayItem.date.getDate()}</span>

              {/* Dynamic availability micro-indicator */}
              {!isPast && !isSelected && (
                <span className="flex items-center gap-0.5 mt-0.5">
                  {hasBookings && !isAllBooked ? (
                    <span className="w-1 h-1 rounded-full bg-amber-400" title={`${bookedSlots.length} slot(s) booked`}></span>
                  ) : (
                    <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                  )}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-4 mt-3 border-t border-white/[0.06]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          <span>Partially booked</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded ring-1 ring-blue-400/50"></span>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
};
