import React, { useState } from 'react';
import { Menu, X, CalendarCheck } from 'lucide-react';
import { TimezoneSelector } from './TimezoneSelector';

interface NavbarProps {
  activeCount?: number;
  selectedTimezone: string;
  onSelectTimezone: (tz: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCount = 0,
  selectedTimezone,
  onSelectTimezone,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#090d16]/90 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-base font-semibold tracking-tight text-white hover:text-slate-200 transition-colors whitespace-nowrap shrink-0"
        >
          <div className="w-7 h-7 rounded-md bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <CalendarCheck className="w-4 h-4" />
          </div>
          <span>SmartBooking</span>
        </a>

        {/* Zone 2: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <a
            href="#booking"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Book
          </a>
          <a
            href="#how-it-works"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            How It Works
          </a>
          <a
            href="#features"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Features
          </a>
          <a
            href="#skills"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Engineering
          </a>
          <a
            href="#manage-bookings"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <span>Bookings</span>
            {activeCount > 0 && (
              <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/10">
                {activeCount}
              </span>
            )}
          </a>
          <a
            href="#contact"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: Timezone Selector & Primary Action Button */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <TimezoneSelector
            selectedTimezone={selectedTimezone}
            onSelectTimezone={onSelectTimezone}
            compact
          />

          <a
            href="#booking"
            className="px-3.5 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-md transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            Schedule Time
          </a>
        </div>

        {/* Mobile menu hamburger toggle */}
        <div className="flex md:hidden items-center gap-2">
          <TimezoneSelector
            selectedTimezone={selectedTimezone}
            onSelectTimezone={onSelectTimezone}
            compact
          />

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 text-slate-400 hover:text-white focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#0c121f] px-6 py-4 space-y-3">
          <a
            href="#booking"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm text-slate-300 hover:text-white py-1"
          >
            Book Appointment
          </a>
          <a
            href="#how-it-works"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm text-slate-300 hover:text-white py-1"
          >
            How It Works
          </a>
          <a
            href="#features"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm text-slate-300 hover:text-white py-1"
          >
            Features
          </a>
          <a
            href="#skills"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm text-slate-300 hover:text-white py-1"
          >
            Engineering
          </a>
          <a
            href="#manage-bookings"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm text-slate-300 hover:text-white py-1 flex items-center justify-between"
          >
            <span>Scheduled Bookings</span>
            {activeCount > 0 && (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/10">
                {activeCount}
              </span>
            )}
          </a>
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm text-slate-300 hover:text-white py-1"
          >
            Contact
          </a>

          <div className="pt-2">
            <a
              href="#booking"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center px-4 py-2.5 text-xs font-medium text-white bg-blue-600 rounded-md"
            >
              Schedule Time
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
