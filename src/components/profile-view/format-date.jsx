export default function formatDateForUser(dateString) {
  function addLeadingZeros(n) {
    if (n <= 9) {
      return "0" + n;
    }
    return n;
  }
  console.log(dateString);
  let date = new Date(dateString);
  console.log(date);

  let formattedDate =
    date.getFullYear() +
    "-" +
    addLeadingZeros(date.getMonth() + 1) +
    "-" +
    addLeadingZeros(date.getDate());
  console.log(formattedDate);
  return formattedDate;
}
