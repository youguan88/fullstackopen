var _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }

  const totalLikes = (blogs) => {
    return blogs.map(x=>x.likes).reduce((accumulator, currentValue) => {return accumulator + currentValue},0)
  }

  const favouriteBlog = (blogs) => {
    return blogs
    .map(({title, author, likes}) => ({title, author, likes}))
    .reduce((accumulator, currentValue) => {return currentValue.likes >= accumulator.likes ? currentValue : accumulator}, {likes:0})
  }

  const mostBlogs = (blogs) => {
    return _.chain(blogs)
    .countBy(x=>x.author)
    .toPairs()
    .value()
    .map((x)=> ({'author': x[0], 'blogs': x[1]}))
    .reduce((accumulator, currentValue) => {return currentValue.blogs >= accumulator.blogs ? currentValue : accumulator}, {blogs:0})
  }

  const mostLikes = (blogs) => {
    return _(blogs)
    .groupBy('author')
    .map((list, author) => ({
      author: author,
      likes: _.sumBy(list, 'likes')
    }))
    .value()
    .reduce((accumulator, currentValue) => {return currentValue.likes >= accumulator.likes ? currentValue : accumulator}, {likes:0})
  }
  
  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
  }