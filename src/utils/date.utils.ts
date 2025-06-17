/**
 * 計算從給定的日期到現在的天數
 * @param {Date} date - 計算的起始日期
 * @returns {number} 從給定的日期到現在的天數
 */
const calculateDaysDifference = (date: Date): number => {
  const currentTime = new Date().getTime();
  return Math.floor((currentTime - date.getTime()) / (1000 * 60 * 60 * 24));
};

export { calculateDaysDifference };
