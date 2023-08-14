const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  author: { type: String, required: true },
  timestamp: { type: Date, required: true }
  }, 
);

CommentSchema.virtual("timestamp_formatted").get(function () {
  let date = this.timestamp
  let stringDate = date.toLocaleString('en-us', {
    month: "short",
    day: "2-digit",
    hour: "numeric", minute: "numeric"
  });
  return stringDate
});

module.exports = mongoose.model("Comment", CommentSchema);