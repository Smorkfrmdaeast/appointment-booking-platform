export type BookingStatus = 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone?: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  durationMinutes: number;
  notes?: string;
  status: BookingStatus;
  createdAt: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  notes: string;
  date: string;
  time: string;
}

export interface BookingResponse {
  success: boolean;
  message?: string;
  error?: string;
  booking?: Booking;
}

export type SlotStatus = 'AVAILABLE' | 'SELECTED' | 'BOOKED' | 'UNAVAILABLE';

export interface SlotInfo {
  time: string;
  status: SlotStatus;
  label: string;
}
