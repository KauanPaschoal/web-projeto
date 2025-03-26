function subtractDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}

const date = new Date();
console.log(subtractDays(date, 5));
