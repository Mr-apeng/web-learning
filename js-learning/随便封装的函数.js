/*
 * @Author: apeng 
 * @Description: 随便封装的函数 
 * @Date: 2019-08-28 17:17:24 
 * @Last Modified by: apeng
 * @Last Modified time: 2019-09-05 21:31:49
 */

// 返回随机整数
// [0, 1) * 可能值的总数 + 第一个值（即最小值）
// 如3-5，可能值的总数为5-3+1=3个，第一个值为3
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
