export interface TimezoneOption {
  value: string; // IANA identifier, e.g. 'Africa/Lagos'
  label: string; // User-facing name, e.g. 'Lagos (WAT, UTC+1)'
  short: string; // Compact label, e.g. 'WAT · Lagos'
  offset: string; // e.g. 'UTC+1'
}

export const COMMON_TIMEZONES: TimezoneOption[] = [
  {
    value: 'Africa/Lagos',
    label: 'West Africa Time · Lagos, Nigeria (UTC+1)',
    short: 'WAT (Lagos)',
    offset: 'UTC+1',
  },
  {
    value: 'Europe/London',
    label: 'Greenwich Mean / British Summer · London (UTC+0/+1)',
    short: 'GMT/BST (London)',
    offset: 'UTC+0',
  },
  {
    value: 'Europe/Paris',
    label: 'Central European · Paris, Berlin (UTC+1/+2)',
    short: 'CET (Paris)',
    offset: 'UTC+1',
  },
  {
    value: 'America/New_York',
    label: 'Eastern Time · New York, Toronto (UTC-5/-4)',
    short: 'ET (New York)',
    offset: 'UTC-5',
  },
  {
    value: 'America/Chicago',
    label: 'Central Time · Chicago, Houston (UTC-6/-5)',
    short: 'CT (Chicago)',
    offset: 'UTC-6',
  },
  {
    value: 'America/Los_Angeles',
    label: 'Pacific Time · Los Angeles, SF (UTC-8/-7)',
    short: 'PT (Los Angeles)',
    offset: 'UTC-8',
  },
  {
    value: 'Asia/Dubai',
    label: 'Gulf Standard · Dubai (UTC+4)',
    short: 'GST (Dubai)',
    offset: 'UTC+4',
  },
  {
    value: 'Asia/Singapore',
    label: 'Singapore Standard · Singapore (UTC+8)',
    short: 'SGT (Singapore)',
    offset: 'UTC+8',
  },
  {
    value: 'UTC',
    label: 'Coordinated Universal Time (UTC)',
    short: 'UTC',
    offset: 'UTC+0',
  },
];

export function getBrowserTimezone(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz) return tz;
  } catch {
    // fallback
  }
  return 'Africa/Lagos'; // Default to Lagos if browser unavailable
}

export function getTimezoneDetails(tzValue: string): TimezoneOption {
  const found = COMMON_TIMEZONES.find((t) => t.value === tzValue);
  if (found) return found;

  // Format custom browser timezone dynamically
  const parts = tzValue.split('/');
  const city = parts[parts.length - 1].replace(/_/g, ' ');

  // Calculate current GMT offset
  let offset = 'UTC';
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: tzValue,
      timeZoneName: 'shortOffset',
    });
    const formattedParts = formatter.formatToParts(now);
    const tzPart = formattedParts.find((p) => p.type === 'timeZoneName');
    if (tzPart) {
      offset = tzPart.value;
    }
  } catch {
    // ignore
  }

  return {
    value: tzValue,
    label: `${city} (${offset})`,
    short: `${city} (${offset})`,
    offset,
  };
}
