/** @format */

export const truncateString = (string, length, end = "...") => {
  return string.length < length ? string : string.substring(0, length) + end;
};
