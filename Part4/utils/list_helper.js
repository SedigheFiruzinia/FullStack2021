var _ = require('lodash');


const dummy = (array) => {
  return 1
}


const totalLikes = (array) => {
  const reducer = (sum, arr) => {
    return sum + arr.likes
  }
  return array.reduce(reducer, 0)
}



const favorit = (array) => {
  const reducer = (max, point) => {
    return Math.max(max, point.likes)
  }
  const max = array.reduce(reducer, array[1].likes)
  return array.find(b => b.likes === max)
}



const mostBlogs = (array) => {
  const c = _.chain(array)
    .map('auther')
    .countBy()
    .map((val, key) => { return { auther: key, blogs: val } })
    .sortBy('count')
    .reverse()
    .head()
    .value();
  console.log(c)
}



const mostLikes = (array) => {
  const e = _.chain(array)
    .map((a) => { return { auther: a.auther, likes: a.likes } })
    .maxBy('likes')
    .value()
  console.log(e)
}



module.exports = {
  dummy,
  totalLikes,
  favorit,
  mostBlogs,
  mostLikes
}