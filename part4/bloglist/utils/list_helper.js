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
  
  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
  }