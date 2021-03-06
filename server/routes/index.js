const Router = require('koa-router')
const mongoose = require('mongoose')

const router = new Router()

router.get('/movies/all', async (ctx, next) => {
  const Movie = mongoose.model('Movie')
  const movies = await Movie.find({})

  ctx.body = {
    movies
  }
})

router.get('/movies/detail/:id', async (ctx, next) => {
  const Movie = mongoose.model('Movie')
  const movie = await Movie.find({_id: id})

  ctx.body = {
    movie
  }
})

module.exports = router 