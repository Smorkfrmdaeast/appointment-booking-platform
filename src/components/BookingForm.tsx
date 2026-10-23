import React from 'react';
import { User, Mail, Phone, FileText } from 'lucide-react';
import { BookingFormData } from '../types';

interface BookingFormProps {
  formData: BookingFormData;
  errors: Record<string, string>;
  onChange: (field: keyof BookingFormData, value: string) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  formData,
  errors,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      {/* Full Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-xs font-medium text-slate-300 mb-1.5"
        >
          Full Name <span className="text-blue-400">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            <User className="w-4 h-4" />
          </div>
          <input
            id="name"
            type="text"
            placeholder="e.g. Alex Morgan"
            value={formData.name}
            onChange={(e) => onChange('name', e.target.value)}
            className={`w-full pl-9 pr-3 py-2.5 bg-slate-900/90 text-sm text-white placeholder-slate-500 rounded-lg border transition-colors ${
              errors.name
                ? 'border-red-500/80 focus:border-red-500'
                : 'border-white/[0.08] focus:border-blue-500 hover:border-white/[0.16]'
            }`}
          />
        </div>
        {errors.name && (
          <p className="mt-1 text-xs text-red-400">{errors.name}</p>
        )}
      </div>

      {/* Email Address */}
      <div>
        <label
          htmlFor="email"
          className="block text-xs font-medium text-slate-300 mb-1.5"
        >
          Email Address <span className="text-blue-400">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            <Mail className="w-4 h-4" />
          </div>
          <input
            id="email"
            type="email"
            placeholder="alex@company.com"
            value={formData.email}
            onChange={(e) => onChange('email', e.target.value)}
            className={`w-full pl-9 pr-3 py-2.5 bg-slate-900/90 text-sm text-white placeholder-slate-500 rounded-lg border transition-colors ${
              errors.email
                ? 'border-red-500/80 focus:border-red-500'
                : 'border-white/[0.08] focus:border-blue-500 hover:border-white/[0.16]'
            }`}
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-xs text-red-400">{errors.email}</p>
        )}
      </div>

      {/* Phone Number (Optional) */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label htmlFor="phone" className="text-xs font-medium text-slate-300">
            Phone Number
          </label>
          <span className="text-[11px] text-slate-500">Optional</span>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            <Phone className="w-4 h-4" />
          </div>
          <input
            id="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={formData.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-slate-900/90 text-sm text-white placeholder-slate-500 rounded-lg border border-white/[0.08] focus:border-blue-500 hover:border-white/[0.16] transition-colors"
          />
        </div>
      </div>

      {/* Meeting Notes (Optional) */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label htmlFor="notes" className="text-xs font-medium text-slate-300">
            Consultation Topic / Brief
          </label>
          <span className="text-[11px] text-slate-500">Optional</span>
        </div>
        <div className="relative">
          <div className="absolute top-2.5 left-3 pointer-events-none text-slate-500">
            <FileText className="w-4 h-4" />
          </div>
          <textarea
            id="notes"
            rows={2}
            placeholder="Briefly describe what you'd like to discuss..."
            value={formData.notes}
            onChange={(e) => onChange('notes', e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-900/90 text-sm text-white placeholder-slate-500 rounded-lg border border-white/[0.08] focus:border-blue-500 hover:border-white/[0.16] transition-colors resize-none"
          />
        </div>
      </div>
    </div>
  );
};
