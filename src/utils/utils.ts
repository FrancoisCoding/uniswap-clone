import BigNumber from "bignumber.js";

export const bigNumFormatter = (num: string) => {
  const parsedNum = parseFloat(new BigNumber(num).toFixed(2));
  if (parsedNum > 999 && parsedNum < 1000000) {
    return (parsedNum / 1000).toFixed(2) + "K"; // convert to K for number from > 1000 < 1 million
  } else if (parsedNum > 1000000) {
    return (parsedNum / 1000000).toFixed(2) + "M"; // convert to M for number from > 1 million
  } else if (parsedNum < 900) {
    return parsedNum.toString(); // if value < 1000, nothing to do
  }
};

export const timeDifference = (current, previous) => {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return "∼ " + Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return "∼ " + Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return "∼ " + Math.round(elapsed / msPerYear) + " years ago";
  }
};
