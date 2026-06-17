/**
 * Generates available time slots for a given date.
 * In production, this would query the booking provider's API.
 * For prototype, generates realistic-looking availability with some slots blocked.
 */
export function generateTimeSlots(date: string, duration: number): string[] {
  const slots: string[] = [];
  const startHour = 9;
  const endHour = 18;

  // Use date string as seed for consistent "random" availability
  const dateSeed = date.split('-').reduce((sum, part) => sum + parseInt(part), 0);

  for (let hour = startHour; hour < endHour; hour++) {
    for (const minute of [0, 30]) {
      const endMinutes = hour * 60 + minute + duration;
      // Don't show slots that would extend past closing time
      if (endMinutes > endHour * 60) continue;

      const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

      // Simulate some slots being unavailable based on date seed
      const slotSeed = (dateSeed + hour + minute) % 5;
      if (slotSeed !== 0) {
        slots.push(timeStr);
      }
    }
  }

  return slots;
}
