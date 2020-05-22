/**
 * @param {number} n
 * @return {number}
 */
export const countPrimes = (n) => {
  const nums = new Array(n).fill(true);
  nums[0] = false;
  nums[1] = false;

  for (let i = 2; i * i < n; i += 1) {
    if (nums[i]) {
      for (let j = i * i; j < n; j += i) {
        nums[j] = false;
      }
    }
  }

  return nums.filter((val) => val).length;
};
