const { readFile } = require('fs')
const EventEmitter = require('events')

class EE extends EventEmitter {}

const yy = new EE()

yy.on('event', () => {
  console.log('出大事了')
})

setTimeout(()=>{
  console.log('0ms')
}, 0)

setTimeout(()=>{
  console.log('100ms')
}, 100)

setTimeout(() => {
  console.log('200')
},200)

readFile('../package.json', 'utf-8', data => {
  console.log('完成文件 1 读操作的回调')
})

setImmediate(()=> {
  console.log('immdiate 立刻回调')
})

process.nextTick(()=> {
  console.log('process.nextTick 第一次的回调')
})

Promise.resolve().then(
  ()=> {
    yy.emit('event')
    process.nextTick(()=>{
      console.log('process.nextTick 第二次的回调')
    })
    console.log('promise 第一次回调')
  }
)
  .then(()=>{
    console.log('promise 第二次回调')
  })