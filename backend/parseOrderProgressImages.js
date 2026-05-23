/**
 * Parses order_progress.images from DB (JSON string, JSON column, or array).
 */
function parseOrderProgressImages(value) {
  if (value == null || value === '') return [];
  if (Array.isArray(value)) return value.filter(Boolean).map(String);
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.filter(Boolean).map(String) : [];
    } catch {
      return [];
    }
  }
  return [];
}

module.exports = parseOrderProgressImages;
