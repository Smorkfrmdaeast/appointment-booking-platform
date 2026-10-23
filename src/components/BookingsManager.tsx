import React, { useState } from 'react';
import { Calendar, AlertTriangle, Trash2, Search } from 'lucide-react';
import { Booking } from '../types';

interface BookingsManagerProps {
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
  onDeletePermanently: (id: string) => void;
  onSelectBookingDate?: (date: string) => void;
}

export const BookingsManager: React.FC<BookingsManagerProps> = ({
  bookings,
  onCancelBooking,
  onDeletePermanently,
  onSelectBookingDate,
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [confirmModal, setConfirmModal] = useState<{
    id: string;
    name: string;
    date: string;
    time: string;
    type: 'cancel' | 'delete';
  } | null>(null);

  const filteredBookings = bookings.filter((b) => {
    const q = filterQuery.toLowerCase();
    return (
      b.name.toLowerCase().includes(q) ||
      b.email.toLowerCase().includes(q) ||
      b.date.includes(q) ||
      b.time.includes(q)
    );
  });

  const handleExecuteAction = () => {
    if (!confirmModal) return;
    if (confirmModal.type === 'cancel') {
      onCancelBooking(confirmModal.id);
    } else {
      onDeletePermanently(confirmModal.id);
    }
    setConfirmModal(null);
  };

  return (
    <section id="manage-bookings" className="py-16 px-6 max-w-7xl mx-auto border-t border-white/[0.08]">
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 mb-1">
              <span>Appointment Operations</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>State &amp; Conflict Testing</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Scheduled Bookings &amp; Availability
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">
              Manage existing client sessions or test conflict prevention in real-time.
            </p>
          </div>

          {/* Search filter input */}
          <div className="relative max-w-xs w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search by name, email, or date..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-900/80 text-xs text-white placeholder-slate-500 rounded-lg border border-white/[0.08] focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Tabular Bookings List */}
        <div className="bg-[#0c121f] rounded-xl border border-white/[0.08] overflow-hidden shadow-xl">
          {filteredBookings.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <Calendar className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-300">No scheduled appointments found</p>
              <p className="text-xs text-slate-500 mt-1">
                {filterQuery ? 'Try clearing your search query' : 'Use the scheduler above to book an appointment'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-slate-900/60 text-slate-400 font-medium">
                    <th className="py-3 px-4">Attendee</th>
                    <th className="py-3 px-4">Date &amp; Time</th>
                    <th className="py-3 px-4">Duration</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filteredBookings.map((b) => {
                    const isCancelled = b.status === 'CANCELLED';

                    return (
                      <tr key={b.id} className="hover:bg-slate-900/40 transition-colors">
                        {/* Attendee */}
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-white">{b.name}</div>
                          <div className="text-[11px] text-slate-400">{b.email}</div>
                          {b.phone && <div className="text-[11px] text-slate-500">{b.phone}</div>}
                        </td>

                        {/* Date & Time */}
                        <td className="py-3.5 px-4 font-mono">
                          <button
                            type="button"
                            onClick={() => onSelectBookingDate && onSelectBookingDate(b.date)}
                            title="Jump to this date in calendar"
                            className="text-left text-slate-200 hover:text-blue-400 transition-colors cursor-pointer"
                          >
                            <div className="font-medium">{b.date}</div>
                            <div className="text-[11px] text-slate-400">{b.time}</div>
                          </button>
                        </td>

                        {/* Duration */}
                        <td className="py-3.5 px-4 text-slate-300">
                          {b.durationMinutes} mins
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4">
                          {isCancelled ? (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-red-950/40 text-red-400 border border-red-800/30">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                              Cancelled
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-950/40 text-emerald-400 border border-emerald-800/30">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                              Confirmed
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right space-x-1 whitespace-nowrap">
                          {!isCancelled && (
                            <button
                              type="button"
                              onClick={() =>
                                setConfirmModal({
                                  id: b.id,
                                  name: b.name,
                                  date: b.date,
                                  time: b.time,
                                  type: 'cancel',
                                })
                              }
                              className="px-2.5 py-1 text-[11px] font-medium rounded text-slate-300 hover:text-red-400 hover:bg-slate-800 border border-white/[0.06] transition-colors cursor-pointer"
                            >
                              Cancel slot
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() =>
                              setConfirmModal({
                                id: b.id,
                                name: b.name,
                                date: b.date,
                                time: b.time,
                                type: 'delete',
                              })
                            }
                            title="Remove permanently"
                            className="p-1 text-slate-500 hover:text-red-400 rounded hover:bg-slate-800 transition-colors cursor-pointer inline-block align-middle"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Dialog for Destructive Actions */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-[#0c121f] rounded-xl border border-white/[0.1] shadow-2xl p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-red-900/30 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">
                  {confirmModal.type === 'cancel'
                    ? 'Cancel this appointment?'
                    : 'Remove booking record?'}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  {confirmModal.name} · {confirmModal.date} at {confirmModal.time}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {confirmModal.type === 'cancel'
                ? 'Cancelling this session releases the time slot so another attendee can book it.'
                : 'This will permanently remove the record from your local storage database.'}
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => setConfirmModal(null)}
                className="py-2 px-3 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-white/[0.08] transition-colors cursor-pointer"
              >
                Keep booking
              </button>
              <button
                type="button"
                onClick={handleExecuteAction}
                className="py-2 px-3 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors cursor-pointer"
              >
                {confirmModal.type === 'cancel' ? 'Yes, cancel slot' : 'Yes, delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
