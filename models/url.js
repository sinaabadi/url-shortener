module.exports = ({mongoose}) => {
  const {Schema} = mongoose
  const UrlSchema = new Schema({
    original: {type: String, required: true},
    code: {type: String, required: true},
    createdAt: {type: Date, default: new Date()},
    updatedAt: {type: Date, default: new Date()}
  })

  return mongoose.model('Url', UrlSchema)
}