// api/book.js
let bookings = []; // In-memory bookings (resets on redeploy)

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, date, time } = req.body;

  if (!name || !email || !date || !time) {
    return res.status(400).json({ error: "Please fill in all required fields" });
  }

  // Check if the time slot is already taken
  const conflict = bookings.find(
    (b) => b.date === date && b.time === time
  );

  if (conflict) {
    return res.status(409).json({ error: "Time slot not available" });
  }

  // Simulate booking
  bookings.push({ name, email, phone, date, time });

  return res.status(200).json({
    message: `✅ Appointment confirmed for ${name} on ${date} at ${time}`,
  });
}
