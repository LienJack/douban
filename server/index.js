const mongoose = require ('mongoose');
const { connect, initSchemas } = require('./database/init')
const Koa = require('koa')
const views = require('koa-views')
const { resolve } = require('path')
const router = require('./routes')

;(async ()=> {
  await connect()
  initSchemas()
  const Movie = mongoose.model('Movie')
  require('./tasks/movie')
  // require('./tasks/api')
})()
const app = new Koa()

app
  .use(router.routes())
  .use(router.allowedMethods())
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