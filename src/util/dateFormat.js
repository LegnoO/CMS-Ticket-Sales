/** @format */

export const dateFormat = (date) => {
  const newDate = new Date(date * 1000);
  return (
    newDate.getDate() +
    "/" +
    (newDate.getMonth() + 1) +
    "/" +
    newDate.getFullYear()
  );
};

export const timeFormat = (date) => {
  const newDate = new Date(date * 1000);
  const timeString = newDate.toLocaleTimeString([], { hour12: false });
  return timeString;
};
