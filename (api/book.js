// /api/book.js
export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, date, time } = req.body;

  if (!name || !email || !date || !time) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Simulated availability check
  const unavailableSlots = {
    "2026-03-20": ["10:00", "14:00"],
    "2026-03-21": ["09:00", "16:00"],
  };

  const bookedTimes = unavailableSlots[date] || [];
  if (bookedTimes.includes(time)) {
    return res.status(409).json({ error: "Time slot not available" });
  }

  // Simulate booking confirmation
  const confirmation = {
    message: `✅ Appointment confirmed for ${name} on ${date} at ${time}`,
  };

  res.status(200).json(confirmation);
}
