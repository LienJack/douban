const { connect } = require('./database/init')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const { resolve } = require('path')

;(async ()=> {
  await connect()
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