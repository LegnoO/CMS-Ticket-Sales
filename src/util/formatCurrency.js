/** @format */

export const formatCurrencyToVND = (amount) => {
  const options = {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };
  return amount
    .toLocaleString("vi-VN", {
      options,
    })
    .replace("₫", "")
    .trim();
};
