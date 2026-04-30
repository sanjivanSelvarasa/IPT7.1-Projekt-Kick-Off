export function formatDate(date: Date) {
  return `${date.toLocaleDateString('de-CH', {day: '2-digit'})}. ${date.toLocaleDateString('de-CH', {month: 'short'})}. ${date.getFullYear()}`
}
