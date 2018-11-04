const mongoose = require('mongoose')
const db = 'mongodb://localhost/douban'
mongoose.Promise = global.Promise

exports.connect = () => {
  let maxConnectTimes = 0
  return new Promise((reslove, reject) => {
    if(process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }
    mongoose.connect(db, {useNewUrlParser:true}, err => {
      if(err) {
        console.log(err)
      } else {
        console.log('connect success')
      }
    })
    mongoose.connection.on('disconnected', ()=>{
      maxConnectTimes++
      if (maxConnectTimes < 5) {
        mongoose.connect(db)
      } else {
        throw new Error('数据库挂了')
      }
   
    })
    mongoose.connection.on('err', err =>{
      maxConnectTimes++
      if (maxConnectTimes < 5) {
        mongoose.connect(db)
      } else {
        throw new Error('数据库挂了')
      }
    })
    mongoose.connection.once('opoen', ()=>{
      resolve()
      console.log('mongodb connected successfully')
    })
  })
}