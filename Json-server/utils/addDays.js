function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const date = new Date();
console.log(addDays(date, 5));
