export const formatDate = (date) => {
  let newDate = new Date(date);
  let year, month, day;

  year = newDate.getFullYear();
  month = newDate.getMonth() + 1;
  day = newDate.getDate();

  month = month.toString().padStart(2, 0);
  day = day.toString().padStart(2, 0);

  return `${year}-${month}-${day}`;
};
