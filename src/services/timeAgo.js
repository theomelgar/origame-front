export default function getTimeAgo(date) {
  const currentDate = new Date();
  const timeDifference = currentDate - date;

  // Calculate the time differences in milliseconds, seconds, minutes, hours, days, months, and years
  const milliSeconds = timeDifference;
  const seconds = Math.floor(milliSeconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  // Determine the appropriate time unit based on the calculated differences
  if (years > 0) {
    return years + " year(s) ago";
  } else if (months > 0) {
    return months + " month(s) ago";
  } else if (days > 0) {
    return days + " day(s) ago";
  } else if (hours > 0) {
    return hours + " hour(s) ago";
  } else if (minutes > 0) {
    return minutes + " minute(s) ago";
  } else {
    return seconds + " second(s) ago";
  }
}