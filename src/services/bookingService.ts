import { Booking, BookingFormData, BookingResponse, SlotInfo } from '../types';

const STORAGE_KEY = 'smart_booking_appointments_v2';
export const STANDARD_TIME_SLOTS = ['10:00', '11:00', '14:00', '15:00'] as const;
export const DEFAULT_DURATION_MINUTES = 45;

// Helper to get formatted date string YYYY-MM-DD
export function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Generate an upcoming date relative to today
function getRelativeDate(daysAhead: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return formatDateKey(d);
}

// Initial realistic seed data for portfolio showcase
function getInitialSeedBookings(): Booking[] {
  const tomorrow = getRelativeDate(1);
  const dayAfter = getRelativeDate(2);

  return [
    {
      id: 'apt-seed-1',
      name: 'Sarah Jenkins',
      email: 'sarah.j@acmepartners.com',
      phone: '+1 (555) 234-5678',
      date: tomorrow,
      time: '11:00',
      durationMinutes: DEFAULT_DURATION_MINUTES,
      notes: 'Initial technical consultation for cloud architecture review.',
      status: 'CONFIRMED',
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    },
    {
      id: 'apt-seed-2',
      name: 'Marcus Vance',
      email: 'm.vance@vancestudio.io',
      phone: '+1 (555) 876-5432',
      date: dayAfter,
      time: '14:00',
      durationMinutes: DEFAULT_DURATION_MINUTES,
      notes: 'Design systems audit and mobile breakpoint advisory.',
      status: 'CONFIRMED',
      createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    },
  ];
}

function loadBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // fallback
  }
  const seeds = getInitialSeedBookings();
  saveBookings(seeds);
  return seeds;
}

function saveBookings(list: Booking[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

let inMemoryBookings: Booking[] = loadBookings();

export function getAllBookings(): Booking[] {
  return [...inMemoryBookings];
}

export function getBookedSlotsForDate(date: string): string[] {
  if (!date) return [];
  return inMemoryBookings
    .filter((b) => b.date === date && b.status === 'CONFIRMED')
    .map((b) => b.time);
}

export function getSlotAvailability(date: string, selectedSlot: string | null): SlotInfo[] {
  const booked = getBookedSlotsForDate(date);

  return STANDARD_TIME_SLOTS.map((slot) => {
    const isBooked = booked.includes(slot);
    const isSelected = selectedSlot === slot;

    let status: SlotInfo['status'] = 'AVAILABLE';
    if (isBooked) {
      status = 'BOOKED';
    } else if (isSelected) {
      status = 'SELECTED';
    }

    return {
      time: slot,
      status,
      label: isBooked ? `${slot} (Booked)` : slot,
    };
  });
}

export async function bookAppointment(data: BookingFormData): Promise<BookingResponse> {
  // Natural interaction settling latency
  await new Promise((resolve) => setTimeout(resolve, 200));

  const { name, email, phone, notes, date, time } = data;

  if (!name.trim()) {
    return { success: false, error: 'Please enter your full name' };
  }
  if (!email.trim()) {
    return { success: false, error: 'Please enter your email address' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { success: false, error: 'Enter a valid email address' };
  }
  if (!date.trim()) {
    return { success: false, error: 'Please choose an appointment date' };
  }
  if (!time.trim()) {
    return { success: false, error: 'Please select a time slot' };
  }

  // Conflict validation (exact requirement: "Time slot not available")
  const conflict = inMemoryBookings.find(
    (b) => b.date === date && b.time === time && b.status === 'CONFIRMED'
  );

  if (conflict) {
    return {
      success: false,
      error: 'Time slot not available',
    };
  }

  const newBooking: Booking = {
    id: `apt-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim() || undefined,
    date,
    time,
    durationMinutes: DEFAULT_DURATION_MINUTES,
    notes: notes.trim() || undefined,
    status: 'CONFIRMED',
    createdAt: new Date().toISOString(),
  };

  inMemoryBookings = [newBooking, ...inMemoryBookings];
  saveBookings(inMemoryBookings);

  return {
    success: true,
    message: `✅ Appointment confirmed for ${newBooking.name} on ${newBooking.date} at ${newBooking.time}`,
    booking: newBooking,
  };
}

export function cancelBooking(id: string): { success: boolean; error?: string } {
  const index = inMemoryBookings.findIndex((b) => b.id === id);
  if (index === -1) {
    return { success: false, error: 'Booking not found' };
  }

  // Mark as cancelled or remove
  inMemoryBookings = inMemoryBookings.map((b) =>
    b.id === id ? { ...b, status: 'CANCELLED' as const } : b
  );
  saveBookings(inMemoryBookings);
  return { success: true };
}

export function deleteBookingPermanently(id: string): boolean {
  const beforeCount = inMemoryBookings.length;
  inMemoryBookings = inMemoryBookings.filter((b) => b.id !== id);
  if (inMemoryBookings.length !== beforeCount) {
    saveBookings(inMemoryBookings);
    return true;
  }
  return false;
}
