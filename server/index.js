const mongoose = require ('mongoose');
const { connect, initSchemas } = require('./database/init')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const { resolve } = require('path')

;(async ()=> {
  await connect()
  initSchemas()
  const Movie = mongoose.model('Movie')
  const movies = await Movie.find({})

  console.log(movies)
})()
app.use(views(resolve(__dirname, './views'), {
  extension: 'pug'
}))
app.use( async (ctx, next) => {
  await ctx.render('index', {
    you: 'luke',
    me: 'Scott'
  })
})

app.listen(4455, ()=> {
  console.log('4455')
})