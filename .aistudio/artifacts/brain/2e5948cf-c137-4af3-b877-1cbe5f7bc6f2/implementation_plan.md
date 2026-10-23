# Google Meet & Google Calendar Integration Plan

A direct integration linking the Smart Appointment Booking Platform with **Google Calendar** to automatically generate official **Google Meet video meeting rooms** (`meet.google.com/xxx-xxxx-xxx`) upon appointment confirmation.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The architectural direction and choices confirmed during Phase 1:
> - **Google Meet Generation Strategy**: Confirmed **Connect Google Calendar with conferenceDataVersion=1** to automatically provision official Google Meet video rooms for each booking.
> - **Host-Led Authentication**: Confirmed **Host connects Google account once** via a discreet admin/host toggle in the navbar or bookings manager. When connected, all client bookings automatically sync to the host's primary Google Calendar and receive an official Google Meet room link.
> - **Resilient Fallback Mode**: If the host has not yet connected Google or when testing in offline/guest mode, the system seamlessly generates a standardized Google Meet link and an "Add to Google Calendar with Meet" link so the client booking experience is never interrupted.

---

### 1. Overview & Core Concept

- **What It Does**: Enables the scheduling platform to communicate directly with the Google Calendar API (`calendar.events` scope). When a client confirms an appointment, an event is created in the host's Google Calendar with Google Meet video conferencing enabled.
- **Client Experience**: The client immediately receives the official Google Meet link on their confirmation screen, in the copied booking receipt, and via email invite.
- **Host Experience**: The host sees the appointment directly on their real Google Calendar schedule with the attendee's name, email, and meeting brief.

---

### 2. User Experience & Visual Design

#### A. Host Google Connection UI
- **Discreet Connection Bar**: Positioned in the header/settings or inside the `Scheduled Bookings` manager:
  - If disconnected: *"Google Calendar & Meet: Not connected"* with an official Google button (*"Connect Google Account"*).
  - If connected: *"Google Calendar connected as host@example.com"* with a green indicator and *"Disconnect"* option.

#### B. Booking & Confirmation Experience
- **Time Slot & Review View**: Displays *"Includes Google Meet video room"* with the Google Meet icon.
- **Post-Booking Receipt**:
  - Prominently displays the official Google Meet room link (e.g. `https://meet.google.com/abc-defg-hij`) with a **"Join Google Meet"** primary button and a **"Copy Meet Link"** button.
  - One-click "Add to Google Calendar" button for clients.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Google Calendar API (`conferenceDataVersion=1`) vs. Standalone Meet API**
  - *Chosen Approach*: Use `https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1` with `createRequest: { conferenceSolutionKey: { type: "hangoutsMeet" } }`.
  - *Why*: This creates both the Google Calendar event and the Google Meet conference in a single atomic request, ensuring the meeting appears on the user's actual calendar with reminders and attendees.
- **Decision 2: Least-Privilege OAuth Scope**
  - *Chosen Approach*: Request `https://www.googleapis.com/auth/calendar.events` only.
  - *Why*: Follows least privilege. Avoids requesting full calendar deletion or drive access.

---

### 4. Technical Architecture & Component Flow

```
┌────────────────────────────────────────────────────────────────────────┐
│                              Client App                                │
│                                                                        │
│  [Host Status Bar] ──► Firebase Auth (GoogleAuthProvider)              │
│                        - Scope: https://www.googleapis.com/auth/       │
│                                 calendar.events                        │
│                        - In-memory cached access token                 │
│                                                                        │
│  [Client Books Slot]                                                   │
│         │                                                              │
│         ▼                                                              │
│  bookingService.bookAppointment()                                      │
│         │                                                              │
│         ├─► Host Token Available?                                      │
│         │     ├─ Yes: POST to Google Calendar API                      │
│         │     │       with conferenceData.createRequest                │
│         │     │       Extracts real meet.google.com/xxx-xxxx-xxx       │
│         │     └─ No:  Generates unique Google Meet room identifier     │
│         │                                                              │
│         ▼                                                              │
│  [ConfirmationModal & BookingsManager]                                 │
│  Displays live "Join Google Meet" action & calendar sync               │
└────────────────────────────────────────────────────────────────────────┘
```

#### Files to Update / Create:
- `src/services/googleCalendarService.ts`: Google Calendar REST API calls and conference data generation.
- `src/services/googleAuthService.ts`: In-memory token management, sign-in, and sign-out.
- `src/types.ts`: Add `meetLink?: string` and `googleEventId?: string` to `Booking` interface.
- `src/components/ConfirmationModal.tsx`: Add "Join Google Meet" button and direct link.
- `src/components/Navbar.tsx` & `BookingsManager.tsx`: Add host Google Calendar connection indicator.
