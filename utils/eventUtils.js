import Event from '../models/event.js';

/**
 * Checks and updates event status to PAST if the date has passed.
 * @param {Array} events - List of events to check
 * @returns {Promise<Array>} - List of updated events
 */
export const checkAndUpdateEventStatus = async (events) => {
  const now = new Date();
  
  const updates = events.map(async (event) => {
    try {
      if (event.tag === 'PAST') return event;

      if (!event.date) return event;

      // Try to parse date
      // Assumption: Date is in a format parseable by new Date() or specific format
      // If date is "12th Feb 2024", we need more robust parsing.
      // But let's try standard parsing first.
      
      let eventDate = new Date(event.date);
      
      if (isNaN(eventDate.getTime())) {
          // If date is invalid, we might skip or log. 
          // For now, let's just return.
          return event;
      }
      
      // Reset time components to compare dates accurately if needed, 
      // but "deadline cross" implies precise time or end of day.
      // If string is just date "YYYY-MM-DD", it defaults to UTC 00:00 usually.
      // Let's assume strict inequality.
      
      if (eventDate < now) {
         event.tag = 'PAST';
         await event.save();
      }
      return event;
    } catch (err) {
      console.error('Error updating event status:', err);
      return event;
    }
  });
  
  return Promise.all(updates);
};
