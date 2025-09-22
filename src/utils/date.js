import dayjs from 'dayjs';

export function startOfMonth(month) {
  return dayjs(month + '-01');
}

export function endOfMonth(month) {
  const start = startOfMonth(month);
  return start.endOf('month');
}

export function formatDate(dateObj) {
  return dayjs(dateObj).format('YYYY-MM-DD');
}