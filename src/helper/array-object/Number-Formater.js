const formatNumber = (num) => {
  const newNumber = parseFloat(num?.toFixed(2));
  console.log(newNumber);
  return newNumber;
};

export default formatNumber;