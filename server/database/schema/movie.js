const mongoose = require('mongoose')

const Schema = mongoose.Schema
const { Mixed, ObjectId }= Schema.Types

const MovieSchema = new Schema({
  doubanId: String,
  rate: Number,
  title: String,
  cover: String,
  summary: String,
  poster: String,
  movieYpes: [String],
  category: {
    type: ObjectId,
    ref: 'Category'
  },
  pubdate: Mixed,
  year: Number,
  tags: Array,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})
MovieSchema.pre('save', function (next) {
  if(this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})
mongoose.model('Movie', MovieSchema)