/*
 * @Author: apeng 
 * @Description: 随便封装的函数 
 * @Date: 2019-08-28 17:17:24 
 * @Last Modified by: apeng
 * @Last Modified time: 2019-09-06 10:00:12
 */

// 返回随机整数
// [0, 1) * 可能值的总数 + 第一个值（即最小值）
// 如3-5，即[3, 5]，可能值的总数为5-3+1=3个(3,4,5)，第一个值为3
function random_Number(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// 如在数组中 某个数到 arr.length
// 如 [3, 5)，最大其实是取到4的
// 此时就直接[0, 1) * (5 - 3) + 3 = [3, 5)
function random_exceptMax(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

// 在[min, max] 中随机生成不重复的 n 个数字
// 假如说从 [1, 4]中随机生成2个不重的数字
function select_n_number_fromMinToMax(min, max, n) {
  let numArray = [];
  // 返回一个随机数
  function random_Number(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  while(numArray.length < n) {
    let num = random_Number(min, max)
    // 数组中有和num相同的，则跳出循环
    if (numArray.some(item => item === num)) {
      // break 终止循环
      // continue 跳出当前循环进入下一次循环
      continue;
    }
    numArray.push(num)
  }
  return numArray;
}