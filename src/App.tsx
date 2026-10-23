import React, { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Calendar } from './components/Calendar';
import { TimeSlotPicker } from './components/TimeSlotPicker';
import { BookingForm } from './components/BookingForm';
import { BookingSummary } from './components/BookingSummary';
import { ConfirmationModal } from './components/ConfirmationModal';
import { BookingsManager } from './components/BookingsManager';
import { HowItWorks } from './components/HowItWorks';
import { Features } from './components/Features';
import { SkillsSection } from './components/SkillsSection';
import { Footer } from './components/Footer';
import {
  getAllBookings,
  bookAppointment,
  cancelBooking,
  deleteBookingPermanently,
  formatDateKey,
} from './services/bookingService';
import { getBrowserTimezone } from './services/timezoneService';
import { Booking, BookingFormData } from './types';

export default function App() {
  // Tomorrow's date as sensible initial selection
  const defaultInitialDate = React.useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return formatDateKey(d);
  }, []);

  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    notes: '',
    date: defaultInitialDate,
    time: '10:00',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Timezone state: defaults to browser local timezone, persists in localStorage
  const [selectedTimezone, setSelectedTimezone] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('smart_booking_timezone');
      if (saved) return saved;
    } catch {
      // ignore
    }
    return getBrowserTimezone();
  });

  const handleSelectTimezone = useCallback((tz: string) => {
    setSelectedTimezone(tz);
    try {
      localStorage.setItem('smart_booking_timezone', tz);
    } catch {
      // ignore
    }
  }, []);

  // Authoritative in-memory / local state for active bookings
  const [bookingsList, setBookingsList] = useState<Booking[]>(() => getAllBookings());

  // Subtle simulated initial load to showcase skeleton state and smooth settling
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const handleFieldChange = useCallback(
    (field: keyof BookingFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setFormErrors((prev) => {
        if (prev[field]) {
          const updated = { ...prev };
          delete updated[field];
          return updated;
        }
        return prev;
      });
      if (submissionError) {
        setSubmissionError(null);
      }
    },
    [submissionError]
  );

  const handleSelectDate = useCallback(
    (date: string) => {
      handleFieldChange('date', date);
      setSubmissionError(null);
    },
    [handleFieldChange]
  );

  const handleSelectTime = useCallback(
    (time: string) => {
      handleFieldChange('time', time);
      setSubmissionError(null);
    },
    [handleFieldChange]
  );

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Please enter your full name.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Please enter your email address.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = 'Enter a valid email address.';
      }
    }

    if (!formData.date) {
      errors.date = 'Please choose an appointment date.';
    }

    if (!formData.time) {
      errors.time = 'Please select a time slot.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirmAppointment = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const response = await bookAppointment(formData);

      if (response.success && response.booking) {
        setConfirmedBooking(response.booking);
        // Refresh local bookings list
        setBookingsList(getAllBookings());
        // Reset form for next appointment while preserving selected date
        setFormData((prev) => ({
          name: '',
          email: '',
          phone: '',
          notes: '',
          date: prev.date,
          time: '',
        }));
      } else {
        setSubmissionError(response.error || 'Server error occurred');
      }
    } catch {
      setSubmissionError('Server error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelBooking = (id: string) => {
    cancelBooking(id);
    setBookingsList(getAllBookings());
  };

  const handleDeletePermanently = (id: string) => {
    deleteBookingPermanently(id);
    setBookingsList(getAllBookings());
  };

  const activeConfirmedCount = bookingsList.filter((b) => b.status === 'CONFIRMED').length;

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-blue-600/40 selection:text-white">
      {/* 3-Zone Refined Navigation with Timezone Selector */}
      <Navbar
        activeCount={activeConfirmedCount}
        selectedTimezone={selectedTimezone}
        onSelectTimezone={handleSelectTimezone}
      />

      {/* Product-Driven Hero with Live Booking Preview */}
      <Hero />

      {/* Main Scheduling Engine (Two-Column Desktop View) */}
      <main id="booking" className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="space-y-10">
          {/* Section Subtitle */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              <span>Online Consultation Calendar</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Instant Confirmation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Schedule Your Appointment
            </h2>
            <p className="text-sm text-slate-400">
              Select an available date and time slot below, review your details, and lock in your session with conflict protection.
            </p>
          </div>

          {/* Two-Column Interactive Workspace */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Calendar & Dynamic Slot Selection */}
            <div className="lg:col-span-7 space-y-6">
              {/* Step 1: Calendar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Step 1 · Select Date
                  </span>
                  {formErrors.date && (
                    <span className="text-xs text-red-400">{formErrors.date}</span>
                  )}
                </div>
                <Calendar
                  selectedDate={formData.date}
                  onSelectDate={handleSelectDate}
                  isLoading={isInitialLoading}
                />
              </div>

              {/* Step 2: Time Slot Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Step 2 · Select Time
                  </span>
                  {formErrors.time && (
                    <span className="text-xs text-red-400">{formErrors.time}</span>
                  )}
                </div>
                <TimeSlotPicker
                  selectedDate={formData.date}
                  selectedTime={formData.time}
                  onSelectTime={handleSelectTime}
                  isLoading={isInitialLoading}
                  selectedTimezone={selectedTimezone}
                />
              </div>
            </div>

            {/* Right Column: Contact Details & Review Summary */}
            <div className="lg:col-span-5 space-y-6">
              {/* Step 3: Attendee Details */}
              <div className="bg-[#0c121f] rounded-xl border border-white/[0.08] p-5 space-y-4">
                <div className="border-b border-white/[0.06] pb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Step 3 · Attendee Details
                  </span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Enter the information where your calendar invite will be sent.
                  </p>
                </div>

                <BookingForm
                  formData={formData}
                  errors={formErrors}
                  onChange={handleFieldChange}
                />
              </div>

              {/* Step 4: Summary & Instant Confirmation Trigger */}
              <BookingSummary
                formData={formData}
                isSubmitting={isSubmitting}
                submissionError={submissionError}
                onConfirm={handleConfirmAppointment}
                selectedTimezone={selectedTimezone}
                onSelectTimezone={handleSelectTimezone}
              />
            </div>
          </div>
        </div>
      </main>

      {/* How It Works (Concise 3-step explanation) */}
      <HowItWorks />

      {/* Platform Features */}
      <Features />

      {/* Engineering Portfolio Competencies */}
      <SkillsSection />

      {/* Active Bookings Manager & Conflict Testing */}
      <BookingsManager
        bookings={bookingsList}
        onCancelBooking={handleCancelBooking}
        onDeletePermanently={handleDeletePermanently}
        onSelectBookingDate={(date) => {
          handleFieldChange('date', date);
          const el = document.getElementById('booking');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Calm Confirmation Dialog */}
      <ConfirmationModal
        booking={confirmedBooking}
        onClose={() => setConfirmedBooking(null)}
        onBookAnother={() => {
          setConfirmedBooking(null);
          const el = document.getElementById('booking');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onViewList={() => {
          setConfirmedBooking(null);
          const el = document.getElementById('manage-bookings');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        selectedTimezone={selectedTimezone}
      />

      {/* Author Footer with Social Links */}
      <Footer />
    </div>
  );
}
